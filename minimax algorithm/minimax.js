// Tic Tac Toe AI with Minimax Algorithm

//The values of each player winning state.
let scores = {
    X: 10, //AI
    O: -10, //Human
    tie: 0
};

function bestMove() {
    // AI to make its turn
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            // Is the spot available
            if (board[i][j] == '') {
                //If the spot is empty we "Test" this location
                board[i][j] = ai;
                //"Test"
                let score = minimax(board, 0, false); //if false then human else AI
                //We undo the move
                board[i][j] = '';

                //If the test returned a better score then we set the move of the AI
                if (score > bestScore) {
                    bestScore = score;
                    move = {
                        i,
                        j
                    };
                }
            }
        }
    }
    //Setting AI move on the board
    board[move.i][move.j] = ai;
    currentPlayer = human;
}

//Depth stands for how long it will span into the tree
//isMaximizing stands for that in this function we are trying to
//maximize the score to make X win (AI)
function minimax(board, depth, isMaximizing) {

    //First we check if there is already a winner
    //termination of the recursion
    let result = checkWinner();
    if (result !== null) {
        //If there is a winner then return it
        return scores[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Is the spot available?
                if (board[i][j] == '') {
                    board[i][j] = ai;

                    //notice that here we start predicting where the human 
                    //might play and set the isMaximizing to false
                    //thus making the else statement play and predict all possible
                    //optimum moves
                    let score = minimax(board, depth + 1, false);
                    board[i][j] = '';
                    bestScore = max(score, bestScore);
                }
            }
        }
        return bestScore;
    } 
    else 
    {
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Is the spot available?
                if (board[i][j] == '') {
                    board[i][j] = human;
                    let score = minimax(board, depth + 1, true);
                    board[i][j] = '';
                    bestScore = min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}

//Some notes :
// if we create 2 AI players playing against each other it will always 
// result into a tie.