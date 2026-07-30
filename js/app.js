function renderProductCard(product) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;
  
  return `
    <div class="product-card" onclick="location.href='product.html?id=${product.id}'">
      <div class="product-img">
        <span class="product-emoji">${product.image}</span>
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
        ${discount > 0 ? `<span class="product-discount">-${discount}%</span>` : ""}
      </div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3>${product.name}</h3>
        <div class="product-stars">${renderStars(product.rating)}<span>(${product.reviews})</span></div>
        <div class="product-price">
          <span class="current">$${product.price.toFixed(2)}</span>
          ${product.originalPrice ? `<span class="original">$${product.originalPrice.toFixed(2)}</span>` : ""}
        </div>
        <button class="btn btn-sm btn-primary" onclick="event.stopPropagation();addToCart('${product.id}')">Add to Cart</button>
      </div>
    </div>`;
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let html = "";
  for (let i = 0; i < full; i++) html += "★";
  if (half) html += "½";
  const total = half ? full + 1 : full;
  for (let i = total; i < 5; i++) html += "☆";
  return html;
}

function renderFeaturedProducts() {
  const grid = document.getElementById("featured-products");
  if (!grid) return;
  const products = loadProducts();
  const featured = products.filter(p => p.featured).slice(0, 8);
  grid.innerHTML = featured.map(p => renderProductCard(p)).join("");
}

function initHomepage() {
  renderFeaturedProducts();
  
  const form = document.getElementById("newsletter-form");
  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      showToast("Subscribed! Check your email for your 15% off code.");
      this.reset();
    });
  }
}

function getQueryParam(param) {
  const url = new URL(window.location.href);
  return url.searchParams.get(param);
}
