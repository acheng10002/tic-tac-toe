/* PUBLIC FACTORY FUNCTION Gameboard() returns an object with three methods, getBoard, chooseCell, and printBoard */
function Gameboard() {
    // CREATES THE BOARD
    
        // rows variable for rows loop counter
        const rows = 3;
    
        // columns variable for columns loop counter
        const columns = 3;
    
        // board is an empty array, will need to be a 2D array 
        const board = [];
    
        // starting at 0, for every count of the counter up until 2 inclusive, 
        // create a `row` in an empty board array, for 3 total rows in the board array
        // [board[0],
        //  board[1],
        //  board[2]]
        for (let i = 0; i < rows; i++) {
          board[i] = [];
        // starting at 0, for every count of the counter up until 2 inclusive, 
        // create a `column` in the array, for 3 total columns now making it a 2D array
        // [board[0][0], board[0][1], board[0][2]]
        // [board[1][0], board[1][1], board[1][2]]
        // [board[2][0], board[2][1], board[2][2]]
          for (let j = 0; j < columns; j++) {
    
            // board[i] creates an empty row array with the rows loop, 3 times
            // .push populates each row array, board[i], with return values of Cell() with the columns loop, 3 times 
            // Cell() returns an object (an empty Cell) with addMark (ability to drop a X or O mark into the Cell) 
            // and getMark (ability to get the mark state of the Cell) methods
            board[i].push(Cell());
          }
        }
    // HANDLES CHANGE IN THE BOARD 
        // getBoard function that is public to Gameboard, gets the current state of the board
        const getBoard = () => board;
      
        // player is either X or O based on player's mark
        // chooseCell function that is public to Gameboard, adds a Mark to the Cell the player chooses and updates the board's state
        const chooseCell = (row, column, player) => {

            // player's choice of Cell
            const choice = [row, column];

            // passes in a board and creates an array of emptyCells
            // board.filter((row) => row[column].getMark() === 0) creates a new array with all the elements that have a player Mark of 0
            // map(row => row[column]) maps the filtered rows to a new array of the corresponding cells in that column s, 
            const emptyCells = board.filter((row) => row[column].getMark() === 0).map(row => row[column]);
            
            // if no cells are empty, return and do nothing 
            if (!emptyCells) return;

            // return the first element that matches the choice array in the empty Cells array (in length)
            const foundChoice = emptyCells.find(
                
                // emptyCell => emptyCell.length === choice.length 
                // ...is the length of the emptyCell the same as the length of the choice
                // emptyCell.every((val, index) => val === choice[index])
                // ....every() receives the row and its column from the emptyCell array and compares it to the 
                // ...corresponding row and column in the choice array
                // if they match, every() returns true
                (emptyCell) => emptyCell.length === choice.length && emptyCell.every((row, column) => row === choice[0] && column === choice[1])
            );

            // if the elements do not match, return and do nothing
            if (foundChoice === false) return;

            // otherwise add the player's mark to their choice of Cell on the board
            board[row][column].addMark(player);
        };
     
        // printBoard function that is public to Gameboard, prints the current board 
        const printBoard = () => {
    
          // board.map((row) => iterates over each 1D row array in the board 2D array,
          //                    returns and arranges the new 1D arrays into a new 2D array
          //                    it gives me a snapshot of the current board state
          // row.map((cell) => iterates over each cell in the current 1D row array,
          //                   gets the mark of each cell, 
          //                   returns new 1D array with the marks of all cells in that row
          // calls the getMark() public function to get each Cell object's mark property 
          // and assigns it to a 2D array called boardWithCellMarks
          const boardWithCellMarks = board.map((row) => row.map((cell) => cell.getMark()))
    
          // prints the current board
          console.log(boardWithCellMarks);
        };
      
        // when called, Gameboard() returns the functions, getBoard, chooseCell, and printBoard 
        return {getBoard, chooseCell, printBoard};
}
      
/* PUBLIC FACTORY FUNCTION Cell() returns an object with a value property and two methods, addMark and getMark */
function Cell() {
    
    // initializes the value property to 0
    let mark = 0;
      
    // addMark function is public to Cell(), and assigns a player's mark to a Cell object's mark
    const addMark = (player) => {
        mark = player;
    };
      
    // getMark function is public to Cell(), and gets the Cell object's current mark
    const getMark = () => mark;
      
    // when called, Cell() returns the functions, addMark and getMark
    return {
        addMark,
        getMark
    };
}
     
/* PUBLIC FACTORY FUNCTION GameController() returns an object with two methods, playRound and getActivePlayer 
GameController takes two parameters */
function GameController(
    playerXName = "Player X",
    playerYName = "Player 0"
) {
    // initalizes a new board by calling Gameboard (this makes printBoard and dropValue functions accessible)
    const board = Gameboard();
    
    // initializes players array with their name and mark properties
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
      
    // sets the first player object in the players array as the active one
    let activePlayer = players[0];
      
    // switchPlayerTurn function, to be called after playRound function is called
    const switchPlayerTurn = () => {
    
        // if the activePlayer is the first player, change the activePlayer to the second player and vice versa
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    
    // get the activePlayer (going to be either player object)
    const getActivePlayer = () => activePlayer;
      
    // for each new round, print the current board (with printBoard() function returned by Gameboard()) 
    // and indicate whose turn it is, Player X or Player Y 
    const printNewRound = () => {
        board.printBoard();

        // prints whose turn it is 
        console.log(`${getActivePlayer().name}'s turn.`);
    };
      
    // activePlayer takes their turn
    const playRound = (row, column) => {

        // prints what the current player's play is, passing in the row and column that was their choice   
        console.log(
            `Putting ${getActivePlayer().name}'s mark into row ${row}, column ${column}...`
        );

        // puts player's mark in their chosen cell
        // calls chooseCell (returned by Gameboard()) on the current board, passing in row, column, and the mark property of the activePlayer
        // getActivePlayer() returns the activePlayer who has a mark property
        board.chooseCell(row, column, getActivePlayer().mark);

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
            
        if ((a !== 0 && a === b && b === c) || (a !== 0 && a === d && d === g) || (a !== 0 && a === e && e === i)) {
            let winner = a;
            board.printBoard();
            console.log(`Player ${winner} wins!`);
            return;
        
        } else if ((e !== 0 && d === e && e === f) || (e !== 0 && b === e && e === h) || (e !== 0 && c === e && e === g)) {
            let winner = e;
            board.printBoard();
            console.log(`Player ${winner} wins!`);
            return;
        
        } else if ((i !== 0 && g === h && h === i) || (i !== 0 && c === f && f === i)) {
            let winner = i;
            board.printBoard();
            console.log(`Player ${winner} wins!`);
            return;
        }

        // a round has been played, switch the player
        switchPlayerTurn();
    
        // print the current board after switch in player and announce whose turn it is
        printNewRound();
    };
    
    // print the current board after initializing a new board and players
    // displays the initial state of the board and announces the first player's turn 
    printNewRound();
      
    return {
        // returns object with two public, accessible methods
        playRound,
        getActivePlayer
    };
}
/* initializes the game 
game is an object with methods to play a round, playRound and get the active player, getActivePlayer */
const game = GameController();
