const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navbar = document.querySelector(".navbar");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", mobileMenu);
}

// Transparent at top, solid on scroll
function handleNavbarScroll() {
  if (navbar) {
    navbar.classList.toggle("scrolled", window.scrollY > 10);
  }
}
window.addEventListener("scroll", handleNavbarScroll, { passive: true });
handleNavbarScroll();

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

// Close navbar when link is clicked
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((n) =>
  n.addEventListener("click", () => {
    closeMenu();
  })
);

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

// Event Listeners: Handling toggle event
const toggleSwitch = document.querySelector(".theme-switch input");

//  Store color theme for future visits

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}

if (toggleSwitch) {
  toggleSwitch.addEventListener("change", switchTheme, false);
}

// Restore saved theme, default to light
const currentTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", currentTheme);
if (toggleSwitch) toggleSwitch.checked = currentTheme === "dark";

const myDate = document.querySelector("#datee");
if (myDate) {
  myDate.innerHTML = new Date().getFullYear();
}