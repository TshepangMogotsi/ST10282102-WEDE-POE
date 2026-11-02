document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("community-form");
    const message = document.getElementById("community-message");

    if (!form || !message) {
        return;
    }

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        if (!form.reportValidity()) {
            return;
        }

        message.textContent =
            "Thank you for your interest in our community initiatives!";

        form.reset();

    });

});