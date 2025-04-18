import { runActionsOnMenu, navigateTo } from "./utilityFnMenu.js";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "./utilityFnsLoadingSpinner.js";

showLoadingSpinner();

runActionsOnMenu();
navigateTo();

window.addEventListener("load", () => {
  hideLoadingSpinner();
});
