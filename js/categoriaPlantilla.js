import { runActionsOnMenu, navigateTo } from "./utilityFnMenu.js";
import { displayCardProducts } from "./utilityFnsProducts.js";

runActionsOnMenu();
navigateTo();

const main = document.querySelector("main");
const dataCategory = sessionStorage.getItem("data-categoria-id");

if (dataCategory === "todo-h") {
  document.title = "ICON | Todos los productos para hombre.";

  displayCardProducts("mens-shirts", main);
  displayCardProducts("mens-watches", main);
  displayCardProducts("mens-shoes", main);
} else if (dataCategory === "todo-m") {
  document.title = "ICON | Todos los productos para mujeres.";

  displayCardProducts("womens-dresses", main);
  displayCardProducts("womens-shoes", main);
  displayCardProducts("womens-jewellery", main);
} else {
  const productName = dataCategory.split("-");

  document.title = `ICON | ${productName[0][0].toUpperCase()}${productName[0].slice(
    1,
    -1
  )} ${productName[1]} products.`;

  displayCardProducts(dataCategory, main);
}
