const DEFAULT_PRODUCTS = [
  {
    id: "rose-gold-serum",
    name: "Rose Gold Radiance Serum",
    category: "skincare",
    price: 49.99,
    originalPrice: 62.00,
    description: "A lightweight, fast-absorbing serum infused with 24k gold flakes and rosehip oil. Brightens skin tone, reduces fine lines, and delivers a luminous glow. Suitable for all skin types.",
    image: "🧴",
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
    price: 24.99,
    originalPrice: null,
    description: "Creamy, highly pigmented matte lipstick that glides on smoothly and stays put for up to 12 hours. Infused with vitamin E to keep lips hydrated all day.",
    image: "💄",
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
    price: 34.99,
    originalPrice: 42.00,
    description: "Ultra-fine, light-reflecting highlighter that creates a stunning diamond-like shimmer. Buildable formula for a natural to blinding glow.",
    image: "✨",
    stock: 64,
    featured: true,
    rating: 4.9,
    reviews: 312,
    ingredients: "Mica, Squalane, Vitamin E, Silica, Pearl Powder, Diamond Powder",
    howToUse: "Apply to the high points of your face - cheekbones, brow bone, and cupid's bow. Use a fan brush for a subtle glow or a dense brush for maximum impact.",
    colors: ["Champagne Diamond", "Rose Quartz", "Golden Pearl", "Silver Frost"],
    badge: "Top Rated"
  },
  {
    id: "silk-foundation-spf30",
    name: "Silk Foundation SPF 30",
    category: "makeup",
    price: 42.99,
    originalPrice: 55.00,
    description: "A medium-coverage, buildable foundation with a natural satin finish. Broad-spectrum SPF 30 protection combined with skincare benefits for a flawless complexion.",
    image: "🫙",
    stock: 93,
    featured: true,
    rating: 4.5,
    reviews: 178,
    ingredients: "SPF 30 (Zinc Oxide), Hyaluronic Acid, Niacinamide, Squalane, Glycerin, Vitamin E",
    howToUse: "Shake well. Apply 1-2 pumps to moisturized face using fingertips, brush, or sponge. Blend outward for even coverage. Build layers for more coverage.",
    colors: ["Porcelain", "Ivory", "Sand", "Warm Beige", "Golden", "Deep Tan", "Espresso"],
    badge: null
  },
  {
    id: "crystal-eye-palette",
    name: "Crystal Dream Eye Palette",
    category: "makeup",
    price: 58.99,
    originalPrice: null,
    description: "12 highly pigmented shades in a mix of mattes, shimmers, and metallics. From everyday neutrals to bold glam, this palette has it all.",
    image: "🎨",
    stock: 45,
    featured: false,
    rating: 4.7,
    reviews: 423,
    ingredients: "Talc, Mica, Dimethicone, Zinc Stearate, Caprylyl Glycol, Vitamin E",
    howToUse: "Use lighter shades as base and transition colors. Apply deeper shades to the crease and outer corner. Pat shimmer shades onto the center of the lid with a flat brush or fingertip.",
    badge: null
  },
  {
    id: "pearl-radiance-cream",
    name: "Pearl Radiance Face Cream",
    category: "skincare",
    price: 64.99,
    originalPrice: 78.00,
    description: "A rich, luxurious face cream infused with crushed pearl powder and marine collagen. Deeply nourishes, firms, and restores skin's natural luminosity.",
    image: "🦪",
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
    price: 28.99,
    originalPrice: null,
    description: "Dramatic volume and length with our unique hourglass-shaped wand. Smudge-proof, flake-proof, and lasts all day without clumping.",
    image: "🖤",
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
    price: 18.99,
    originalPrice: 24.00,
    description: "Non-sticky, high-shine lip gloss with a subtle plumping effect. Infused with hyaluronic acid and peptides for visibly fuller, hydrated lips.",
    image: "💋",
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
    price: 72.99,
    originalPrice: null,
    description: "Advanced retinol treatment that works overnight to smooth fine lines, even skin tone, and refine texture. Time-release technology minimizes irritation.",
    image: "🌙",
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
    price: 89.99,
    originalPrice: 120.00,
    description: "A complete 15-piece professional brush set with sustainable bamboo handles and ultra-soft synthetic bristles. Includes a stylish carrying case.",
    image: "🪥",
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
    price: 129.99,
    originalPrice: 175.00,
    description: "The perfect gift for any beauty lover. Includes our best-selling Rose Gold Serum, Diamond Glow Highlighter, Hydra Lip Gloss, and a limited-edition makeup bag.",
    image: "🎁",
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
    price: 36.99,
    originalPrice: null,
    description: "A silky cleansing balm that melts away makeup, sunscreen, and impurities. Transforms from balm to oil to milk for the most satisfying cleanse.",
    image: "🫧",
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
  const stored = localStorage.getItem(PRODUCT_STORE_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(PRODUCT_STORE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
  return DEFAULT_PRODUCTS;
}

function saveProducts(products) {
  localStorage.setItem(PRODUCT_STORE_KEY, JSON.stringify(products));
}

function getCart() {
  const stored = localStorage.getItem("glamour_cart");
  return stored ? JSON.parse(stored) : [];
}

function saveCart(cart) {
  localStorage.setItem("glamour_cart", JSON.stringify(cart));
}

function loadOrders() {
  const stored = localStorage.getItem(ORDER_STORE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveOrders(orders) {
  localStorage.setItem(ORDER_STORE_KEY, JSON.stringify(orders));
}

function addOrder(order) {
  const orders = loadOrders();
  orders.unshift(order);
  saveOrders(orders);
}

function isAdminLoggedIn() {
  return sessionStorage.getItem("glamour_admin") === "true";
}
