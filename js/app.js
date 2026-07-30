function getQueryParam(p){return new URL(window.location.href).searchParams.get(p)}

function renderProductCard(product){
  var d=product.originalPrice?Math.round((1-product.price/product.originalPrice)*100):0;
  return '<div class="showcase" onclick="location.href=\'product.html?id='+product.id+'\'">'+
    '<div class="showcase-banner">'+
      '<img src="'+product.image+'" alt="'+product.name+'" loading="lazy" onerror="this.style.display=\'none\'">'+
      (product.badge?'<p class="showcase-badge'+(product.badge==='Premium'?' black':'')+(product.badge==='Gift Set'?' pink':'')+'">'+product.badge+'</p>':'')+
      '<div class="showcase-actions">'+
        '<button class="btn-action" onclick="event.stopPropagation();var a=toggleWishlist(\''+product.id+'\',event);this.querySelector(\'ion-icon\').setAttribute(\'name\',a?\'heart\':\'heart-outline\')" title="Wishlist"><ion-icon name="'+(isWishlisted(product.id)?'heart':'heart-outline')+'"></ion-icon></button>'+
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
  g.innerHTML=products.length===0?'<div style="grid-column:1/-1;text-align:center;padding:60px"><p style="font-size:1.2rem;color:var(--eerie-black)">No products found</p><p style="color:var(--sonic-silver);font-size:var(--fs-7)">Try a different search</p></div>':products.map(renderProductCardPlain).join("");
}

