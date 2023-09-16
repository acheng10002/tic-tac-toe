class Gameboard {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.board = this.initializeBoard();
    }

    initializeBoard() {
        const board = [];
        for (let i = 0; i < this.rows; i++) {
            board[i] = [];
            for (let j = 0; j < this.columns; j++) {
                board[i].push(new Cell());
            }
        }
        return board;
    }

    getBoard() {
        return this.board.map(row => row.map(cell => cell.getMark()));
    }

    chooseCell(row, column, player) {
        const chosenCell = this.board[row][column];
        if (chosenCell.getMark() === " ") {
            chosenCell.addMark(player);
        }
    }

    printBoard() {
        return this.getBoard();
    }
}

class Cell {
    constructor() {
        this.mark = " ";
    }

    addMark(player) {
        this.mark = player;
    }

    getMark() {
        return this.mark;
    }
}

class GameController {
    constructor(turnDisplay) {
        this.board = new Gameboard(3, 3);
        this.players = [
            { name: "Player X", mark: "X" },
            { name: "Player O", mark: "O" },
        ];
        this.activePlayerIndex = 0;
        this.turnDisplay = turnDisplay;
        this.gameStarted = false;
        this.gameEnded = false;
        this.initializeUI();
    }

    initializeUI() {
        const startRestartButton = document.querySelector(".start-restart");
        startRestartButton.addEventListener("click", () => this.startOrRestartGame());

        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell) => {
            cell.addEventListener("click", () => this.handleCellClick(cell));
        });
    }

    startOrRestartGame() {
        if (this.gameEnded) {
            this.resetGame();
        } else if (!this.gameStarted) {
            this.gameStarted = true;
            this.updateTurnDisplay();
        }
    }

    resetGame() {
        this.board = new Gameboard(3, 3);
        this.activePlayerIndex = 0;
        this.gameStarted = false;
        this.gameEnded = false;
        this.clearUI();
    }

    clearUI() {
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell) => {
            cell.textContent = "";
        });
        this.turnDisplay.innerHTML = "";
    }

    handleCellClick(cell) {
        if (!this.gameStarted) {
            this.turnDisplay.innerHTML = "Click 'Start/Restart the Game' to begin!";
            return;
        }

        const XNameValue = document.querySelector(".X").value.trim();
        const ONameValue = document.querySelector(".O").value.trim();

        if (XNameValue === "" || ONameValue === "") {
            this.turnDisplay.innerHTML = "Enter the names of both players.";
            return;
        }

        if (cell.textContent === "X" || cell.textContent === "O") {
            this.turnDisplay.innerHTML = "Choose an empty cell.";
            return;
        }

        const [row, column] = cell.dataset.coordinate.split(",");
        const currentPlayer = this.players[this.activePlayerIndex].mark;

        this.board.chooseCell(row, column, currentPlayer);
        this.updateUI();
        const winner = this.checkForWinner();

        if (winner) {
            this.gameEnded = true;
            this.turnDisplay.innerHTML = `Congratulations ${
                winner === "X" ? XNameValue : ONameValue
            }, you won!`;
        } else {
            this.switchPlayer();
            this.updateTurnDisplay();
        }
    }

    switchPlayer() {
        this.activePlayerIndex = 1 - this.activePlayerIndex;
    }

    updateUI() {
        const cells = document.querySelectorAll(".cell");
        const currentBoard = this.board.printBoard().flat();

        cells.forEach((cell, index) => {
            cell.textContent = currentBoard[index];
        });
    }

    updateTurnDisplay() {
        const XNameValue = document.querySelector(".X").value.trim();
        const ONameValue = document.querySelector(".O").value.trim();
        const currentPlayer = this.players[this.activePlayerIndex].mark;

        if (currentPlayer === "X") {
            this.turnDisplay.innerHTML = `${XNameValue}'s turn!`;
        } else if (currentPlayer === "O") {
            this.turnDisplay.innerHTML = `${ONameValue}'s turn!`;
        }
    }

    checkForWinner() {
        // ... (Your existing checkForWinner logic)
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const turnDisplay = document.querySelector(".turn-display");
    const gameController = new GameController(turnDisplay);
});