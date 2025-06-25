//Animação Menu
 export function initMenuDropdown() {
  const menuItems = document.querySelectorAll(
    '.menu-item[aria-haspopup="true"]'
  );
  if (menuItems.length === 0) return;

  menuItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      const isExpanded = item.getAttribute("aria-expanded") === "true";

      // Fecha todos os submenus e remove rotação das setas
      menuItems.forEach((i) => {
        i.setAttribute("aria-expanded", "false");
        const submenu = i.querySelector(".submenu");
        const icon = i.querySelector(".fa-caret-down");
        if (submenu) submenu.style.display = "none";
        if (icon) icon.classList.remove("rotated");
      });

      // Abre o submenu clicado, se ainda não estiver aberto
      if (!isExpanded) {
        item.setAttribute("aria-expanded", "true");
        const submenu = item.querySelector(".submenu");
        const icon = item.querySelector(".fa-caret-down");
        if (submenu) submenu.style.display = "block";
        if (icon) icon.classList.add("rotated");
      }
    });
  });

  // Fecha todos os submenus se clicar fora do menu
  document.addEventListener("click", (e) => {
    if (!e.target.closest("nav")) {
      menuItems.forEach((i) => {
        i.setAttribute("aria-expanded", "false");
        const submenu = i.querySelector(".submenu");
        const icon = i.querySelector(".fa-caret-down");
        if (submenu) submenu.style.display = "none";
        if (icon) icon.classList.remove("rotated");
      });
    }
  });
}
//fim menu