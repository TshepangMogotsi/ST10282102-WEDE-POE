document.addEventListener("DOMContentLoaded", function () {

    const buttons = document.querySelectorAll(".add-to-cart");

    // Add a product to the shopping cart
    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            const product = button.closest(".menu-item");

            const name = product.dataset.name;
            const price = Number(product.dataset.price);

            // Get the existing cart
            let cart = [];

            try {
                cart = JSON.parse(
                    localStorage.getItem("queensCart")
                ) || [];
            } catch (error) {
                cart = [];
            }

            // Check whether the product is already in the cart
            const existingProduct = cart.find(function (item) {
                return item.name === name;
            });

            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push({
                    name: name,
                    price: price,
                    quantity: 1
                });
            }

            // Save the updated cart
            localStorage.setItem(
                "queensCart",
                JSON.stringify(cart)
            );

            // Show confirmation
            alert(name + " has been added to your cart!");

        });

    });

});