function initProductDetail(){
  var id=getQueryParam("id");if(!id)return;
  var products=loadProducts();var product=products.find(function(p){return p.id===id});
  if(!product){document.getElementById("product-detail").innerHTML='<div class="container" style="padding:80px 0;text-align:center"><h2>Product not found</h2><a href="products.html" style="color:var(--salmon-pink)">Back to shop</a></div>';return}
  addRecentlyViewed(id);document.title=product.name+' - Kanak';
  var discount=product.originalPrice?Math.round((1-product.price/product.originalPrice)*100):0;
  var images=product.images&&product.images.length?product.images:[product.image];

  var galHtml='';
  for(var i=0;i<images.length;i++){
    galHtml+='<img src="'+images[i]+'" class="gallery-thumb-img" onclick="switchGallery('+i+')" style="width:60px;height:60px;object-fit:cover;border-radius:6px;cursor:pointer;border:2px solid '+(i===0?'var(--salmon-pink)':'transparent')+';opacity:'+(i===0?'1':'0.6')+'">';
  }

  var shadesHtml='';
  if(product.colors){
    shadesHtml='<div style="margin-bottom:15px"><p style="font-size:var(--fs-8);color:var(--eerie-black);font-weight:var(--weight-600);text-transform:uppercase;margin-bottom:8px">Shades</p><div style="display:flex;gap:8px;flex-wrap:wrap">';
    for(var j=0;j<product.colors.length;j++){
      shadesHtml+='<span class="color-tag-opt" onclick="selectVariant(this)" style="padding:6px 14px;border:1px solid '+(j===0?'var(--salmon-pink)':'var(--cultured)')+';border-radius:99px;cursor:pointer;font-size:var(--fs-9);color:'+(j===0?'var(--salmon-pink)':'var(--sonic-silver)')+'">'+product.colors[j]+'</span>';
    }
    shadesHtml+='</div></div>';
  }

  var reviewsHtml='<div style="margin-top:20px;padding-top:20px;border-top:1px solid var(--cultured)"><h4 style="font-size:var(--fs-7);color:var(--eerie-black);margin-bottom:10px">Customer Reviews ('+(product.reviews||0)+')</h4>';
  if(product.reviewsData&&product.reviewsData.length){
    for(var k=0;k<product.reviewsData.length;k++){var R=product.reviewsData[k];
      reviewsHtml+='<div style="padding:12px 0;border-bottom:1px solid var(--cultured)"><div style="display:flex;justify-content:space-between;margin-bottom:4px"><strong style="color:var(--eerie-black);font-size:var(--fs-9)">'+R.user+' <span style="color:#01AB31;font-size:10px">✓ Verified</span></strong><span style="color:var(--sonic-silver);font-size:var(--fs-10)">'+renderStars(R.rating)+' · '+R.date+'</span></div><p style="color:var(--sonic-silver);font-size:var(--fs-9)">'+R.comment+'</p></div>';
    }
  }else{reviewsHtml+='<p style="color:var(--sonic-silver);font-size:var(--fs-9)">No reviews yet. Be the first!</p>';}
  reviewsHtml+='<div style="margin-top:15px;background:var(--white);padding:15px;border:1px solid var(--cultured);border-radius:var(--radius-md)"><p style="font-size:var(--fs-8);color:var(--eerie-black);font-weight:var(--weight-600);margin-bottom:10px">Write a Review</p><div id="review-stars" style="display:flex;gap:4px;font-size:24px;cursor:pointer;margin-bottom:8px">'+[1,2,3,4,5].map(function(i){return '<span onclick="setReviewRating('+i+')" style="color:var(--sandy-brown)">☆</span>'}).join('')+'</div><input type="text" id="review-name" placeholder="Your name" style="width:100%;padding:8px 12px;border:1px solid var(--cultured);border-radius:var(--radius-sm);font-size:var(--fs-8);margin-bottom:8px"><textarea id="review-comment" rows="3" placeholder="Share your experience..." style="width:100%;padding:8px 12px;border:1px solid var(--cultured);border-radius:var(--radius-sm);font-size:var(--fs-8);margin-bottom:8px;resize:vertical"></textarea><button class="add-cart-btn" onclick="submitReview()" style="font-size:var(--fs-9);padding:8px 16px;width:auto">Submit Review</button></div></div>';

  document.getElementById("product-detail").innerHTML=
    '<div class="container" style="padding:40px 0">'+
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:50px;align-items:start">'+
    '<div>'+
      '<div style="position:relative;aspect-ratio:1;border-radius:var(--radius-md);overflow:hidden;border:1px solid var(--cultured)">'+
        '<img src="'+images[0]+'" id="gallery-main" style="width:100%;height:100%;object-fit:cover">'+
        (images.length>1?'<button onclick="galleryPrev()" style="position:absolute;left:10px;top:50%;transform:translateY(-50%);background:var(--white);border:none;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:18px;box-shadow:0 2px 8px rgba(0,0,0,.1);z-index:2">‹</button><button onclick="galleryNext()" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:var(--white);border:none;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:18px;box-shadow:0 2px 8px rgba(0,0,0,.1);z-index:2">›</button>':'')+
      '</div>'+
      (images.length>1?'<div style="display:flex;gap:8px;margin-top:12px">'+galHtml+'</div>':'')+
    '</div>'+
    '<div>'+
      '<h1 style="font-size:var(--fs-3);color:var(--eerie-black);margin-bottom:8px">'+product.name+'</h1>'+
      '<div class="showcase-rating" style="margin-bottom:10px">'+renderStars(product.rating)+'<span>'+product.rating+' ('+product.reviews+' reviews)</span></div>'+
      '<div class="price-box" style="margin-bottom:10px"><p class="price" style="font-size:var(--fs-3);color:var(--salmon-pink)">'+formatINR(product.price)+'</p>'+(product.originalPrice?'<del>'+formatINR(product.originalPrice)+'</del>':'')+(discount>0?'<span style="background:var(--ocean-green);color:var(--white);font-size:var(--fs-9);padding:2px 8px;border-radius:var(--radius-sm);margin-left:8px">Save '+discount+'%</span>':'')+'</div>'+
      '<p style="color:var(--sonic-silver);font-size:var(--fs-7);line-height:1.8;margin-bottom:20px">'+product.description+'</p>'+
      shadesHtml+
      '<div style="display:flex;align-items:center;gap:10px;margin-bottom:20px"><span style="font-size:var(--fs-8);color:var(--eerie-black)">Qty:</span><button onclick="changeQty(-1)" style="width:34px;height:34px;border:1px solid var(--cultured);background:var(--white);font-size:18px;cursor:pointer">−</button><input type="number" id="qty-input" value="1" min="1" max="10" onchange="updateQty(this.value)" style="width:55px;height:34px;border:1px solid var(--cultured);text-align:center;font-size:var(--fs-7)"><button onclick="changeQty(1)" style="width:34px;height:34px;border:1px solid var(--cultured);background:var(--white);font-size:18px;cursor:pointer">+</button></div>'+
      '<div style="display:flex;gap:10px;margin-bottom:15px"><button class="add-cart-btn" style="flex:1;padding:12px 24px;font-size:var(--fs-7)" onclick="addToCartWithQty()" '+(product.stock<1?'disabled':'')+'>Add to Cart — '+formatINR(product.price)+'</button><button class="add-cart-btn" style="flex:1;padding:12px 24px;font-size:var(--fs-7);background:var(--eerie-black)" onclick="buyNow()">Buy Now</button></div>'+
      '<p style="font-size:var(--fs-8);color:'+(product.stock>0?'var(--ocean-green)':'var(--bittersweet)')+'">'+(product.stock>0?'✓ In Stock — '+product.stock+' left':'✕ Out of Stock')+'</p>'+
      reviewsHtml+
    '</div></div></div>'+
    '<div class="sticky-atc-bar" id="sticky-atc"><span class="sticky-name">'+product.name+'</span><span class="sticky-price">'+formatINR(product.price)+'</span><button class="add-cart-btn" onclick="addToCartWithQty()" style="padding:8px 20px;font-size:var(--fs-9);width:auto">Add to Cart</button></div>';

  renderRelatedProducts(id);renderRecentlyViewed();
  window._galleryImages=images;window._galleryIdx=0;
}

