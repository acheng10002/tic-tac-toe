/* Gameboard() returns an object (the array, board) with methods, getBoard, chooseCell, and printBoard */
function Gameboard() {
    
        const rows = 3;
    
        const columns = 3;
    
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

        // chooseCell() takes 3 arguments and adds the player's mark to their choice of [row, column]
        const chooseCell = (row, column, player) => {
  
            const choiceCell = board[row][column];
            
                if (choiceCell.getMark() === " ") {
                    console.log(`Putting Player ${player}'s mark into row ${row}, column ${column}...`);
                    choiceCell.addMark(player);
                } 
        };

     
        // printBoard logs the current state of the board
        const printBoard = () => {
    
          // iterates over each row of the board then returns them in a new array, iterates over each cell of each row then returns their marks   
          const boardWithCellMarks = board.map((row) => row.map((cell) => cell.getMark()))

          return boardWithCellMarks;
        };
      
        // again, Gameboard() returns an object (the array, board) with methods, getBoard, chooseCell, and printBoard
        return {getBoard, chooseCell, printBoard};
}
// Cell returns an object with methods, addMark and getMark
// addMark takes X or O as an argument     
function Cell() {
    
    let mark = " ";
      
    // addMark adds X or 0 to the Cell objects
    const addMark = (player) => {
        mark = player;
    };
    
    // getMark gets X or O from the Cell objects
    const getMark = () => mark;
      
    return {
        addMark,
        getMark
    };
}

/* GameController takes two variables as arguments */
function GameController(
    turnDisplay = document.querySelector(".turn-display"),
    playerXName = "Player X",
    playerYName = "Player 0"
    ) {

    // board is an empty array with the methods, getBoard, chooseCell, and printBoard
    const board = Gameboard();
    
    // players array has two player objects, each with name and mark properties
    const players = [
        {
            name: playerXName,
            mark: "X"
        },
        {
            name: playerYName,
            mark: "O"
        }
    ];
      
    let activePlayer = players[0];
      
    // switchPlayerTurn switches the activePlayer, i.e. the player mark that is in play
    const switchPlayerTurn = () => {
    
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        console.log("Active Player after switch:", activePlayer);
    };
    
    // getActivePlayer gets the player object whose turn it is
    const getActivePlayer = () => activePlayer;
    
    // printNewRound logs the current state of the board AND logs which player is to take a turn
    const printNewRound = () => {
        const currentBoard = board.printBoard(); // LOGS

        console.log(`${getActivePlayer().name}'s turn.`);   // LOGS 

        return currentBoard;
    };

    const checkForWinner = () => {
        // getBoard gets the board, and getMark gets the mark of every cell in the board
        const checkBoard = board.getBoard();
    
        const a = checkBoard[0][0].getMark(); 
        const b = checkBoard[0][1].getMark();  
        const c = checkBoard[0][2].getMark(); 
        
        const d = checkBoard[1][0].getMark(); 
        const e = checkBoard[1][1].getMark();  
        const f = checkBoard[1][2].getMark();  
        
        const g = checkBoard[2][0].getMark();  
        const h = checkBoard[2][1].getMark(); 
        const i = checkBoard[2][2].getMark(); 
            
        // checks for a winner
        if ((a !== " " && a === b && b === c) || (a !== " " && a === d && d === g) || (a !== " " && a === e && e === i)) {
            console.log(`Player ${a} wins!`);
            return a;
        
        } else if ((e !== " " && d === e && e === f) || (e !== " " && b === e && e === h) || (e !== " " && c === e && e === g)) {
            console.log(`Player ${e} wins!`);
            return e;
        
        } else if ((i !== " " && g === h && h === i) || (i !== " " && c === f && f === i)) {
            console.log(`Player ${i} wins!`);  
            return i;
        } else {
            // switchPlayerTurn();
            return null;
        }
    };
    
    // playRound takes two parameters, row and column, logs which player is placing there mark where, 
    // checks for a winner, logs the current state of the board, and logs the winner and returns if there is a winner   
    const playRound = (row, column, player) => {
        console.log("Active Player before play:", activePlayer);

        // let turnDisplay = document.querySelector(".turn-display");
        const XName = document.querySelector(".X");
        const XNameValue = XName.value;
        const OName = document.querySelector(".O");
        const ONameValue = OName.value;

        // chooseCell takes in the row and column arguments
        // getActivePlayer().mark is the argument for the player parameter
        board.chooseCell(row, column, player);
        const winner = checkForWinner();
        let winnerName;
        console.log("Winner: ", winner);
        if (winner != null) {
            console.log(XNameValue);
            console.log(ONameValue);
            if (winner === "X") {
                winnerName = XNameValue;
            } else if (winner === "O") {
                winnerName = ONameValue;
            }
            console.log("Winner Name: ", winnerName);
            turnDisplay.innerHTML = `Congratulations ${winnerName}, you won!`;
            return true; 
        } else {
            switchPlayerTurn();
            console.log("Active Player after no win:", activePlayer);
        }
        return false;
    };
      
    return {
        playRound,
        printNewRound,
        getActivePlayer
    };
}

document.addEventListener("DOMContentLoaded", () => {
    // DOM reference to div with "turn-display" class
    const turnDisplay = document.querySelector(".turn-display");

    function displayController() {

        // creates a private game object
        const game = GameController(turnDisplay);
    
        // DOM reference to all the cells
        const cells = document.querySelectorAll(".cell");

        let currentPlayer;
        
        const updateTurnDisplay = () => {
            currentPlayer = game.getActivePlayer().mark;

            const XName = document.querySelector(".X");
            const XNameValue = XName.value; 
    
            const OName = document.querySelector(".O");
            const ONameValue = OName.value;

            if (XNameValue === "" || ONameValue === "") {
                turnDisplay.innerHTML = "";
            } else if(currentPlayer === "X") {
                turnDisplay.innerHTML = `${XNameValue}'s turn!`;
            } else if (currentPlayer === "O") {
                turnDisplay.innerHTML = `${ONameValue}'s turn!`;   
            }
            return XNameValue, ONameValue;
        }

        const updateBoard = () => {
    
            const startRestart = document.querySelector(".start-restart");

            startRestart.addEventListener("click", event => {
                event.preventDefault();
                updateTurnDisplay();
            });

            // logs the player whose turn it is
            let currentBoard = game.printNewRound();

            // logs the 2D array
            console.log(currentBoard);
                
            // cells of the columns are extracted and placed into a 1D array
            const flattenedBoard = currentBoard.flat();
                
            flattenedBoard.forEach((value, index) => {
                if (cells[index]) {
                    cells[index].textContent = value;
                }
            });
        }

        const clickHandlerBoard = () => {        
            cells.forEach((cell) => {
                cell.addEventListener("click", () => {
                    if (cell.textContent === "X" || cell.textContent === "O") {
                        turnDisplay.innerHTML = "Choose an empty cell.";
                    } else {
                        let choiceCell = cell.dataset.coordinate;
                        choiceCell = choiceCell.split(",");

                        currentPlayer = game.getActivePlayer().mark;
                        
                        game.playRound(choiceCell[0], choiceCell[1], currentPlayer);
                        
                        updateBoard();   
                        updateTurnDisplay();
                    }
                });
            });
            updateBoard();
        }
        clickHandlerBoard();
    }
    const gameDisplay = displayController();
});
