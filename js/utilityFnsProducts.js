"use strict";

// // funcion para obtener productos falsos desde dummyjson.com
async function fetchProducts(queryArray) {
  const allProducts = await Promise.all(
    queryArray.map(async (query) => {
      const { products } = await fetch(
        `https://dummyjson.com/products/category/${query}`
      ).then((product) => product.json());
      return products;
    })
  );

  return allProducts.flat();

  // // Categorias que se muestran en la pagina

  // PARA HOMBRE
  // mens-shirts
  // mens-shoes
  // mens-watches
  // sunglasses

  // PARA MUJER
  // womens-dresses
  // womens-shoes
  // womens-jewellery
  // womens-watches
  // womens-bags
}

// // hace un request al dummyjson API y despliega 'cards', funcion reusable
async function displayCardProducts(productsArray, contenedorPadre) {
  contenedorPadre.innerHTML = "";

  const contenedorGrid = document.createElement("div");
  contenedorGrid.classList.add("features-grid");

  productsArray.map(({ title, price, thumbnail, rating, id }) => {
    const contenedorAnchor = document.createElement("a");
    contenedorAnchor.classList.add("features-card");
    contenedorAnchor.setAttribute("href", "./productoIndividual.html");
    contenedorAnchor.setAttribute("data-product-id", id);

    const tituloEl = document.createElement("h3");
    tituloEl.classList.add("feature-card-title");
    tituloEl.textContent = title;

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("feature-card-info");

    const ratingSpan = document.createElement("span");
    ratingSpan.textContent = `⭐️ ${rating}`;
    const precioSpan = document.createElement("span");
    precioSpan.classList.add("feature-card-price");
    precioSpan.textContent = `$ ${price}`;

    const imgEl = document.createElement("img");
    imgEl.classList.add("feature-card-img");
    imgEl.setAttribute("src", thumbnail);
    imgEl.setAttribute("alt", "elementos destacados");
    imgEl.setAttribute("loading", "lazy");

    infoDiv.append(precioSpan, ratingSpan);
    contenedorAnchor.append(imgEl, tituloEl, infoDiv);
    contenedorGrid.append(contenedorAnchor);
  });

  contenedorGrid.addEventListener("click", (e) => {
    const productCard = e.target.closest(".features-card");
    sessionStorage.setItem("single-product-id", productCard.dataset.productId);
  });

  contenedorPadre.append(contenedorGrid);
}

let shoppingCart = JSON.parse(localStorage.getItem("shopping-cart")) || [];

const getCart = () => shoppingCart;

const setCart = (newArray) => (shoppingCart = newArray);

export { fetchProducts, displayCardProducts, getCart, setCart };
