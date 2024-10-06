// script.js

const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
let currentPlayer = 'Q';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

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

function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = cell.getAttribute('data-index');

  if (board[cellIndex] !== '' || !gameActive) {
    return;
  }

  board[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    alert(`Player ${currentPlayer} wins!`);
    gameActive = false;
  } else if (board.every(cell => cell !== '')) {
    alert('It\'s a tie!');
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'Q' ? 'O' : 'Q';
  }
}

function checkWin() {
  return winningConditions.some(condition => {
    return condition.every(index => board[index] === currentPlayer);
  });
}

function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'Q';
  gameActive = true;
  cells.forEach(cell => (cell.textContent = ''));
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
