function getQueryParam(param) { return new URL(window.location.href).searchParams.get(param); }

function renderProductCard(product) {
  var discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  var wishIcon = isWishlisted(product.id) ? '♥' : '♡';
  var wishClass = isWishlisted(product.id) ? ' active' : '';
  
  return '<div class="product-card" onclick="location.href=\'product.html?id=' + product.id + '\'">' +
    '<button class="product-wishlist' + wishClass + '" onclick="event.stopPropagation();var added=toggleWishlist(\'' + product.id + '\',event);this.textContent=added?\'♥\':\'♡\';this.classList.toggle(\'active\',added)" title="Wishlist">' + wishIcon + '</button>' +
    '<div class="product-img"><img src="' + product.image + '" alt="' + product.name + '" loading="lazy" onerror="this.parentElement.innerHTML=\'<span class=product-emoji-fallback>📦</span>\'">' +
    (product.badge ? '<span class="product-badge">' + product.badge + '</span>' : '') +
    (discount > 0 ? '<span class="product-discount">-' + discount + '%</span>' : '') +
    '</div><div class="product-info">' +
    '<span class="product-category">' + product.category + '</span>' +
    '<h3>' + product.name + '</h3>' +
    '<div class="product-stars">' + renderStars(product.rating) + '<span>(' + product.reviews + ')</span></div>' +
    '<div class="product-price"><span class="current">' + formatINR(product.price) + '</span>' + (product.originalPrice ? '<span class="original">' + formatINR(product.originalPrice) + '</span>' : '') + '</div>' +
    '<button class="btn btn-sm btn-primary" onclick="event.stopPropagation();addToCart(\'' + product.id + '\')">Add to Cart</button>' +
    '</div></div>';
}

function renderFeaturedProducts() {
  var grid = document.getElementById("featured-products"); if (!grid) return;
  var featured = loadProducts().filter(function(p) { return p.featured; }).slice(0, 8);
  grid.innerHTML = featured.map(renderProductCard).join("");
}

function renderRecentlyViewed() {
  var section = document.getElementById("recently-viewed-section"); if (!section) return;
  var recentIds = getRecentlyViewed();
  if (recentIds.length < 2) { section.style.display = "none"; return; }
  var products = loadProducts();
  var recent = recentIds.map(function(id) { return products.find(function(p) { return p.id === id; }); }).filter(Boolean).slice(0, 4);
  if (recent.length < 2) { section.style.display = "none"; return; }
  section.style.display = "block";
  document.getElementById("recently-viewed-grid").innerHTML = recent.map(renderProductCard).join("");
}

function initHomepage() {
  renderFeaturedProducts();
  renderRecentlyViewed();
  var form = document.getElementById("newsletter-form");
  if (form) form.addEventListener("submit", function(e) { e.preventDefault(); showToast("Subscribed! Check your email for 15% off code."); form.reset(); });
}

function initShopPage() {
  var grid = document.getElementById("product-grid"); if (!grid) return;
  var cat = getQueryParam("cat");
  if (cat) { var radio = document.querySelector('input[name="cat"][value="' + cat + '"]'); if (radio) radio.checked = true; }
  applyFilters();
}

