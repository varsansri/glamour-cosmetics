var editingProductId = null, bulkSelected = {};

document.addEventListener("DOMContentLoaded", function() {
  if (!isAdminLoggedIn()) { window.location.href = "login.html"; return; }
  document.querySelectorAll(".nav-item[data-page]").forEach(function(item) {
    item.addEventListener("click", function(e) { e.preventDefault(); switchPage(this.dataset.page); });
  });
  var topbarSearch = document.getElementById("admin-search");
  if (topbarSearch) topbarSearch.addEventListener("input", function() {
    var page = document.querySelector(".page.active");
    if (page && page.id === "page-products") renderProductsPage(this.value);
    else if (page && page.id === "page-orders") renderOrdersPage(null, this.value);
  });
  switchPage("dashboard");
});

function switchPage(page) {
  document.querySelectorAll(".page").forEach(function(p) { p.classList.remove("active"); });
  document.querySelectorAll(".nav-item").forEach(function(n) { n.classList.remove("active"); });
  var pageEl = document.getElementById("page-" + page); if (pageEl) pageEl.classList.add("active");
  var navItem = document.querySelector('.nav-item[data-page="' + page + '"]'); if (navItem) navItem.classList.add("active");
  if (page === "dashboard") renderDashboard();
  else if (page === "products") renderProductsPage();
  else if (page === "orders") renderOrdersPage();
}

/* ═══ DASHBOARD ═══ */
function renderDashboard() {
  var products = loadProducts(), orders = loadOrders();
  document.getElementById("stat-products").textContent = products.length;
  document.getElementById("stat-orders").textContent = orders.length;
  var revenue = orders.reduce(function(s, o) { return o.status !== "cancelled" ? s + o.total : s; }, 0);
  document.getElementById("stat-revenue").textContent = "₹" + revenue.toLocaleString('en-IN', {minimumFractionDigits:0,maximumFractionDigits:0});
  var today = new Date().toISOString().split("T")[0];
  var todayOrders = orders.filter(function(o) { return o.date.startsWith(today); });
  document.getElementById("stat-today").textContent = todayOrders.length;
  var todayRevenue = todayOrders.reduce(function(s, o) { return s + o.total; }, 0);
  document.getElementById("stat-today-label").textContent = "₹" + todayRevenue.toLocaleString('en-IN', {minimumFractionDigits:0,maximumFractionDigits:0}) + " today";
  
  // Topbar date
  var d = new Date();
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var topbarEl = document.getElementById("topbar-date");
  if (topbarEl) topbarEl.textContent = days[d.getDay()] + ', ' + months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  
  renderRevenueChart(orders);
  renderRecentOrders();
  renderLowStock();
}

function renderRevenueChart(orders) {
  var canvas = document.getElementById("revenue-chart"); if (!canvas) return;
  var ctx = canvas.getContext("2d"); ctx.clearRect(0, 0, canvas.width, canvas.height);
  var days = []; for (var i = 6; i >= 0; i--) { var d = new Date(); d.setDate(d.getDate() - i); days.push(d.toISOString().split("T")[0]); }
  var data = days.map(function(day) {
    return orders.filter(function(o) { return o.date.startsWith(day) && o.status !== "cancelled"; }).reduce(function(s, o) { return s + o.total; }, 0);
  });
  var max = Math.max.apply(null, data) || 1, w = canvas.width - 40, h = canvas.height - 30, barW = w / 7 - 8;
  ctx.font = "10px Inter"; ctx.textAlign = "center";
  data.forEach(function(v, i) {
    var barH = (v / max) * (h - 20);
    var gradient = ctx.createLinearGradient(0, h - barH, 0, h);
    gradient.addColorStop(0, "#C8963E"); gradient.addColorStop(1, "#F5ECD7");
    ctx.fillStyle = gradient;
    ctx.fillRect(20 + i * (w / 7) + 4, h - barH, barW, barH);
    ctx.fillStyle = "#6B5B4F"; ctx.fillText("₹" + Math.round(v / 1000) + "K", 20 + i * (w / 7) + barW / 2 + 4, h - barH - 6);
    var dateLabel = days[i].split("-"); ctx.fillText(dateLabel[2] + "/" + dateLabel[1], 20 + i * (w / 7) + barW / 2 + 4, h + 14);
  });
}

