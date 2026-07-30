function addToCart(productId, qty = 1) {
  const products = loadProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return;
  let cart = getCart();
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: qty
    });
  }
  saveCart(cart);
  updateCartCount();
  showToast(`${product.name} added to cart! 🛒`);
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  updateCartCount();
}

function updateCartQty(productId, qty) {
  let cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.qty = Math.max(1, parseInt(qty) || 1);
    saveCart(cart);
    updateCartCount();
    renderCart();
  }
}

function getCartTotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartCount() {
  const count = getCartCount();
  document.querySelectorAll("#cart-count").forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? "flex" : "none";
  });
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartEmpty = document.getElementById("cart-empty");
  const cartSummary = document.getElementById("cart-summary");
  const cartPage = document.getElementById("cart-page");
  if (!cartPage) return;
  const cart = getCart();
  if (cart.length === 0) {
    cartItems.style.display = "none";
    cartEmpty.style.display = "block";
    cartSummary.style.display = "none";
    return;
  }
  cartItems.style.display = "block";
  cartEmpty.style.display = "none";
  cartSummary.style.display = "block";
  
  let html = "";
  cart.forEach(item => {
    html += `
      <div class="cart-item">
        <div class="cart-item-img">${item.image}</div>
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>$${item.price.toFixed(2)}</p>
        </div>
        <div class="cart-item-qty">
          <button onclick="updateCartQty('${item.id}', ${item.qty - 1})">−</button>
          <span>${item.qty}</span>
          <button onclick="updateCartQty('${item.id}', ${item.qty + 1})">+</button>
        </div>
        <div class="cart-item-total">$${(item.price * item.qty).toFixed(2)}</div>
        <button class="cart-item-remove" onclick="removeFromCart('${item.id}');renderCart()">✕</button>
      </div>`;
  });
  cartItems.innerHTML = html;
  
  const subtotal = getCartTotal();
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  
  document.getElementById("cart-subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("cart-shipping").textContent = shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`;
  document.getElementById("cart-tax").textContent = `$${tax.toFixed(2)}`;
  document.getElementById("cart-total").textContent = `$${total.toFixed(2)}`;
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

document.addEventListener("DOMContentLoaded", updateCartCount);
