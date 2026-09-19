
"use strict";

const scores = [];

const displayScores = () => scores.join(", ");

const calculateAverage = () => {
    const total = scores.reduce(
        (prev, curr) => prev + parseInt(curr),
        0
    );

    return total / scores.length;
};

// Load user entries into the scores array
for (let i = 2; i < process.argv.length; i++) {
    scores.push(process.argv[i]);
}

// Display all scores
console.log(`All scores: ${displayScores()}`);

// Display average score
console.log(`Average score: ${calculateAverage().toFixed(0)}`);