function renderRecentOrders() {
  var orders = loadOrders().slice(0, 5), tbody = document.getElementById("recent-orders");
  if (orders.length === 0) { tbody.innerHTML = '<tr><td colspan="5" class="empty-cell">No orders yet</td></tr>'; return; }
  tbody.innerHTML = orders.map(function(o) {
    return '<tr><td><code>' + o.id + '</code></td><td>' + o.customer.name + '</td><td>₹' + o.total.toFixed(2) + '</td><td><span class="status-badge status-' + o.status + '">' + o.status + '</span></td><td>' + new Date(o.date).toLocaleDateString() + '</td></tr>';
  }).join("");
}

function renderLowStock() {
  var products = loadProducts().filter(function(p) { return p.stock <= 50; }).sort(function(a, b) { return a.stock - b.stock; });
  var tbody = document.getElementById("low-stock-products");
  if (products.length === 0) { tbody.innerHTML = '<tr><td colspan="4" class="empty-cell">All products well stocked</td></tr>'; return; }
  tbody.innerHTML = products.map(function(p) {
    return '<tr><td><img src="' + p.image + '" alt="" style="width:28px;height:28px;object-fit:cover;border-radius:3px;vertical-align:middle;margin-right:8px" onerror="this.outerHTML=\'<span>📦</span>\'">' + p.name + '</td><td>' + p.category + '</td><td>₹' + p.price.toFixed(2) + '</td><td><span class="stock-warning">' + p.stock + '</span></td></tr>';
  }).join("");
}

/* ═══ PRODUCTS ═══ */
function renderProductsPage(searchTerm) {
  var products = loadProducts();
  if (searchTerm) products = products.filter(function(p) { return p.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1; });
  var tbody = document.getElementById("products-table");
  tbody.innerHTML = products.map(function(p) {
    return '<tr><td><input type="checkbox" class="bulk-check" value="' + p.id + '" onchange="updateBulkBar()"></td><td style="display:flex;align-items:center;gap:10px"><img src="' + p.image + '" alt="" style="width:36px;height:36px;object-fit:cover;border-radius:6px" onerror="this.outerHTML=\'<span style=font-size:22px>📦</span>\'"><div><strong>' + p.name + '</strong>' + (p.featured ? ' <span class="table-badge">Featured</span>' : '') + '<br><small style="color:var(--gray-500)">' + p.id + '</small></div></td><td><span class="tag">' + p.category + '</span></td><td>₹' + p.price.toLocaleString('en-IN') + '</td><td>' + (p.stock < 30 ? '<span class="stock-warning">' + p.stock + '</span>' : p.stock) + '</td><td>⭐ ' + p.rating + ' <small style="color:var(--gray-500)">(' + p.reviews + ')</small></td><td class="actions-cell"><button class="btn btn-sm btn-outline" onclick="editProduct(\'' + p.id + '\')">Edit</button><button class="btn btn-sm btn-danger" onclick="deleteProduct(\'' + p.id + '\')">Delete</button></td></tr>';
  }).join("");
  document.getElementById("bulk-bar").style.display = "none";
}

/* ═══ ORDERS ═══ */
function renderOrdersPage(filterStatus, searchTerm) {
  var orders = loadOrders();
  var filter = filterStatus || document.getElementById("order-status-filter").value;
  if (filter !== "all") orders = orders.filter(function(o) { return o.status === filter; });
  if (searchTerm) orders = orders.filter(function(o) { return o.id.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 || o.customer.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1; });
  
  // Order stats mini cards
  var allOrders = loadOrders();
  var stats = {pending:0,confirmed:0,shipped:0,delivered:0,cancelled:0};
  allOrders.forEach(function(o){if(stats[o.status]!==undefined)stats[o.status]++});
  var statsEl = document.getElementById("order-stats");
  if (statsEl) {
    var statuses = ['pending','confirmed','shipped','delivered','cancelled'];
    var colors = {pending:'#fef3c7',confirmed:'#dbeafe',shipped:'#e0e7ff',delivered:'#d1fae5',cancelled:'#fee2e2'};
    statsEl.innerHTML = statuses.map(function(s){return '<div class="order-stat-mini'+(filter===s?' active':'')+'" onclick="document.getElementById(\'order-status-filter\').value=\''+s+'\';renderOrdersPage(\''+s+'\')"><span class="os-count">'+stats[s]+'</span><span class="os-label" style="color:'+(colors[s]?'var(--gray-700)':'var(--gray-500)')+'">'+s+'</span></div>'}).join('');
  }
  
  var tbody = document.getElementById("orders-table");
  if (orders.length === 0) { tbody.innerHTML = '<tr><td colspan="7" class="empty-cell">No orders found</td></tr>'; return; }
  tbody.innerHTML = orders.map(function(o) {
    var statusOpts = ["pending","confirmed","shipped","delivered","cancelled"].map(function(s) { return '<option value="' + s + '"' + (o.status === s ? ' selected' : '') + '>' + s.charAt(0).toUpperCase() + s.slice(1) + '</option>'; }).join("");
    return '<tr><td><code>' + o.id + '</code></td><td><strong>' + o.customer.name + '</strong><br><small>' + o.customer.email + '</small></td><td>' + o.items.length + ' item' + (o.items.length > 1 ? 's' : '') + '</td><td>₹' + o.total.toLocaleString('en-IN') + '</td><td><span class="status-badge status-' + o.status + '">' + o.status + '</span></td><td>' + new Date(o.date).toLocaleDateString() + '</td><td class="actions-cell"><select onchange="updateOrderStatus(\'' + o.id + '\',this.value)" class="status-select">' + statusOpts + '</select><button class="btn btn-sm btn-outline" onclick="viewOrderDetails(\'' + o.id + '\')">View</button></td></tr>';
  }).join("");
}

