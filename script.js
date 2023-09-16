/* Gameboard() returns a gameboard object (the board array) with methods, getBoard, chooseCell, and printBoard */
function Gameboard() {
    // assigns needed number of rows and columns to row and columns
    const rows = 3;

    const columns = 3;
    
    // creates board array that gets stored inside the Gameboard object
    const board = [];

    // board[i] creates 3 empty row arrays (i = 0, i = 1, i = 2)
    // .push populates each row array with the return value of Cell 3 times (j = 0, j = 1, j = 2)
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(Cell());
      }
    }
    
    // getBoard() returns the current state of the board
    const getBoard = () => board;

    // chooseCell() adds the player's mark to their choice of cell, [row, column]
    const chooseCell = (row, column, player) => {

        // assigns the chosen element in the board 2D array to choiceCell 
        const choiceCell = board[row][column];
        
            // if the choiceCell does not yet have a mark, add the active player's mark
            if (choiceCell.getMark() === " ") {
                choiceCell.addMark(player);
            } 
    };

    // printBoard() returns boardWithCellMarks
    const printBoard = () => {

      // iterates over each row of the board and returns them in a new array    
      const boardWithCellMarks = board.map((row) => 

        // iterates over each cell of each row and then returns their marks
        row.map((cell) => cell.getMark()))

      // printBoard() returns a 2D array with every cell's mark
      return boardWithCellMarks;
    };
  
    // again, Gameboard() returns an object (the array, board) with methods, getBoard, chooseCell, and printBoard
    return {
        getBoard, 
        chooseCell, 
        printBoard
    };
}

function Cell() {

// gives every cell the initial mark of blank
let mark = " ";
  
// addMark adds X or 0 to the Cell objects
const addMark = (player) => {
    mark = player;
};

// getMark gets X, O, or "" from the Cell objects
const getMark = () => mark;

// Cell() returns a Cell object with methods, addMark and getMark
return {
    addMark,
    getMark
};
}

