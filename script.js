const countdownEl = document.getElementById('countdown');
const arrowEl = document.getElementById('arrow');
const player1El = document.querySelector('.player-1');
const player2El = document.querySelector('.player-2');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');
const countdownInput = document.getElementById('countdownInput');

let initialCount = 5;
let count = initialCount;
let currentPlayer = 1;
let intervalId;

function updateCountdown() {
    countdownEl.innerText = count;

    if (count === 0) {
        count = initialCount;
        switchPlayer();
    } else {
        count--;
    }
}

function switchPlayer() {
    if (currentPlayer === 1) {
        currentPlayer = 2;
        arrowEl.classList.add('left');
        player1El.classList.remove('active');
        player2El.classList.add('active');
    } else {
        currentPlayer = 1;
        arrowEl.classList.remove('left');
        player2El.classList.remove('active');
        player1El.classList.add('active');
    }
}

// Bấm vào avatar để chọn team đi trước
player1El.addEventListener('click', () => {
    currentPlayer = 1;
    player1El.classList.add('selected');
    player2El.classList.remove('selected');
});

player2El.addEventListener('click', () => {
    currentPlayer = 2;
    player2El.classList.add('selected');
    player1El.classList.remove('selected');
});

startButton.addEventListener('click', () => {
    if (intervalId) return;

    initialCount = parseInt(countdownInput.value) || 5;
    count = initialCount;
    countdownEl.innerText = count;
    
    // Áp dụng team đã chọn
    if (currentPlayer === 1) {
        player1El.classList.add('active');
        player2El.classList.remove('active');
        arrowEl.classList.remove('left');
    } else {
        player2El.classList.add('active');
        player1El.classList.remove('active');
        arrowEl.classList.add('left');
    }

    intervalId = setInterval(updateCountdown, 1000);
});

stopButton.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;
    player1El.classList.remove('active');
    player2El.classList.remove('active');
});

resetButton.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;
    initialCount = parseInt(countdownInput.value) || 5;
    count = initialCount;
    countdownEl.innerText = count;
    player1El.classList.remove('active');
    player2El.classList.remove('active');
    arrowEl.classList.remove('left');
    currentPlayer = 1;
});