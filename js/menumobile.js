export function initmenuMobile () {
    const menuToggle =
    document.querySelector(".menu-toggle");
    const menuList = 
    document.querySelector("nav > ul");

    if (!menuToggle || !menuList) return;

    menuToggle.addEventListener("click", () => {
        menuList.classList.toggle("show");
    });
}