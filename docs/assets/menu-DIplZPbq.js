import"./nav-BDvRkU2V.js";var e,t=`coffee`,n=[],r=document.querySelector(`#products-container`),i={coffee:document.querySelector(`#categories-coffee`),tea:document.querySelector(`#categories-tea`),dessert:document.querySelector(`#categories-dessert`)},a=document.querySelector(`#modal-container`),o=document.querySelector(`#pagination-increase`),s=`menu-selector-item-active`,c=`modal-container-hidden`,l,u,d=(e,t)=>{let n=1,r=()=>n*t;return{getCount:r,isMaxPage:()=>r()>=e,increaseStep:()=>n+=1}},f=4,p=8,m=window.innerWidth<=768?f:p,h=()=>{_&&m!==p&&(m=p,x(),b())},g=()=>{_&&m!==f&&(m=f,x(),b())},_,v=e=>e.toLowerCase().replace(/[^\w\d]/g,``),y=(e,...t)=>{for(let n of t)e=e.replace(RegExp(`{{${n.key}}}`,`g`),n.value);return e},b=()=>{_.isMaxPage()?o.classList.add(`hidden`):o.classList.remove(`hidden`),r.innerHTML=n.slice(0,_.getCount()).map(e=>{let t=[];for(let n of Object.keys(e)){let r=e[n];typeof r==`string`&&(n===`name`&&t.push({key:`imageLink`,value:`/rsschool-landing-page/dishes/${v(r)}.png`}),t.push({key:n,value:r}))}return y(`
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
`);for(let e of r.children)e.addEventListener(`click`,()=>T(v(e.id)))},x=()=>{n=e.filter(e=>e.category===t),_=d(n.length,m)},S=e=>{i[t].classList.remove(s),t=e,i[t].classList.add(s),x(),b()},C=()=>{a.classList.add(c),document.body.classList.remove(`no-scroll`)},w=()=>{l={size:{value:`s`,"add-price":`0.00`},additives:new Map}},T=e=>{let t=n.find(t=>v(t.name)===e);u=t;let r=[];r.push({key:`name`,value:t.name}),r.push({key:`imageLink`,value:`/rsschool-landing-page/dishes/${e}.png`}),r.push({key:`description`,value:t.description}),r.push({key:`size-s`,value:t.sizes.s.size}),r.push({key:`size-m`,value:t.sizes.m.size}),r.push({key:`size-l`,value:t.sizes.l.size}),r.push({key:`additive-1`,value:t.additives[0].name}),r.push({key:`additive-2`,value:t.additives[1].name}),r.push({key:`additive-3`,value:t.additives[2].name}),r.push({key:`total`,value:t.price}),a.innerHTML=y(`
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
    </div>`,...r),a.querySelector(`#modal-close`).addEventListener(`click`,()=>C()),a.classList.remove(c),document.body.classList.add(`no-scroll`),w(),E(),O(),A()},E=()=>{for(let e of a.querySelector(`#modal-sizes`).children)e.addEventListener(`click`,()=>{l.size.value=e.id,l.size[`add-price`]=u.sizes[e.id][`add-price`],D(),A()});D()},D=()=>{for(let e of a.querySelector(`#modal-sizes`).children)e.id===l.size.value?e.classList.add(s):e.classList.remove(s)},O=()=>{for(let e of a.querySelector(`#modal-additives`).children)e.addEventListener(`click`,()=>{let t=Number(e.id.split(`-`)[1])-1,n=u.additives[t][`add-price`];l.additives.has(e.id)?l.additives.delete(e.id):l.additives.set(e.id,n),k(),A()});k()},k=()=>{for(let e of a.querySelector(`#modal-additives`).children)l.additives.has(e.id)?e.classList.add(s):e.classList.remove(s)},A=()=>{let e=a.querySelector(`#modal-total`);e.innerText=`$${[u.price,l.size[`add-price`],...l.additives.values()].map(Number).reduce((e,t)=>e+t,0).toFixed(2)}`};(async()=>{w(),e=await fetch(`/rsschool-landing-page/products.json`).then(e=>e.json()),x(),b();for(let e of Object.keys(i))i[e].addEventListener(`click`,()=>S(e));a.addEventListener(`click`,e=>e.target.id===a.id&&C()),o.addEventListener(`click`,()=>{_.isMaxPage()||(_.increaseStep(),b())}),window.addEventListener(`resize`,()=>{console.log(window.innerWidth,m),window.innerWidth<=768?g():h()})})();
//# sourceMappingURL=menu-DIplZPbq.js.map