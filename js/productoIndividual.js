import { runActionsOnMenu, navigateTo } from "./utilityFnMenu.js";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "./utilityFnsLoadingSpinner.js";

showLoadingSpinner();

runActionsOnMenu();
navigateTo();

const mainEl = document.querySelector("main");
const imgsContainer = mainEl.querySelector(".inner-img-container");
const mainImg = mainEl.querySelector(".main-img");
const productName = mainEl.querySelector("h2");
const span = mainEl.querySelector(".info-element");
const allProductDescription = mainEl.querySelectorAll(".description-p");
const cartBtn = mainEl.querySelector(".cart-btn");

async function displayProduct() {
  const productId = sessionStorage.getItem("single-product-id");

  if (!productId)
    mainEl.innerHTML = `
      <h1 
      style="margin:3rem; font-size:var(--font-size-M); 
      font-weight: 500; text-align:center;">
        ¡Producto no encontrado! Vuelve a intentarlo.
      </h1>`;

  const productDetails = await fetch(
    `https://dummyjson.com/products/${productId}`
  ).then((res) => res.json());

  productDetails.images.forEach((imgPath) => {
    const imgEl = document.createElement("img");
    imgEl.setAttribute("src", imgPath);
    imgEl.setAttribute("alt", "imagenes del producto");
    imgEl.setAttribute("loading", "lazy");
    imgsContainer.append(imgEl);
  });

  mainImg.setAttribute("src", productDetails.images[0]);
  productName.textContent = productDetails.title;
  span.textContent = `💲${productDetails.price}`;
  allProductDescription[0].textContent = productDetails.description;
  allProductDescription[1].textContent = productDetails.returnPolicy;
  allProductDescription[2].textContent = productDetails.warrantyInformation;
}

cartBtn.addEventListener("click", () => {
  console.log("producto añadido!");
});

window.addEventListener("load", async () => {
  await displayProduct();
  hideLoadingSpinner();
});
