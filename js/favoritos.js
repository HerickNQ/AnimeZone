// FAVORITOS - Página de Favoritos
import { imagens } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("favoritos-container");

  if (container && typeof imagens !== "undefined") {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const favoritosFiltrados = imagens.filter((anime) =>
      favoritos.includes(anime.title))
    .sort((a, b) => a.title.localeCompare(b.title));

    if (favoritosFiltrados.length === 0) {
      container.innerHTML = "<p>Nenhum favorito adicionado ainda 😢</p>";
    } else {
      favoritosFiltrados.forEach((anime) => {
        const card = document.createElement("div");
        card.className = "carousel-slide";
        card.innerHTML = `
          <div class="slide-content">
            <a href="${anime.link}" target="_blank">
              <img src="${anime.src}" alt="Capa do anime ${anime.title}" loading="lazy">
              <div class="slide-title">${anime.title}</div>
            </a>
            <i class="favorite-icon fa-solid fa-heart favorited"></i>
          </div>
        `;
        // Adiciona evento de clique para remover
        const icon = card.querySelector(".favorite-icon");
        icon.addEventListener("click", () => {
          const index = favoritos.indexOf(anime.title);
          if (index > -1) {
            favoritos.splice(index, 1);
            localStorage.setItem("favoritos", JSON.stringify(favoritos));
            card.remove();

            // Se não houver mais favoritos, exibe mensagem
            if (document.querySelectorAll(".carousel-slide").length === 0) {
              container.innerHTML =
                "<p>Nenhum favorito adicionado ainda 😢</p>";
            }
          }
        });
        container.appendChild(card);
      });
    }
  }
});

//FIM PAGINA FAVORITOS