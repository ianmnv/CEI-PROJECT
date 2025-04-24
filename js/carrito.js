import { runActionsOnMenu, navigateTo } from "./utilityFnMenu.js";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "./utilityFnsLoadingSpinner.js";
import { getCart, setCart } from "./utilityFnsProducts.js";

showLoadingSpinner();

runActionsOnMenu();
navigateTo();

const spanNumbItems = document.querySelector(".span-numb-of-items");
const productsContainer = document.querySelector(".products-container");
const deleteAllProductsBtn = document.querySelector(".delete-all-btn");
const quantityProductsEl = document.querySelector(".quantity-products");
const priceBeforeTaxesEl = document.querySelector(".price-before-taxes");
const fullPriceEl = document.querySelector(".total-price");

const shoppingCart = getCart();

// calcula los precios totales o parciales y la cantidad de productos en el carrito
function calculatePrices(productsArr) {
  if (productsArr.length === 0) {
    quantityProductsEl.textContent = 0;
    priceBeforeTaxesEl.textContent = 0;
    fullPriceEl.textContent = 0;
    return;
  }

  quantityProductsEl.textContent = productsArr.length;

  const sumPrices = productsArr.reduce((acc, item) => item.price + acc, 0);
  const transformPriceToEur = (amount) =>
    new Intl.NumberFormat("es-ES").format(amount);

  priceBeforeTaxesEl.textContent = `€${transformPriceToEur(sumPrices)}`;
  const taxes = sumPrices * 0.1;
  fullPriceEl.textContent = `€${transformPriceToEur(sumPrices + taxes)}`;
}

// elimina todos los productos del carrito
deleteAllProductsBtn.addEventListener("click", () => {
  localStorage.removeItem("shopping-cart");
  let newShoppingCart = [];
  calculatePrices(newShoppingCart);
  displayCartProducts(newShoppingCart);
});

// elimina productos individuales del carrito
productsContainer.addEventListener("click", (e) => {
  const deleteProductBtn = e.target
    .closest(".delete-product-btn")
    .closest(".product-inner-container");
  if (!deleteProductBtn) return;

  const currentCart = getCart();

  if (deleteProductBtn) {
    const productIndex = currentCart.findIndex(
      (product) => product.id === +deleteProductBtn.dataset.productId
    );

    const newShoppingCart = [
      ...currentCart.slice(0, productIndex),
      ...currentCart.slice(productIndex + 1),
    ];

    setCart(newShoppingCart);
    localStorage.setItem("shopping-cart", JSON.stringify(newShoppingCart));
    calculatePrices(newShoppingCart);
    displayCartProducts(newShoppingCart);
  }
});

// despliega los productos acorde al arreglo de productos
function displayCartProducts(cartProducts) {
  productsContainer.innerHTML = "";

  if (cartProducts.length === 0) {
    const h3El = document.createElement("h3");
    h3El.textContent = "¡Tu carrito esta vacio!";
    productsContainer.append(h3El);
  }

  cartProducts.forEach(({ thumbnail, title, price, stock, id }) => {
    const singleProductContainer = document.createElement("div");
    singleProductContainer.classList.add("product-container", "flex");

    const productImg = document.createElement("img");
    productImg.setAttribute("src", thumbnail);
    productImg.setAttribute("alt", "imagen de producto");
    productImg.setAttribute("loading", "lazy");
    productImg.classList.add("carrito-producto-img");

    const infoContainer = document.createElement("div");
    infoContainer.classList.add("product-info-container", "flex");

    const productTitle = document.createElement("h3");
    productTitle.textContent = title;

    const innerDiv = document.createElement("div");
    innerDiv.classList.add("product-inner-container", "flex");
    innerDiv.setAttribute("data-product-id", id);

    innerDiv.innerHTML = `
      <span>Precio: $${price}</span>
      <span>Stock: ${stock}</span>
  
      <button class="delete-product-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="trash-icon"
        >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
    `;

    infoContainer.append(productTitle, innerDiv);
    singleProductContainer.append(productImg, infoContainer);
    productsContainer.append(singleProductContainer);
  });

  spanNumbItems.textContent = cartProducts.length;
}

window.addEventListener("load", () => {
  hideLoadingSpinner();
  displayCartProducts(shoppingCart);
  calculatePrices(shoppingCart);
});
