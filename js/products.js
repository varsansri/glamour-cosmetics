const DEFAULT_PRODUCTS = [
  {
    id: "rose-gold-serum",
    name: "Rose Gold Radiance Serum",
    category: "skincare",
    price: 4199,
    originalPrice: 5199,
    description: "A lightweight, fast-absorbing serum infused with 24k gold flakes and rosehip oil. Brightens skin tone, reduces fine lines, and delivers a luminous glow. Suitable for all skin types.",
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop",
    stock: 85,
    featured: true,
    rating: 4.8,
    reviews: 234,
    ingredients: "Rosehip Oil, Vitamin C, Hyaluronic Acid, 24k Gold Flakes, Jojoba Oil, Vitamin E, Aloe Vera Extract",
    howToUse: "Apply 3-4 drops to clean, damp skin morning and evening. Gently press into face and neck. Follow with moisturizer.",
    badge: "Best Seller"
  },
  {
    id: "velvet-matte-lipstick",
    name: "Velvet Matte Lipstick",
    category: "makeup",
    price: 1999,
    originalPrice: null,
    description: "Creamy, highly pigmented matte lipstick that glides on smoothly and stays put for up to 12 hours. Infused with vitamin E to keep lips hydrated all day.",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop",
    stock: 120,
    featured: true,
    rating: 4.6,
    reviews: 189,
    ingredients: "Vitamin E, Shea Butter, Jojoba Oil, Caprylic Triglyceride, Candelilla Wax",
    howToUse: "Apply directly to lips or use with a lip liner for a precise finish. Blot gently for a softer look.",
    colors: ["Ruby Kiss", "Rose Nude", "Berry Crush", "Coral Dream", "Wine Hour"],
    badge: null
  },
  {
    id: "diamond-glow-highlighter",
    name: "Diamond Glow Highlighter",
    category: "makeup",
    price: 2899,
    originalPrice: 3499,
    description: "Ultra-fine, light-reflecting highlighter that creates a stunning diamond-like shimmer. Buildable formula for a natural to blinding glow.",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop",
    stock: 64,
    featured: true,
    rating: 4.9,
    reviews: 312,
    ingredients: "Mica, Squalane, Vitamin E, Silica, Pearl Powder, Diamond Powder",
    howToUse: "Apply to the high points of your face — cheekbones, brow bone, and cupid's bow. Use a fan brush for subtle glow or a dense brush for maximum impact.",
    colors: ["Champagne Diamond", "Rose Quartz", "Golden Pearl", "Silver Frost"],
    badge: "Top Rated"
  },
  {
    id: "silk-foundation-spf30",
    name: "Silk Foundation SPF 30",
    category: "makeup",
    price: 3599,
    originalPrice: 4599,
    description: "A medium-coverage, buildable foundation with a natural satin finish. Broad-spectrum SPF 30 protection combined with skincare benefits for a flawless complexion.",
    image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400&h=400&fit=crop",
    stock: 93,
    featured: true,
    rating: 4.5,
    reviews: 178,
    ingredients: "SPF 30 (Zinc Oxide), Hyaluronic Acid, Niacinamide, Squalane, Glycerin, Vitamin E",
    howToUse: "Shake well. Apply 1-2 pumps to moisturized face using fingertips, brush, or sponge. Blend outward for even coverage.",
    colors: ["Porcelain", "Ivory", "Sand", "Warm Beige", "Golden", "Deep Tan", "Espresso"],
    badge: null
  },
  {
    id: "crystal-eye-palette",
    name: "Crystal Dream Eye Palette",
    category: "makeup",
    price: 4899,
    originalPrice: null,
    description: "12 highly pigmented shades in a mix of mattes, shimmers, and metallics. From everyday neutrals to bold glam, this palette has it all.",
    image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=400&h=400&fit=crop",
    stock: 45,
    featured: false,
    rating: 4.7,
    reviews: 423,
    ingredients: "Talc, Mica, Dimethicone, Zinc Stearate, Caprylyl Glycol, Vitamin E",
    howToUse: "Use lighter shades as base and transition colors. Apply deeper shades to the crease and outer corner. Pat shimmer shades onto center of lid.",
    badge: null
  },
  {
    id: "pearl-radiance-cream",
    name: "Pearl Radiance Face Cream",
    category: "skincare",
    price: 5399,
    originalPrice: 6499,
    description: "A rich, luxurious face cream infused with crushed pearl powder and marine collagen. Deeply nourishes, firms, and restores skin's natural luminosity.",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
    stock: 38,
    featured: true,
    rating: 4.9,
    reviews: 156,
    ingredients: "Pearl Powder, Marine Collagen, Squalane, Ceramides, Peptides, Niacinamide, Green Tea Extract",
    howToUse: "Apply a pea-sized amount to clean face and neck morning and evening. Gently massage in upward circular motions.",
    badge: "Premium"
  },
  {
    id: "midnight-mascara",
    name: "Midnight Volume Mascara",
    category: "makeup",
    price: 2399,
    originalPrice: null,
    description: "Dramatic volume and length with our unique hourglass-shaped wand. Smudge-proof, flake-proof, and lasts all day without clumping.",
    image: "https://images.unsplash.com/photo-1583241800698-3b7f4b51cebf?w=400&h=400&fit=crop",
    stock: 150,
    featured: false,
    rating: 4.4,
    reviews: 567,
    ingredients: "Beeswax, Carnauba Wax, Panthenol, Biotin, Castor Oil, Vitamin E",
    howToUse: "Wiggle the wand from root to tip. Layer for more volume. Use the tip of the wand for lower lashes and hard-to-reach corners.",
    badge: null
  },
  {
    id: "hydra-lip-gloss",
    name: "Hydra Plump Lip Gloss",
    category: "makeup",
    price: 1599,
    originalPrice: 1999,
    description: "Non-sticky, high-shine lip gloss with a subtle plumping effect. Infused with hyaluronic acid and peptides for visibly fuller, hydrated lips.",
    image: "https://images.unsplash.com/photo-1632169893949-70273471c237?w=400&h=400&fit=crop",
    stock: 200,
    featured: true,
    rating: 4.3,
    reviews: 345,
    ingredients: "Hyaluronic Acid, Peptides, Vitamin E, Jojoba Oil, Shea Butter",
    howToUse: "Apply directly to lips. Wear alone for a glossy look or layer over lipstick for extra dimension.",
    colors: ["Clear", "Pink Sugar", "Peach Fizz", "Berry Glaze"],
    badge: null
  },
  {
    id: "retinol-night-elixir",
    name: "Retinol Night Elixir",
    category: "skincare",
    price: 5999,
    originalPrice: null,
    description: "Advanced retinol treatment that works overnight to smooth fine lines, even skin tone, and refine texture. Time-release technology minimizes irritation.",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=400&h=400&fit=crop",
    stock: 52,
    featured: false,
    rating: 4.7,
    reviews: 198,
    ingredients: "Retinol (0.5%), Bakuchiol, Peptides, Ceramides, Niacinamide, Squalane",
    howToUse: "Apply 1 pump to clean, dry face in the evening. Start with 2-3 times per week and gradually increase to nightly use. Always use SPF during the day.",
    badge: null
  },
  {
    id: "bamboo-brush-set",
    name: "Bamboo Pro Brush Set",
    category: "tools",
    price: 7499,
    originalPrice: 9999,
    description: "A complete 15-piece professional brush set with sustainable bamboo handles and ultra-soft synthetic bristles. Includes a stylish carrying case.",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
    stock: 30,
    featured: false,
    rating: 4.8,
    reviews: 89,
    ingredients: "Bamboo handles, synthetic Taklon bristles, recycled aluminum ferrules",
    howToUse: "Includes: Powder, Foundation, Concealer, Blush, Contour, Highlighter, Eye Shadow (4), Blending (2), Angled Liner, Brow, and Lip brush.",
    badge: null
  },
  {
    id: "glow-gift-set",
    name: "Ultimate Glow Gift Set",
    category: "sets",
    price: 10999,
    originalPrice: 14999,
    description: "The perfect gift for any beauty lover. Includes our best-selling Rose Gold Serum, Diamond Glow Highlighter, Hydra Lip Gloss, and a limited-edition makeup bag.",
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400&h=400&fit=crop",
    stock: 25,
    featured: true,
    rating: 5.0,
    reviews: 67,
    ingredients: "See individual products",
    howToUse: "Includes: Rose Gold Serum (30ml), Diamond Glow Highlighter in Champagne, Hydra Lip Gloss in Pink Sugar, Limited Edition Velvet Makeup Bag.",
    badge: "Gift Set"
  },
  {
    id: "cleansing-balm",
    name: "Botanical Cleansing Balm",
    category: "skincare",
    price: 2999,
    originalPrice: null,
    description: "A silky cleansing balm that melts away makeup, sunscreen, and impurities. Transforms from balm to oil to milk for the most satisfying cleanse.",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4ee2e17?w=400&h=400&fit=crop",
    stock: 78,
    featured: false,
    rating: 4.6,
    reviews: 234,
    ingredients: "Moringa Oil, Sunflower Seed Oil, Shea Butter, Camellia Oil, Vitamin E, Chamomile Extract",
    howToUse: "Scoop a small amount and massage onto dry skin. Add water to emulsify, then rinse thoroughly. Use as the first step in your double cleanse.",
    badge: null
  }
];

