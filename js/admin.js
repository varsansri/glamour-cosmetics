var editingProductId = null;

document.addEventListener("DOMContentLoaded", function() {
  if (!isAdminLoggedIn()) { window.location.href = "login.html"; return; }
  
  document.querySelectorAll(".nav-item[data-page]").forEach(function(item) {
    item.addEventListener("click", function(e) {
      e.preventDefault();
      switchPage(this.dataset.page);
    });
  });
  
  switchPage("dashboard");
});

function switchPage(page) {
  document.querySelectorAll(".page").forEach(function(p) { p.classList.remove("active"); });
  document.querySelectorAll(".nav-item").forEach(function(n) { n.classList.remove("active"); });
  
  var pageEl = document.getElementById("page-" + page);
  if (pageEl) pageEl.classList.add("active");
  
  var navItem = document.querySelector('.nav-item[data-page="' + page + '"]');
  if (navItem) navItem.classList.add("active");
  
  if (page === "dashboard") renderDashboard();
  else if (page === "products") renderProductsPage();
  else if (page === "orders") renderOrdersPage();
}

function renderDashboard() {
  var products = loadProducts();
  var orders = loadOrders();
  
  document.getElementById("stat-products").textContent = products.length;
  document.getElementById("stat-orders").textContent = orders.length;
  var revenue = orders.reduce(function(s, o) { return o.status !== "cancelled" ? s + o.total : s; }, 0);
  document.getElementById("stat-revenue").textContent = "$" + revenue.toFixed(2);
  
  var today = new Date().toISOString().split("T")[0];
  var todayOrders = orders.filter(function(o) { return o.date.startsWith(today); });
  document.getElementById("stat-today").textContent = todayOrders.length;
  
  renderRecentOrders();
  renderLowStock();
}

function renderRecentOrders() {
  var orders = loadOrders().slice(0, 5);
  var tbody = document.getElementById("recent-orders");
  if (orders.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="empty-cell">No orders yet</td></tr>';
    return;
  }
  tbody.innerHTML = orders.map(function(o) {
    return '<tr><td><code>' + o.id + '</code></td><td>' + o.customer.name + '</td><td>$' + o.total.toFixed(2) + '</td><td><span class="status-badge status-' + o.status + '">' + o.status + '</span></td><td>' + new Date(o.date).toLocaleDateString() + '</td></tr>';
  }).join("");
}

function renderLowStock() {
  var products = loadProducts().filter(function(p) { return p.stock <= 50; }).sort(function(a, b) { return a.stock - b.stock; });
  var tbody = document.getElementById("low-stock-products");
  if (products.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" class="empty-cell">All products well stocked</td></tr>';
    return;
  }
  tbody.innerHTML = products.map(function(p) {
    return '<tr><td>' + p.image + ' ' + p.name + '</td><td>' + p.category + '</td><td>$' + p.price.toFixed(2) + '</td><td><span class="stock-warning">' + p.stock + '</span></td></tr>';
  }).join("");
}

function renderProductsPage() {
  var products = loadProducts();
  var tbody = document.getElementById("products-table");
  tbody.innerHTML = products.map(function(p) {
    return '<tr><td><span class="table-emoji">' + p.image + '</span></td><td><strong>' + p.name + '</strong>' + (p.featured ? ' <span class="table-badge">Featured</span>' : '') + '</td><td><span class="tag">' + p.category + '</span></td><td>$' + p.price.toFixed(2) + '</td><td>' + p.stock + '</td><td>⭐ ' + p.rating + '</td><td class="actions-cell"><button class="btn btn-sm btn-outline" onclick="editProduct(\'' + p.id + '\')">Edit</button><button class="btn btn-sm btn-danger" onclick="deleteProduct(\'' + p.id + '\')">Delete</button></td></tr>';
  }).join("");
}

function renderOrdersPage() {
  var orders = loadOrders();
  var filter = document.getElementById("order-status-filter").value;
  var filtered = filter === "all" ? orders : orders.filter(function(o) { return o.status === filter; });
  var tbody = document.getElementById("orders-table");
  
  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="empty-cell">No orders found</td></tr>';
    return;
  }
  tbody.innerHTML = filtered.map(function(o) {
    var statusOpts = ["pending","confirmed","shipped","delivered","cancelled"].map(function(s) {
      return '<option value="' + s + '"' + (o.status === s ? ' selected' : '') + '>' + s.charAt(0).toUpperCase() + s.slice(1) + '</option>';
    }).join("");
    return '<tr><td><code>' + o.id + '</code></td><td><strong>' + o.customer.name + '</strong><br><small>' + o.customer.email + '</small></td><td>' + o.items.length + ' item' + (o.items.length > 1 ? 's' : '') + '</td><td>$' + o.total.toFixed(2) + '</td><td><span class="status-badge status-' + o.status + '">' + o.status + '</span></td><td>' + new Date(o.date).toLocaleDateString() + '</td><td class="actions-cell"><select onchange="updateOrderStatus(\'' + o.id + '\',this.value)" class="status-select">' + statusOpts + '</select><button class="btn btn-sm btn-outline" onclick="viewOrderDetails(\'' + o.id + '\')">View</button></td></tr>';
  }).join("");
}

function updateOrderStatus(orderId, newStatus) {
  var orders = loadOrders();
  var order = orders.find(function(o) { return o.id === orderId; });
  if (order) { order.status = newStatus; saveOrders(orders); renderOrdersPage(); renderDashboard(); }
}

