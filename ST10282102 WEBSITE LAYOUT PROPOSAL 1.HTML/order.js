document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("order-form");
    const cartContainer = document.getElementById("cart-items");
    const totalElement = document.getElementById("order-total");
    const deliveryMethod = document.getElementById("delivery-method");
    const addressSection = document.getElementById("delivery-address");
    const addressInput = document.getElementById("address");
    const message = document.getElementById("order-message");

    if (!form) return;

    function getCart() {
        try {
            return JSON.parse(localStorage.getItem("queensCart")) || [];
        } catch {
            return [];
        }
    }

    function formatMoney(amount) {
        return new Intl.NumberFormat("en-ZA", {
            style: "currency",
            currency: "ZAR"
        }).format(amount);
    }

    function renderCart() {
        const cart = getCart();
        let total = 0;

        cartContainer.replaceChildren();

        if (cart.length === 0) {
            cartContainer.textContent = "Your basket is empty.";
        }

        cart.forEach(function (item, index) {
            const subtotal = item.price * item.quantity;
            total += subtotal;

            const row = document.createElement("p");
            row.textContent =
                `${item.name} × ${item.quantity} — ${formatMoney(subtotal)} `;

            const removeButton = document.createElement("button");
            removeButton.type = "button";
            removeButton.textContent = "Remove";

            removeButton.addEventListener("click", function () {
                const updatedCart = getCart();
                updatedCart.splice(index, 1);

                localStorage.setItem(
                    "queensCart",
                    JSON.stringify(updatedCart)
                );

                renderCart();
            });

            row.appendChild(removeButton);
            cartContainer.appendChild(row);
        });

        totalElement.textContent = formatMoney(total);
    }

    function updateAddress() {
        const needsAddress = deliveryMethod.value === "delivery";

        addressSection.hidden = !needsAddress;
        addressInput.required = needsAddress;
    }

    deliveryMethod.addEventListener("change", updateAddress);
    updateAddress();
    renderCart();

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!form.reportValidity()) return;

        const cart = getCart();

        if (cart.length === 0) {
            message.textContent =
                "Please add products from the menu before placing an order.";
            return;
        }

        const formData = new FormData(form);

        const order = {
            number: "QC" + Date.now().toString().slice(-8),
            name: formData.get("fullName"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            delivery: formData.get("deliveryMethod"),
            address: formData.get("address") || "",
            payment: formData.get("paymentMethod"),
            items: cart,
            total: cart.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            )
        };

        sessionStorage.setItem(
            "queensLastOrder",
            JSON.stringify(order)
        );

        // Demonstration only: this does not process a real payment.
        window.location.href = "thankyou.html";
    });

});