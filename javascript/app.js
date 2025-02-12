// Game const & variable


let inputDir = {x: 0, y: 0};
//let foodSound = new Audio('food.mp3');
//let gameOverSound = new Audio('gameOver.mp3');
//let moveSound = new Audio('move.mp3');
//let musicSound = new Audio('music.mp3');
let score = 0;
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y:15}
];
let food = {x: 6, y: 9}

// Game function
let main = (ctime) => {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime)/1000 < 1/speed) {
        return
    } lastPaintTime = ctime;
    gameEngine()
}

let isCollide = (snake) => {
    // if you bump into yourself
    for ( let i = 1; i < snake.length; i++ ) {
        if ( snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true
        }
    }
    // if you bump into the wall 
    if ( snake[0].x >= 20 || snake[0].x <= 0 || snake[0].y >= 20 || snake[0].y <= 0) {
        return true
    }
}


let gameEngine = () =>{
    // part 1: updating the snake array variable
    if (isCollide(snakeArr)) {
        //gameOverSound.play();
       // musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over, Press Any Key To Play Again");
        snakeArr = [{x: 13, y:15}];
       // musicSound.play();
        score = 0;
    }

    // if you have eaten your food increment the score and regenerate the food
    if (snakeArr[0].y === food.y & snakeArr[0].x === food.x) {
       // foodSound.play()
        score+= 1;
        scoreBox.innerHTML = "Score : " + score;
        if ( score > HighScore) {
            HighScoreVal = score;
            localStorage.setItem("HiScore", JSON.stringify(HighScoreVal));
            highScoreBox.innerHTML = "Hiscore: " + HighScoreVal;
        }
        snakeArr.unshift ({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 18;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // moving the snake
    for ( let i = snakeArr.length - 2; i >= 0; i--) {
        // const element = array[i];
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2 : display the snake & food
    // display the snake
    box.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if ( index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        box.appendChild(snakeElement);

        // display the food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        box.appendChild(foodElement);
    })

}



// Main logic starts here
let HighScore = localStorage.getItem("HiScore");
if ( HighScore === null) {
    HighScoreVal = 0;
    localStorage.setItem("HighScore", JSON.stringify(HighScoreVal))
} else {
    HighScore.val = JSON.parse(HighScore)
    highScoreBox.innerHTML = "Hiscore: " + HighScore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = {x: 0, y: 1} //start the game
   // moveSound.play()
    //moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0
            inputDir.y = -1
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0
            inputDir.y = 1
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1
            inputDir.y = 0
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1
            inputDir.y = 0
            break;
        default:
            break;
    }
})