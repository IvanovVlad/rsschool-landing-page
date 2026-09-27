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
  };
const activeCategoryCss = "menu-selector-item-active";

const fillTemplate = (template, ...args) => {
  for (const kv of args) {
    template = template.replace(new RegExp(`{{${kv.key}}}`, "g"), kv.value);
  }
  return template;
};

const renderProductCards = () => {
  const cardTemplate = `
  <div class="price-card" id="#{{name}}">
    <div class="card-image">
      <img src="{{imageLink}}" alt="{{name}}"/>
    </div>
    <div class="card-info">
      <div class="card-title">{{name}}</div>
      <div class="card-description">{{description}}</div>
      <div class="card-price">{{price}}</div>
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
          value: `/rsschool-landing-page/dishes/${value.toLowerCase().replace(/[^\w\d]/g, "")}.png`,
        });
      }
      models.push({ key, value });
    }

    return fillTemplate(cardTemplate, ...models);
  });
  productsContainer.innerHTML = renderedProducts.join("\n");
};

const updateActiveProducts = () => {
  activeProducts = allProducts.filter((c) => c.category === activeCategory);
}

// oxlint-disable-next-line no-unused-vars
const setCategory = (category) => {
  categoryContainers[activeCategory].classList.remove(activeCategoryCss);
  activeCategory = category;
  categoryContainers[activeCategory].classList.add(activeCategoryCss);
  updateActiveProducts();
  renderProductCards();
};

(async () => {
  allProducts = await fetch("/rsschool-landing-page/products.json").then((r) => r.json());
  updateActiveProducts();
  renderProductCards();
  console.log(allProducts, activeProducts);
  for (const key of Object.keys(categoryContainers)) {
    categoryContainers[key].addEventListener("click", () => setCategory(key));
  }
})();
