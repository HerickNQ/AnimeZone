import { imagens } from "./data.js";

//Animação Carrossel
const track = document.querySelector(".carousel-track");
const prevBtn = document.querySelector(".prev-button");
const nextBtn = document.querySelector(".next-button");
if (track && prevBtn && nextBtn) {
  const totalSlides = imagens.length;
  const carouselWrapper = document.querySelector(".carousel-wrapper");

  let slideWidth; // será definido depois dos slides renderizados
  let visibleSlides;
  let position;

  let isTransitioning = false;
  let slides = [];
  /* começo função*/
  function obterLarguraSlide() {
    const slide = document.querySelector(".carousel-slide");
    if (!slide) return 0;

    const estilo = window.getComputedStyle(slide);
    const largura = slide.getBoundingClientRect().width;
    const margemDireita = parseFloat(estilo.marginRight) || 0;
    const margemEsquerda = parseFloat(estilo.marginLeft) || 0;

    return largura + margemDireita + margemEsquerda;
  }

  function calcularSlidesVisiveis() {
    const slideWidth = obterLarguraSlide();
    const larguraDisponivel = carouselWrapper.offsetWidth;
    if (slideWidth === 0) return 1;
    return Math.floor(larguraDisponivel / slideWidth);
  }
  /* final função*/

  function createSlides() {
    // Clona últios para começo
    const clonesBefore = imagens.slice(-visibleSlides).map((img) => {
      const slide = document.createElement("div");
      slide.className = "carousel-slide";
      slide.innerHTML = `
      <div class="slide-content">
      <a href="${img.link}" target="_blank">
        <img src="${img.src}" alt="Capa do anime ${img.title}" loading="lazy" />
        <div class="slide-title">${img.title}</div>
        </a>
        <i class="favorite-icon fa-regular fa-heart"></i>
      </div>
    `;
      return slide;
    });
    // Clona primeiros para fim
    const clonesAfter = imagens.slice(0, visibleSlides).map((img) => {
      const slide = document.createElement("div");
      slide.className = "carousel-slide";
      slide.innerHTML = `
      <div class="slide-content">
      <a href="${img.link}" target="_blank">
        <img src="${img.src}" alt="Capa do anime ${img.title}" loading="lazy" />
        <div class="slide-title">${img.title}</div>
        </a>
        <i class="favorite-icon fa-regular fa-heart"></i>
      </div>
    `;
      return slide;
    });
    // Slides reais
    const realSlides = imagens.map((img) => {
      const slide = document.createElement("div");
      slide.className = "carousel-slide";
      slide.innerHTML = `
      <div class="slide-content">
      <a href="${img.link}" target="_blank">
        <img src="${img.src}" alt="Capa do anime ${img.title}" loading="lazy" />
        <div class="slide-title">${img.title}</div>
        </a>
       <i class="favorite-icon fa-regular fa-heart"></i> 
      </div>
    `;
      return slide;
    });
    // Adiciona na track na ordem correta
    clonesBefore.forEach((s) => track.appendChild(s));
    realSlides.forEach((s) => track.appendChild(s));
    clonesAfter.forEach((s) => track.appendChild(s));
    slides = [...clonesBefore, ...realSlides, ...clonesAfter];
    slideWidth = obterLarguraSlide();
    visibleSlides = calcularSlidesVisiveis();
    position = visibleSlides;
  }

  // FAVORITOS - localStorage
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  function atualizarFavoritosUI() {
    const icons = document.querySelectorAll(".favorite-icon");
    icons.forEach((icon) => {
      const slide = icon.closest(".carousel-slide");
      const titulo = slide.querySelector(".slide-title").textContent;
      if (favoritos.includes(titulo)) {
        icon.classList.add("favorited");
        icon.classList.replace("fa-regular", "fa-solid");
      } else {
        icon.classList.remove("favorited");
        icon.classList.replace("fa-solid", "fa-regular");
      }
    });
  }

  function ativarEventosFavorito() {
    const icons = document.querySelectorAll(".favorite-icon");
    icons.forEach((icon) => {
      icon.addEventListener("click", () => {
        const slide = icon.closest(".carousel-slide");
        const titulo = slide.querySelector(".slide-title").textContent;

        if (favoritos.includes(titulo)) {
          favoritos = favoritos.filter((f) => f !== titulo);
        } else {
          favoritos.push(titulo);
        }
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        atualizarFavoritosUI();
      });
    });
  }
  //FIM FAVORITOS
  //INICIALIZAÇÃO
  createSlides();
  atualizarFavoritosUI();
  ativarEventosFavorito();
  adicionarEventoAudio();

  window.addEventListener("resize", () => {
    slideWidth = obterLarguraSlide();
    visibleSlides = calcularSlidesVisiveis();
    position = visibleSlides;
    track.style.transition = "none";
    track.style.transform = `translateX(-${position * slideWidth}px)`;
  });

  // Posiciona no primeiro slide real
  track.style.transform = `translateX(-${position * slideWidth}px)`;
  // Função para mover o carrossel
  function moveCarousel(dir) {
    if (isTransitioning) return;
    isTransitioning = true;
    position += dir;
    track.style.transition = "transform 0.4s ease";
    track.style.transform = `translateX(-${position * slideWidth}px)`;
  }
  // Ao terminar a transição, verifica se precisa teletransportar para o outro lado
  track.addEventListener("transitionend", () => {
    if (position === 0) {
      position = totalSlides;
      track.style.transition = "none";
      track.style.transform = `translateX(-${position * slideWidth}px)`;
    } else if (position === totalSlides + visibleSlides) {
      position = visibleSlides;
      track.style.transition = "none";
      track.style.transform = `translateX(-${position * slideWidth}px)`;
    }
    isTransitioning = false;
  });
  // Eventos dos botões
  nextBtn.addEventListener("click", () => moveCarousel(1));
  prevBtn.addEventListener("click", () => moveCarousel(-1));
}

// Mapeamento dos áudios por título
const audios = {
  "One Piece": new Audio("./assets/audio/one-piece.mp3"),
  "Demon Slayer": new Audio("./assets/audio/demon-slayer.mp3"),
  // ...adicione todos que quiser
};

// Função para adicionar o evento de clique para tocar áudio nas imagens do carrossel
function adicionarEventoAudio() {
  // seleciona todas as imagens dentro dos slides
  const imagensDoCarrossel = document.querySelectorAll(".carousel-slide img");

  imagensDoCarrossel.forEach((img) => {
    img.addEventListener("click", (event) => {
      event.preventDefault(); // evita o link abrir, se quiser

      const slide = img.closest(".carousel-slide");
      const titulo = slide.querySelector(".slide-title").textContent;

      // Para garantir que o áudio pare antes de começar outro
      Object.values(audios).forEach((audio) => audio.pause());

      // Reseta o tempo para começar do início
      if (audios[titulo]) {
        audios[titulo].currentTime = 0;
        audios[titulo].play();
      }
    });
  });
}
