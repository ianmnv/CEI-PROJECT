"use strict";

// // Crea un loading spinner
const loadingDiv = document.createElement("div");
loadingDiv.className = "slider-loading";
loadingDiv.innerHTML = `
    <div class="loading-spinner"></div>
    <p>Loading content...</p>
  `;
document.body.appendChild(loadingDiv);

setTimeout(() => {
  // // Seleccionando imagenes de la primera seccion y modificando sus posiciones
  const containerSection = document.querySelector(".section-portada-wrapper");
  const imgsContainer = containerSection.querySelectorAll(
    ".section-portada-div"
  );
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
    const height = imgsContainer[0].scrollHeight;
    containerSection.style.height = `${height}px`;
  }

  function utilityFn(ind) {
    clearInterval(slideInterval);
    showSlide(ind);
    startInterval();
  }

  setParentHeight();
  createButtons();
  showSlide(index);
  startInterval();

  nextBtn.addEventListener("click", () => utilityFn(index + 1));
  prevBtn.addEventListener("click", () => utilityFn(index - 1));
  window.addEventListener("resize", setParentHeight);

  // Quita el loading spinner de la pantalla
  loadingDiv.classList.add("hidden");
}, 2000);

// // funcion para obtener productos falsos desde dummyjson.com
async function fetchProduct(category) {
  const product = await fetch(
    `https://dummyjson.com/products/category/${category}`
  ).then((product) => product.json());

  return product;

  // // Categorias por las que se muestran en la pagina
  // mens-shirts
  // mens-watches
  // womens-jewellery
  // womens-dresses
}

// // Obtiene productos para destacados y los muestra en la pagina
async function displayDestacados() {
  const menWatches = await fetchProduct("mens-watches");
  const womensJewellery = await fetchProduct("womens-jewellery");
  console.log(menWatches);

  const contenedorTituloHombre = document.querySelector(".titulo-H");
  const contenedorTituloMujer = document.querySelector(".titulo-M");

  const menWatchesArr = menWatches.products.slice(0, 4);
  const womensJewelleryArr = womensJewellery.products.slice(0, 4);

  loopOver(menWatchesArr, contenedorTituloHombre);
  loopOver(womensJewelleryArr, contenedorTituloMujer);
}

// // funcion de utilidad para mostrar productos
function loopOver(array, contenedor) {
  const contenedorGrid = document.createElement("div");
  contenedorGrid.classList.add("features-grid");

  array.map((el) => {
    const contenedorAnchor = document.createElement("a");
    contenedorAnchor.classList.add("destacados-card");
    contenedorAnchor.setAttribute("href", "#");

    const tituloEl = document.createElement("h3");
    tituloEl.classList.add("feature-card-title");
    tituloEl.textContent = el.title;

    const precioSpan = document.createElement("span");
    precioSpan.classList.add("feature-card-price");
    precioSpan.textContent = `$ ${el.price}`;

    const imgEl = document.createElement("img");
    imgEl.classList.add("feature-card-img");
    imgEl.setAttribute("src", el.thumbnail);
    imgEl.setAttribute("alt", "elementos destacados");

    contenedorAnchor.append(imgEl, tituloEl, precioSpan);
    contenedorGrid.append(contenedorAnchor);
    contenedor.after(contenedorGrid);
  });
}

displayDestacados();
