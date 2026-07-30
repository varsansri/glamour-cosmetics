function getQueryParam(p){return new URL(window.location.href).searchParams.get(p)}

function renderProductCard(product){
  var d=product.originalPrice?Math.round((1-product.price/product.originalPrice)*100):0;
  return '<div class="product-card" onclick="location.href=\'product.html?id='+product.id+'\'">'+
    '<div class="img-box">'+
      '<img src="'+product.image+'" alt="'+product.name+'" loading="lazy" onerror="this.style.display=\'none\'">'+
      (product.badge?'<span class="card-badge">'+product.badge+'</span>':'')+
      (d>0?'<span class="card-save">-'+d+'%</span>':'')+
      '<button class="quick-view-btn" onclick="event.stopPropagation();location.href=\'product.html?id='+product.id+'\'">Quick View</button>'+
    '</div>'+
    '<div class="card-info">'+
      '<div class="card-category">'+product.category+'</div>'+
      '<div class="card-name">'+product.name+'</div>'+
      '<div class="card-rating">'+renderStars(product.rating)+'<span>('+product.reviews+')</span></div>'+
      '<div class="card-price">'+formatINR(product.price)+(product.originalPrice?'<del>'+formatINR(product.originalPrice)+'</del>':'')+'</div>'+
      '<div class="card-badges"><span class="ingredient-badge badge-vegan">🌱 Vegan</span><span class="ingredient-badge badge-cruelty">🐰 Cruelty-Free</span><span class="ingredient-badge badge-clean">✨ Clean</span></div>'+
    '</div></div>';
}

function renderFeaturedProducts(){
  var g=document.getElementById("featured-products");if(!g)return;
  g.innerHTML=loadProducts().filter(function(p){return p.featured}).slice(0,8).map(renderProductCard).join("");
}

function initProductDetail(){
  var id=getQueryParam("id");if(!id)return;
  var products=loadProducts();var product=products.find(function(p){return p.id===id});
  if(!product){document.getElementById("product-detail").innerHTML='<div class="container section" style="text-align:center"><h2>Product not found</h2><a href="products.html" style="color:var(--gold)">Back to shop</a></div>';return}
  addRecentlyViewed(id);document.title=product.name+' — Kanak';
  var discount=product.originalPrice?Math.round((1-product.price/product.originalPrice)*100):0;
  var images=product.images&&product.images.length?product.images:[product.image];
  var galleryThumbs='';for(var i=0;i<images.length;i++){galleryThumbs+='<div class="pdp-thumb'+(i===0?' active':'')+'" onclick="switchGallery('+i+')"><img src="'+images[i]+'"></div>'}
  var shadesHtml='';if(product.colors){shadesHtml='<div class="pdp-attribute"><h4>Shades</h4><div class="pdp-options">';for(var j=0;j<product.colors.length;j++){shadesHtml+='<span class="pdp-option'+(j===0?' active':'')+'" onclick="selectShade(this)">'+product.colors[j]+'</span>'}shadesHtml+='</div></div>'}
  var reviewsHtml='<div class="section-header" style="text-align:left;margin:30px 0 16px"><h3>Customer Reviews ('+(product.reviews||0)+')</h3></div>';
  if(product.reviewsData&&product.reviewsData.length){for(var k=0;k<product.reviewsData.length;k++){var R=product.reviewsData[k];reviewsHtml+='<div class="review-card" style="margin-bottom:12px"><div class="review-header"><div><span class="review-stars">'+renderStars(R.rating)+'</span> <span class="review-name">'+R.user+'</span> <span class="verified">✓ Verified Buyer</span></div><span style="font-size:11px;color:var(--text-muted)">'+R.date+'</span></div><div class="review-text">'+R.comment+'</div></div>'}}else{reviewsHtml+='<p style="font-size:13px;color:var(--text-light)">No reviews yet. Be the first!</p>'}
  reviewsHtml+='<div style="background:var(--white);border:1px solid var(--gray-border);border-radius:var(--radius-md);padding:20px;margin-top:16px"><h4 style="font-family:Inter,sans-serif;font-size:13px;font-weight:600;color:var(--espresso);margin-bottom:10px">Write a Review</h4><div id="review-stars" style="display:flex;gap:4px;font-size:22px;cursor:pointer;margin-bottom:8px">'+[1,2,3,4,5].map(function(i){return '<span onclick="setReviewRating('+i+')">☆</span>'}).join('')+'</div><input type="text" id="review-name" placeholder="Your name" style="width:100%;padding:10px 14px;border:1.5px solid var(--gray-border);border-radius:var(--radius-sm);font-size:13px;margin-bottom:8px;outline:none"><textarea id="review-comment" rows="3" placeholder="Share your experience..." style="width:100%;padding:10px 14px;border:1.5px solid var(--gray-border);border-radius:var(--radius-sm);font-size:13px;margin-bottom:8px;resize:vertical;outline:none"></textarea><button class="btn btn-primary btn-sm" onclick="submitReview()">Submit Review</button></div>';

  document.getElementById("product-detail").innerHTML='<section class="section"><div class="container"><div class="pdp-layout">'+
    '<div class="pdp-gallery"><img src="'+images[0]+'" class="pdp-main-img" id="gallery-main" alt="'+product.name+'"><div class="pdp-thumbs">'+galleryThumbs+'</div></div>'+
    '<div class="pdp-info"><h1>'+product.name+'</h1>'+
    '<p style="font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:var(--gold);font-weight:600;margin-bottom:8px">'+product.category+'</p>'+
    '<div class="pdp-price">'+formatINR(product.price)+(product.originalPrice?'<del>'+formatINR(product.originalPrice)+'</del>':'')+(discount>0?'<span class="save">Save '+discount+'%</span>':'')+'</div>'+
    '<p style="font-size:14px;color:var(--text-light);line-height:1.8;margin-bottom:20px">'+product.description+'</p>'+
    shadesHtml+
    '<div class="pdp-badges"><span class="pdp-badge badge-vegan">🌱 Vegan</span><span class="pdp-badge badge-cruelty">🐰 Cruelty-Free</span><span class="pdp-badge badge-clean">✨ No Parabens</span><span class="pdp-badge" style="background:var(--gold-light);color:var(--gold-dark)">🇮🇳 Made in India</span></div>'+
    '<div class="pdp-qty"><button onclick="changeQty(-1)">−</button><input type="number" id="qty-input" value="1" min="1" max="10" onchange="updateQty(this.value)"><button onclick="changeQty(1)">+</button></div>'+
    '<div class="pdp-actions"><button class="btn btn-gold btn-lg" style="flex:1" onclick="addToCartWithQty()">Add to Cart — '+formatINR(product.price)+'</button><button class="btn btn-outline btn-lg" onclick="buyNow()">Buy Now</button></div>'+
    '<div class="pdp-meta"><span>'+(product.stock>0?'<span style="color:var(--botanical)">✓ In Stock</span> — '+product.stock+' left':'<span style="color:var(--danger)">✕ Out of Stock</span>')+'</span><span>🚚 Free shipping above ₹999</span><span>🔄 30-day returns</span></div>'+
    reviewsHtml+'</div></div></div></section>'+
    '<div class="sticky-atc" id="sticky-atc"><div class="atc-info"><strong>'+formatINR(product.price)+'</strong>'+product.name+'</div><button class="btn btn-gold" onclick="addToCartWithQty()">Add to Cart</button></div>';

    renderRelatedProducts(id);renderRecentlyViewed();
    window._galleryImages=images;window._galleryIdx=0;window._currentProduct=product;
}

