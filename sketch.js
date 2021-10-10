let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let w;
let h;

//we assign each player a tile
let ai = 'X';
let human = 'O';
//and allow the current player to be the human
//but the AI plays first
let currentPlayer = human;

function setup() {
    createCanvas(500, 500);
    //The width and height of the entire canvas
    w = width / 3;
    h = height / 3;
    //The brain of the AI
    //the function call allows the AI to start commment it out 
    //to go first
    bestMove();
}

//We compare the 3 board locations if they are all the same sign
function equals3(a, b, c) {
    return a == b && b == c && a != '';
}

function checkWinner() {
    //We first assume there are no winners  
    let winner = null;
    //but then we assign a winning row, column, diagonal.

    //Then using the board we loop through each row and column and diagonal and use the equals3()
    //to check if there is a winning state

    // horizontal
    for (let i = 0; i < 3; i++) {
        if (equals3(board[i][0], board[i][1], board[i][2])) {
            winner = board[i][0];
        }
    }

    // Vertical
    for (let i = 0; i < 3; i++) {
        if (equals3(board[0][i], board[1][i], board[2][i])) {
            winner = board[0][i];
        }
    }

    // The 2 diagonals
    //We can choose either of the 3 boards since if they pass
    //The if condition then they are all the same value
    if (equals3(board[0][0], board[1][1], board[2][2])) {
        winner = board[0][0];
    }
    if (equals3(board[2][0], board[1][1], board[0][2])) {
        winner = board[2][0];
    }

    //We recount after each call to the function the number of free spaces
    //to know when the board is full
    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == '') {
                openSpots++;
            }
        }
    }

    //If the board is full then it's a tie 
    if (winner == null && openSpots == 0) {
        return 'tie';
    } else {
        return winner;
    }
}

function mousePressed() {
    if (currentPlayer == human) {
        // Human make turn
        let i = floor(mouseX / w);
        let j = floor(mouseY / h);

        // If valid turn
        if (board[i][j] == '') {
            board[i][j] = human;
            currentPlayer = ai;
            bestMove();
        }
    }
}

function draw() {
    //Set the background and the weight of the strokes
    background(255);
    strokeWeight(4);

    //The board layout
    //edit the lines to be in the middle and adjust the game
    line(w, 0, w, height);
    line(w * 2, 0, w * 2, height);
    line(0, h, width, h);
    line(0, h * 2, width, h * 2);

    frameRate(0.7);
    //Draws the X and O
    for (let j = 0; j < 3; j++) 
    {
        for (let i = 0; i < 3; i++) 
        {
            let x = w * i + w / 2;
            let y = h * j + h / 2;
            let spot = board[i][j];

            textSize(32);

            let r = w / 4;
            if (spot == human) 
            {
                noFill();
                ellipse(x, y, r * 2);
            } 
            else if (spot == ai) 
            {
                line(x - r, y - r, x + r, y + r);
                line(x + r, y - r, x - r, y + r);
            }
        }
    }

    let result = checkWinner();

    if (result != null) 
    {
        //Stop the looping
        noLoop();
        let resultP = createP('');
        resultP.style('font-size', '32pt');
        if (result == 'tie') 
        {
            resultP.html('Tie!');
        } 
        else 
        {
            resultP.html(`${result} wins!`);
        }
    }
}