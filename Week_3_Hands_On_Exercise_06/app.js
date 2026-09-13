"use strict";

const apiKey = "Th9zAqAnv2HZrENtSKcCpIYI6Ncq6xpiL2rjDd6V";
const domain = "https://api.nasa.gov/neo/rest/v1";

const getElement = selector => document.querySelector(selector);

const output = getElement("#output");

// Get asteroids based on date
const getAsteroidsByDate = async () => {
    output.innerHTML = "<p>Loading asteroid information...</p>";

    try {
        const url = `${domain}/feed?start_date=2026-09-07&end_date=2026-09-08&api_key=${apiKey}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to retrieve asteroid data.");
        }

        const data = await response.json();

        output.innerHTML = "<h2>Asteroids by Date</h2>";

        const asteroids = data.near_earth_objects;

        for (let date in asteroids) {
            for (let asteroid of asteroids[date]) {

                const div = document.createElement("div");
                div.className = "asteroid";

                const name = document.createElement("h3");
                name.textContent = asteroid.name;

                const dateText = document.createElement("p");
                dateText.textContent =
                    "Closest Approach Date: " + date;

                const diameter = document.createElement("p");

                const minimumDiameter =
                    asteroid.estimated_diameter.feet.estimated_diameter_min;

                const maximumDiameter =
                    asteroid.estimated_diameter.feet.estimated_diameter_max;

                diameter.textContent =
                    "Estimated Diameter: " +
                    minimumDiameter.toFixed(2) +
                    " - " +
                    maximumDiameter.toFixed(2) +
                    " feet";

                const hazardous = document.createElement("p");

                hazardous.textContent =
                    "Potentially Hazardous: " +
                    (asteroid.is_potentially_hazardous_asteroid
                        ? "Yes"
                        : "No");

                div.appendChild(name);
                div.appendChild(dateText);
                div.appendChild(diameter);
                div.appendChild(hazardous);

                output.appendChild(div);
            }
        }

    } catch (error) {
        output.innerHTML =
            `<p class="error">Error: ${error.message}</p>`;

        console.error(error);
    }
};


// Get the overall asteroid dataset
const getAsteroidDataset = async () => {
    output.innerHTML = "<p>Loading asteroid information...</p>";

    try {
        const url =
            `${domain}/neo/browse?api_key=${apiKey}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to retrieve asteroid data.");
        }

        const data = await response.json();

        output.innerHTML = "<h2>Overall Asteroid Dataset</h2>";

        const asteroids = data.near_earth_objects;

        for (let asteroid of asteroids) {

            const div = document.createElement("div");
            div.className = "asteroid";

            const name = document.createElement("h3");
            name.textContent = asteroid.name;

            const id = document.createElement("p");
            id.textContent = "ID: " + asteroid.id;

            const hazardous = document.createElement("p");

            hazardous.textContent =
                "Potentially Hazardous: " +
                (asteroid.is_potentially_hazardous_asteroid
                    ? "Yes"
                    : "No");

            div.appendChild(name);
            div.appendChild(id);
            div.appendChild(hazardous);

            output.appendChild(div);
        }

    } catch (error) {
        output.innerHTML =
            `<p class="error">Error: ${error.message}</p>`;

        console.error(error);
    }
};


// First link
getElement("#dateLink").addEventListener("click", event => {
    event.preventDefault();
    getAsteroidsByDate();
});


// Second link
getElement("#browseLink").addEventListener("click", event => {
    event.preventDefault();
    getAsteroidDataset();
});