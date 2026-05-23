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
const homeSections = document.querySelectorAll("#about, #process, #projects, #contact");

function setActiveNavLink(activeId) {
  navLink.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeId}`;
    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function updateActiveNavLink() {
  let activeId = "about";
  const navbarOffset = navbar ? navbar.offsetHeight + 1 : 53;

  homeSections.forEach((section) => {
    const sectionTop = section.offsetTop - navbarOffset;
    if (window.scrollY >= sectionTop) {
      activeId = section.id;
    }
  });

  setActiveNavLink(activeId);
}

navLink.forEach((n) =>
  n.addEventListener("click", () => {
    const targetId = n.getAttribute("href")?.replace("#", "");
    if (targetId) setActiveNavLink(targetId);
    closeMenu();
  })
);

window.addEventListener("scroll", updateActiveNavLink, { passive: true });
window.addEventListener("resize", updateActiveNavLink);
updateActiveNavLink();

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

// Restore saved theme, fall back to system preference
const savedTheme = localStorage.getItem("theme");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const currentTheme = savedTheme || (systemDark ? "dark" : "light");
document.documentElement.setAttribute("data-theme", currentTheme);
if (toggleSwitch) toggleSwitch.checked = currentTheme === "dark";

const myDate = document.querySelector("#datee");
if (myDate) {
  myDate.innerHTML = new Date().getFullYear();
}

// Team Slider Arrows
const teamSlider = document.getElementById('team-slider');
const teamPrev = document.getElementById('team-prev');
const teamNext = document.getElementById('team-next');

// Randomize Team order on load
if (teamSlider) {
  const cards = Array.from(teamSlider.querySelectorAll('.profile-card'));
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  cards.forEach(card => teamSlider.appendChild(card));
  teamSlider.scrollLeft = 0;
}

if (teamSlider && teamPrev && teamNext) {
  teamPrev.addEventListener('click', () => {
    // Scroll left by one card width + gap
    const cardWidth = teamSlider.querySelector('.profile-card').offsetWidth;
    const gap = parseFloat(getComputedStyle(teamSlider).gap) || 28;
    teamSlider.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
  });

  teamNext.addEventListener('click', () => {
    // Scroll right by one card width + gap
    const cardWidth = teamSlider.querySelector('.profile-card').offsetWidth;
    const gap = parseFloat(getComputedStyle(teamSlider).gap) || 28;
    teamSlider.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
  });
}
