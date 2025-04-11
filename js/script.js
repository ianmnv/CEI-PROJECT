"use strict";

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

// // funcion para obtener productos falsos desde dummyjson.com
async function fetchProduct(category) {
  const product = await fetch(
    `https://dummyjson.com/products/category/${category}`
  ).then((product) => product.json());

  return product;

  // // Categorias por las que se muestran en la pagina
  // mens-shirts
  // mens-watches
  // mens-shoes
  // womens-jewellery
  // womens-dresses
  // womens-shoes
}

// // Obtiene productos para destacados y los muestra en la pagina
const contenedorTituloHombre = document.querySelector(".titulo-H");
const contenedorTituloMujer = document.querySelector(".titulo-M");

async function displayDestacados(query, contenedorPadre) {
  const { products } = await fetchProduct(query);

  const contenedorGrid = document.createElement("div");
  contenedorGrid.classList.add("features-grid");

  products.map(({ title, price, thumbnail }, i) => {
    console.log(products[i]);

    const contenedorAnchor = document.createElement("a");
    contenedorAnchor.classList.add("destacados-card");
    contenedorAnchor.setAttribute("href", "./productoIndividual.html");

    const tituloEl = document.createElement("h3");
    tituloEl.classList.add("feature-card-title");
    tituloEl.textContent = title;

    const precioSpan = document.createElement("span");
    precioSpan.classList.add("feature-card-price");
    precioSpan.textContent = `$ ${price}`;

    const imgEl = document.createElement("img");
    imgEl.classList.add("feature-card-img");
    imgEl.setAttribute("src", thumbnail);
    imgEl.setAttribute("alt", "elementos destacados");
    imgEl.setAttribute("loading", "lazy");

    contenedorAnchor.append(imgEl, tituloEl, precioSpan);
    contenedorGrid.append(contenedorAnchor);
  });

  contenedorPadre.after(contenedorGrid);
}

// // menu acordion que se muestra tras hacer click en el icono de barras del header
const menuBtn = document.querySelector(".header-btn-menu");
const menuMobile = document.querySelector(".menu-mobile");
const closeMenuBtn = document.querySelector(".close-icon");
const btnCategories = menuMobile.querySelectorAll(".menu-acc-btn");
const categories = menuMobile.querySelectorAll(".menu-accordion-categorias");
const categoriesIcons = menuMobile.querySelectorAll(".menu-category-icons");

function runActionsOnMenu() {
  // evento que abre el menu de categorias
  menuBtn.addEventListener("click", () => {
    menuMobile.classList.add("menu-transition");
    document.body.classList.add("body-stop-overflow-y");
  });

  // evento que cierra el menu de categorias
  closeMenuBtn.addEventListener("click", () => {
    menuMobile.classList.remove("menu-transition");
    document.body.classList.remove("body-stop-overflow-y");
  });

  // evento que abre cada categoria
  btnCategories.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      if (categories[i].classList.contains("hide")) {
        categories[i].classList.remove("hide");
        categoriesIcons[i].style.transform = "rotate(90deg)";
      } else {
        categories[i].classList.add("hide");
        categoriesIcons[i].style.transform = "rotate(0deg)";
      }
    });
  });
}

runActionsOnMenu();

// Event load para que solo se llamen las funciones una vez que ha cargado todo el html y css
window.addEventListener("load", () => {
  // funciones para el slider
  setParentHeight();
  createButtons();
  showSlide(index);
  startInterval();
  nextBtn.addEventListener("click", () => utilityFn(index + 1));
  prevBtn.addEventListener("click", () => utilityFn(index - 1));

  // funciones que sirven para renderizar destacados
  displayDestacados("mens-watches", contenedorTituloHombre);
  displayDestacados("womens-jewellery", contenedorTituloMujer);

  // Quita el loading spinner de la pantalla
  loadingDiv.classList.add("hidden");

  // setParent sera llamado si se reajusta la ventana y adaptar la altura
  window.addEventListener("resize", setParentHeight);
});

export { displayDestacados, fetchProduct };
