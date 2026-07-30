const DEFAULT_PRODUCTS = [
  {
    id: "24k-gold-elixir", name: "24K Gold Elixir Serum", category: "skincare", price: 4199, originalPrice: 5199,
    description: "A light-as-air serum infused with pure 24K gold flakes, rosehip oil, and vitamin C. Brightens, firms, and delivers that unmistakable golden-hour glow. Because your skin is gold.",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=600&fit=crop","https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=600&fit=crop","https://images.unsplash.com/photo-1599305090598-fe179d501227?w=600&h=600&fit=crop"],
    stock: 85, featured: true, rating: 4.8, reviews: 234, reviewsData: [{user:"Priya S.",rating:5,comment:"This serum is pure magic. My skin has never glowed like this!","date":"2026-07-15"},{user:"Ananya K.",rating:5,comment:"Worth every rupee. The gold flakes feel so luxurious."}],
    ingredients: "24K Gold Flakes, Rosehip Oil, Vitamin C, Hyaluronic Acid, Jojoba Oil, Vitamin E",
    howToUse: "Apply 3-4 drops to clean, damp skin morning and evening. Gently press into face and neck. Your skin is gold.",
    skinType: "all", concern: "dullness", texture: "Lightweight oil-serum", scent: "Rose & Sandalwood", sizeOptions: ["30ml", "50ml"],
    ingredientExplanations: {"24K Gold Flakes":"Boosts collagen production and reduces inflammation","Rosehip Oil":"Rich in Vitamin A & C. Brightens scars and evens skin tone","Hyaluronic Acid":"Holds 1000x its weight in water. Instantly plumps.","Vitamin C":"Powerful antioxidant that protects against pollution damage"},
    faq: [{q:"Can I use this with retinol?",a:"Yes, apply serum in the morning and retinol at night."},{q:"How long does one bottle last?",a:"30ml lasts ~3 months with daily use (3-4 drops per application)."}],
    badge: "Best Seller"
  },
  {
    id: "pure-gold-lip-oil", name: "Pure Gold Lip Oil", category: "makeup", price: 1999,
    description: "A lightweight, non-sticky tinted lip oil infused with real gold shimmer. Hydrates for 12 hours, leaving lips with a sheer golden tint. Lip care that celebrates you.",
    image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&h=600&fit=crop","https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&h=600&fit=crop"],
    stock: 120, featured: true, rating: 4.6, reviews: 189, reviewsData: [],
    ingredients: "Vitamin E, Shea Butter, Jojoba Oil, Gold Mica, Hyaluronic Acid",
    howToUse: "Apply directly to lips. Wear alone for a golden glow or layer over lipstick.",
    colors: ["Gold Shimmer", "Rose Gold", "Honey", "Clear Gold"]
  },
  {
    id: "golden-hour-highlighter", name: "Golden Hour Highlighter", category: "makeup", price: 2899, originalPrice: 3499,
    description: "A silky, ultra-refined highlighter that captures golden hour in a compact. Buildable from a subtle glow to a blinding radiance.",
    image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1571875257727-256c39da42af?w=600&h=600&fit=crop","https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop"],
    stock: 64, featured: true, rating: 4.9, reviews: 312, reviewsData: [],
    ingredients: "Mica, Squalane, Vitamin E, Pearl Powder, Gold Pigments",
    howToUse: "Apply to cheekbones, brow bone, cupid's bow. Because golden hour looks good on you.",
    colors: ["Champagne Gold", "Rose Gold", "Warm Bronze", "Pearl"], badge: "Top Rated"
  },
  {
    id: "liquid-silk-foundation", name: "Liquid Silk Foundation", category: "makeup", price: 3599, originalPrice: 4599,
    description: "A breathable, buildable foundation with a natural satin finish. 22 shades designed for Indian skin tones. SPF 30. Coverage that feels like silk, looks like skin.",
    image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=600&h=600&fit=crop","https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop"],
    stock: 93, featured: true, rating: 4.5, reviews: 178, reviewsData: [],
    ingredients: "SPF 30, Hyaluronic Acid, Niacinamide, Squalane, Glycerin, Vitamin E",
    howToUse: "Shake well. Apply 1-2 pumps with fingertips, brush, or sponge. Your skin, perfected.",
    colors: ["Porcelain", "Warm Ivory", "Sand", "Golden", "Honey", "Deep Tan", "Espresso"]
  },
  {
    id: "gilded-eye-palette", name: "Gilded Eye Palette", category: "makeup", price: 4899,
    description: "12 richly pigmented shades inspired by gold in all its forms — matte earth tones, shimmering metallics, and a pure gold foil.",
    image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1599305090598-fe179d501227?w=600&h=600&fit=crop","https://images.unsplash.com/photo-1571875257727-256c39da42af?w=600&h=600&fit=crop"],
    stock: 45, featured: false, rating: 4.7, reviews: 423, reviewsData: [],
    ingredients: "Mica, Talc, Dimethicone, Zinc Stearate, Vitamin E",
    howToUse: "Use matte shades to define the crease. Pat gold shimmer onto center lid with fingertip."
  },
  {
    id: "pearl-gold-cream", name: "Pearl & Gold Face Cream", category: "skincare", price: 5399, originalPrice: 6499,
    description: "A decadent, whipped face cream infused with crushed freshwater pearls and colloidal gold. Deeply nourishes, firms, and restores luminosity.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=600&fit=crop","https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=600&fit=crop"],
    stock: 38, featured: true, rating: 4.9, reviews: 156, reviewsData: [],
    ingredients: "Pearl Powder, Colloidal Gold, Marine Collagen, Ceramides, Peptides, Niacinamide",
    howToUse: "Apply a pearl-sized amount to face and neck. Massage upward.", badge: "Premium"
  },
  {
    id: "midnight-gold-mascara", name: "Midnight Gold Mascara", category: "makeup", price: 2399,
    description: "Dramatic volume with a subtle gold shimmer that catches the light. Our signature hourglass wand defines every lash without clumping.",
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=600&h=600&fit=crop","https://images.unsplash.com/photo-1599305090598-fe179d501227?w=600&h=600&fit=crop"],
    stock: 150, featured: false, rating: 4.4, reviews: 567, reviewsData: [],
    ingredients: "Beeswax, Carnauba Wax, Panthenol, Biotin, Castor Oil, Gold Pigments",
    howToUse: "Wiggle wand from root to tip. Layer for more drama. Your eyes, your power."
  },
  {
    id: "honey-glow-lip-gloss", name: "Honey Glow Lip Gloss", category: "makeup", price: 1599, originalPrice: 1999,
    description: "High-shine, honey-infused gloss with a subtle plumping effect. Non-sticky, utterly addictive. Sweet like honey, golden like you.",
    image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&h=600&fit=crop","https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&h=600&fit=crop"],
    stock: 200, featured: true, rating: 4.3, reviews: 345, reviewsData: [],
    ingredients: "Honey Extract, Hyaluronic Acid, Peptides, Vitamin E, Jojoba Oil",
    howToUse: "Apply directly to lips. Wear alone or layer. Shine on.",
    colors: ["Clear Honey", "Golden Pink", "Warm Peach", "Berry Gold"]
  },
  {
    id: "ancient-gold-retinol", name: "Ancient Gold Retinol Oil", category: "skincare", price: 5999,
    description: "A potent yet gentle retinol treatment suspended in a golden oil blend. Time-release technology minimizes irritation while maximizing results.",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1617897903246-719242758050?w=600&h=600&fit=crop","https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=600&fit=crop"],
    stock: 52, featured: false, rating: 4.7, reviews: 198, reviewsData: [],
    ingredients: "Retinol (0.5%), Bakuchiol, Gold, Squalane, Ceramides, Rosehip Oil",
    howToUse: "Apply 1 pump to clean face at night. Start 3x/week, build to nightly. Always use SPF."
  },
  {
    id: "golden-touch-brushes", name: "Golden Touch Brush Set", category: "tools", price: 7499, originalPrice: 9999,
    description: "A 15-piece professional brush collection with gold-plated ferrules and sustainably sourced bamboo handles. Every stroke is a golden touch.",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop","https://images.unsplash.com/photo-1571875257727-256c39da42af?w=600&h=600&fit=crop"],
    stock: 30, featured: false, rating: 4.8, reviews: 89, reviewsData: [],
    ingredients: "Bamboo handles, synthetic Taklon bristles, gold-plated ferrules",
    howToUse: "Set includes: Powder, Foundation, Concealer, Blush, Contour, Highlighter, 4 Eye, 2 Blending, Angled, Brow, Lip brush."
  },
  {
    id: "treasure-chest-set", name: "The Treasure Chest", category: "sets", price: 10999, originalPrice: 14999,
    description: "Our signature gift set — the ultimate GS-Cosmatics experience. Includes 24K Gold Elixir, Golden Hour Highlighter, Honey Glow Lip Gloss, and a golden velvet pouch.",
    image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&h=600&fit=crop","https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=600&fit=crop"],
    stock: 25, featured: true, rating: 5.0, reviews: 67, reviewsData: [],
    ingredients: "See individual products inside the set",
    howToUse: "Includes: 24K Gold Elixir (30ml), Golden Hour Highlighter (Champagne), Honey Glow Lip Gloss (Clear Honey), Golden Velvet Pouch.", badge: "Gift Set"
  },
  {
    id: "gold-cleansing-balm", name: "Pure Gold Cleansing Balm", category: "skincare", price: 2999,
    description: "A lush, oil-rich balm that melts away makeup, sunscreen, and the day's weight. Transforms from balm to oil to milk.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=600&fit=crop","https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=600&fit=crop"],
    stock: 78, featured: false, rating: 4.6, reviews: 234, reviewsData: [],
    ingredients: "Moringa Oil, Sunflower Seed Oil, Shea Butter, Colloidal Gold, Chamomile, Vitamin E",
    howToUse: "Massage onto dry skin. Add water to emulsify. Rinse away. Feel the gold."
  }
];

