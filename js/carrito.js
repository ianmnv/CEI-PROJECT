import { runActionsOnMenu, navigateTo } from "./utilityFnMenu.js";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "./utilityFnsLoadingSpinner.js";
import { shoppingCart } from "./utilityFnsProducts.js";

showLoadingSpinner();

runActionsOnMenu();
navigateTo();

const spanNumbItems = document.querySelector(".span-numb-of-items");

window.addEventListener("load", () => {
  hideLoadingSpinner();

  spanNumbItems.textContent = shoppingCart.length;
});