/* GameController returns a GameController object with methods, playRound, printNewRound, & getActivePlayer, 
as well as the player objects */
function GameController(
// DOM reference to turn-display and assign the player names to playerXName and playerOName
turnDisplay = document.querySelector(".turn-display")
) {

// calls Gameboard to create a board, an empty array with the methods, 
// getBoard, chooseCell, and printBoard
const board = Gameboard();

// creates players array with two player objects, each with name and mark properties
const players = [
    {
        name: "Player X",
        mark: "X"
    },
    {
        name: "Player O",
        mark: "O"
    }
];

// activePlayer starts as player object at index 0, which is "X"
let activePlayer = players[0];
  
// switchPlayerTurn switches the activePlayer, i.e. the player mark that is in play
const switchPlayerTurn = () => {
    
    // if the active player is the first player, switch to the second player
    // if the active player is not the first player, switch to the first player
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
};

// getActivePlayer() returns the player object whose turn it is
const getActivePlayer = () => activePlayer;

const printNewRound = () => {
    // calls printBoard() on board and assigns its return value to currentBoard
    const currentBoard = board.printBoard(); 

    return currentBoard;
};


const checkForWinner = () => {
    // calls getBoard() on the board and assigns its return value to checkBoard
    const checkBoard = board.getBoard();

    // calls getMark() on every cell 
    const a = checkBoard[0][0].getMark(); 
    const b = checkBoard[0][1].getMark();  
    const c = checkBoard[0][2].getMark(); 
    
    const d = checkBoard[1][0].getMark(); 
    const e = checkBoard[1][1].getMark();  
    const f = checkBoard[1][2].getMark();  
    
    const g = checkBoard[2][0].getMark();  
    const h = checkBoard[2][1].getMark(); 
    const i = checkBoard[2][2].getMark(); 
        
    // if cells in the first row all have the same marks, 
    // or cells in the first column all have the same marks,
    // or cells in the diagonal from top left to bottom right all have the same marks,
    // return the mark at position [0][0]
    if ((a !== " " && a === b && b === c) || (a !== " " && a === d && d === g) || (a !== " " && a === e && e === i)) {
        return a;
    
    // if cells in the second row all have the same marks, 
    // or cells in the second column all have the same marks,
    // or cells in the diagonal from bottom left to top right all have the same marks,
    // return the mark at position [1][1]
    } else if ((e !== " " && d === e && e === f) || (e !== " " && b === e && e === h) || (e !== " " && c === e && e === g)) {
        return e;
    
    // if cells in the third row all have the same marks, 
    // or cells in the third column all have the same marks,
    // return the mark at position [2][2]
    } else if ((i !== " " && g === h && h === i) || (i !== " " && c === f && f === i)) { 
        return i;

    // otherwise, return value of null (as in no winner)
    } else {
        return null;
    }
};

// playRound() checks for a winner and returns if there is a winner and their name   
const playRound = (row, column, player) => {

    // calls chooseCell() on board
    // (getActivePlayer().mark is the argument for the player parameter)
    board.chooseCell(row, column, player);

    // calls checkForWinner() and assigns the return value to winner
    const winner = checkForWinner();
    let winnerName;
    
    // if there is a winner, return the value of gameEnded as true and the values of hasWinner and winnerName properties
    if (winner != null) {
        gameEnded = true;
        const XNameValue = document.querySelector(".X").value;
        const ONameValue = document.querySelector(".O").value;

        if (winner === "X") {
            winnerName = XNameValue;
        } else if (winner === "O") {
            winnerName = ONameValue;
        }

        return {
            gameEnded,
            hasWinner: true,
            winnerName: winnerName
        };
       
    // if there is no winner, switchPlayerTurn() and return the values of hasWinner and winnerName properties
    } else {
        switchPlayerTurn();

        return {
            hasWinner: false,
            winnerName: null
        };
    }
};

// GameController returns an object with methods, playRound, printNewRound, getActivePlayer
return {
    playRound,
    printNewRound,
    getActivePlayer
};
}