function updateOrderStatus(orderId, newStatus) {
  var orders = loadOrders(); var order = orders.find(function(o) { return o.id === orderId; });
  if (order) { order.status = newStatus; saveOrders(orders); renderOrdersPage(); renderDashboard(); }
}

function viewOrderDetails(orderId) {
  var orders = loadOrders(); var order = orders.find(function(o) { return o.id === orderId; }); if (!order) return;
  alert("Order: " + order.id + "\nDate: " + new Date(order.date).toLocaleString() + "\n\n" +
    "Customer: " + order.customer.name + "\nEmail: " + order.customer.email + "\n" +
    "Address: " + order.customer.address + ", " + order.customer.city + "\n" +
    "Items:\n" + order.items.map(function(i) { return "  - " + i.name + " x" + i.qty + " @ ₹" + i.price; }).join("\n") + "\n\n" +
    "Total: ₹" + order.total.toFixed(2) + "\nStatus: " + order.status + "\nPayment: " + (order.paymentMethod || "N/A"));
}

/* ═══ BULK ACTIONS ═══ */
function updateBulkBar() {
  var checked = document.querySelectorAll(".bulk-check:checked");
  var bar = document.getElementById("bulk-bar");
  if (checked.length > 0) { bar.style.display = "flex"; document.getElementById("bulk-count").textContent = checked.length; }
  else bar.style.display = "none";
}
function bulkDelete() {
  var checked = document.querySelectorAll(".bulk-check:checked"); if (checked.length === 0) return;
  if (!confirm("Delete " + checked.length + " products? This cannot be undone.")) return;
  var ids = Array.from(checked).map(function(cb) { return cb.value; });
  var products = loadProducts().filter(function(p) { return ids.indexOf(p.id) === -1; });
  saveProducts(products); renderProductsPage(); renderDashboard(); showToast("Deleted " + ids.length + " products");
}
function bulkToggleFeatured(make) {
  var checked = document.querySelectorAll(".bulk-check:checked"); if (checked.length === 0) return;
  var ids = Array.from(checked).map(function(cb) { return cb.value; });
  var products = loadProducts();
  products.forEach(function(p) { if (ids.indexOf(p.id) !== -1) p.featured = make; });
  saveProducts(products); renderProductsPage(); showToast("Updated " + ids.length + " products");
}

/* ═══ EXPORT ═══ */
function exportOrders() {
  var orders = loadOrders(); if (orders.length === 0) { showToast("No orders to export"); return; }
  var csv = "Order ID,Date,Customer,Email,Items,Total,Status,Payment\n";
  orders.forEach(function(o) {
    csv += o.id + ',"' + new Date(o.date).toLocaleDateString() + '","' + o.customer.name + '","' + o.customer.email + '","' + o.items.map(function(i) { return i.name + ' x' + i.qty; }).join('; ') + '",₹' + o.total.toFixed(2) + ',"' + o.status + '","' + (o.paymentMethod || 'N/A') + '"\n';
  });
  downloadCSV(csv, "gs-cosmatics-orders-export.csv");
}
function exportProducts() {
  var products = loadProducts(); if (products.length === 0) { showToast("No products to export"); return; }
  var csv = "ID,Name,Category,Price,Stock,Rating,Reviews,Featured\n";
  products.forEach(function(p) { csv += p.id + ',"' + p.name + '",' + p.category + ',₹' + p.price + ',' + p.stock + ',' + p.rating + ',' + p.reviews + ',' + (p.featured ? "Yes" : "No") + '\n'; });
  downloadCSV(csv, "gs-cosmatics-products-export.csv");
}
function downloadCSV(csv, filename) {
  var blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
  var link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = filename;
  document.body.appendChild(link); link.click(); document.body.removeChild(link);
}

