import { runActionsOnMenu, navigateTo } from "./utilityFnMenu.js";
import { displayCardProducts } from "./utilityFnsProducts.js";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "./utilityFnsLoadingSpinner.js";

showLoadingSpinner();

runActionsOnMenu();
navigateTo();

const main = document.querySelector("main");
const dataCategory = sessionStorage.getItem("data-categoria-id");
const h2 = main.querySelector(".main-h2");
h2.textContent = "TODOS LOS PRODUCTOS";

window.addEventListener("load", () => {
  hideLoadingSpinner();
  if (!dataCategory) {
    h2.textContent = "¡Esta categoria no existe! ¿Como llegaste aqui?";
  }

  if (dataCategory === "todo-h") {
    document.title = "ICON | Todos los productos para hombre.";
    displayCardProducts(["mens-shirts", "mens-watches", "mens-shoes"], main);
  } else if (dataCategory === "todo-m") {
    document.title = "ICON | Todos los productos para mujeres.";
    displayCardProducts(
      ["womens-dresses", "womens-shoes", "womens-jewellery"],
      main
    );
  } else {
    const productName = dataCategory.split("-");
    const productText = `${productName[0][0].toUpperCase()}${productName[0].slice(
      1,
      -1
    )} ${productName[1]} products.`;

    h2.textContent = productText.toUpperCase();
    document.title = `ICON | ${productText}`;

    displayCardProducts([dataCategory], main);
  }
});
