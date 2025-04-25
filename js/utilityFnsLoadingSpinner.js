"use strict";

let loadingDiv;

// // Crea un loading spinner
function showLoadingSpinner() {
  loadingDiv = document.createElement("div");
  loadingDiv.className = "slider-loading";
  loadingDiv.innerHTML = `
      <div class="loading-spinner"></div>
      <p>Loading content...</p>
    `;
  document.body.appendChild(loadingDiv);
}
// Quita el loading spinner de la pantalla

const hideLoadingSpinner = () => loadingDiv.classList.add("hidden");

export { showLoadingSpinner, hideLoadingSpinner };
