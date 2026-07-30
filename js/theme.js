// ═══════════════════════════════════════════
// Kanak — Color Theme Switcher
// 6 skin care palettes, localStorage persisted
// ═══════════════════════════════════════════

var KANAK_THEMES = {
  "saffron": {
    name: "Saffron & Sand",
    emoji: "🧡",
    css: {
      "--salmon-pink": "hsl(18,70%,55%)",
      "--eerie-black": "hsl(20,40%,12%)",
      "--onyx": "hsl(20,30%,27%)",
      "--sonic-silver": "hsl(20,20%,47%)",
      "--cultured": "hsl(25,30%,94%)"
    }
  },
  "indigo": {
    name: "Indigo & Clay",
    emoji: "💙",
    css: {
      "--salmon-pink": "hsl(225,45%,40%)",
      "--eerie-black": "hsl(235,40%,12%)",
      "--onyx": "hsl(230,25%,27%)",
      "--sonic-silver": "hsl(225,15%,47%)",
      "--cultured": "hsl(30,20%,94%)"
    }
  },
  "rose": {
    name: "Rose & Pearl",
    emoji: "🩷",
    css: {
      "--salmon-pink": "hsl(8,35%,60%)",
      "--eerie-black": "hsl(15,30%,25%)",
      "--onyx": "hsl(10,20%,40%)",
      "--sonic-silver": "hsl(10,15%,55%)",
      "--cultured": "hsl(0,25%,95%)"
    }
  },
  "teal": {
    name: "Teal & Brass",
    emoji: "🩵",
    css: {
      "--salmon-pink": "hsl(182,70%,28%)",
      "--eerie-black": "hsl(185,50%,12%)",
      "--onyx": "hsl(185,30%,27%)",
      "--sonic-silver": "hsl(180,15%,47%)",
      "--cultured": "hsl(175,20%,94%)"
    }
  },
  "amber": {
    name: "Amber & Bone",
    emoji: "🤎",
    css: {
      "--salmon-pink": "hsl(28,55%,48%)",
      "--eerie-black": "hsl(20,30%,12%)",
      "--onyx": "hsl(20,25%,27%)",
      "--sonic-silver": "hsl(20,15%,47%)",
      "--cultured": "hsl(30,15%,94%)"
    }
  },
  "plum": {
    name: "Plum & Brass",
    emoji: "💜",
    css: {
      "--salmon-pink": "hsl(325,35%,32%)",
      "--eerie-black": "hsl(320,30%,14%)",
      "--onyx": "hsl(320,20%,30%)",
      "--sonic-silver": "hsl(315,12%,50%)",
      "--cultured": "hsl(330,15%,95%)"
    }
  },
  "gold": {
    name: "GScosmatics Gold",
    emoji: "✨",
    css: {
      "--salmon-pink": "hsl(35,53%,51%)",
      "--eerie-black": "hsl(0,0%,13%)",
      "--onyx": "hsl(0,0%,27%)",
      "--sonic-silver": "hsl(0,0%,47%)",
      "--cultured": "hsl(0,0%,93%)"
    }
  }
};

var KANAK_CURRENT_THEME = localStorage.getItem("kanak_theme") || "gold";

function applyTheme(key) {
  var theme = KANAK_THEMES[key];
  if (!theme) return;
  KANAK_CURRENT_THEME = key;
  localStorage.setItem("kanak_theme", key);
  
  var root = document.documentElement;
  for (var prop in theme.css) {
    root.style.setProperty(prop, theme.css[prop]);
  }
  
  // Update active state on swatches
  document.querySelectorAll(".theme-swatch").forEach(function(b) {
    b.classList.toggle("active", b.dataset.theme === key);
  });
  // Update emoji on toggle button  
  var emoji = document.getElementById("theme-emoji");
  if (emoji) emoji.textContent = theme.emoji;
}

