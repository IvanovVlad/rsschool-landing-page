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
const activeCategoryCss = "menu-selector-item-active",
  productModalHiddenCss = "modal-container-hidden";
let activeModalProductOption, activeModalProduct;

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
      <div class="card-price">${"$" + "{{price}}"}</div>
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
  document.body.classList.remove("no-scroll");
};

const resetActiveModalProductOption = () => {
  activeModalProductOption = {
    size: { value: "s", "add-price": "0.00" },
    additives: new Map(),
  };
};

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
            <div id="modal-total">${"$" + "{{total}}"}</div>
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

  const modalData = activeProducts.find((p) => normName(p.name) === id);
  activeModalProduct = modalData;
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
  models.push({ key: "total", value: modalData.price });

  modalContainer.innerHTML = fillTemplate(modalContentTemplate, ...models);
  modalContainer.querySelector("#modal-close").addEventListener("click", () => closeProductModal());
  modalContainer.classList.remove(productModalHiddenCss);
  document.body.classList.add("no-scroll");

  resetActiveModalProductOption();
  initSizes();
  initAdditives();
  updatePrice();
};

const initSizes = () => {
  for (const child of modalContainer.querySelector("#modal-sizes").children) {
    child.addEventListener("click", () => {
      activeModalProductOption.size.value = child.id;
      activeModalProductOption.size["add-price"] = activeModalProduct.sizes[child.id]["add-price"];
      updateSizes();
      updatePrice();
    });
  }
  updateSizes();
};

const updateSizes = () => {
  for (const child of modalContainer.querySelector("#modal-sizes").children) {
    if (child.id === activeModalProductOption.size.value) {
      child.classList.add(activeCategoryCss);
    } else {
      child.classList.remove(activeCategoryCss);
    }
  }
};

const initAdditives = () => {
  for (const child of modalContainer.querySelector("#modal-additives").children) {
    child.addEventListener("click", () => {
      const additiveIndex = Number(child.id.split("-")[1]) - 1;
      const addPrice = activeModalProduct.additives[additiveIndex]["add-price"];
      if (activeModalProductOption.additives.has(child.id)) {
        activeModalProductOption.additives.delete(child.id);
      } else {
        activeModalProductOption.additives.set(child.id, addPrice);
      }
      updateAdditives();
      updatePrice();
    });
  }

  updateAdditives();
};

const updateAdditives = () => {
  for (const child of modalContainer.querySelector("#modal-additives").children) {
    if (activeModalProductOption.additives.has(child.id)) {
      child.classList.add(activeCategoryCss);
    } else {
      child.classList.remove(activeCategoryCss);
    }
  }
};

const updatePrice = () => {
  const totalContainer = modalContainer.querySelector("#modal-total");
  const newPrice = [
    activeModalProduct.price,
    activeModalProductOption.size["add-price"],
    ...activeModalProductOption.additives.values(),
  ]
    .map(Number)
    .reduce((a, b) => a + b, 0)
    .toFixed(2);
  totalContainer.innerText = `$${newPrice}`;
};

/* init */

(async () => {
  resetActiveModalProductOption();
  allProducts = await fetch("/rsschool-landing-page/products.json").then((r) => r.json());
  updateActiveProducts();
  renderProductCards();

  for (const key of Object.keys(categoryContainers)) {
    categoryContainers[key].addEventListener("click", () => setCategory(key));
  }

  modalContainer.addEventListener(
    "click",
    (e) => e.target.id === modalContainer.id && closeProductModal(),
  );
})();
