"use strict";
// funciones que se usan en diferentes paginas
import { displayCardProducts } from "./utilityFnsProducts.js";
import runActionsOnMenu from "./utilityFnMenu.js";

// // Crea un loading spinner
const loadingDiv = document.createElement("div");
loadingDiv.className = "slider-loading";
loadingDiv.innerHTML = `
    <div class="loading-spinner"></div>
    <p>Loading content...</p>
  `;
document.body.appendChild(loadingDiv);

// // Seleccionando imagenes de la primera seccion y modificando sus posiciones
const containerSection = document.querySelector(".section-portada-wrapper");
const imgsContainer = containerSection.querySelectorAll(".section-portada-div");
const contenedorBtns = containerSection.querySelector(
  ".section-contenedor-btns"
);
const nextBtn = containerSection.querySelector(".btnNext");
const prevBtn = containerSection.querySelector(".btnPrev");

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
window.addEventListener("load", () => {
  // funciones para el slider
  setParentHeight();
  createButtons();
  showSlide(index);
  startInterval();
  nextBtn.addEventListener("click", () => utilityFn(index + 1));
  prevBtn.addEventListener("click", () => utilityFn(index - 1));

  // funcion para menu
  runActionsOnMenu();

  // funciones que sirven para renderizar destacados
  displayCardProducts("mens-watches", contenedorTituloHombre);
  displayCardProducts("womens-jewellery", contenedorTituloMujer);

  // Quita el loading spinner de la pantalla
  loadingDiv.classList.add("hidden");

  // setParent sera llamado si se reajusta la ventana y adaptar la altura
  window.addEventListener("resize", setParentHeight);
});
