// // menu acordion que se muestra tras hacer click en el icono de barras del header
export default function runActionsOnMenu() {
  const menuBtn = document.querySelector(".header-btn-menu");
  const menuMobile = document.querySelector(".menu-mobile");
  const closeMenuBtn = document.querySelector(".close-icon");
  const btnCategories = menuMobile.querySelectorAll(".menu-acc-btn");
  const categories = menuMobile.querySelectorAll(".menu-accordion-categorias");
  const categoriesIcons = menuMobile.querySelectorAll(".menu-category-icons");
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
