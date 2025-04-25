"use strict";

import { runActionsOnMenu, navigateTo } from "./utilityFnMenu.js";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "./utilityFnsLoadingSpinner.js";
import { getCart } from "./utilityFnsProducts.js";

showLoadingSpinner();

runActionsOnMenu();
navigateTo();

const mainEl = document.querySelector("main");
const imgsContainer = mainEl.querySelector(".inner-img-container");
const mainImg = mainEl.querySelector(".main-img");
const productName = mainEl.querySelector("h2");
const spanInfo = mainEl.querySelector(".info-element");
const allProductDescription = mainEl.querySelectorAll(".description-p");
const cartBtn = mainEl.querySelector(".cart-btn");
const spanNumbItems = document.querySelector(".span-numb-of-items");
const notifyEl = document.querySelector(".shopping-cart-notification");

let productDetails;

const shoppingCart = getCart();

async function displayProduct() {
  const productId = sessionStorage.getItem("single-product-id");

  if (!productId) {
    mainEl.innerHTML = `
      <h1 
      style="margin:3rem; font-size:var(--font-size-M); 
      font-weight: 500; text-align:center;">
        ¡Producto no encontrado! Vuelve a intentarlo.
      </h1>`;
    return;
  }

  productDetails = await fetch(
    `https://dummyjson.com/products/${productId}`
  ).then((res) => res.json());

  productDetails.images.forEach((imgPath) => {
    const imgEl = document.createElement("img");
    imgEl.setAttribute("src", imgPath);
    imgEl.setAttribute("alt", "imagenes del producto");
    imgEl.setAttribute("loading", "lazy");
    imgEl.setAttribute("class", "inner-imgs");
    imgsContainer.append(imgEl);
  });

  document.title = `ICON | ${productDetails.title.toUpperCase()}`;
  mainImg.setAttribute("src", productDetails.images[0]);
  productName.textContent = productDetails.title;
  spanInfo.textContent = `💲${productDetails.price}`;
  allProductDescription[0].textContent = productDetails.description;
  allProductDescription[1].textContent = productDetails.returnPolicy;
  allProductDescription[2].textContent = productDetails.warrantyInformation;
}

function changeImg() {
  const images = imgsContainer.querySelectorAll(".inner-imgs");
  images[0].classList.add("active-img");
}

imgsContainer.addEventListener("click", (e) => {
  const imgTarget = e.target.closest(".inner-imgs");

  if (!imgTarget) return;

  mainImg.src = imgTarget.src;

  const images = imgsContainer.querySelectorAll(".inner-imgs");
  images.forEach((img) => img.classList.remove("active-img"));
  imgTarget.classList.add("active-img");
});

cartBtn.addEventListener("click", () => {
  shoppingCart.push(productDetails);
  localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
  spanNumbItems.textContent = shoppingCart.length;
  notifyEl.classList.add("show-shopping-cart-notification");
  setTimeout(() => {
    notifyEl.classList.remove("show-shopping-cart-notification");
  }, 2000);
});

window.addEventListener("load", async () => {
  await displayProduct();
  changeImg();
  spanNumbItems.textContent = shoppingCart.length;
  hideLoadingSpinner();
});
