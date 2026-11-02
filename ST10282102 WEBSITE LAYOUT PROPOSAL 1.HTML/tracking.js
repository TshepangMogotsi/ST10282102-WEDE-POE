
document.addEventListener("DOMContentLoaded", function () {

    const trackingForm = document.getElementById("tracking-form");
    const trackingResult = document.getElementById("tracking-result");

    if (!trackingForm || !trackingResult) return;

    trackingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const trackingNumber = document
            .getElementById("tracking-number")
            .value.trim();

        const order = JSON.parse(
            sessionStorage.getItem("queensLastOrder") || "null"
        );

        if (!order || trackingNumber !== order.number) {

            trackingResult.innerHTML =
                "<p class='tracking-error'>Sorry! We could not find this order number. Please check and try again.</p>";

            return;
        }

        trackingResult.innerHTML = `
            <div class="tracking-details">

                <h3>Order Found!</h3>

                <p><strong>Order Number:</strong> ${order.number}</p>

                <p><strong>Customer:</strong> ${escapeText(order.name)}</p>

                <p><strong>Order Total:</strong> R${Number(order.total).toFixed(2)}</p>

                <h4>Order Progress</h4>

                <ul class="tracking-progress">
                    <li class="completed">Order Placed ✓</li>
                    <li class="current">Order Received ✓</li>
                    <li>Preparing Your Treats</li>
                    <li>Ready for Delivery / Collection</li>
                </ul>

                <p class="tracking-note">
                    Thank you for choosing Queens Cookies Bakery!
                </p>

            </div>
        `;

    });

    function escapeText(value) {
        const element = document.createElement("span");
        element.textContent = String(value || "");
        return element.innerHTML;
    }

});
