// // funcion para obtener productos falsos desde dummyjson.com
async function fetchProduct(category) {
  const product = await fetch(
    `https://dummyjson.com/products/category/${category}`
  ).then((product) => product.json());

  return product;

  // // Categorias que se muestran en la pagina
  // mens-shirts
  // mens-watches
  // mens-shoes
  // womens-jewellery
  // womens-dresses
  // womens-shoes
}

// // hace un request al dummyjson API y despliega 'cards', funcion reusable
export async function displayCardProducts(query, contenedorPadre) {
  const { products } = await fetchProduct(query);

  const contenedorGrid = document.createElement("div");
  contenedorGrid.classList.add("features-grid");

  products.map(({ title, price, thumbnail, rating }, i) => {
    console.log(products[i]);

    const contenedorAnchor = document.createElement("a");
    contenedorAnchor.classList.add("features-card");
    contenedorAnchor.setAttribute("href", "./productoIndividual.html");

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

  contenedorPadre.append(contenedorGrid);
}