/* ═══ MODAL ═══ */
function openProductModal() {
  editingProductId = null; document.getElementById("product-modal-title").textContent = "Add Product";
  document.getElementById("product-form").reset(); document.getElementById("pf-id").value = "";
  document.getElementById("pf-featured").checked = false; document.getElementById("pf-rating").value = "4.5";
  document.getElementById("product-modal").classList.add("show");
}
function closeProductModal() { document.getElementById("product-modal").classList.remove("show"); editingProductId = null; }

function editProduct(id) {
  var products = loadProducts(); var p = products.find(function(pr) { return pr.id === id; }); if (!p) return;
  editingProductId = id; document.getElementById("product-modal-title").textContent = "Edit Product";
  document.getElementById("pf-id").value = p.id; document.getElementById("pf-name").value = p.name;
  document.getElementById("pf-category").value = p.category; document.getElementById("pf-price").value = p.price;
  document.getElementById("pf-originalPrice").value = p.originalPrice || "";
  document.getElementById("pf-stock").value = p.stock; document.getElementById("pf-rating").value = p.rating;
  document.getElementById("pf-reviews").value = p.reviews; document.getElementById("pf-image").value = p.image;
  document.getElementById("pf-description").value = p.description;
  document.getElementById("pf-ingredients").value = p.ingredients || "";
  document.getElementById("pf-howToUse").value = p.howToUse || "";
  document.getElementById("pf-badge").value = p.badge || ""; document.getElementById("pf-featured").checked = p.featured;
  document.getElementById("product-modal").classList.add("show");
}

function saveProduct(e) {
  e.preventDefault(); var products = loadProducts();
  var id = editingProductId || document.getElementById("pf-name").value.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
  var data = {
    id: id, name: document.getElementById("pf-name").value, category: document.getElementById("pf-category").value,
    price: parseFloat(document.getElementById("pf-price").value),
    originalPrice: parseFloat(document.getElementById("pf-originalPrice").value) || null,
    stock: parseInt(document.getElementById("pf-stock").value), rating: parseFloat(document.getElementById("pf-rating").value),
    reviews: parseInt(document.getElementById("pf-reviews").value), image: document.getElementById("pf-image").value,
    description: document.getElementById("pf-description").value,
    ingredients: document.getElementById("pf-ingredients").value, howToUse: document.getElementById("pf-howToUse").value,
    badge: document.getElementById("pf-badge").value || null, featured: document.getElementById("pf-featured").checked
  };
  if (editingProductId) { var idx = products.findIndex(function(p) { return p.id === editingProductId; }); if (idx !== -1) products[idx] = data; }
  else products.push(data);
  saveProducts(products); closeProductModal(); renderProductsPage(); renderDashboard();
}

function deleteProduct(id) { if (!confirm("Delete this product?")) return; saveProducts(loadProducts().filter(function(p) { return p.id !== id; })); renderProductsPage(); renderDashboard(); }
function saveSettings() { showToast("Settings saved!"); }

function resetStore() {
  if (!confirm("Delete ALL products and orders? Are you sure?")) return;
  if (!confirm("This CANNOT be undone. Continue?")) return;
  localStorage.removeItem("glamour_products"); localStorage.removeItem("glamour_orders"); localStorage.removeItem("glamour_cart");
  loadProducts(); renderDashboard(); renderProductsPage(); renderOrdersPage();
}
function logout() { sessionStorage.removeItem("glamour_admin"); window.location.href = "login.html"; }

function showToast(msg) {
  var existing = document.querySelector(".admin-toast"); if (existing) existing.remove();
  var toast = document.createElement("div"); toast.className = "admin-toast show"; toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(function() { toast.classList.remove("show"); setTimeout(function() { toast.remove(); }, 300); }, 2500);
}

window.switchPage = switchPage; window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal; window.editProduct = editProduct;
window.deleteProduct = deleteProduct; window.saveProduct = saveProduct;
window.updateOrderStatus = updateOrderStatus; window.viewOrderDetails = viewOrderDetails;
window.saveSettings = saveSettings; window.resetStore = resetStore;
window.logout = logout; window.exportOrders = exportOrders; window.exportProducts = exportProducts;
window.updateBulkBar = updateBulkBar; window.bulkDelete = bulkDelete;
window.bulkToggleFeatured = bulkToggleFeatured;
