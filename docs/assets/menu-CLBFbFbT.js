import"./nav-CmqrBJgO.js";var e,t=`coffee`,n=[],r=document.querySelector(`#products-container`),i={coffee:document.querySelector(`#categories-coffee`),tea:document.querySelector(`#categories-tea`),dessert:document.querySelector(`#categories-dessert`)},a=document.querySelector(`#modal-container`),o=`menu-selector-item-active`,s=`modal-container-hidden`,c=e=>e.toLowerCase().replace(/[^\w\d]/g,``),l=(e,...t)=>{for(let n of t)e=e.replace(RegExp(`{{${n.key}}}`,`g`),n.value);return e},u=()=>{r.innerHTML=n.map(e=>{let t=[];for(let n of Object.keys(e)){let r=e[n];typeof r==`string`&&(n===`name`&&t.push({key:`imageLink`,value:`/rsschool-landing-page/dishes/${c(r)}.png`}),t.push({key:n,value:r}))}return l(`
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
`);for(let e of r.children)e.addEventListener(`click`,()=>m(c(e.id)))},d=()=>{n=e.filter(e=>e.category===t)},f=e=>{i[t].classList.remove(o),t=e,i[t].classList.add(o),d(),u()},p=()=>{a.classList.add(s)},m=e=>{let t=n.find(t=>c(t.name)===e),r=[];r.push({key:`name`,value:t.name}),r.push({key:`imageLink`,value:`/rsschool-landing-page/dishes/${e}.png`}),r.push({key:`description`,value:t.description}),r.push({key:`size-s`,value:t.sizes.s.size}),r.push({key:`size-m`,value:t.sizes.m.size}),r.push({key:`size-l`,value:t.sizes.l.size}),r.push({key:`additive-1`,value:t.additives[0].name}),r.push({key:`additive-2`,value:t.additives[1].name}),r.push({key:`additive-3`,value:t.additives[2].name}),r.push({key:`total`,value:`6.00`}),a.innerHTML=l(`
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
          <div class="modal-options-container">
            <button class="menu-selector-item">
              <span class="menu-selector-icon">S</span>
              <span>{{size-s}}</span>
            </button>
            <button class="menu-selector-item">
              <span class="menu-selector-icon">M</span>
              <span>{{size-m}}</span>
            </button>
            <button class="menu-selector-item">
              <span class="menu-selector-icon">L</span>
              <span>{{size-l}}</span>
            </button>
          </div>
        </div>
        <div class="modal-options">
          <div class="modal-options-title">Additives</div>
          <div class="modal-options-container">
            <button class="menu-selector-item">
              <span class="menu-selector-icon">1</span>
              <span>{{additive-1}}</span>
            </button>
            <button class="menu-selector-item">
              <span class="menu-selector-icon">2</span>
              <span>{{additive-2}}</span>
            </button>
            <button class="menu-selector-item">
              <span class="menu-selector-icon">3</span>
              <span>{{additive-3}}</span>
            </button>
          </div>
        </div>
        <div>
          <div class="modal-price">
            <div>Total:</div>
            <div>\${{total}}</div>
          </div>
          <hr class="delimiter">
          <div class="modal-info">
            <div><img src="/rsschool-landing-page/icons/info.svg" alt=""></div>
            <div>The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</div>
          </div>
        </div>
        <div class="button-secondary" id="modal-close">Close</div>
      </div>
    </div>`,...r),a.querySelector(`#modal-close`).addEventListener(`click`,()=>p()),a.classList.remove(s)};(async()=>{e=await fetch(`/rsschool-landing-page/products.json`).then(e=>e.json()),d(),u();for(let e of Object.keys(i))i[e].addEventListener(`click`,()=>f(e));a.addEventListener(`click`,e=>e.target.id===a.id&&p())})();
//# sourceMappingURL=menu-CLBFbFbT.js.map