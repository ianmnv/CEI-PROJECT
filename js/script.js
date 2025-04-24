"use strict";
// funciones que se usan en diferentes paginas
import { fetchProducts, displayCardProducts } from "./utilityFnsProducts.js";
import { runActionsOnMenu, navigateTo } from "./utilityFnMenu.js";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "./utilityFnsLoadingSpinner.js";
import { getCart } from "./utilityFnsProducts.js";

showLoadingSpinner();

// funciones para menu
runActionsOnMenu();
navigateTo();

// // Seleccionando imagenes de la primera seccion y modificando sus posiciones
const containerSection = document.querySelector(".section-portada-wrapper");
const imgsContainer = containerSection.querySelectorAll(".section-portada-div");
const contenedorBtns = containerSection.querySelector(
  ".section-contenedor-btns"
);
const nextBtn = containerSection.querySelector(".btnNext");
const prevBtn = containerSection.querySelector(".btnPrev");
const spanNumbItems = document.querySelector(".span-numb-of-items");

let index = 0;
let btns = [];
let slideInterval;

// // funcion que cambia de contenedor cada 3 seg
const startInterval = () =>
  (slideInterval = setInterval(() => showSlide(index + 1), 3000));

// // funcion que cambia de img
function showSlide(newIndex) {
  // // GPT me ayudo a crear esta linea
  index = (newIndex + imgsContainer.length) % imgsContainer.length;

  imgsContainer.forEach((img) => img.classList.remove("active"));
  btns.forEach((btn, btnIndex) =>
    btn.classList.toggle("active-btn", btnIndex === index)
  );
  imgsContainer[index].classList.add("active");
  setParentHeight();
}

function createButtons() {
  imgsContainer.forEach((_, i) => {
    const btn = document.createElement("div");
    btn.classList.add("section-btn");
    btn.addEventListener("click", () => utilityFn(i));
    contenedorBtns.appendChild(btn);
    btns.push(btn);
  });
}

// // Desde que el padre contenedor (seccion contenedora) tiene a todos sus
// elementos hijo en posicion absoluta, le doy un alto al padre dinamicamente
function setParentHeight() {
  const height = imgsContainer[1].scrollHeight;
  containerSection.style.height = `${height}px`;
}

function utilityFn(ind) {
  clearInterval(slideInterval);
  showSlide(ind);
  startInterval();
}

const contenedorTituloHombre = document.querySelector(".titulo-H");
const contenedorTituloMujer = document.querySelector(".titulo-M");

// Event load para que solo se llamen las funciones una vez que ha cargado todo el html y css
window.addEventListener("load", async () => {
  // funciones que sirven para renderizar destacados
  const menWatches = await fetchProducts(["mens-watches", "sunglasses"]);
  const womensJewellery = await fetchProducts([
    "womens-jewellery",
    "womens-bags",
  ]);

  displayCardProducts(menWatches, contenedorTituloHombre);
  displayCardProducts(womensJewellery, contenedorTituloMujer);

  // funciones para el slider
  setParentHeight();
  createButtons();
  showSlide(index);
  startInterval();
  nextBtn.addEventListener("click", () => utilityFn(index + 1));
  prevBtn.addEventListener("click", () => utilityFn(index - 1));

  // muestra el numero de productos añadidos al carrito
  spanNumbItems.textContent = getCart().length;

  // funcion para ocultar loading spinner una vez que cargo la pagina
  hideLoadingSpinner();

  // setParent sera llamado si se reajusta la ventana y adaptar la altura
  window.addEventListener("resize", setParentHeight);
});
