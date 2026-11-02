document.addEventListener("DOMContentLoaded", function () {

    const orderNumber = document.getElementById("confirmation-number");
    const orderDetails = document.getElementById("confirmation-details");
    const orderTotal = document.getElementById("confirmation-total");

    let order = null;

    try {
        order = JSON.parse(sessionStorage.getItem("queensLastOrder"));
    } catch (error) {
        order = null;
    }

    // Check whether an order exists
    if (!order) {
        if (orderNumber) {
            orderNumber.textContent = "Unavailable";
        }

        if (orderDetails) {
            orderDetails.textContent =
                "No recent order was found. Please visit our menu to place an order.";
        }

        if (orderTotal) {
            orderTotal.textContent = "R0.00";
        }

        return;
    }

    // Display the order number
    if (orderNumber) {
        orderNumber.textContent = order.number || "Unavailable";
    }

    // Display the customer's confirmation message
    if (orderDetails) {
        orderDetails.textContent =
            "Thank you, " + (order.name || "valued customer") +
            "! We appreciate your support of Queens Cookies Bakery.";
    }

    // Display the order total in South African Rand
    if (orderTotal) {
        orderTotal.textContent = new Intl.NumberFormat("en-ZA", {
            style: "currency",
            currency: "ZAR"
        }).format(Number(order.total) || 0);
    }

});

