window._appliedCoupon=null;

function addToCart(productId,qty){
  qty=qty||1;var p=loadProducts();var product=p.find(function(x){return x.id===productId});if(!product)return;
  var cart=getCart();var existing=cart.find(function(i){return i.id===productId});var currentQty=(existing?existing.qty:0)+qty;
  if(currentQty>product.stock){showToast("Only "+product.stock+" left in stock!");return}
  if(existing){existing.qty+=qty}else{cart.push({id:product.id,name:product.name,price:product.price,image:product.image,qty:qty})}
  saveCart(cart);updateCartCount();showToast(product.name+" added to cart!");
}

function removeFromCart(id){var cart=getCart().filter(function(i){return i.id!==id});saveCart(cart);window._appliedCoupon=null;updateCartCount();renderCartPage()}
function updateCartQty(id,qty){var cart=getCart();var item=cart.find(function(i){return i.id===id});if(!item)return;var p=loadProducts();var pr=p.find(function(x){return x.id===id});if(pr&&qty>pr.stock){showToast("Only "+pr.stock+" available");qty=pr.stock}item.qty=Math.max(1,parseInt(qty)||1);saveCart(cart);updateCartCount();renderCartPage()}

function applyCouponCode(){
  var input=document.getElementById("coupon-input");if(!input)return;var code=input.value.trim().toUpperCase();if(!code){showToast("Enter code");return}
  var result=validateCoupon(code);if(!result.valid){showToast(result.message);return}
  window._appliedCoupon=result.code;showToast("Coupon applied!");renderCartPage()
}

function renderCartPage(){
  var cp=document.getElementById("cart-page");if(!cp)return;
  var cart=getCart();
  var emptyE=document.getElementById("cart-empty"),itemsE=document.getElementById("cart-items"),sumE=document.getElementById("cart-summary");
  if(cart.length===0){if(emptyE)emptyE.style.display="block";if(itemsE)itemsE.style.display="none";if(sumE)sumE.style.display="none";return}
  if(emptyE)emptyE.style.display="none";if(itemsE)itemsE.style.display="block";if(sumE)sumE.style.display="block";
  
  var html='';cart.forEach(function(item){
    html+='<div class="showcase" style="display:flex;align-items:center;gap:15px;padding:15px;margin-bottom:10px">'+
      '<div style="width:80px;height:80px;flex-shrink:0;border-radius:var(--radius-sm);overflow:hidden;background:var(--cultured)"><img src="'+item.image+'" alt="" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display=\'none\'"></div>'+
      '<div style="flex:1;min-width:0"><h4 style="font-size:var(--fs-7);color:var(--eerie-black);font-weight:var(--weight-600)">'+item.name+'</h4><p style="font-size:var(--fs-8);color:var(--sonic-silver)">'+formatINR(item.price)+'</p></div>'+
      '<div style="display:flex;align-items:center;gap:8px"><button onclick="updateCartQty(\''+item.id+'\','+(item.qty-1)+')" style="width:30px;height:30px;border:1px solid var(--cultured);background:var(--white);font-size:14px;cursor:pointer">−</button><span style="font-weight:var(--weight-600)">'+item.qty+'</span><button onclick="updateCartQty(\''+item.id+'\','+(item.qty+1)+')" style="width:30px;height:30px;border:1px solid var(--cultured);background:var(--white);font-size:14px;cursor:pointer">+</button></div>'+
      '<p style="font-weight:var(--weight-700);min-width:70px;text-align:right">'+formatINR(item.price*item.qty)+'</p>'+
      '<button onclick="removeFromCart(\''+item.id+'\');renderCartPage()" style="background:none;border:none;color:var(--bittersweet);font-size:18px;cursor:pointer;padding:4px">✕</button>'+
    '</div>';
  });
  if(itemsE)itemsE.innerHTML=html;
  
  var subtotal=getCartTotal();var shipping=subtotal>=999?0:49;var discount=0;
  if(window._appliedCoupon)discount=applyCoupon(window._appliedCoupon,subtotal);
  var tax=(subtotal-discount+shipping)*0.18;var total=subtotal-discount+shipping+tax;
  
  var subEl=document.getElementById("ca-sub"),shipEl=document.getElementById("ca-ship"),taxEl=document.getElementById("ca-tax"),totalEl=document.getElementById("ca-total"),discRow=document.getElementById("ca-disc-row"),discEl=document.getElementById("ca-disc");
  if(subEl)subEl.textContent=formatINR(subtotal);if(shipEl)shipEl.textContent=shipping===0?'FREE':formatINR(shipping);
  if(taxEl)taxEl.textContent=formatINR(tax);if(totalEl)totalEl.textContent=formatINR(total);
  if(discRow&&discEl){if(discount>0){discRow.style.display="flex";discEl.textContent="-"+formatINR(discount)}else discRow.style.display="none"}
}

function updateCartCount(){var count=getCartCount();document.querySelectorAll("#cart-count,#cart-count-mobile").forEach(function(el){el.textContent=count;el.style.display=count>0?'block':'none'})}
function showToast(msg){var t=document.getElementById("toast");if(!t){t=document.createElement("div");t.id="toast";t.className="toast";document.body.appendChild(t)}t.textContent=msg;t.classList.add("show");clearTimeout(t._t);t._t=setTimeout(function(){t.classList.remove("show")},2500)}

document.addEventListener("DOMContentLoaded",function(){updateCartCount();if(document.getElementById("cart-page"))renderCartPage()});
document.addEventListener("scroll",function(){var b=document.getElementById("back-to-top");if(b)b.classList.toggle("show",window.scrollY>400)});
window.addToCart=addToCart;window.removeFromCart=removeFromCart;window.updateCartQty=updateCartQty;window.applyCouponCode=applyCouponCode;window.renderCartPage=renderCartPage;window.showToast=showToast;
