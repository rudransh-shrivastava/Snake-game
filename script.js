console.log("Script is loading");
let blocksize = 25;
let rows = 20;
let columns = 20;
let board;
let context;
let score = 0;
let highScore = parseInt(localStorage.getItem('highScore'), 10) || 0;
let hitHighScore = false;
let snakex = blocksize * 5;
let snakey = blocksize * 5;

let foodx;
let foody;
let gameOver = false;
let snakeBody = []
let gameInterval;
let velocityx = 0;
let velocityy = 0;


const eatSound = new Audio('eatingsound.mp3');
const killSound = new Audio('killedsound.mp3')
eatSound.preload = 'auto';
killSound.preload = 'auto';
function initializeGame()
{
    score = 0;
    velocityx = 0;
    velocityy = 0;
    snakex = blocksize * 5;
    snakey = blocksize * 5;
    gameOver = false;
    snakeBody = [];
    document.getElementById("box").innerHTML = `Score = ${score}`;
    document.getElementById("highScore").innerHTML = `High score = ${highScore}`;
    board = document.getElementById("board");
    board.height = rows * blocksize;
    board.width = columns * blocksize;
    context = board.getContext("2d");

    placefood();
    document.addEventListener("keyup", changeDirection);

    if(gameInterval)
        clearInterval(gameInterval);

    gameInterval = setInterval(update, 100);
}

window.onload = initializeGame;

function update() 
{
    if(gameOver)
        return;

    context.fillStyle = "white";
    context.fillRect(0,0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodx, foody, blocksize, blocksize);

    if(snakex == foodx && snakey == foody)
    {
        snakeBody.push([foodx, foody]);
        eatSound.play();
        score++;
        if(score > highScore)
        {
            hitHighScore = true;
            highScore = score;
            localStorage.setItem('highScore', JSON.stringify(highScore));
        }
        document.getElementById("box").innerHTML = `Score = ${score}`;
        document.getElementById("highScore").innerHTML = `High score = ${highScore}`;
        placefood();
    }

    for (let i = snakeBody.length - 1; i > 0; i--)
        snakeBody[i] = snakeBody[i - 1];

    if (snakeBody.length)
        snakeBody[0] = [snakex, snakey];

    context.fillStyle = "lime";
    snakex += velocityx * blocksize;
    snakey += velocityy * blocksize;
    context.fillRect(snakex, snakey, blocksize, blocksize);

    for(let i = 0; i < snakeBody.length; i++)
    {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blocksize, blocksize);
    }

    if(snakex < 0 || snakex > (columns - 1) * blocksize || snakey < 0 || snakey > (rows - 1) * blocksize)
    {
        gameOver = true;
        killSound.play();
        if(hitHighScore)
            alert("New High score!\nYou score = " + score);
        else
            alert("GAME OVER\nYou score = " + score);
        initializeGame();
    }

    for (let i = 0; i < snakeBody.length; i++)
    {
        if(snakex == snakeBody[i][0] && snakey == snakeBody[i][1])
        {
            gameOver = true;
            killSound.play();
            alert("GAME OVER\nYou score = " + score);
            initializeGame();
        }
    }
}

function placefood()
{
    foodx = Math.floor(Math.random() * columns) * blocksize;
    foody = Math.floor(Math.random() * rows) * blocksize;
}

function changeDirection(e) 
{
    if(e.code == "ArrowUp" && velocityy != 1)
    {
        velocityx = 0;
        velocityy = -1;
    }

    else if(e.code == "ArrowDown" && velocityy != -1)
    {
        velocityx = 0;
        velocityy = 1;
    }

    else if(e.code == "ArrowLeft" && velocityx != 1)
    {
        velocityx = -1;
        velocityy = 0;
    }

    else if(e.code == "ArrowRight" && velocityx != -1)
    {
        velocityx = 1;
        velocityy = 0;
    }
}