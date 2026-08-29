"use strict";

const getElement = selector => document.querySelector(selector);

let scores = [];

const displayScores = scores => {

    // Filter scores
    let filteredScores = scores.slice();

    const filter = Number(getElement("#filter").value);

    if (filter > 0) {
        filteredScores = filteredScores.filter(student => {
            return student[2] >= filter;
        });
    }

    // Sort filtered scores
    const sort = getElement("#sort").value;

    if (sort === "fname") {
        filteredScores.sort((a, b) => {
            return a[0].localeCompare(b[0]);
        });
    } 
    else if (sort === "lname") {
        filteredScores.sort((a, b) => {
            return a[1].localeCompare(b[1]);
        });
    } 
    else if (sort === "score") {
        filteredScores.sort((a, b) => {
            return b[2] - a[2];
        });
    }

    // Get total and build display string
    let total = 0;
    let display = "";

    for (const student of filteredScores) {
        display += `${student[0]} ${student[1]}: ${student[2]}\n`;
        total += student[2];
    }

    // Calculate the average
    let average = 0;

    if (filteredScores.length > 0) {
        average = total / filteredScores.length;
    }

    // Display the results
    getElement("#score_list").value = display;
    getElement("#avg").textContent = average.toFixed(1);
};


document.addEventListener("DOMContentLoaded", () => {

    // Add Score button
    getElement("#add_score").addEventListener("click", () => {

        const firstName = getElement("#first_name").value.trim();
        const lastName = getElement("#last_name").value.trim();
        const score = Number(getElement("#score").value);

        // Make sure all fields contain information
        if (firstName === "" || lastName === "" || isNaN(score)) {
            return;
        }

        // Store the information as an array
        scores.push([firstName, lastName, score]);

        // Clear the input boxes
        getElement("#first_name").value = "";
        getElement("#last_name").value = "";
        getElement("#score").value = "";

        // Display the scores
        displayScores(scores);

        // Set focus back to first name
        getElement("#first_name").focus();
    });


    // Clear Scores button
    getElement("#clear_scores").addEventListener("click", () => {

        scores = [];

        displayScores(scores);

        getElement("#first_name").focus();
    });


    // Sort dropdown
    getElement("#sort").addEventListener("change", () => {
        displayScores(scores);
    });


    // Filter dropdown
    getElement("#filter").addEventListener("change", () => {
        displayScores(scores);
    });


    // Set focus on first text box
    getElement("#first_name").focus();

    // Display scores when the page loads
    displayScores(scores);
});