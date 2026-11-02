document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contact-form");
    const message = document.getElementById("contact-message");

    if (!form || !message) {
        return;
    }

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        // Check that required fields are completed
        if (!form.reportValidity()) {
            return;
        }

        // Show a confirmation message
        message.textContent =
            "Thank you for contacting Queens Cookies Bakery! " +
            "Your form has been completed successfully.";

        // Clear the form
        form.reset();

    });

});