function applyFilters() {
  var grid = document.getElementById("product-grid"); if (!grid) return;
  var countEl = document.getElementById("results-count");
  var products = loadProducts();
  var catEl = document.querySelector('input[name="cat"]:checked');
  var priceEl = document.querySelector('input[name="price"]:checked');
  var sortEl = document.getElementById("sort");
  var searchEl = document.getElementById("search");
  var cat = catEl ? catEl.value : "all", price = priceEl ? priceEl.value : "all";
  var sort = sortEl ? sortEl.value : "featured", search = searchEl ? searchEl.value.toLowerCase() : "";
  
  if (cat !== "all") products = products.filter(function(p) { return p.category === cat; });
  if (price !== "all") {
    if (price === "under25") products = products.filter(function(p) { return p.price < 2500; });
    else if (price === "25-50") products = products.filter(function(p) { return p.price >= 2500 && p.price <= 5000; });
    else if (price === "50-100") products = products.filter(function(p) { return p.price > 5000 && p.price <= 10000; });
    else if (price === "over100") products = products.filter(function(p) { return p.price > 10000; });
  }
  if (search) products = products.filter(function(p) { return p.name.toLowerCase().indexOf(search) !== -1 || p.description.toLowerCase().indexOf(search) !== -1; });
  
  if (sort === "price-low") products.sort(function(a, b) { return a.price - b.price; });
  else if (sort === "price-high") products.sort(function(a, b) { return b.price - a.price; });
  else if (sort === "rating") products.sort(function(a, b) { return b.rating - a.rating; });
  else if (sort === "name") products.sort(function(a, b) { return a.name.localeCompare(b.name); });
  
  if (countEl) countEl.textContent = products.length + ' product' + (products.length !== 1 ? 's' : '');
  if (products.length === 0) {
    grid.innerHTML = '<div class="empty-results"><div class="empty-icon">🔍</div><h3>No products found</h3><p>Try adjusting your filters or search terms</p></div>';
  } else {
    grid.innerHTML = products.map(renderProductCard).join("");
  }
}

/* ═══ PRODUCT DETAIL ═══ */
function initProductDetail() {
  var id = getQueryParam("id"); var detailEl = document.getElementById("product-detail"); if (!detailEl || !id) return;
  var products = loadProducts();
  var product = products.find(function(p) { return p.id === id; });
  if (!product) { detailEl.innerHTML = '<div class="container" style="padding:80px 0;text-align:center"><h2>Product not found</h2><a href="products.html" style="color:var(--gold)">Back to shop</a></div>'; return; }
  
  addRecentlyViewed(id);
  document.title = product.name + ' — Kanak';
  var discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  
  var galleryHtml = buildGallery(product);
  var colorsHtml = buildVariants(product);
  var reviewsHtml = buildReviews(product);
  
  detailEl.innerHTML = '<section class="product-detail-section"><div class="container"><div class="product-detail-layout">' +
    '<div class="product-detail-gallery">' + galleryHtml + '</div>' +
    '<div class="product-detail-info">' +
    '<p class="breadcrumb"><a href="products.html">Shop</a> / <a href="products.html?cat=' + product.category + '">' + product.category + '</a> / ' + product.name + '</p>' +
    '<h1>' + product.name + '</h1>' +
    '<div class="product-stars">' + renderStars(product.rating) + ' <span>' + product.rating + ' (' + product.reviews + ' reviews)</span></div>' +
    '<div class="product-price large"><span class="current">' + formatINR(product.price) + '</span>' + (product.originalPrice ? '<span class="original">' + formatINR(product.originalPrice) + '</span>' : '') + (discount > 0 ? '<span class="save-badge">Save ' + discount + '%</span>' : '') + '</div>' +
    '<p class="product-description">' + product.description + '</p>' +
    colorsHtml +
    '<div class="qty-selector"><span>Quantity:</span><button onclick="changeQty(-1)">−</button><input type="number" id="qty-input" value="1" min="1" max="10" onchange="updateQty(this.value)"><button onclick="changeQty(1)">+</button></div>' +
    '<div class="product-actions"><button class="btn btn-primary btn-lg" onclick="addToCartWithQty()" ' + (product.stock < 1 ? 'disabled' : '') + '>Add to Cart — ' + formatINR(product.price) + '</button><button class="btn btn-outline btn-lg" onclick="buyNow()">Buy Now</button></div>' +
    '<div class="product-meta"><p>' + (product.stock > 0 ? '<span class="in-stock">✓ In Stock</span> — ' + product.stock + ' left' : '<span class="out-stock">✕ Out of Stock</span>') + '</p></div>' +
    '<div class="share-buttons"><span style="font-size:12px;color:var(--text-light);margin-right:4px">Share:</span>' +
    '<button class="share-btn" onclick="shareProduct(\'whatsapp\')" title="WhatsApp">📱</button>' +
    '<button class="share-btn" onclick="shareProduct(\'copy\')" title="Copy Link">🔗</button></div>' +
    '<div class="accordion">' +
    '<div class="accordion-item"><button class="accordion-btn" onclick="toggleAccordion(this)">Ingredients</button><div class="accordion-content"><p>' + product.ingredients + '</p></div></div>' +
    '<div class="accordion-item"><button class="accordion-btn" onclick="toggleAccordion(this)">How to Use</button><div class="accordion-content"><p>' + product.howToUse + '</p></div></div>' +
    '<div class="accordion-item"><button class="accordion-btn" onclick="toggleAccordion(this)">Shipping & Returns</button><div class="accordion-content"><p>Free shipping above ₹999. Delivery in 5-7 business days across India. COD available. 30-day easy returns.</p></div></div>' +
    '</div>' + reviewsHtml +
    '</div></div></div></section>';
    
  renderRelatedProducts(id);
  renderRecentlyViewed();
  window._currentProduct = product;
}

