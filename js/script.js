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
const seccionContenedora = document.querySelector(".section-portada");
const imgsDePortada = seccionContenedora.querySelectorAll("img");

imgsDePortada.forEach((img, i) => {
  img.style.transform = `translateX(-${i * 100}%)`;
});
