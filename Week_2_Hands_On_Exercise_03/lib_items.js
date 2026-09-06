"use strict";

class Item {
    #price = 0;

    constructor(type, size, price = 0) {
        this.type = type;
        this.size = size;
        this.#price = price;
    }

    get price() {
        return this.#price;
    }
}


class Burger extends Item {
    #toppings = null;

    constructor(type, size) {

        // Set default type and size
        if (type == "") {
            type = "regular";
        }

        if (size == "") {
            size = "single";
        }

        // Base price
        let price = 5.00;

        // Cheese costs $1 more
        if (type == "cheese") {
            price += 1.00;
        }

        // Double costs $2 more
        if (size == "double") {
            price += 2.00;
        }

        // Call the Item constructor
        super(type, size, price);

        // Create toppings array
        this.#toppings = [];
    }

    addTopping(topping) {
        this.#toppings.push(topping);
    }

    get toppings() {
        return this.#toppings.slice();
    }

    toString() {
        return `${this.size} ${this.type.replace("regular", "")}burger - $${this.price.toFixed(2)}`;
    }
}


class Drink extends Item {

    constructor(type, size) {

        // Set default type and size
        if (type == "") {
            type = "water";
        }

        if (size == "") {
            size = "small";
        }

        // Water is free
        if (type == "water") {
            super(type, size);
        }
        else {

            let price = 2.00;

            // Soda costs $1 more
            if (type == "soda") {
                price += 1.00;
            }

            // Size pricing
            if (size == "medium") {
                price += 0.50;
            }
            else if (size == "large") {
                price += 0.75;
            }

            super(type, size, price);
        }
    }

    toString() {
        return `${this.size} ${this.type} $${this.price.toFixed(2)}`;
    }
}


class Fries extends Item {

    constructor(type, size) {

        // Set default type and size
        if (type == "") {
            type = "regular";
        }

        if (size == "") {
            size = "small";
        }

        // Base price
        let price = 2.50;

        // Curly fries cost $0.50 more
        if (type == "curly") {
            price += 0.50;
        }

        // Size pricing
        if (size == "medium") {
            price += 0.50;
        }
        else if (size == "large") {
            price += 0.75;
        }

        super(type, size, price);
    }

    toString() {
        return `${this.size} ${this.type.replace("regular", "")} fries - $${this.price.toFixed(2)}`;
    }
}