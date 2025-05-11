const board = document.getElementById('board');
const statusDiv = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill(null);

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function createBoard() {
    board.innerHTML = '';
    gameState.forEach((cell, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.dataset.index = index;
        cellDiv.addEventListener('click', handleCellClick);
        board.appendChild(cellDiv);
    });
}

function handleCellClick(event) {
    const cellIndex = event.target.dataset.index;

    if (gameState[cellIndex] || !gameActive) {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin()) {
        statusDiv.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (gameState.every(cell => cell)) {
        statusDiv.textContent = 'It\'s a draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDiv.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

resetButton.addEventListener('click', resetGame);

function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = Array(9).fill(null);
    statusDiv.textContent = `Player ${currentPlayer}'s turn`;
    createBoard();
}

createBoard();
statusDiv.textContent = `Player ${currentPlayer}'s turn`;
