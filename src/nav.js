const navMobile = document.querySelector("#nav-mobile"),
    navToggleButton = document.querySelector("#nav-toggle-button");
const navHiddenCss = "nav-mobile-hidden";
let mobileMenuOpen = false;

const closeNavMobile = () => {
    mobileMenuOpen = false;
    navMobile.classList.add(navHiddenCss);
    navToggleButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
}

const openNavMobile = () => {
    mobileMenuOpen = true;
    navMobile.classList.remove(navHiddenCss);
    navToggleButton.setAttribute("aria-expanded", "true");
    document.body.classList.add("no-scroll");
}

const toggleNavMobile = () => {
    if (navMobile.classList.contains(navHiddenCss)) {
        openNavMobile();
    } else {
        closeNavMobile();
    }
}

navToggleButton.addEventListener("click", toggleNavMobile);
navMobile.querySelectorAll(".nav-link").forEach(nm => nm.addEventListener("click", toggleNavMobile));
navMobile.querySelector(".nav-link").addEventListener("nav-mobile-menu-button", toggleNavMobile);

document.body.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
        closeNavMobile();
    }
})

window.addEventListener("resize", () => {
    if (mobileMenuOpen && window.innerWidth > 768) {
        closeNavMobile();
    }
});
