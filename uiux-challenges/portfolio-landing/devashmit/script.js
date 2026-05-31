/**
 * Portfolio Landing Page — Hamburger Menu
 * Day 1 — UI/UX Challenge
 * Author: devashmit
 */

const hamburger = document.getElementById("hamburger");
const navLinks  = document.querySelector(".nav__links");

hamburger.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", isOpen);
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  });
});