function viewOrderDetails(orderId) {
  var orders = loadOrders();
  var order = orders.find(function(o) { return o.id === orderId; });
  if (!order) return;
  var itemsStr = order.items.map(function(i) { return "  - " + i.name + " x" + i.qty + " @ $" + i.price; }).join("\n");
  var msg = "Order: " + order.id + "\nDate: " + new Date(order.date).toLocaleString() + "\n\n" +
    "Customer: " + order.customer.name + "\nEmail: " + order.customer.email + "\n" +
    "Address: " + order.customer.address + ", " + order.customer.city + ", " + order.customer.state + " " + order.customer.zip + "\n\n" +
    "Items:\n" + itemsStr + "\n\n" +
    "Subtotal: $" + order.subtotal.toFixed(2) + "\nShipping: $" + order.shipping.toFixed(2) + "\n" +
    "Tax: $" + order.tax.toFixed(2) + "\nTotal: $" + order.total.toFixed(2) + "\n" +
    "Payment: " + order.paymentMethod + "\nStatus: " + order.status;
  alert(msg);
}

function openProductModal() {
  editingProductId = null;
  document.getElementById("product-modal-title").textContent = "Add Product";
  document.getElementById("product-form").reset();
  document.getElementById("pf-id").value = "";
  document.getElementById("pf-featured").checked = false;
  document.getElementById("pf-rating").value = "4.5";
  document.getElementById("product-modal").classList.add("show");
}

function closeProductModal() {
  document.getElementById("product-modal").classList.remove("show");
  editingProductId = null;
}

function editProduct(id) {
  var products = loadProducts();
  var p = products.find(function(pr) { return pr.id === id; });
  if (!p) return;
  
  editingProductId = id;
  document.getElementById("product-modal-title").textContent = "Edit Product";
  document.getElementById("pf-id").value = p.id;
  document.getElementById("pf-name").value = p.name;
  document.getElementById("pf-category").value = p.category;
  document.getElementById("pf-price").value = p.price;
  document.getElementById("pf-originalPrice").value = p.originalPrice || "";
  document.getElementById("pf-stock").value = p.stock;
  document.getElementById("pf-rating").value = p.rating;
  document.getElementById("pf-reviews").value = p.reviews;
  document.getElementById("pf-image").value = p.image;
  document.getElementById("pf-description").value = p.description;
  document.getElementById("pf-ingredients").value = p.ingredients || "";
  document.getElementById("pf-howToUse").value = p.howToUse || "";
  document.getElementById("pf-badge").value = p.badge || "";
  document.getElementById("pf-featured").checked = p.featured;
  document.getElementById("product-modal").classList.add("show");
}

function saveProduct(e) {
  e.preventDefault();
  var products = loadProducts();
  
  var id = editingProductId || document.getElementById("pf-name").value.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
  var productData = {
    id: id,
    name: document.getElementById("pf-name").value,
    category: document.getElementById("pf-category").value,
    price: parseFloat(document.getElementById("pf-price").value),
    originalPrice: parseFloat(document.getElementById("pf-originalPrice").value) || null,
    stock: parseInt(document.getElementById("pf-stock").value),
    rating: parseFloat(document.getElementById("pf-rating").value),
    reviews: parseInt(document.getElementById("pf-reviews").value),
    image: document.getElementById("pf-image").value,
    description: document.getElementById("pf-description").value,
    ingredients: document.getElementById("pf-ingredients").value,
    howToUse: document.getElementById("pf-howToUse").value,
    badge: document.getElementById("pf-badge").value || null,
    featured: document.getElementById("pf-featured").checked
  };
  
  if (editingProductId) {
    var idx = products.findIndex(function(p) { return p.id === editingProductId; });
    if (idx !== -1) products[idx] = productData;
  } else {
    products.push(productData);
  }
  
  saveProducts(products);
  closeProductModal();
  renderProductsPage();
  renderDashboard();
}

function deleteProduct(id) {
  if (!confirm("Delete this product? This cannot be undone.")) return;
  var products = loadProducts().filter(function(p) { return p.id !== id; });
  saveProducts(products);
  renderProductsPage();
  renderDashboard();
}

function saveSettings() {
  var pw = document.getElementById("admin-password-input").value;
  showToast("Settings saved!");
}

function resetStore() {
  if (!confirm("This will delete ALL products and orders! Are you sure?")) return;
  if (!confirm("This action CANNOT be undone. Continue?")) return;
  localStorage.removeItem("glamour_products");
  localStorage.removeItem("glamour_orders");
  localStorage.removeItem("glamour_cart");
  loadProducts();
  renderDashboard();
  renderProductsPage();
  renderOrdersPage();
}

function logout() {
  sessionStorage.removeItem("glamour_admin");
  window.location.href = "login.html";
}

function showToast(msg) {
  var existing = document.querySelector(".admin-toast");
  if (existing) existing.remove();
  var toast = document.createElement("div");
  toast.className = "admin-toast show";
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(function() {
    toast.classList.remove("show");
    setTimeout(function() { toast.remove(); }, 300);
  }, 2500);
}

window.switchPage = switchPage;
window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.saveProduct = saveProduct;
window.updateOrderStatus = updateOrderStatus;
window.viewOrderDetails = viewOrderDetails;
window.saveSettings = saveSettings;
window.resetStore = resetStore;
window.logout = logout;
