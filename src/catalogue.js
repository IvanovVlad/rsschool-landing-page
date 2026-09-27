/*
* products structure: {
    "name": string,
    "description": string,
    "price": string,
    "category": coffee | tea | dessert,
    "sizes": {
        "s": {
            "size": string,
            "add-price": string
        },
        "m": {
            "size": string,
            "add-price": string
        },
        "l": {
            "size": string,
            "add-price": string
        }
    },
    "additives": [
        {
            "name": string,
            "add-price": string
        }
    ]
}
* */

let allProducts,
  activeCategory = "coffee",
  activeProducts = [];
const productsContainer = document.querySelector("#products-container"),
  categoryContainers = {
    coffee: document.querySelector("#categories-coffee"),
    tea: document.querySelector("#categories-tea"),
    dessert: document.querySelector("#categories-dessert"),
  },
  modalContainer = document.querySelector("#modal-container");
const activeCategoryCss = "menu-selector-item-active", productModalHiddenCss = "modal-container-hidden";

const normName = (s) => s.toLowerCase().replace(/[^\w\d]/g, "");

const fillTemplate = (template, ...args) => {
  for (const kv of args) {
    template = template.replace(new RegExp(`{{${kv.key}}}`, "g"), kv.value);
  }
  return template;
};

const renderProductCards = () => {
  const cardTemplate = `
  <div class="price-card" id="#{{name}}">
    <div class="card-image image-zoom-container">
      <img src="{{imageLink}}" alt="{{name}}"/>
    </div>
    <div class="card-info">
      <div class="card-title">{{name}}</div>
      <div class="card-description">{{description}}</div>
      <div class="card-price">${'$' + '{{price}}'}</div>
    </div>
  </div>`;
  const renderedProducts = activeProducts.map((p) => {
    const models = [];

    for (const key of Object.keys(p)) {
      const value = p[key];
      if (typeof value !== "string") continue;
      if (key === "name") {
        models.push({
          key: "imageLink",
          value: `/rsschool-landing-page/dishes/${normName(value)}.png`,
        });
      }
      models.push({ key, value });
    }

    return fillTemplate(cardTemplate, ...models);
  });
  productsContainer.innerHTML = renderedProducts.join("\n");
  for (const child of productsContainer.children) {
    child.addEventListener("click", () => openActiveProductModal(normName(child.id)));
  }
};

const updateActiveProducts = () => {
  activeProducts = allProducts.filter((c) => c.category === activeCategory);
};

const setCategory = (category) => {
  categoryContainers[activeCategory].classList.remove(activeCategoryCss);
  activeCategory = category;
  categoryContainers[activeCategory].classList.add(activeCategoryCss);
  updateActiveProducts();
  renderProductCards();
};

const closeProductModal = () => {
  modalContainer.classList.add(productModalHiddenCss);
}

const openActiveProductModal = (id) => {
  const modalContentTemplate = `
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
            <div>${'$' + '{{total}}'}</div>
          </div>
          <hr class="delimiter">
          <div class="modal-info">
            <div><img src="/rsschool-landing-page/icons/info.svg" alt=""></div>
            <div>The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</div>
          </div>
        </div>
        <div class="button-secondary" id="modal-close">Close</div>
      </div>
    </div>`;

  const modalData = activeProducts.find(p => normName(p.name) === id);
  const models = [];
  models.push({ key: "name", value: modalData.name });
  models.push({ key: "imageLink", value: `/rsschool-landing-page/dishes/${id}.png` });
  models.push({ key: "description", value: modalData.description });
  models.push({ key: "size-s", value: modalData.sizes.s.size });
  models.push({ key: "size-m", value: modalData.sizes.m.size });
  models.push({ key: "size-l", value: modalData.sizes.l.size });
  models.push({ key: "additive-1", value: modalData.additives[0].name });
  models.push({ key: "additive-2", value: modalData.additives[1].name });
  models.push({ key: "additive-3", value: modalData.additives[2].name });

  models.push({ key: "total", value: "6.00" }); // todo compute price

  modalContainer.innerHTML = fillTemplate(modalContentTemplate, ...models);
  modalContainer.querySelector("#modal-close").addEventListener("click", () => closeProductModal());
  modalContainer.classList.remove(productModalHiddenCss)
};

/* init */

(async () => {
  allProducts = await fetch("/rsschool-landing-page/products.json").then((r) => r.json());
  updateActiveProducts();
  renderProductCards();

  for (const key of Object.keys(categoryContainers)) {
    categoryContainers[key].addEventListener("click", () => setCategory(key));
  }

  modalContainer.addEventListener("click", (e) => e.target.id === modalContainer.id && closeProductModal());
})();
