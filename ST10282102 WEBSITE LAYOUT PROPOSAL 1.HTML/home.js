
document.addEventListener("DOMContentLoaded", function () {
    // Welcome message
    const welcomeButton = document.getElementById("welcome-button");

    if (welcomeButton) {
        welcomeButton.addEventListener("click", function () {
            alert("Welcome to Queens Cookies Bakery! Freshly baked with love.");
        });
    }

    // Mobile navigation
    const menuToggle = document.getElementById("menu-toggle");
    const navigation = document.getElementById("main-nav");

    if (menuToggle && navigation) {
        menuToggle.addEventListener("click", function () {
            const opened = navigation.classList.toggle("nav-open");
            menuToggle.setAttribute("aria-expanded", String(opened));
        });
    }

    // Basket count
    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        try {
            const cart = JSON.parse(localStorage.getItem("queensCart")) || [];
            cartCount.textContent = cart.reduce(
                (sum, item) => sum + item.quantity, 0
            );
        } catch {
            cartCount.textContent = "0";
        }
    }

    // Smooth scrolling for links to page sections
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const target = document.querySelector(link.getAttribute("href"));

            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});