function buildGallery(product) {
  var images = product.images && product.images.length > 0 ? product.images : [product.image];
  var main = '<div class="gallery-main"><img src="' + images[0] + '" alt="' + product.name + '" id="gallery-main-img"></div>';
  var thumbs = images.length > 1 ? '<div class="gallery-thumbs">' + images.map(function(img, i) { return '<div class="gallery-thumb' + (i === 0 ? ' active' : '') + '" onclick="switchGalleryImage(' + i + ')"><img src="' + img + '" alt=""></div>'; }).join('') + '</div>' : '';
  var nav = images.length > 1 ? '<button class="gallery-nav gallery-prev" onclick="galleryPrev()">‹</button><button class="gallery-nav gallery-next" onclick="galleryNext()">›</button>' : '';
  window._galleryImages = images; window._galleryIndex = 0;
  return main + thumbs + nav;
}

function switchGalleryImage(idx) {
  window._galleryIndex = idx;
  document.getElementById("gallery-main-img").src = window._galleryImages[idx];
  document.querySelectorAll(".gallery-thumb").forEach(function(el, i) { el.classList.toggle("active", i === idx); });
}
function galleryPrev() { var len = window._galleryImages.length; switchGalleryImage((window._galleryIndex - 1 + len) % len); }
function galleryNext() { switchGalleryImage((window._galleryIndex + 1) % window._galleryImages.length); }

function buildVariants(product) {
  if (!product.colors) return '';
  return '<div class="variant-section"><h4>Available Shades</h4><div class="color-options" id="variant-options">' +
    product.colors.map(function(c, i) { return '<span class="color-tag' + (i === 0 ? ' selected' : '') + '" onclick="selectVariant(this,\'' + c + '\')">' + c + '</span>'; }).join('') +
    '</div></div>';
}
function selectVariant(el, shade) {
  document.querySelectorAll("#variant-options .color-tag").forEach(function(s) { s.classList.remove("selected"); });
  el.classList.add("selected"); window._selectedVariant = shade;
}

function buildReviews(product) {
  var data = product.reviewsData || [];
  var html = '<div class="reviews-section"><h4 style="font-family:Inter,sans-serif;font-size:15px;margin:24px 0 14px">Customer Reviews (' + data.length + ')</h4>';
  
  html += '<div class="reviews-list">';
  if (data.length === 0) html += '<p style="font-size:13px;color:var(--text-light)">No reviews yet. Be the first!</p>';
  else data.forEach(function(R) {
    html += '<div class="review-item"><div class="review-item-header"><strong>' + R.user + ' <span class="review-verified">✓ Verified Buyer</span></strong><span>' + renderStars(R.rating) + ' · ' + R.date + '</span></div><p>' + R.comment + '</p></div>';
  });
  html += '</div>';
  
  html += '<div class="review-form-container"><h4>Write a Review</h4><div class="star-input" id="review-stars">' +
    [1,2,3,4,5].map(function(i) { return '<span onclick="setReviewRating(' + i + ')" data-rating="' + i + '">☆</span>'; }).join('') +
    '</div><div class="form-group"><input type="text" id="review-name" placeholder="Your name" required></div>' +
    '<div class="form-group"><textarea id="review-comment" rows="3" placeholder="Share your experience..." required></textarea></div>' +
    '<button class="btn btn-primary btn-sm" onclick="submitReview()">Submit Review</button></div>';
  
  return html + '</div>';
}

