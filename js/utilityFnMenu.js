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
  });

  // evento que cierra el menu de categorias
  closeMenuBtn.addEventListener("click", () => {
    menuMobile.classList.remove("menu-transition");
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

// funcion que obtiene el atributo data y pasarlo a 'categoriaPlantilla.js' y desplegar
// informacion de los productos dinamicamente, y no sobre escribir el mismo codigo en
// multiples archivos html
function navigateTo() {
  categories.forEach((category) => {
    category.addEventListener("click", (e) => {
      const categoriaId = e.target.dataset.categoriaId;
      if (!categoriaId) return;
      sessionStorage.setItem("data-categoria-id", categoriaId);
    });
  });
}

export { runActionsOnMenu, navigateTo };
