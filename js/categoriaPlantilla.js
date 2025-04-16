import { runActionsOnMenu, navigateTo } from "./utilityFnMenu.js";
import { fetchProducts, displayCardProducts } from "./utilityFnsProducts.js";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "./utilityFnsLoadingSpinner.js";

showLoadingSpinner();

runActionsOnMenu();
navigateTo();

const mainGridContainer = document.querySelector(".main-grid-container");
const dataCategory = sessionStorage.getItem("data-categoria-id");
const h2 = document.querySelector(".main-h2");
h2.textContent = "TODOS LOS PRODUCTOS";

let productsArray;

async function displayProductsDynamic() {
  if (dataCategory === "todo-h") {
    document.title = "ICON | Productos para hombre.";

    productsArray = await fetchProducts([
      "mens-shirts",
      "mens-watches",
      "mens-shoes",
    ]);
    displayCardProducts(productsArray, mainGridContainer);
  } else if (dataCategory === "todo-m") {
    document.title = "ICON | Productos para mujeres.";

    productsArray = await fetchProducts([
      "womens-dresses",
      "womens-shoes",
      "womens-jewellery",
    ]);

    displayCardProducts(productsArray, mainGridContainer);
  } else {
    const productText = `${dataCategory
      .replace("-", " ")
      .toUpperCase()} PRODUCTS`;

    h2.textContent = productText;
    document.title = `ICON | ${productText}`;

    productsArray = await fetchProducts([dataCategory]);

    displayCardProducts(productsArray, mainGridContainer);
  }

  searchFn(productsArray);
}

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
});