function switchGallery(i){window._galleryIdx=i;document.getElementById("gallery-main").src=window._galleryImages[i];document.querySelectorAll(".gallery-thumb-img").forEach(function(t,idx){t.style.borderColor=idx===i?'var(--salmon-pink)':'transparent';t.style.opacity=idx===i?'1':'0.6'})}
function galleryPrev(){var len=window._galleryImages.length;switchGallery((window._galleryIdx-1+len)%len)}
function galleryNext(){switchGallery((window._galleryIdx+1)%window._galleryImages.length)}

function renderRelatedProducts(id){
  var p=loadProducts();var cp=p.find(function(x){return x.id===id});if(!cp)return;
  var g=document.getElementById("related-products");if(!g)return;
  g.innerHTML=p.filter(function(x){return x.category===cp.category&&x.id!==id}).slice(0,4).map(renderProductCard).join("");
}

function renderRecentlyViewed(){
  var s=document.getElementById("recently-viewed-section");if(!s)return;
  var rid=getRecentlyViewed();if(rid.length<2){s.style.display="none";return}
  var p=loadProducts();var r=rid.map(function(id){return p.find(function(x){return x.id===id})}).filter(Boolean).slice(0,4);
  if(r.length<2){s.style.display="none";return}
  s.style.display="block";document.getElementById("recently-grid").innerHTML=r.map(renderProductCard).join("");
}

function selectVariant(el){document.querySelectorAll(".color-tag-opt").forEach(function(t){t.style.borderColor='var(--cultured)';t.style.color='var(--sonic-silver)'});el.style.borderColor='var(--salmon-pink)';el.style.color='var(--salmon-pink)'}

function setReviewRating(r){
  var stars=document.querySelectorAll("#review-stars span");
  for(var i=0;i<stars.length;i++){stars[i].textContent=i<r?'★':'☆';stars[i].style.color=i<r?'var(--sandy-brown)':'var(--sonic-silver)'}
  window._revRating=r;
}
function submitReview(){
  if(!window._revRating){showToast("Click stars to rate");return}
  var n=document.getElementById("review-name").value.trim(),c=document.getElementById("review-comment").value.trim();
  if(!n||!c){showToast("Fill all fields");return}
  var p=loadProducts();var id=getQueryParam("id");var P=p.find(function(x){return x.id===id});if(!P)return;
  if(!P.reviewsData)P.reviewsData=[];P.reviewsData.push({user:n,rating:window._revRating,comment:c,date:new Date().toISOString().split("T")[0]});
  P.rating=Math.round((P.reviewsData.reduce(function(s,r){return s+r.rating},0)/P.reviewsData.length)*10)/10;P.reviews=P.reviewsData.length;
  saveProducts(p);showToast("Review submitted! ♡");initProductDetail();
}

var currentQty=1;
function changeQty(d){currentQty=Math.max(1,Math.min(10,currentQty+d));var inp=document.getElementById("qty-input");if(inp)inp.value=currentQty}
function updateQty(v){currentQty=Math.max(1,Math.min(10,parseInt(v)||1));var inp=document.getElementById("qty-input");if(inp)inp.value=currentQty}
function addToCartWithQty(){var id=getQueryParam("id");if(id)addToCart(id,currentQty)}
function buyNow(){var id=getQueryParam("id");if(id)addToCart(id,currentQty);window.location.href="checkout.html"}

window.applyFilters=applyFilters;window.changeQty=changeQty;window.updateQty=updateQty;
window.addToCartWithQty=addToCartWithQty;window.buyNow=buyNow;window.setReviewRating=setReviewRating;
window.submitReview=submitReview;window.selectVariant=selectVariant;window.switchGallery=switchGallery;
window.galleryPrev=galleryPrev;window.galleryNext=galleryNext;

document.addEventListener("DOMContentLoaded",function(){
  renderFeaturedProducts();initShopPage();initProductDetail();renderRecentlyViewed();
  window.addEventListener("scroll",function(){var a=document.getElementById("sticky-atc");if(a)a.classList.toggle("show",window.scrollY>500)});
});