const PRODUCT_STORE_KEY = "glamour_products";
const ORDER_STORE_KEY = "glamour_orders";

function loadProducts() {
  let products;
  try {
    const stored = localStorage.getItem(PRODUCT_STORE_KEY);
    products = stored ? JSON.parse(stored) : null;
  } catch (e) { products = null; }
  if (!products || !Array.isArray(products) || products.length === 0) {
    localStorage.setItem(PRODUCT_STORE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
    return [...DEFAULT_PRODUCTS];
  }
  return products;
}

function saveProducts(products) { localStorage.setItem(PRODUCT_STORE_KEY, JSON.stringify(products)); }

function getCart() { try { return JSON.parse(localStorage.getItem("glamour_cart")) || []; } catch(e) { return []; } }
function saveCart(cart) { localStorage.setItem("glamour_cart", JSON.stringify(cart)); }

function loadOrders() { try { return JSON.parse(localStorage.getItem(ORDER_STORE_KEY)) || []; } catch(e) { return []; } }
function saveOrders(orders) { localStorage.setItem(ORDER_STORE_KEY, JSON.stringify(orders)); }
function addOrder(order) { const orders = loadOrders(); orders.unshift(order); saveOrders(orders); }
function isAdminLoggedIn() { return sessionStorage.getItem("glamour_admin") === "true"; }

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.25 && rating % 1 < 0.75 ? 1 : 0;
  const extra = rating % 1 >= 0.75 ? 1 : 0;
  let html = '';
  for (let i = 0; i < full + extra; i++) html += '★';
  if (half) html += '½';
  const shown = full + extra + half;
  for (let i = shown; i < 5; i++) html += '<span style=\"color:#ddd\">★</span>';
  return html;
}

function getCartTotal() { return getCart().reduce((s, i) => s + i.price * i.qty, 0); }
function getCartCount() { return getCart().reduce((s, i) => s + i.qty, 0); }
