import { initMenuDropdown } from "./menu.js";
import { initmenuMobile } from "./menumobile.js";
import "./carrossel.js";
import "./favoritos.js";

fetch("header.html")
.then(res => res.text())
.then(data => {
  document.querySelector("header").innerHTML = data;
  initMenuDropdown();
  initmenuMobile();
});

console.log("      Este projeto foi feito por alguem que continuou mesmo quando ninguém acreditava. AnimeZone é mais do que código - é minha prova de resistência.");