function formatINR(amount) { return '₹' + amount.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 }); }
function formatINR2(amount) { return '₹' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }

var COUPONS = { "GOLDEN15": { type: "percent", value: 15, minOrder: 999 }, "GS200": { type: "flat", value: 200, minOrder: 1499 }, "WELCOME10": { type: "percent", value: 10, minOrder: 0 } };

var PRODUCT_STORE_KEY = "glamour_products", ORDER_STORE_KEY = "glamour_orders";

function loadProducts() {
  var products;
  try { products = JSON.parse(localStorage.getItem(PRODUCT_STORE_KEY)); } catch(e) { products = null; }
  if (!products || !Array.isArray(products) || products.length === 0) {
    localStorage.setItem(PRODUCT_STORE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
    return JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
  }
  return products;
}

function saveProducts(p) { localStorage.setItem(PRODUCT_STORE_KEY, JSON.stringify(p)); }
function getCart() { try { return JSON.parse(localStorage.getItem("glamour_cart")) || []; } catch(e) { return []; } }
function saveCart(c) { localStorage.setItem("glamour_cart", JSON.stringify(c)); }
function loadOrders() { try { return JSON.parse(localStorage.getItem(ORDER_STORE_KEY)) || []; } catch(e) { return []; } }
function saveOrders(o) { localStorage.setItem(ORDER_STORE_KEY, JSON.stringify(o)); }
function addOrder(o) { var orders = loadOrders(); orders.unshift(o); saveOrders(orders); }
function isAdminLoggedIn() { return sessionStorage.getItem("glamour_admin") === "true"; }

function getWishlist() { try { return JSON.parse(localStorage.getItem("glamour_wishlist")) || []; } catch(e) { return []; } }
function toggleWishlist(id, e) { if (e) e.stopPropagation(); var w = getWishlist(); var idx = w.indexOf(id); if (idx > -1) w.splice(idx, 1); else w.push(id); localStorage.setItem("glamour_wishlist", JSON.stringify(w)); showToast(idx > -1 ? "Removed from wishlist" : "Added to wishlist ♡"); return idx === -1; }
function isWishlisted(id) { return getWishlist().indexOf(id) > -1; }

function getRecentlyViewed() { try { return JSON.parse(localStorage.getItem("glamour_recent")) || []; } catch(e) { return []; } }
function addRecentlyViewed(id) { var r = getRecentlyViewed(); r = r.filter(function(x) { return x !== id; }); r.unshift(id); if (r.length > 8) r = r.slice(0, 8); localStorage.setItem("glamour_recent", JSON.stringify(r)); }

function renderStars(r) {
  var full = Math.floor(r), half = r % 1 >= 0.25 && r % 1 < 0.75 ? 1 : 0, extra = r % 1 >= 0.75 ? 1 : 0;
  var s = ''; for (var i = 0; i < full + extra; i++) s += '★'; if (half) s += '½';
  for (var i = full + extra + half; i < 5; i++) s += '<span style="color:#ddd">★</span>';
  return s;
}

function getCartTotal() { return getCart().reduce(function(s, i) { return s + i.price * i.qty; }, 0); }
function getCartCount() { return getCart().reduce(function(s, i) { return s + i.qty; }, 0); }

function validateCoupon(code) {
  var c = COUPONS[code.toUpperCase()];
  if (!c) return { valid: false, message: "Invalid coupon code" };
  var subtotal = getCartTotal();
  if (subtotal < c.minOrder) return { valid: false, message: "Minimum order ₹" + c.minOrder + " required" };
  return { valid: true, coupon: c, code: code.toUpperCase() };
}

function applyCoupon(code, subtotal) {
  var c = COUPONS[code];
  if (!c) return 0;
  if (subtotal < c.minOrder) return 0;
  return c.type === "percent" ? subtotal * c.value / 100 : c.value;
}

function updateCartCount() {
  var count = getCartCount();
  document.querySelectorAll("#cart-count").forEach(function(el) {
    el.textContent = count;
    el.style.display = count > 0 ? "flex" : "none";
  });
}

/* ═══ MOBILE NAV ═══ */
function toggleMobileNav() {
  document.getElementById("mobile-nav").classList.toggle("show");
  document.getElementById("mobile-overlay").classList.toggle("show");
  document.body.style.overflow = document.getElementById("mobile-nav").classList.contains("show") ? "hidden" : "";
}
function closeMobileNav() {
  document.getElementById("mobile-nav").classList.remove("show");
  document.getElementById("mobile-overlay").classList.remove("show");
  document.body.style.overflow = "";
}
window.toggleMobileNav = toggleMobileNav;
window.closeMobileNav = closeMobileNav;
