import"./nav-BYTFK04q.js";var e,t=`coffee`,n=[],r=document.querySelector(`#products-container`),i={coffee:document.querySelector(`#categories-coffee`),tea:document.querySelector(`#categories-tea`),dessert:document.querySelector(`#categories-dessert`)},a=document.querySelector(`#modal-container`),o=`menu-selector-item-active`,s=`modal-container-hidden`,c,l,u=e=>e.toLowerCase().replace(/[^\w\d]/g,``),d=(e,...t)=>{for(let n of t)e=e.replace(RegExp(`{{${n.key}}}`,`g`),n.value);return e},f=()=>{r.innerHTML=n.map(e=>{let t=[];for(let n of Object.keys(e)){let r=e[n];typeof r==`string`&&(n===`name`&&t.push({key:`imageLink`,value:`/rsschool-landing-page/dishes/${u(r)}.png`}),t.push({key:n,value:r}))}return d(`
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
`);for(let e of r.children)e.addEventListener(`click`,()=>_(u(e.id)))},p=()=>{n=e.filter(e=>e.category===t)},m=e=>{i[t].classList.remove(o),t=e,i[t].classList.add(o),p(),f()},h=()=>{a.classList.add(s),document.body.classList.remove(`no-scroll`)},g=()=>{c={size:{value:`s`,"add-price":`0.00`},additives:new Map}},_=e=>{let t=n.find(t=>u(t.name)===e);l=t;let r=[];r.push({key:`name`,value:t.name}),r.push({key:`imageLink`,value:`/rsschool-landing-page/dishes/${e}.png`}),r.push({key:`description`,value:t.description}),r.push({key:`size-s`,value:t.sizes.s.size}),r.push({key:`size-m`,value:t.sizes.m.size}),r.push({key:`size-l`,value:t.sizes.l.size}),r.push({key:`additive-1`,value:t.additives[0].name}),r.push({key:`additive-2`,value:t.additives[1].name}),r.push({key:`additive-3`,value:t.additives[2].name}),r.push({key:`total`,value:t.price}),a.innerHTML=d(`
  <div class="modal-content">
      <div class="modal-image-container">
        <div class="modal-image">
          <img src="{{imageLink}}" alt="{{name}}">
        </div>
      </div>
      <div>
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
    </div>`,...r),a.querySelector(`#modal-close`).addEventListener(`click`,()=>h()),a.classList.remove(s),document.body.classList.add(`no-scroll`),g(),v(),b(),S()},v=()=>{for(let e of a.querySelector(`#modal-sizes`).children)e.addEventListener(`click`,()=>{c.size.value=e.id,c.size[`add-price`]=l.sizes[e.id][`add-price`],y(),S()});y()},y=()=>{for(let e of a.querySelector(`#modal-sizes`).children)e.id===c.size.value?e.classList.add(o):e.classList.remove(o)},b=()=>{for(let e of a.querySelector(`#modal-additives`).children)e.addEventListener(`click`,()=>{let t=Number(e.id.split(`-`)[1])-1,n=l.additives[t][`add-price`];c.additives.has(e.id)?c.additives.delete(e.id):c.additives.set(e.id,n),x(),S()});x()},x=()=>{for(let e of a.querySelector(`#modal-additives`).children)c.additives.has(e.id)?e.classList.add(o):e.classList.remove(o)},S=()=>{let e=a.querySelector(`#modal-total`);e.innerText=`$${[l.price,c.size[`add-price`],...c.additives.values()].map(Number).reduce((e,t)=>e+t,0).toFixed(2)}`};(async()=>{g(),e=await fetch(`/rsschool-landing-page/products.json`).then(e=>e.json()),p(),f();for(let e of Object.keys(i))i[e].addEventListener(`click`,()=>m(e));a.addEventListener(`click`,e=>e.target.id===a.id&&h())})();
//# sourceMappingURL=menu-C21bMSM-.js.map