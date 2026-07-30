function getQueryParam(p){return new URL(window.location.href).searchParams.get(p)}

function renderProductCard(product){
  var d=product.originalPrice?Math.round((1-product.price/product.originalPrice)*100):0;
  var w=isWishlisted(product.id)?'♥':'♡';
  return '<div class="showcase" onclick="location.href=\'product.html?id='+product.id+'\'">'+
    '<div class="showcase-banner">'+
      '<img src="'+product.image+'" alt="'+product.name+'" loading="lazy" onerror="this.style.display=\'none\'">'+
      (product.badge?'<p class="showcase-badge'+(product.badge==='Premium'?' black':'')+(product.badge==='Gift Set'?' pink':'')+'">'+product.badge+'</p>':'')+
      '<div class="showcase-actions">'+
        '<button class="btn-action" onclick="event.stopPropagation();var a=toggleWishlist(\''+product.id+'\',event);this.innerHTML=a?\'<ion-icon name=heart></ion-icon>\':\'<ion-icon name=heart-outline></ion-icon>\'" title="Wishlist"><ion-icon name="'+(w==='♥'?'heart':'heart-outline')+'"></ion-icon></button>'+
        '<button class="btn-action" onclick="event.stopPropagation();addToCart(\''+product.id+'\')" title="Add to Cart"><ion-icon name="bag-add-outline"></ion-icon></button>'+
      '</div>'+
    '</div>'+
    '<div class="showcase-content">'+
      '<a href="products.html?cat='+product.category+'" class="showcase-category">'+product.category+'</a>'+
      '<a href="product.html?id='+product.id+'"><h3 class="showcase-title">'+product.name+'</h3></a>'+
      '<div class="showcase-rating">'+renderStars(product.rating)+'<span>('+product.reviews+')</span></div>'+
      '<div class="price-box"><p class="price">'+formatINR(product.price)+'</p>'+(product.originalPrice?'<del>'+formatINR(product.originalPrice)+'</del>':'')+'</div>'+
      '<button class="add-cart-btn" onclick="event.stopPropagation();addToCart(\''+product.id+'\')">Add to Cart</button>'+
    '</div></div>';
}

function renderProductCardPlain(product){
  return '<div class="showcase" onclick="location.href=\'product.html?id='+product.id+'\'">'+
    '<div class="showcase-banner"><img src="'+product.image+'" alt="'+product.name+'" loading="lazy" onerror="this.style.display=\'none\'">'+
    (product.badge?'<p class="showcase-badge'+(product.badge==='Premium'?' black':'')+'">'+product.badge+'</p>':'')+
    '</div>'+
    '<div class="showcase-content">'+
      '<a href="products.html?cat='+product.category+'" class="showcase-category">'+product.category+'</a>'+
      '<a href="product.html?id='+product.id+'"><h3 class="showcase-title">'+product.name+'</h3></a>'+
      '<div class="showcase-rating">'+renderStars(product.rating)+'<span>('+product.reviews+')</span></div>'+
      '<div class="price-box"><p class="price">'+formatINR(product.price)+'</p>'+(product.originalPrice?'<del>'+formatINR(product.originalPrice)+'</del>':'')+'</div>'+
      '<button class="add-cart-btn" onclick="event.stopPropagation();addToCart(\''+product.id+'\')">Add to Cart</button>'+
    '</div></div>';
}

function renderFeaturedProducts(){
  var g=document.getElementById("featured-products");if(!g)return;
  g.innerHTML=loadProducts().filter(function(p){return p.featured}).slice(0,8).map(renderProductCard).join("");
}

function initShopPage(){
  var g=document.getElementById("product-grid");if(!g)return;
  var c=getQueryParam("cat"),q=getQueryParam("q");
  if(c){var r=document.querySelector('input[name="cat"][value="'+c+'"]');if(r)r.checked=true}
  if(q){var s=document.getElementById("search");if(s)s.value=q}
  applyFilters();
}

function applyFilters(){
  var g=document.getElementById("product-grid");if(!g)return;
  var countEl=document.getElementById("results-count");
  var products=loadProducts();
  var c=document.querySelector('input[name="cat"]:checked'),p=document.querySelector('input[name="price"]:checked'),sort=document.getElementById("sort"),search=document.getElementById("search");
  var cat=c?c.value:"all",price=p?p.value:"all",sv=sort?sort.value:"featured",sq=search?search.value.toLowerCase():"";
  if(cat!=="all")products=products.filter(function(p){return p.category===cat});
  if(price!=="all"){
    if(price==="under2500")products=products.filter(function(p){return p.price<2500});
    else if(price==="2500-5000")products=products.filter(function(p){return p.price>=2500&&p.price<=5000});
    else if(price==="5000-10000")products=products.filter(function(p){return p.price>5000&&p.price<=10000});
    else if(price==="over10000")products=products.filter(function(p){return p.price>10000});
  }
  if(sq)products=products.filter(function(p){return p.name.toLowerCase().indexOf(sq)!==-1||p.description.toLowerCase().indexOf(sq)!==-1});
  if(sv==="price-low")products.sort(function(a,b){return a.price-b.price});
  else if(sv==="price-high")products.sort(function(a,b){return b.price-a.price});
  else if(sv==="rating")products.sort(function(a,b){return b.rating-a.rating});
  else if(sv==="name")products.sort(function(a,b){return a.name.localeCompare(b.name)});
  if(countEl)countEl.textContent=products.length+' product'+(products.length!==1?'s':'');
  g.innerHTML=products.length===0?'<div class="empty-results" style="grid-column:1/-1;text-align:center;padding:60px"><p class="showcase-title" style="font-size:1.2rem">No products found</p><p style="color:var(--sonic-silver);font-size:var(--fs-7)">Try adjusting your search or filters</p></div>':products.map(renderProductCardPlain).join("");
  if(document.getElementById("shop-product-grid"))document.getElementById("shop-product-grid").innerHTML=products.map(renderProductCardPlain).join("");
}

window.applyFilters=applyFilters;

document.addEventListener("DOMContentLoaded",function(){
  renderFeaturedProducts();initShopPage();
});
