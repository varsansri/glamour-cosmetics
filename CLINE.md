# Kanak Cosmetics — Ecommerce Site

## 🔒 DESIGN SOURCE — DO NOT CHANGE

The entire UI/design system is built on **[anon-ecommerce-website](https://github.com/codewithsadee/anon-ecommerce-website)** (1,600 stars, 2022) by `codewithsadee` — a pure HTML/CSS/JS ecommerce template. This is the SINGLE source of truth for all CSS classes, component structures, and visual patterns.

**This is the design the user chose and likes. Do NOT change it without explicit instruction.**

- **Anon repo:** https://github.com/codewithsadee/anon-ecommerce-website
- **Adapted for Kanak:** Gold accent (#C8963E) instead of salmon pink, INR currency, Indian cosmetics products

## Overview
Kanak (Sanskrit for "gold") is a cosmetic ecommerce site built with vanilla HTML/CSS/JS, hosted on GitHub Pages.

- **Live:** https://varsansri.github.io/glamour-cosmetics/
- **Repo:** https://github.com/varsansri/glamour-cosmetics
- **Admin:** `/admin/login.html` (password: `admin123`)
- **Brand slogan:** "Your skin is gold."
- **Environment:** Termux mobile app → Ubuntu proot-distro → GitHub Pages

## Tech Stack
- Pure HTML/CSS/JS (static site, no build tools)
- GitHub Pages hosting (`main` branch)
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
| `checkout.html` | Checkout — shipping address, payment method, Razorpay + COD |

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
| `track.html` | Order tracking (from localStorage) |
| `404.html` | Custom 404 page |

### Assets
| File | Purpose |
|------|---------|
| `css/style.css` | Main design system — Anon-based CSS with Kanak gold palette |
| `css/admin.css` | Admin panel styles |
| `js/products.js` | Product data (12 products), localStorage CRUD, INR formatter, coupons, wishlist, recently viewed |
| `js/cart.js` | Cart operations, coupon application, toast notifications |
| `js/app.js` | Product card rendering, shop filters, product detail, gallery, reviews |
| `js/admin.js` | Admin dashboard, chart, CRUD, bulk actions, CSV export |
| `sitemap.xml` | SEO sitemap |

### Admin
| File | Purpose |
|------|---------|
| `admin/index.html` | Dashboard — stats, chart, product/order tables, settings |
| `admin/login.html` | Admin login (password: admin123) |

## Anon Design System — Complete Guide

### CSS Design Tokens
```css
--salmon-pink: hsl(35,53%,51%);     /* Kanak gold #C8963E */
--eerie-black: hsl(0,0%,13%);       /* Dark bg, footer */
--onyx: hsl(0,0%,27%);              /* Nav text */
--sonic-silver: hsl(0,0%,47%);      /* Secondary text */
--spanish-gray: hsl(0,0%,60%);      /* Muted text */
--cultured: hsl(0,0%,93%);          /* Borders, light bg */
--ocean-green: hsl(155,49%,50%);    /* Success badges */
--bittersweet: hsl(0,100%,68%);     /* Error, count badges */
--sandy-brown: hsl(44,80%,58%);     /* Star ratings */
--fs-1 to --fs-11                   /* Font scale (25px → 10px) */
--weight-300 to --weight-700         /* Font weights */
--radius-sm: 5px; --radius-md: 10px  /* Border radius */
--transition: 0.2s ease
```

### Container Sizes
- Default: fluid (15px padding)
- 768px: max-width 750px
- 1024px: max-width 980px
- 1200px: max-width 1200px
- 1400px: max-width 1350px

### Product Grid Breakpoints
- Default (mobile): 1 column
- 480px+: 2 columns
- 1024px+: 3 columns
- 1200px+: 4 columns

### All CSS Classes (source of truth)
```
header: .header-top, .header-main, .header-logo, .header-search-container, .search-field, .search-btn, .header-user-actions, .action-btn, .count, .hamburger
desktop nav: .desktop-navigation-menu, .desktop-menu-category-list, .menu-category, .menu-title
mobile nav: .mobile-navigation-menu, .mobile-bottom-navigation, .overlay, .menu-top, .menu-close-btn, .mobile-menu-category-list, .accordion-menu, .submenu-category-list
hero: .banner, .slider-container, .slider-item, .banner-img, .banner-content, .banner-subtitle, .banner-title, .banner-text, .banner-btn
categories: .category, .category-item-container, .category-item, .category-img-box, .category-content-box, .category-content-flex, .category-item-title, .category-btn
product cards: .showcase, .showcase-banner, .showcase-badge, .showcase-actions, .btn-action, .showcase-content, .showcase-category, .showcase-title, .showcase-rating, .price-box, .price, .add-cart-btn
featured: .product-featured, .showcase-wrapper, .showcase-container, .showcase-status, .showcase-status-bar, .countdown-box, .countdown, .countdown-content, .display-number, .display-text
sections: .title, .product-grid, .newsletter, .newsletter-header, .newsletter-title, .newsletter-desc, .newsletter-form, .promo
footer: .footer-nav, .footer-nav-list, .nav-title, .footer-nav-item, .footer-nav-link, .footer-bottom, .copyright
toast/modal: .toast, .modal, .modal-content
```

### Products
12 products across 4 categories (skincare, makeup, tools, sets)
Price range: ₹1,599 to ₹10,999
Images: Unsplash hosted

## Features
- Product catalog with search + category filter
- Product detail with image gallery, shade selection, reviews
- Shopping cart with qty controls, coupon codes (GOLDEN15, KANAK200, WELCOME10)
- Checkout with Razorpay + COD
- PIN code validation, shipping (Standard ₹49, Express ₹99, Free >₹999)
- Admin dashboard: product/order CRUD, revenue chart, CSV export, bulk actions
- Wishlist (localStorage), Recently viewed, Customer reviews
- SEO meta tags + sitemap

## Mobile Responsive Fixes
- body padding-bottom for bottom nav bar
- 2-column product grid on all phones
- Product detail stacks to single column
- Cart items wrap on small screens
- Newsletter stacks vertically
- Checkout stacks to single column
- Footer 2-column grid on mobile

## Known Limitations
- No backend — localStorage only
- Admin password in client-side code
- Razorpay test key (rzp_test_SRossAV0KomF8P)
- WhatsApp number placeholder (919XXXXXXXXX)
- Coupon validation is client-side only
