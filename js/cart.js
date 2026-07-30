function addToCart(productId, qty) {
  qty = qty || 1;
  const products = loadProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return;
  let cart = getCart();
  const existing = cart.find(item => item.id === productId);
  if (existing) { existing.qty += qty; }
  else { cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty: qty }); }
  saveCart(cart);
  updateCartCount();
  showToast(product.name + ' added to cart! 🛒');
}

function removeFromCart(productId) {
  let cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
  updateCartCount();
}

function updateCartQty(productId, qty) {
  let cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) { item.qty = Math.max(1, parseInt(qty) || 1); saveCart(cart); updateCartCount(); renderCartPage(); }
}

function updateCartCount() {
  const count = getCartCount();
  const els = document.querySelectorAll("#cart-count");
  els.forEach(el => {
    el.textContent = count;
    if (count === 0) { el.style.display = "none"; }
    else { el.style.display = "flex"; }
  });
}

function renderCartPage() {
  const cartEl = document.getElementById("cart-page");
  const itemsEl = document.getElementById("cart-items");
  const emptyEl = document.getElementById("cart-empty");
  const summaryEl = document.getElementById("cart-summary");
  if (!cartEl) return;
  
  const cart = getCart();
  
  if (cart.length === 0) {
    if (itemsEl) itemsEl.style.display = "none";
    if (emptyEl) emptyEl.style.display = "block";
    if (summaryEl) summaryEl.style.display = "none";
    return;
  }
  
  if (itemsEl) itemsEl.style.display = "block";
  if (emptyEl) emptyEl.style.display = "none";
  if (summaryEl) summaryEl.style.display = "block";
  
  let html = '<div class="cart-items-list">';
  cart.forEach(item => {
    html += '<div class="cart-item"><div class="cart-item-img"><img src="' + item.image + '" alt="" onerror="this.parentElement.innerHTML=\'' + (item.image && item.image.length <= 4 ? item.image : '📦') + '\'" style="width:72px;height:72px;object-fit:cover;border-radius:6px"></div><div class="cart-item-info"><h4>' + item.name + '</h4><p>$' + item.price.toFixed(2) + '</p></div><div class="cart-item-qty"><button onclick="updateCartQty(\'' + item.id + '\',' + (item.qty - 1) + ')">−</button><span>' + item.qty + '</span><button onclick="updateCartQty(\'' + item.id + '\',' + (item.qty + 1) + ')">+</button></div><div class="cart-item-total">$' + (item.price * item.qty).toFixed(2) + '</div><button class="cart-item-remove" onclick="removeFromCart(\'' + item.id + '\');renderCartPage();">✕</button></div>';
  });
  html += '</div>';
  if (itemsEl) itemsEl.innerHTML = html;
  
  const subtotal = getCartTotal();
  const shipping = subtotal >= 999 ? 0 : 49;
  const tax = (subtotal + shipping) * 0.18;
  const total = subtotal + shipping + tax;
  
  const subEl = document.getElementById("cart-subtotal");
  const shipEl = document.getElementById("cart-shipping");
  const taxEl = document.getElementById("cart-tax");
  const totalEl = document.getElementById("cart-total");
  
  if (subEl) subEl.textContent = '₹' + subtotal.toFixed(2);
  if (shipEl) shipEl.textContent = shipping === 0 ? 'FREE' : '₹' + shipping.toFixed(2);
  if (taxEl) taxEl.textContent = '₹' + tax.toFixed(2);
  if (totalEl) totalEl.textContent = '₹' + total.toFixed(2);
}

function showToast(msg) {
  var toast = document.getElementById("toast");
  if (!toast) { toast = document.createElement("div"); toast.id = "toast"; toast.className = "toast"; document.body.appendChild(toast); }
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(function() { toast.classList.remove("show"); }, 2500);
}

document.addEventListener("DOMContentLoaded", function() {
  updateCartCount();
  if (document.getElementById("cart-page")) renderCartPage();
});
