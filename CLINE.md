# Kanak Cosmetics — Ecommerce Site

## Overview
Kanak (Sanskrit for "gold") is a cosmetic ecommerce site built with vanilla HTML/CSS/JS, hosted on GitHub Pages.

- **Live:** https://varsansri.github.io/glamour-cosmetics/
- **Repo:** https://github.com/varsansri/glamour-cosmetics
- **Admin:** `/admin/login.html` (password: `admin123`)
- **Brand slogan:** "Your skin is gold."

## Tech Stack
- Pure HTML/CSS/JS (static site, no build tools)
- GitHub Pages hosting (`glamour-cosmetics` repo, `main` branch)
- Ionicons v5.5.2 for icons (CDN)
- Poppins font (Google Fonts CDN)
- Razorpay for payments (test mode)
- localStorage for cart, products, orders, wishlist, reviews persistence
- sessionStorage for admin auth

## File Map

### Core Pages
| File | Purpose |
|------|---------|
| `index.html` | Homepage — hero slider, categories, featured products, deal of day, newsletter |
| `products.html` | Product catalog — category chips, search, 1→2→3→4 column grid |
| `product.html` | Product detail — image gallery, shade selection, qty, reviews, recently viewed |
| `cart.html` | Shopping cart — items list, qty controls, coupons, order summary |
| `checkout.html` | Checkout — shipping address, payment method, Razorpay integration |

### Secondary Pages
| File | Purpose |
|------|---------|
| `about.html` | Brand story + values grid |
| `contact.html` | Contact form + email/phone/address |
| `faq.html` | Accordion-style FAQ |
| `privacy.html` | Privacy policy |
| `returns.html` | Return/refund policy |
| `shipping.html` | Shipping policy + delivery table |
| `terms.html` | Terms of service |
| `track.html` | Order tracking (lookup by ID + email from localStorage) |
| `404.html` | Custom 404 page |

### Assets
| File | Purpose |
|------|---------|
| `css/style.css` | **Main design system** — 450+ lines, Anon-based CSS with custom gold palette |
| `css/admin.css` | Admin panel styles — sidebar, tables, forms, modals |
| `js/products.js` | Product data (12 products), localStorage CRUD, INR formatter, coupon validator, wishlist, recently viewed, mobile nav toggle |
| `js/cart.js` | Cart operations, coupon application, toast notifications, cart count |
| `js/app.js` | Product card rendering, shop filters, product detail rendering, gallery, reviews, shade selection |
| `js/admin.js` | Admin dashboard, chart, product/order CRUD, bulk actions, CSV export |
| `sitemap.xml` | SEO sitemap |

### Admin
| File | Purpose |
|------|---------|
| `admin/index.html` | Dashboard — stats, revenue chart, product table, orders table, settings |
| `admin/login.html` | Admin login (password: admin123, stored in sessionStorage) |

## Design System (Anon-Based)

### CSS Variables
```css
--salmon-pink: hsl(35,53%,51%);    /* Brand gold #C8963E */
--eerie-black: hsl(0,0%,13%);      /* Primary dark */
--onyx: hsl(0,0%,27%);             /* Dark text */
--sonic-silver: hsl(0,0%,47%);     /* Secondary text */
--cultured: hsl(0,0%,93%);         /* Borders, bg */
--ocean-green: hsl(155,49%,50%);   /* Success */
--bittersweet: hsl(0,100%,68%);    /* Error/count badges */
--sandy-brown: hsl(44,80%,58%);    /* Star ratings */
```

### Font Scale
- `--fs-1` (25px) through `--fs-11` (10px), responsive at 768px/1400px
- Font: Poppins (300/400/500/600/700), fallback sans-serif

### Container Widths
- Default: fluid with 15px padding
- 768px: 750px, 1024px: 980px, 1200px: 1200px, 1400px: 1350px

### Product Grid Breakpoints
- Mobile (<480px): 2 columns
- 480px+: 2 columns  
- 1024px+: 3 columns
- 1200px+: 4 columns

### Product Cards (`.showcase`)
- Border: 1px var(--cultured), radius var(--radius-md)
- Banner: `aspect-ratio: 1`, image `object-fit: cover`, scale(1.05) on hover
- Action buttons: slide in from right on hover
- Badges: absolute top-left, variants: default (green), `.black`, `.pink`, `.angle`

### Navigation
- **Desktop (1024px+):** Top bar + header-main + horizontal mega-nav
- **Mobile (<1024px):** Hamburger → slide-out drawer + fixed bottom nav bar (Home, Cart, Menu, Grid)

## Products (12 total)
Categories: skincare, makeup, tools, sets
Price range: ₹1,599 to ₹10,999
Images: Unsplash hosted

## Features Implemented
- Product catalog with search + category filter
- Product detail with image gallery, shade selection, reviews
- Shopping cart with qty controls, coupon codes (GOLDEN15, KANAK200, WELCOME10)
- Checkout with Razorpay (test mode) + COD option
- PIN code validation, shipping options (Standard ₹49, Express ₹99, Free >₹999)
- Admin dashboard: CRUD products, manage orders, revenue chart, CSV export, bulk actions
- Wishlist (localStorage)
- Recently viewed products
- Customer reviews submission
- WhatsApp floating widget
- Back-to-top button
- Toast notifications
- SEO meta tags + sitemap

## Mobile Responsive Fixes Applied
- body padding-bottom for bottom nav bar
- 2-column product grid on all phones
- Product detail stacks to single column
- Cart items wrap on small screens
- Newsletter stacks vertically
- Checkout stacks to single column
- Banner text sizing reduced on mobile
- Category items 2-per-row on mobile
- Footer 2-column grid on mobile
- Mini-phone tweaks (<380px)

## Known Limitations
- No backend — localStorage only, no real auth
- Admin password in client-side code
- Razorpay test key (rzp_test_SRossAV0KomF8P)
- WhatsApp number placeholder (919XXXXXXXXX)
- Coupon validation is client-side only
