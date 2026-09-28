const sliderContainer = document.querySelector("#slider-container"),
  sliderNextContainer = sliderContainer.querySelector("#slider-next"),
  sliderPrevContainer = sliderContainer.querySelector("#slider-prev"),
  sliderItemsContainer = sliderContainer.querySelector("#slider-items"),
  sliderOptionsContainer = sliderContainer.querySelector("#slider-options");
let activeSliderOptionId = "option-1";
const sliderItemHiddenCss = "slider-item-hidden", sliderOptionActiveCss = "slider-option-active";

const sliderItemsData = [
  {
    id: "option-1",
    name: "S’mores Frappuccino",
    description:
      "This new drink takes an espresso and mixes it with brown sugar and cinnamon before being topped with oat milk.",
    price: "5.50",
    imageLink: "/rsschool-landing-page/coffee-slider-1.webp",
  },
  {
    id: "option-2",
    name: "Caramel Macchiato",
    description:
      "Fragrant and unique classic espresso with rich caramel-peanut syrup, with cream under whipped thick foam.",
    price: "5.00",
    imageLink: "/rsschool-landing-page/coffee-slider-2.webp",
  },
  {
    id: "option-3",
    name: "Ice coffee",
    description:
      "A popular summer drink that tones and invigorates. Prepared from coffee, milk and ice.",
    price: "4.50",
    imageLink: "/rsschool-landing-page/coffee-slider-3.webp",
  },
];

const fillTemplate = (template, ...args) => {
  for (const kv of args) {
    template = template.replace(new RegExp(`{{${kv.key}}}`, "g"), kv.value);
  }
  return template;
};

const sliderItemTemplate = `
<div class="slider-item" id="{{id}}">
  <div class="slider-item-image">
    <img src="{{imageLink}}" alt="{{name}}" />
  </div>
  <div class="slider-item-title">{{name}}</div>
  <div class="slider-item-description">{{description}}</div>
  <div class="slider-item-price">${"$" + "{{price}}"}</div>
</div>
`;

const updateVisibleOption = () => {
  for (let child of sliderItemsContainer.children) {
    if (child.id !== activeSliderOptionId) {
      child.classList.add(sliderItemHiddenCss);
    } else {
      child.classList.remove(sliderItemHiddenCss);
    }
  }
}

const setActiveOptionId = (newId) => {
  activeSliderOptionId = newId;
  updateVisibleOption();
  updateActiveSliderOption();
}

const setNextId = () => {
  const activeIndex = sliderItemsData.findIndex((sid) => sid.id === activeSliderOptionId);
  if (activeIndex === -1) return;
  const maxIndex = sliderItemsData.length;
  const newIndex = activeIndex + 1;
  if (newIndex >= maxIndex) {
    setActiveOptionId(sliderItemsData[0].id);
    return;
  }
  setActiveOptionId(sliderItemsData[newIndex].id);
}

const setPrevId = () => {
  const activeIndex = sliderItemsData.findIndex((sid) => sid.id === activeSliderOptionId);
  if (activeIndex === -1) return;
  const maxIndex = sliderItemsData.length;
  const newIndex = activeIndex - 1;
  if (newIndex < 0) {
    setActiveOptionId(sliderItemsData[maxIndex - 1].id);
    return;
  }
  setActiveOptionId(sliderItemsData[newIndex].id);
}

const swipeThreshold = 50;
let touchStartX = 0;
let touchStartY = 0;

const onTouchStart = (e) => {
  touchStartX = e.changedTouches[0].clientX;
  touchStartY = e.changedTouches[0].clientY;
}

const onTouchEnd = (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;
  if (Math.abs(dx) < swipeThreshold || Math.abs(dx) < Math.abs(dy)) return;
  if (dx < 0) {
    setNextId();
  } else {
    setPrevId();
  }
}

const initSliderOptions = () => {
  const sliderOptionTemplate = "<div class='slider-option {{activeClass}}'></div>";
  const totalOption = sliderItemsData.length;
  const activeOptionIndex = sliderItemsData.findIndex((sid) => sid.id === activeSliderOptionId);

  const options = [];
  for (let i = 0; i < totalOption; i++) {
    options.push(fillTemplate(sliderOptionTemplate, { key: "activeClass", value: i === activeOptionIndex ? sliderOptionActiveCss : "" }))
  }
  sliderOptionsContainer.innerHTML = options.join("\n");
}

const updateActiveSliderOption = () => {
  const activeOptionIndex = sliderItemsData.findIndex((sid) => sid.id === activeSliderOptionId);
  let i = 0;
  for (let child of sliderOptionsContainer.children) {
    if (i === activeOptionIndex) {
      child.classList.add(sliderOptionActiveCss);
    } else {
      child.classList.remove(sliderOptionActiveCss);
    }
    i++;
  }
}

const initSliderItems = () => {
  const options = [];
  for (const data of sliderItemsData) {
    const model = [];
    for (const key of Object.keys(data)) {
      const value = data[key];
      model.push({ key, value });
    }
    options.push(fillTemplate(sliderItemTemplate, ...model));
  }
  sliderItemsContainer.innerHTML = options.join("\n");
  updateVisibleOption();
};

/* init */
(() => {
  initSliderItems();
  initSliderOptions();
  sliderNextContainer.addEventListener("click", setNextId);
  sliderPrevContainer.addEventListener("click", setPrevId);
  sliderItemsContainer.addEventListener("touchstart", onTouchStart, { passive: true });
  sliderItemsContainer.addEventListener("touchend", onTouchEnd);
})();