// once the DOM is loaded, then execute the rest of this code
document.addEventListener("DOMContentLoaded", () => {

// DOM reference to turnDisplay
const turnDisplay = document.querySelector(".turn-display");

// DOM reference to X input value
const playerXInput = document.querySelector(".X");

// DOM reference to O input value
const playerOInput = document.querySelector(".O");

// flag for game not having started 
let gameStarted = false; 

// flag for game not having ended
let gameEnded = false;

function displayController() {

    // creates a gameboard object when displayController() is executed and gameDisplay object is created
    let gameboard = GameController(turnDisplay);

    // makes DOM reference to all cells
    const cells = document.querySelectorAll(".cell");

    let currentPlayer;

    const updateTurnDisplay = () => {
        // calls getActivePlayer() on the gameboard object and returns the player object whose turn it is
        // accesses the mark property of the player object
        currentPlayer = gameboard.getActivePlayer().mark;

        // makes DOM reference to the input value of player X
        const XName = document.querySelector(".X");
        let XNameValue = XName.value; 

        // makes DOM reference to the input value of player O
        const OName = document.querySelector(".O");
        let ONameValue = OName.value;

        // if either input values are empty, it's no one's turn
        if (XNameValue === "" || ONameValue === "") {
            turnDisplay.innerHTML = "";
        
        // if the mark of the active player is X, turnDisplay says it's their turn
        } else if (currentPlayer === "X") {
            turnDisplay.innerHTML = `${XNameValue}'s turn!`;

        // if the mark of the active player is O, turnDisplay says it's their turn
        } else if (currentPlayer === "O") {
            turnDisplay.innerHTML = `${ONameValue}'s turn!`;   
        }
    }

    const updateBoard = () => {
        // makes DOM reference to the start/restart button
        const startRestart = document.querySelector(".start-restart");

        // start the game once input fields are filled and start/restart button is clicked
        startRestart.addEventListener("click", event => {
            event.preventDefault();

            // if input fields are blank, tells user to enter both names
            if (playerXInput.value === "" || playerOInput.value === "") {
                turnDisplay.innerHTML = "Enter the names of both players.";

            // if a game has already been started and user clicks the button to restart,
            // clears the input fields, turn display, and cells
            // and flags that game has not started
            } else if (gameStarted) {
                playerXInput.value = "";
                playerOInput.value = "";
                turnDisplay.innerHTML = "";

                cells.forEach(cell => {
                    cell.textContent = "";
                });

                gameStarted = false;
            // otherwise, updates the turnDisplay and starts the game
            // so now game hasn't ended, but it has started
            } else {
                updateTurnDisplay();

                gameStarted = true;
            }
        });

        // calls printNewRound() on gameboard, returns the currentBoard
        let currentBoard = gameboard.printNewRound();

            
        // cells of the columns are extracted and placed into a 1D array
        const flattenedBoard = currentBoard.flat();
            
        // iterates through each element of the flattenedBoard array
        flattenedBoard.forEach((value, index) => {
            if (cells[index]) {
                // assigns the value of each element to the textContent property of the corresponding HTML element
                // value is the current mark in the flattened board
                // index is the index of the current element in the flattened board
                cells[index].textContent = value;
            }
        });
}
    const clickHandlerBoard = () => { 
        cells.forEach((cell) => {
            // for every cell in cells, listen for a click and
            cell.addEventListener("click", () => {
                // trim() removes leading and trailing spaces from the players names
                // and do the following for each cell...
                const XNameValue = playerXInput.value.trim();
                const ONameValue = playerOInput.value.trim();
                
                // if game has now ended, stop player from putting their mark on the cell
                if (gameEnded) {
                    return;

                // if the start/restart button isn't clicked, turnDisplay tells the user 
                // they can't start the game until they do
                } else if (!gameStarted) {
                    turnDisplay.innerHTML = "Click 'Start/Restart the Game' to begin!"
                    return;

                // if both input values are empty, turnDisplay tells the user to enter  
                //             both players' names
                } else if (XNameValue === "" || ONameValue === "") {
                    turnDisplay.innerHTML = "Enter the names of both players.";

                // if the cell is already taken, turnDisplay tells the user to choose an empty cell
                } else if (cell.textContent === "X" || cell.textContent === "O") {
                    turnDisplay.innerHTML = "Choose an empty cell.";

                // puts the active player's mark in their choice of cell    
                } else {

                    // .dataset accesses data attribute that is prefixed with data-
                    // .coordinate is the specific data attribute I am accessing
                    let choiceCell = cell.dataset.coordinate;
                    
                    // split() splits the choiceCell string into an array of substrings that are comma-separated
                    choiceCell = choiceCell.split(",");
                    
                    // calls getActivePlayer() on the gameboard and access the active player's mark property
                    currentPlayer = gameboard.getActivePlayer().mark;                        
                    
                    // calls playRound() on the gameboard, passing in the choiceCell's first and 
                    // and second coordinates, and assigns the return value
                    // (return value is an object with hasWinner and winnerName properties)
                    let result = gameboard.playRound(choiceCell[0], choiceCell[1], currentPlayer);

                    // checks if current gameboard has a winner
                    // if the object's hasWinner property is true, updateBoard() and congratulate the winner, 
                    // and prevents players from continuing to mark empty cells
                    if (result.hasWinner) {
                        updateBoard();  
                        gameEnded = true;
                        turnDisplay.innerHTML = `Congratulations ${result.winnerName}, you won!`;

                    // if the object's hasWinner property is false, updateBoard() and updateTurnDisplay()
                    } else {
                        updateBoard();   
                        updateTurnDisplay();
                    }
                }
            });
        });
        updateBoard();
    }
    clickHandlerBoard();
}
// creates a gameDisplay object
const gameDisplay = displayController();
});