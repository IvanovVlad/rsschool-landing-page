import"./nav-0U0MFwxH.js";var e,t=`coffee`,n=[],r=!1,i=document.querySelector(`#products-container`),a={coffee:document.querySelector(`#categories-coffee`),tea:document.querySelector(`#categories-tea`),dessert:document.querySelector(`#categories-dessert`)},o=document.querySelector(`#modal-container`),s=document.querySelector(`#pagination-increase`),c=`menu-selector-item-active`,l=`modal-container-hidden`,u,d,f=(e,t)=>{let n=1,r=()=>n*t;return{getCount:r,isMaxPage:()=>r()>=e,increaseStep:()=>n+=1}},p=4,m=8,h=window.innerWidth<=768?p:m,g=()=>{v&&h!==m&&(h=m,S(),x())},_=()=>{v&&h!==p&&(h=p,S(),x())},v,y=e=>e.toLowerCase().replace(/[^\w\d]/g,``),b=(e,...t)=>{for(let n of t)e=e.replace(RegExp(`{{${n.key}}}`,`g`),n.value);return e},x=()=>{v.isMaxPage()?s.classList.add(`hidden`):s.classList.remove(`hidden`),i.innerHTML=n.slice(0,v.getCount()).map(e=>{let t=[];for(let n of Object.keys(e)){let r=e[n];typeof r==`string`&&(n===`name`&&t.push({key:`imageLink`,value:`/rsschool-landing-page/dishes/${y(r)}.webp`}),t.push({key:n,value:r}))}return b(`
  <div class="price-card" id="#{{name}}">
    <div class="card-image image-zoom-container">
      <img src="{{imageLink}}" alt="{{name}}"/>
    </div>
    <div class="card-info">
      <div class="card-title">{{name}}</div>
      <div class="card-description">{{description}}</div>
      <div class="card-price">\${{price}}</div>
    </div>
  </div>`,...t)}).join(`
`);for(let e of i.children)e.addEventListener(`click`,()=>E(y(e.id)))},S=()=>{n=e.filter(e=>e.category===t),v=f(n.length,h)},C=e=>{a[t].classList.remove(c),t=e,a[t].classList.add(c),S(),x()},w=()=>{r=!1,o.classList.add(l),document.body.classList.remove(`no-scroll`)},T=()=>{u={size:{value:`s`,"add-price":`0.00`},additives:new Map}},E=e=>{let t=n.find(t=>y(t.name)===e);d=t;let i=[];i.push({key:`name`,value:t.name}),i.push({key:`imageLink`,value:`/rsschool-landing-page/dishes/${e}.webp`}),i.push({key:`description`,value:t.description}),i.push({key:`size-s`,value:t.sizes.s.size}),i.push({key:`size-m`,value:t.sizes.m.size}),i.push({key:`size-l`,value:t.sizes.l.size}),i.push({key:`additive-1`,value:t.additives[0].name}),i.push({key:`additive-2`,value:t.additives[1].name}),i.push({key:`additive-3`,value:t.additives[2].name}),i.push({key:`total`,value:t.price}),o.innerHTML=b(`
  <div class="modal-content">
      <div class="modal-image-container">
        <div class="modal-image">
          <img src="{{imageLink}}" alt="{{name}}">
        </div>
      </div>
      <div class="modal-content-container">
        <div class="modal-title">{{name}}</div>
        <div class="modal-subtitle">{{description}}</div>
        <div class="modal-options">
          <div class="modal-options-title">Size</div>
          <div class="modal-options-container" id="modal-sizes">
            <button class="menu-selector-item" id="s">
              <span class="menu-selector-icon">S</span>
              <span>{{size-s}}</span>
            </button>
            <button class="menu-selector-item" id="m">
              <span class="menu-selector-icon">M</span>
              <span>{{size-m}}</span>
            </button>
            <button class="menu-selector-item" id="l">
              <span class="menu-selector-icon">L</span>
              <span>{{size-l}}</span>
            </button>
          </div>
        </div>
        <div class="modal-options">
          <div class="modal-options-title">Additives</div>
          <div class="modal-options-container" id="modal-additives">
            <button class="menu-selector-item" id="additive-1">
              <span class="menu-selector-icon">1</span>
              <span>{{additive-1}}</span>
            </button>
            <button class="menu-selector-item" id="additive-2">
              <span class="menu-selector-icon">2</span>
              <span>{{additive-2}}</span>
            </button>
            <button class="menu-selector-item" id="additive-3">
              <span class="menu-selector-icon">3</span>
              <span>{{additive-3}}</span>
            </button>
          </div>
        </div>
        <div>
          <div class="modal-price">
            <div>Total:</div>
            <div id="modal-total">\${{total}}</div>
          </div>
          <hr class="delimiter">
          <div class="modal-info">
            <div><img src="/rsschool-landing-page/icons/info.svg" alt=""></div>
            <div>The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</div>
          </div>
        </div>
        <div class="button-secondary" id="modal-close">Close</div>
      </div>
    </div>`,...i),o.querySelector(`#modal-close`).addEventListener(`click`,()=>w()),o.classList.remove(l),document.body.classList.add(`no-scroll`),r=!0,T(),D(),k(),j()},D=()=>{for(let e of o.querySelector(`#modal-sizes`).children)e.addEventListener(`click`,()=>{u.size.value=e.id,u.size[`add-price`]=d.sizes[e.id][`add-price`],O(),j()});O()},O=()=>{for(let e of o.querySelector(`#modal-sizes`).children)e.id===u.size.value?e.classList.add(c):e.classList.remove(c)},k=()=>{for(let e of o.querySelector(`#modal-additives`).children)e.addEventListener(`click`,()=>{let t=Number(e.id.split(`-`)[1])-1,n=d.additives[t][`add-price`];u.additives.has(e.id)?u.additives.delete(e.id):u.additives.set(e.id,n),A(),j()});A()},A=()=>{for(let e of o.querySelector(`#modal-additives`).children)u.additives.has(e.id)?e.classList.add(c):e.classList.remove(c)},j=()=>{let e=o.querySelector(`#modal-total`);e.innerText=`$${[d.price,u.size[`add-price`],...u.additives.values()].map(Number).reduce((e,t)=>e+t,0).toFixed(2)}`};(async()=>{T(),e=await fetch(`/rsschool-landing-page/products.json`).then(e=>e.json()),S(),x();for(let e of Object.keys(a))a[e].addEventListener(`click`,()=>C(e));o.addEventListener(`click`,e=>e.target.id===o.id&&w()),s.addEventListener(`click`,()=>{v.isMaxPage()||(v.increaseStep(),x())}),window.addEventListener(`resize`,()=>{console.log(window.innerWidth,h),window.innerWidth<=768?_():g()}),document.body.addEventListener(`keydown`,e=>{e.code===`Escape`&&r&&w()})})();
//# sourceMappingURL=menu-BRAnRsju.js.map