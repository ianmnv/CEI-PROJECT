"use strict";

// // PROBANDO LA API

// async function fetchProducts() {
//   const productCategories = await fetch(
//     "https://dummyjson.com/products/category-list"
//   ).then((data) => data.json());

//   const product = await fetch(
//     "https://dummyjson.com/products/category/mens-shirts"
//   ).then((product) => product.json());

//   for (const eachProduct of product.products[0].images) {
//     console.log(eachProduct);
//   }
// }

// fetchProducts();

// // Seleccionando imagenes de la primera seccion y modificando sus posiciones
const seccionContenedora = document.querySelector(".section-portada-wrapper");
const contenedorImgs = seccionContenedora.querySelectorAll(
  ".section-portada-div"
);
const contenedorBtns = seccionContenedora.querySelector(
  ".section-contenedor-btns"
);
const nextBtn = seccionContenedora.querySelector(".btnNext");
const prevBtn = seccionContenedora.querySelector(".btnPrev");

let index = 0;
let btns = [];
let slideInterval;

// // funcion que cambia de contenedor cada 3 seg
function startInterval() {
  slideInterval = setInterval(() => showSlide(index + 1), 3000);
}

// // funcion que cambia de img
function showSlide(newIndex) {
  // // GPT me ayudo a crear esta linea
  index = (newIndex + contenedorImgs.length) % contenedorImgs.length;

  contenedorImgs.forEach((img) => img.classList.remove("active"));
  btns.forEach((btn, btnIndex) =>
    btn.classList.toggle("active-btn", btnIndex === index)
  );
  contenedorImgs[index].classList.add("active");
  setParentHeight();
}

function createButtons() {
  contenedorImgs.forEach((_, i) => {
    const btn = document.createElement("div");
    btn.classList.add("section-btn");
    btn.addEventListener("click", () => {
      clearInterval(slideInterval);
      showSlide(i);
      startInterval();
    });
    contenedorBtns.appendChild(btn);
    btns.push(btn);
  });
}

nextBtn.addEventListener("click", () => {
  clearInterval(slideInterval);
  showSlide(index + 1);
  startInterval();
});

prevBtn.addEventListener("click", () => {
  clearInterval(slideInterval);
  showSlide(index - 1);
  startInterval();
});

createButtons();
showSlide(index);
startInterval();

// // Desde que el padre contenedor (seccion contenedora) tiene a todos sus
// elementos hijo en posicion absoluta, le doy un alto al padre dinamicamente
function setParentHeight() {
  const activeDiv = seccionContenedora.querySelector(
    ".section-portada-div.active"
  );

  if (activeDiv) {
    const styles = window.getComputedStyle(activeDiv);
    const height = styles.getPropertyValue("height");
    seccionContenedora.style.height = height;
  }
}

window.addEventListener("resize", setParentHeight);
