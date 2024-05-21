let currMoleTile;
let currPlantTile;
let score = 0;
let topScore = localStorage.getItem('topScore') || 0;
let gameOver = false;
let level = 1;

window.onload = function() {
    setGame();
    updateTopScoreDisplay(); // Call function to update top score display
}

function updateTopScoreDisplay() {
    document.getElementById("top-score").innerText = "All Time Top 1 Score: " + topScore;
}

function setGame() {
    //set up the grid in html
    for (let i = 0; i < 9; i++) { //i goes from 0 to 8, stops at 9
        //<div id="0-8"></div>
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    // Start with level 1
    startLevel(level);
}

function getRandomTile() {
    //math.random --> 0-1 --> (0-1) * 9 = (0-9) --> round down to (0-8) integers
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return;
    }
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        return;
    }
    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }
    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) {
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this == currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString(); //update score html
        if (score > topScore) { // Check if the current score is higher than the top score
            topScore = score;
            localStorage.setItem('topScore', topScore); // Store the new top score in local storage
            document.getElementById("top-score").innerText = "Top Score: " + topScore; // Update top score display
        }
    }
    else if (this == currPlantTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString(); //update score html
        gameOver = true;
    }
    
    // Check if the score falls within the range for level progression
    if ((score >= 0 && score <= 90 && level !== 1) ||
        (score >= 100 && score <= 190 && level !== 2) ||
        (score >= 200 && score <= 300 && level !== 3)) {
        level++;
        document.getElementById("level").innerText = "Level: " + level.toString(); // Update level display
        startLevel(level);
    }
}


function startLevel(level) {
    switch (level) {
        case 1:
            setInterval(setMole, 1500); // 1500 milliseconds = 1 second, moles appear every 1 second
            setInterval(setPlant, 2500); // 2500 milliseconds = 2 seconds, plants appear every 2 seconds
            break;
        case 2:
            setInterval(setMole, 1000); // Moles appear every 1000 seconds
            setInterval(setPlant, 2000); // Plants appear every 2000 seconds
            break;
        case 3:
            setInterval(setMole, 800); // Moles appear every 0.6 seconds
            setInterval(setPlant, 1600); // Plants appear every 1.2 seconds
            break;
        // Add more levels as needed
    }
}