function toggleThemePicker() {
  var panel = document.getElementById("theme-picker-panel");
  if (panel) panel.classList.toggle("show");
}

// Create and inject theme picker UI
function initThemePicker() {
  // Apply saved theme first
  applyTheme(KANAK_CURRENT_THEME);
  
  var cur = KANAK_THEMES[KANAK_CURRENT_THEME];
  var html = '<div class="theme-picker-container">';
  html += '<button class="theme-toggle-btn" onclick="toggleThemePicker()" title="Change color theme"><span id="theme-emoji">' + cur.emoji + '</span></button>';
  html += '<div class="theme-picker-panel" id="theme-picker-panel">';
  html += '<div class="theme-picker-header"><span style="font-size:16px">🎨</span><button onclick="toggleThemePicker()">✕</button></div>';
  html += '<div class="theme-swatches" style="display:flex;flex-wrap:wrap;justify-content:center;max-width:200px">';
  
  for (var key in KANAK_THEMES) {
    var t = KANAK_THEMES[key];
    var active = key === KANAK_CURRENT_THEME ? ' active' : '';
    html += '<button class="theme-swatch' + active + '" data-theme="' + key + '" onclick="applyTheme(\'' + key + '\')" title="' + t.name + '">';
    html += '<span class="swatch-color" style="background:' + t.css["--salmon-pink"] + '"></span>';
    html += '</button>';
  }
  
  html += '</div></div></div>';
  
  var container = document.createElement("div");
  container.innerHTML = html;
  document.body.appendChild(container.firstElementChild);
}

// Add CSS for theme picker
function injectThemeCSS() {
  var style = document.createElement("style");
  style.textContent = ''
    + '.theme-picker-container{position:fixed;right:16px;bottom:140px;z-index:200;display:flex;flex-direction:column;align-items:flex-end;gap:8px}'
    + '@media(min-width:1024px){.theme-picker-container{bottom:40px}}'
    + '.theme-toggle-btn{width:48px;height:48px;border-radius:50%;background:var(--white);border:2px solid var(--cultured);box-shadow:0 4px 16px rgba(0,0,0,.12);cursor:pointer;font-size:22px;display:flex;align-items:center;justify-content:center;transition:all .2s;z-index:2}'
    + '.theme-toggle-btn:hover{transform:scale(1.08);box-shadow:0 6px 20px rgba(0,0,0,.18)}'
    + '.theme-picker-panel{background:var(--white);border-radius:14px;box-shadow:0 8px 40px rgba(0,0,0,.15);padding:12px;display:none;width:auto;text-align:center}'
    + '.theme-picker-panel.show{display:block;animation:themeSlideIn .25s ease}'
    + '@keyframes themeSlideIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}'
    + '.theme-picker-header{display:flex;justify-content:space-between;align-items:center;font-size:13px;font-weight:600;color:var(--eerie-black);margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid var(--cultured)}'
    + '.theme-picker-header button{background:none;border:none;font-size:14px;cursor:pointer;color:var(--sonic-silver);padding:2px 6px}'
    + '.theme-swatch{display:inline-flex;align-items:center;justify-content:center;padding:6px;border:none;background:none;cursor:pointer;border-radius:50%;transition:all .15s;margin:3px}'
    + '.theme-swatch:hover{background:var(--cultured)}'
    + '.theme-swatch.active{background:var(--salmon-pink)}'
    + '.theme-swatch.active .swatch-color{border-color:var(--white)}'
    + '.swatch-color{width:30px;height:30px;border-radius:50%;flex-shrink:0;border:2px solid var(--cultured);transition:border-color .15s}'
    + '.swatch-name{font-size:12px;font-weight:500}'
  ;
  document.head.appendChild(style);
}

// Init on DOM ready
document.addEventListener("DOMContentLoaded", function() {
  injectThemeCSS();
  setTimeout(initThemePicker, 200); // slight delay to ensure body exists
});
