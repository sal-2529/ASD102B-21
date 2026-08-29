"use strict";

const getElement = selector => document.querySelector(selector);

// Show the login section
const showLoginDiv = () => {
    getElement("#login").classList.remove("hide");
    getElement("#user").focus();
};

// Hide the login section
const hideLoginDiv = () => {
    getElement("#login").classList.add("hide");
    getElement("#user").value = "";
    getElement("#message").textContent = "";
};

// Show the logout section
const showLogoutDiv = () => {
    getElement("#logout").classList.remove("hide");
    getElement("#btn_logout").focus();
};

// Hide the logout section
const hideLogoutDiv = () => {
    getElement("#logout").classList.add("hide");
    getElement("#name").textContent = "";
};

document.addEventListener("DOMContentLoaded", () => {

    // Check if a username is already stored
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
        hideLoginDiv();
        showLogoutDiv();
        getElement("#name").textContent = savedUser;
    } else {
        showLoginDiv();
        hideLogoutDiv();
    }

    // Log out
    getElement("#btn_logout").addEventListener("click", () => {
        localStorage.removeItem("user");

        showLoginDiv();
        hideLogoutDiv();
    });

    // Log in
    getElement("#btn_login").addEventListener("click", () => {
        const user = getElement("#user").value.trim();

        // Do nothing if the field is blank
        if (user === "") {
            return;
        }

        // Store the username
        localStorage.setItem("user", user);

        // Display the welcome message
        hideLoginDiv();
        showLogoutDiv();
        getElement("#name").textContent = user;
    });
});