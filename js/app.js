function getQueryParam(param) {
  var params = new URL(window.location.href).searchParams;
  return params.get(param);
}

function renderProductCard(product) {
  var discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  var badgeHtml = product.badge ? '<span class="product-badge">' + product.badge + '</span>' : '';
  var discountHtml = discount > 0 ? '<span class="product-discount">-' + discount + '%</span>' : '';
  var origPriceHtml = product.originalPrice ? '<span class="original">₹' + product.originalPrice.toFixed(2) + '</span>' : '';
  
  return '<div class="product-card" onclick="location.href=\'product.html?id=' + product.id + '\'">' +
    '<div class="product-img">' +
      '<img src="' + product.image + '" alt="' + product.name + '" onerror="this.parentElement.innerHTML=\'<span class=product-emoji-fallback>' + (product.image && product.image.length <= 4 ? product.image : '📦') + '</span>\'">' +
      badgeHtml + discountHtml +
    '</div>' +
    '<div class="product-info">' +
      '<span class="product-category">' + product.category + '</span>' +
      '<h3>' + product.name + '</h3>' +
      '<div class="product-stars">' + renderStars(product.rating) + '<span>(' + product.reviews + ')</span></div>' +
      '<div class="product-price">' +
        '<span class="current">₹' + product.price.toFixed(2) + '</span>' +
        origPriceHtml +
      '</div>' +
      '<button class="btn btn-sm btn-primary" onclick="event.stopPropagation();addToCart(\'' + product.id + '\')">Add to Cart</button>' +
    '</div></div>';
}

function renderFeaturedProducts() {
  var grid = document.getElementById("featured-products");
  if (!grid) return;
  var products = loadProducts();
  var featured = products.filter(function(p) { return p.featured; }).slice(0, 8);
  grid.innerHTML = featured.map(renderProductCard).join("");
}

function renderRelatedProducts(currentId) {
  var grid = document.getElementById("related-products");
  if (!grid) return;
  var products = loadProducts();
  var currentProduct = products.find(function(p) { return p.id === currentId; });
  if (!currentProduct) return;
  var related = products.filter(function(p) { return p.category === currentProduct.category && p.id !== currentProduct.id; }).slice(0, 4);
  grid.innerHTML = related.map(renderProductCard).join("");
}

function initHomepage() {
  renderFeaturedProducts();
  var form = document.getElementById("newsletter-form");
  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      showToast("Subscribed! Check your email for 15% off code.");
      form.reset();
    });
  }
}

function initShopPage() {
  var grid = document.getElementById("product-grid");
  if (!grid) return;
  
  var cat = getQueryParam("cat");
  if (cat) {
    var radio = document.querySelector('input[name="cat"][value="' + cat + '"]');
    if (radio) radio.checked = true;
  }
  applyFilters();
}

function applyFilters() {
  var grid = document.getElementById("product-grid");
  var countEl = document.getElementById("results-count");
  if (!grid) return;
  
  var products = loadProducts();
  var cat = document.querySelector('input[name="cat"]:checked');
  var price = document.querySelector('input[name="price"]:checked');
  var sortEl = document.getElementById("sort");
  var searchEl = document.getElementById("search");
  
  var catVal = cat ? cat.value : "all";
  var priceVal = price ? price.value : "all";
  var sortVal = sortEl ? sortEl.value : "featured";
  var searchVal = searchEl ? searchEl.value.toLowerCase() : "";
  
  if (catVal !== "all") products = products.filter(function(p) { return p.category === catVal; });
  if (priceVal !== "all") {
    if (priceVal === "under25") products = products.filter(function(p) { return p.price < 25; });
    else if (priceVal === "25-50") products = products.filter(function(p) { return p.price >= 25 && p.price <= 50; });
    else if (priceVal === "50-100") products = products.filter(function(p) { return p.price > 50 && p.price <= 100; });
    else if (priceVal === "over100") products = products.filter(function(p) { return p.price > 100; });
  }
  if (searchVal) products = products.filter(function(p) { return p.name.toLowerCase().indexOf(searchVal) !== -1 || p.description.toLowerCase().indexOf(searchVal) !== -1; });
  
  if (sortVal === "price-low") products.sort(function(a, b) { return a.price - b.price; });
  else if (sortVal === "price-high") products.sort(function(a, b) { return b.price - a.price; });
  else if (sortVal === "rating") products.sort(function(a, b) { return b.rating - a.rating; });
  else if (sortVal === "name") products.sort(function(a, b) { return a.name.localeCompare(b.name); });
  
  if (countEl) countEl.textContent = products.length + ' product' + (products.length !== 1 ? 's' : '');
  grid.innerHTML = products.map(renderProductCard).join("");
}

