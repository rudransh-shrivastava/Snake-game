var blocksize = 25;
var rows = 20;
var columns = 20;
var board;
var context;
var score = 0;

var snakex = blocksize * 5;
var snakey = blocksize * 5;

var foodx;
var foody;
var gameOver = false;
var snakeBody = []

var velocityx = 0;
var velocityy = 0;

window.onload = function () 
{
    board = document.getElementById("board");
    board.height = rows * blocksize;
    board.width = columns * blocksize;
    context = board.getContext("2d");

    placefood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 100);
}

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
        score++;
        document.getElementsByClassName("box")[0].innerHTML = `Score = ${score}`;
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
        alert("GAME OVER\nYou score = " + score);
    }

    for (let i = 0; i < snakeBody.length; i++)
    {
        if(snakex == snakeBody[i][0] && snakey == snakeBody[i][1])
        {
            gameOver = true;
            alert("GAME OVER\nYou score = " + score);
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