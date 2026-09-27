import"./theme-ChqYFPy0.js";var e,t=`coffee`,n=[],r=document.querySelector(`#products-container`),i={coffee:document.querySelector(`#categories-coffee`),tea:document.querySelector(`#categories-tea`),dessert:document.querySelector(`#categories-dessert`)},a=`menu-selector-item-active`,o=(e,...t)=>{for(let n of t)e=e.replace(RegExp(`{{${n.key}}}`,`g`),n.value);return e},s=()=>{r.innerHTML=n.map(e=>{let t=[];for(let n of Object.keys(e)){let r=e[n];typeof r==`string`&&(n===`name`&&t.push({key:`imageLink`,value:`/rsschool-landing-page/dishes/${r.toLowerCase().replace(/[^\w\d]/g,``)}.png`}),t.push({key:n,value:r}))}return o(`
  <div class="price-card" id="#{{name}}">
    <div class="card-image">
      <img src="{{imageLink}}" alt="{{name}}"/>
    </div>
    <div class="card-info">
      <div class="card-title">{{name}}</div>
      <div class="card-description">{{description}}</div>
      <div class="card-price">{{price}}</div>
    </div>
  </div>`,...t)}).join(`
`)},c=()=>{n=e.filter(e=>e.category===t)},l=e=>{i[t].classList.remove(a),t=e,i[t].classList.add(a),c(),s()};(async()=>{e=await fetch(`/rsschool-landing-page/products.json`).then(e=>e.json()),c(),s(),console.log(e,n);for(let e of Object.keys(i))i[e].addEventListener(`click`,()=>l(e))})();
//# sourceMappingURL=menu-BfQiBfTe.js.map