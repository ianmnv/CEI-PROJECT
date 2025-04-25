"use strict";

const form = document.querySelector("form");
const notifyEl = document.querySelector(".shopping-cart-notification");

form.addEventListener("click", (e) => {
  e.preventDefault();

  notifyEl.classList.add("show-shopping-cart-notification");
  setTimeout(() => {
    notifyEl.classList.remove("show-shopping-cart-notification");
  }, 2000);
});