var _reviewRating = 0;
function setReviewRating(r) {
  _reviewRating = r;
  document.querySelectorAll("#review-stars span").forEach(function(s, i) { s.textContent = i < r ? '★' : '☆'; });
}
function submitReview() {
  if (_reviewRating === 0) { showToast("Please select a rating"); return; }
  var name = document.getElementById("review-name").value.trim();
  var comment = document.getElementById("review-comment").value.trim();
  if (!name || !comment) { showToast("Please fill all fields"); return; }
  var products = loadProducts();
  var id = getQueryParam("id");
  var product = products.find(function(p) { return p.id === id; });
  if (!product) return;
  if (!product.reviewsData) product.reviewsData = [];
  product.reviewsData.push({ user: name, rating: _reviewRating, comment: comment, date: new Date().toISOString().split("T")[0] });
  product.rating = Math.round((product.reviewsData.reduce(function(s, r) { return s + r.rating; }, 0) / product.reviewsData.length) * 10) / 10;
  product.reviews = product.reviewsData.length;
  saveProducts(products);
  showToast("Review submitted! Thank you ♡");
  setTimeout(function() { initProductDetail(); }, 500);
}

function shareProduct(platform) {
  var url = encodeURIComponent(window.location.href);
  var text = encodeURIComponent("Check out " + window._currentProduct.name + " from Kanak! ✨");
  if (platform === "whatsapp") window.open("https://wa.me/?text=" + text + " " + url, "_blank");
  else if (platform === "copy") { navigator.clipboard.writeText(window.location.href).then(function() { showToast("Link copied!"); }); }
}

function renderRelatedProducts(id) {
  var grid = document.getElementById("related-products"); if (!grid) return;
  var products = loadProducts();
  var current = products.find(function(p) { return p.id === id; });
  if (!current) return;
  var related = products.filter(function(p) { return p.category === current.category && p.id !== id; }).slice(0, 4);
  grid.innerHTML = related.map(renderProductCard).join("");
}

var currentQty = 1;
function changeQty(d) { currentQty = Math.max(1, Math.min(10, currentQty + d)); var inp = document.getElementById("qty-input"); if (inp) inp.value = currentQty; }
function updateQty(v) { currentQty = Math.max(1, Math.min(10, parseInt(v) || 1)); var inp = document.getElementById("qty-input"); if (inp) inp.value = currentQty; }
function addToCartWithQty() { var id = getQueryParam("id"); if (id) addToCart(id, currentQty); }
function buyNow() { var id = getQueryParam("id"); if (id) addToCart(id, currentQty); window.location.href = "checkout.html"; }
function toggleAccordion(btn) {
  var content = btn.nextElementSibling; if (!content) return;
  var isOpen = content.classList.contains("open");
  document.querySelectorAll(".accordion-content").forEach(function(c) { c.classList.remove("open"); });
  document.querySelectorAll(".accordion-btn").forEach(function(b) { b.classList.remove("active"); });
  if (!isOpen) { content.classList.add("open"); btn.classList.add("active"); }
}

window.changeQty = changeQty; window.updateQty = updateQty;
window.addToCartWithQty = addToCartWithQty; window.buyNow = buyNow; window.toggleAccordion = toggleAccordion;
window.applyFilters = applyFilters; window.switchGalleryImage = switchGalleryImage;
window.galleryPrev = galleryPrev; window.galleryNext = galleryNext;
window.selectVariant = selectVariant; window.setReviewRating = setReviewRating;
window.submitReview = submitReview; window.shareProduct = shareProduct;

document.addEventListener("DOMContentLoaded", function() {
  initHomepage(); initShopPage(); initProductDetail();
});