function switchGallery(i){window._galleryIdx=i;document.getElementById("gallery-main").src=window._galleryImages[i];document.querySelectorAll(".pdp-thumb").forEach(function(t,idx){t.classList.toggle("active",idx===i)})}
function selectShade(el){document.querySelectorAll(".pdp-option").forEach(function(t){t.classList.remove("active")});el.classList.add("active")}

function renderRelatedProducts(id){
  var p=loadProducts();var cp=p.find(function(x){return x.id===id});if(!cp)return;
  var g=document.getElementById("related-products");if(!g)return;
  g.innerHTML=p.filter(function(x){return x.category===cp.category&&x.id!==id}).slice(0,4).map(renderProductCard).join("");
}
function renderRecentlyViewed(){
  var s=document.getElementById("recently-viewed-section");if(!s)return;
  var rid=getRecentlyViewed();if(rid.length<2){s.style.display="none";return}
  var p=loadProducts();var r=rid.map(function(id){return p.find(function(x){return x.id===id})}).filter(Boolean).slice(0,4);
  if(r.length<2){s.style.display="none";return}s.style.display="block";
  document.getElementById("recently-grid").innerHTML=r.map(renderProductCard).join("");
}

var _reviewRating=0;
function setReviewRating(r){_reviewRating=r;document.querySelectorAll("#review-stars span").forEach(function(s,i){s.textContent=i<r?'★':'☆'})}
function submitReview(){
  if(_reviewRating===0){showToast("Click stars to rate");return}
  var n=document.getElementById("review-name").value.trim(),c=document.getElementById("review-comment").value.trim();
  if(!n||!c){showToast("Fill all fields");return}
  var p=loadProducts();var id=getQueryParam("id");var P=p.find(function(x){return x.id===id});if(!P)return;
  if(!P.reviewsData)P.reviewsData=[];P.reviewsData.push({user:n,rating:_reviewRating,comment:c,date:new Date().toISOString().split("T")[0]});
  P.rating=Math.round((P.reviewsData.reduce(function(s,r){return s+r.rating},0)/P.reviewsData.length)*10)/10;P.reviews=P.reviewsData.length;
  saveProducts(p);showToast("Review submitted! ♡");initProductDetail();
}

var currentQty=1;
function changeQty(d){currentQty=Math.max(1,Math.min(10,currentQty+d));var inp=document.getElementById("qty-input");if(inp)inp.value=currentQty}
function updateQty(v){currentQty=Math.max(1,Math.min(10,parseInt(v)||1));var inp=document.getElementById("qty-input");if(inp)inp.value=currentQty}
function addToCartWithQty(){var id=getQueryParam("id");if(id)addToCart(id,currentQty)}
function buyNow(){var id=getQueryParam("id");if(id)addToCart(id,currentQty);window.location.href="checkout.html"}

window.setReviewRating=setReviewRating;window.submitReview=submitReview;window.switchGallery=switchGallery;window.selectShade=selectShade;
window.changeQty=changeQty;window.updateQty=updateQty;window.addToCartWithQty=addToCartWithQty;window.buyNow=buyNow;

document.addEventListener("DOMContentLoaded",function(){renderFeaturedProducts();initProductDetail();renderRecentlyViewed()});
window.addEventListener("scroll",function(){var a=document.getElementById("sticky-atc");if(a){a.classList.toggle("show",window.scrollY>600)}});