function initProductDetail() {
  var id = getQueryParam("id");
  var detailEl = document.getElementById("product-detail");
  if (!detailEl) return;
  
  var products = loadProducts();
  var product = products.find(function(p) { return p.id === id; });
  
  if (!product) {
    detailEl.innerHTML = '<div class="container" style="padding:80px 0;text-align:center"><h2>Product not found</h2><a href="products.html" style="color:var(--primary)">Back to shop</a></div>';
    return;
  }
  
  document.title = product.name + ' - Glamour Cosmetics';
  var discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  
  var colorsHtml = '';
  if (product.colors) {
    colorsHtml = '<div class="variant-section"><h4>Available Shades</h4><div class="color-options">' +
      product.colors.map(function(c) { return '<span class="color-tag">' + c + '</span>'; }).join('') +
      '</div></div>';
  }
  
  var saveBadge = discount > 0 ? '<span class="save-badge">Save ' + discount + '%</span>' : '';
  var origPrice = product.originalPrice ? '<span class="original">₹' + product.originalPrice.toFixed(2) + '</span>' : '';
  var badges = product.badge ? '<span class="product-badge large">' + product.badge + '</span>' : '';
  var stockStatus = product.stock > 0 ? '<span class="in-stock">✓ In Stock</span>' : '<span class="out-stock">✕ Out of Stock</span>';
  
  detailEl.innerHTML = '<section class="product-detail-section"><div class="container"><div class="product-detail-layout">' +
    '<div class="product-detail-img">' +
      '<img src="' + product.image + '" alt="' + product.name + '" class="product-detail-image" onerror="this.parentElement.innerHTML=\'<span class=product-emoji-large>' + (product.image && product.image.length <= 4 ? product.image : '📦') + '</span>\'">' +
      badges +
    '</div>' +
    '<div class="product-detail-info">' +
      '<p class="breadcrumb"><a href="products.html">Shop</a> / <a href="products.html?cat=' + product.category + '">' + product.category + '</a> / ' + product.name + '</p>' +
      '<h1>' + product.name + '</h1>' +
      '<div class="product-stars">' + renderStars(product.rating) + ' <span>' + product.rating + ' (' + product.reviews + ' reviews)</span></div>' +
      '<div class="product-price large">' +
        '<span class="current">₹' + product.price.toFixed(2) + '</span>' +
        origPrice + saveBadge +
      '</div>' +
      '<p class="product-description">' + product.description + '</p>' +
      colorsHtml +
      '<div class="qty-selector"><span>Quantity:</span>' +
        '<button onclick="changeQty(-1)">−</button>' +
        '<input type="number" id="qty-input" value="1" min="1" max="10" onchange="updateQty(this.value)">' +
        '<button onclick="changeQty(1)">+</button>' +
      '</div>' +
      '<div class="product-actions">' +
        '<button class="btn btn-primary btn-lg" onclick="addToCartWithQty()">Add to Cart — ₹' + product.price.toFixed(2) + '</button>' +
        '<button class="btn btn-outline btn-lg" onclick="buyNow()">Buy Now</button>' +
      '</div>' +
      '<div class="product-meta"><p>' + stockStatus + ' — Only ' + product.stock + ' left</p></div>' +
      '<div class="accordion">' +
        '<div class="accordion-item"><button class="accordion-btn" onclick="toggleAccordion(this)">Ingredients</button><div class="accordion-content"><p>' + (product.ingredients || 'N/A') + '</p></div></div>' +
        '<div class="accordion-item"><button class="accordion-btn" onclick="toggleAccordion(this)">How to Use</button><div class="accordion-content"><p>' + (product.howToUse || 'N/A') + '</p></div></div>' +
        '<div class="accordion-item"><button class="accordion-btn" onclick="toggleAccordion(this)">Shipping & Returns</button><div class="accordion-content"><p>Free shipping on orders above ₹999. Delivery in 5-7 business days across India. Cash on Delivery available. 30-day easy returns.</p></div></div>' +
      '</div>' +
    '</div></div></div></section>';
    
  renderRelatedProducts(id);
}

function toggleAccordion(btn) {
  var content = btn.nextElementSibling;
  if (!content) return;
  var isOpen = content.classList.contains("open");
  var allContents = document.querySelectorAll(".accordion-content");
  var allBtns = document.querySelectorAll(".accordion-btn");
  allContents.forEach(function(c) { c.classList.remove("open"); });
  allBtns.forEach(function(b) { b.classList.remove("active"); });
  if (!isOpen) { content.classList.add("open"); btn.classList.add("active"); }
}

var currentQty = 1;

function changeQty(d) {
  currentQty = Math.max(1, Math.min(10, currentQty + d));
  var inp = document.getElementById("qty-input");
  if (inp) inp.value = currentQty;
}

function updateQty(v) {
  currentQty = Math.max(1, Math.min(10, parseInt(v) || 1));
  var inp = document.getElementById("qty-input");
  if (inp) inp.value = currentQty;
}

function addToCartWithQty() {
  var id = getQueryParam("id");
  if (id) addToCart(id, currentQty);
}

function buyNow() {
  var id = getQueryParam("id");
  if (id) addToCart(id, currentQty);
  window.location.href = "checkout.html";
}

window.changeQty = changeQty;
window.updateQty = updateQty;
window.addToCartWithQty = addToCartWithQty;
window.buyNow = buyNow;
window.toggleAccordion = toggleAccordion;
window.applyFilters = applyFilters;

document.addEventListener("DOMContentLoaded", function() {
  initHomepage();
  initShopPage();
  initProductDetail();
});
