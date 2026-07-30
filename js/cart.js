window._appliedCoupon = null;

function addToCart(productId, qty) {
  qty = qty || 1;
  var products = loadProducts();
  var product = products.find(function(p) { return p.id === productId; });
  if (!product) return;
  
  var cart = getCart();
  var existing = cart.find(function(item) { return item.id === productId; });
  var currentQty = (existing ? existing.qty : 0) + qty;
  
  if (currentQty > product.stock) {
    showToast("Only " + product.stock + " left in stock!");
    return;
  }
  
  if (existing) { existing.qty += qty; }
  else { cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty: qty }); }
  saveCart(cart);
  updateCartCount();
  showToast(product.name + " added to cart!");
}

function removeFromCart(productId) {
  var cart = getCart().filter(function(item) { return item.id !== productId; });
  saveCart(cart);
  window._appliedCoupon = null;
  updateCartCount();
  renderCartPage();
}

function updateCartQty(productId, qty) {
  var cart = getCart();
  var item = cart.find(function(i) { return i.id === productId; });
  if (!item) return;
  
  var products = loadProducts();
  var product = products.find(function(p) { return p.id === productId; });
  if (product && qty > product.stock) {
    showToast("Only " + product.stock + " available");
    qty = product.stock;
  }
  
  item.qty = Math.max(1, parseInt(qty) || 1);
  saveCart(cart);
  updateCartCount();
  renderCartPage();
}

function applyCouponCode() {
  var input = document.getElementById("coupon-input");
  if (!input) return;
  var code = input.value.trim().toUpperCase();
  if (!code) { showToast("Enter a coupon code"); return; }
  
  var result = validateCoupon(code);
  if (!result.valid) {
    showToast(result.message);
    input.classList.add("cart-coupon-invalid");
    setTimeout(function() { input.classList.remove("cart-coupon-invalid"); }, 2000);
    return;
  }
  
  input.classList.add("cart-coupon-valid");
  window._appliedCoupon = result.code;
  showToast("Coupon applied! " + (result.coupon.type === "percent" ? result.coupon.value + "% off" : "₹" + result.coupon.value + " off"));
  renderCartPage();
}

function renderCartPage() {
  var cartEl = document.getElementById("cart-page");
  var itemsEl = document.getElementById("cart-items");
  var emptyEl = document.getElementById("cart-empty");
  var summaryEl = document.getElementById("cart-summary");
  var progressEl = document.getElementById("shipping-progress");
  if (!cartEl) return;
  
  var cart = getCart();
  
  if (cart.length === 0) {
    if (itemsEl) itemsEl.style.display = "none"; if (emptyEl) emptyEl.style.display = "block";
    if (summaryEl) summaryEl.style.display = "none"; if (progressEl) progressEl.style.display = "none";
    return;
  }
  
  if (itemsEl) itemsEl.style.display = "block"; if (emptyEl) emptyEl.style.display = "none";
  if (summaryEl) summaryEl.style.display = "block";
  
  var html = '<div class="cart-items-list">';
  cart.forEach(function(item) {
    var maxQty = item.maxStock || 99;
    html += '<div class="cart-item"><div class="cart-item-img"><img src="' + item.image + '" alt="" onerror="this.parentElement.innerHTML=\'<span>' + (item.image && item.image.length <= 4 ? item.image : '📦') + '</span>\'" style="width:100%;height:100%;object-fit:cover"></div><div class="cart-item-info"><h4>' + item.name + '</h4><p>₹' + item.price.toFixed(2) + '</p></div><div class="cart-item-qty"><button onclick="updateCartQty(\'' + item.id + '\',' + (item.qty - 1) + ')">−</button><span>' + item.qty + '</span><button onclick="updateCartQty(\'' + item.id + '\',' + (item.qty + 1) + ')">+</button></div><div class="cart-item-total">₹' + (item.price * item.qty).toFixed(2) + '</div><button class="cart-item-remove" onclick="removeFromCart(\'' + item.id + '\')">✕</button></div>';
  });
  html += '</div>';
  if (itemsEl) itemsEl.innerHTML = html;
  
  var subtotal = getCartTotal();
  var shipping = subtotal >= 999 ? 0 : 49;
  
  var discount = 0;
  if (window._appliedCoupon) discount = applyCoupon(window._appliedCoupon, subtotal);
  
  var tax = (subtotal - discount + shipping) * 0.18;
  var total = subtotal - discount + shipping + tax;
  
  if (subEl) subEl.textContent = '₹' + subtotal.toFixed(2);
  if (shipEl) shipEl.textContent = shipping === 0 ? 'FREE' : '₹' + shipping.toFixed(2);
  if (taxEl) taxEl.textContent = '₹' + tax.toFixed(2);
  if (totalEl) totalEl.textContent = '₹' + total.toFixed(2);
  
  var discRow = document.getElementById("cart-discount-row");
  var discEl = document.getElementById("cart-discount");
  if (discRow && discEl) {
    if (discount > 0) { discRow.style.display = "flex"; discEl.textContent = "-₹" + discount.toFixed(2); }
    else discRow.style.display = "none";
  }
  
  updateShippingProgress(subtotal);
  window._orderSubtotal = subtotal;
  window._orderTotal = total;
  window._orderShipping = shipping;
  window._orderTax = tax;
}

function updateShippingProgress(subtotal) {
  var progEl = document.getElementById("shipping-progress");
  if (!progEl) return;
  progEl.style.display = "block";
  
  var threshold = 999;
  var progress = Math.min(100, (subtotal / threshold) * 100);
  
  if (subtotal >= threshold) {
    document.getElementById("progress-text").innerHTML = '<span class="progress-complete">🎉 You qualify for free shipping!</span>';
    document.getElementById("progress-fill").style.width = "100%";
  } else {
    var remaining = threshold - subtotal;
    document.getElementById("progress-text").innerHTML = 'Add <strong>₹' + remaining.toFixed(2) + '</strong> more for free shipping';
    document.getElementById("progress-fill").style.width = progress.toFixed(0) + "%";
  }
}

function showToast(msg) {
  var toast = document.getElementById("toast");
  if (!toast) { toast = document.createElement("div"); toast.id = "toast"; toast.className = "toast"; document.body.appendChild(toast); }
  toast.textContent = msg; toast.classList.add("show");
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(function() { toast.classList.remove("show"); }, 2500);
}

document.addEventListener("DOMContentLoaded", function() {
  updateCartCount();
  if (document.getElementById("cart-page")) renderCartPage();
});

document.addEventListener("scroll", function() {
  var btn = document.getElementById("back-to-top");
  if (btn) { if (window.scrollY > 500) btn.classList.add("show"); else btn.classList.remove("show"); }
});

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQty = updateCartQty;
window.applyCouponCode = applyCouponCode;
window.renderCartPage = renderCartPage;
window.showToast = showToast;
