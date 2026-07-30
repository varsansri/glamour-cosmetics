// Kanak Custom SVG Icons — all use currentColor for theme switching
var KANAK_ICONS = {
  truck: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
  returns: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',
  bunny: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c-2 0-4 2-4 5v3c0 3 2 5 4 5s4-2 4-5V8c0-3-2-5-4-5z"/><circle cx="9" cy="4" r="1.5"/><circle cx="15" cy="4" r="1.5"/><path d="M12 13v3c0 1-1 2-2 2"/><path d="M8 15c-2 0-3 1-3 2s1 2 3 2"/></svg>',
  india: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 12h8M12 8v8"/></svg>',
  bottle: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2h8M9 2v4.5c0 1.5-1 3-1 5.5v8c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-8c0-2.5-1-4-1-5.5V2"/></svg>',
  lipstick: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="8" width="10" height="12" rx="2"/><path d="M12 2v6M9 4h6M9 6h6"/></svg>',
  brush: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8 2 4 5 4 9c0 1.5.5 3 1.5 4L3 21l8-2.5c1 .5 2.5 1 4 1 4 0 7-3 7-7s-3-7-7-7z"/><circle cx="12" cy="9" r="3"/></svg>',
  gift: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="12" rx="1"/><path d="M12 8V20M3 14h18M12 2c-1.5 0-3 1.5-3 3s1.5 3 3 3c0-1.5 1.5-3 3-3s1.5-3 0-3z"/></svg>',
  star: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  starOutline: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  heart: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  heartOutline: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  sparkle: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5z"/></svg>',
  rose: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8 4 4 8 4 12c0 2 1 4 3 5.5C9 19 10 21 12 21s3-2 5-3.5c2-1.5 3-3.5 3-5.5 0-4-4-8-8-10z"/><circle cx="12" cy="12" r="3"/></svg>',
  drop: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
  leaf: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.5 2 2 6.5 2 12v5c0 3 2.5 5 5.5 5 2 0 3.5-1 4.5-2 1 1 2.5 2 4.5 2 3 0 5.5-2 5.5-5v-5c0-5.5-4.5-10-10-10z"/><path d="M12 2v20"/></svg>'
};

// Helper to get icon HTML with color
function icon(name, size) {
  var s = KANAK_ICONS[name];
  if (!s) return '';
  if (size) s = s.replace(/width="[^"]*"/, 'width="' + size + '"').replace(/height="[^"]*"/, 'height="' + size + '"');
  return s;
}
