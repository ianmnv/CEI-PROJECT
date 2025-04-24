import { runActionsOnMenu, navigateTo } from "./utilityFnMenu.js";
import { fetchProducts, displayCardProducts } from "./utilityFnsProducts.js";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "./utilityFnsLoadingSpinner.js";
import { getCart } from "./utilityFnsProducts.js";

showLoadingSpinner();

runActionsOnMenu();
navigateTo();

const mainGridContainer = document.querySelector(".main-grid-container");
const dataCategory = sessionStorage.getItem("data-categoria-id");
const h2 = document.querySelector(".main-h2");
h2.textContent = "TODOS LOS PRODUCTOS";
const spanNumbItems = document.querySelector(".span-numb-of-items");

let productsArray;

const filterBtnsContainer = document.querySelector(".filter-btns-container");

let sorted = {
  price: false,
  rating: false,
};

const sortFnsHelper = {
  price: (a, b) => a.price - b.price,
  rating: (a, b) => b.rating - a.rating,
};

filterBtnsContainer.addEventListener("click", (e) => {
  const targetBtn = e.target.closest(".filter-btns");

  if (!targetBtn) return;

  const isPriceBtn = targetBtn.classList.contains("filter-price-btn");
  const isRatingBtn = targetBtn.classList.contains("filter-rating-btn");

  const type = isPriceBtn ? "price" : isRatingBtn ? "rating" : null;

  sorted[type] = !sorted[type];

  const productsArr = sorted[type]
    ? productsArray.slice().sort(sortFnsHelper[type])
    : productsArray;

  displayCardProducts(productsArr, mainGridContainer);

  targetBtn.classList.toggle("active-filter-btn", sorted[type]);
});

// funcion que utiliza funciones de utilidad para renderizar productos dinamicamente
async function displayProductsDynamic() {
  if (dataCategory === "todo-h") {
    document.title = "ICON | Productos para hombre.";

    productsArray = await fetchProducts([
      "mens-shirts",
      "mens-watches",
      "mens-shoes",
      "sunglasses",
    ]);
    displayCardProducts(productsArray, mainGridContainer);
  } else if (dataCategory === "todo-m") {
    document.title = "ICON | Productos para mujeres.";

    productsArray = await fetchProducts([
      "womens-dresses",
      "womens-shoes",
      "womens-jewellery",
      "womens-watches",
      "womens-bags",
    ]);

    displayCardProducts(productsArray, mainGridContainer);
  } else {
    const productText = `${dataCategory.replace("-", " ").toUpperCase()}`;

    h2.textContent = productText;
    document.title = `ICON | ${productText}`;

    productsArray = await fetchProducts([dataCategory]);

    displayCardProducts(productsArray, mainGridContainer);
  }

  searchFn(productsArray);
}

// funcion para buscar productos
function searchFn(productsArr) {
  const searchInp = document.getElementById("search-product-input");

  searchInp.addEventListener("input", () => {
    const inpValue = searchInp.value.toLowerCase();

    const filteredArr = productsArr.filter((product) =>
      product.title.toLowerCase().includes(inpValue)
    );
    displayCardProducts(filteredArr, mainGridContainer);
  });
}

window.addEventListener("load", () => {
  hideLoadingSpinner();
  if (!dataCategory) {
    h2.textContent = "¡Esta categoria no existe! ¿Como llegaste aqui?";
    return;
  }
  displayProductsDynamic();
  spanNumbItems.textContent = getCart().length;
});
