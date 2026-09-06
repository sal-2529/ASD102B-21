"use strict";

const getElement = selector => document.querySelector(selector);


const uncheckAll = () => {

    const inputs = document.querySelectorAll("input");

    for (let input of inputs) {

        if (input.checked) {
            input.checked = false;
        }
    }
};


const getCheckedValue = selector => {

    let value = "";

    const inputs = document.querySelectorAll(selector);

    for (let input of inputs) {

        if (input.checked) {
            value = input.value;
        }
    }

    return value;
};


document.addEventListener("DOMContentLoaded", () => {

    // Create a new order
    let order = new Order();


    // Add Order button
    getElement("#add_order").addEventListener("click", () => {

        let type = "";
        let size = "";


        // -------------------------
        // ADD BURGER
        // -------------------------

        type = getCheckedValue("input[name='burger_type']");
        size = getCheckedValue("input[name='burger_size']");

        // Only add a burger if type OR size is selected.
        // This prevents toppings-only orders.
        if (type || size) {

            const burger = new Burger(type, size);

            const toppings = document.querySelectorAll(
                "#toppings input"
            );

            for (let topping of toppings) {

                if (topping.checked) {
                    burger.addTopping(topping.value);
                }
            }

            order.add(burger);
        }


        // -------------------------
        // ADD DRINK
        // -------------------------

        type = getCheckedValue("input[name='drink_type']");
        size = getCheckedValue("input[name='drink_size']");

        if (type || size) {

            const drink = new Drink(type, size);

            order.add(drink);
        }


        // -------------------------
        // ADD FRIES
        // -------------------------

        type = getCheckedValue("input[name='fry_type']");
        size = getCheckedValue("input[name='fry_size']");

        if (type || size) {

            const fries = new Fries(type, size);

            order.add(fries);
        }


        // -------------------------
        // DISPLAY ORDER
        // -------------------------

        const orderDetailsDiv = getElement("#order_details");

        order.display(orderDetailsDiv);


        // Clear selections
        uncheckAll();
    });


    // Clear Order button
    getElement("#clear_order").addEventListener("click", () => {

        // Clear selected menu items
        uncheckAll();

        // Clear the order
        order.clear();

        // Clear the order display
        getElement("#order_details").textContent = "";
    });

});