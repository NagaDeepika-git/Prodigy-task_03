let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = false;
let mode = "";

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

function setMode(selectedMode) {
    mode = selectedMode;
    gameActive = true;
    resetGame();
    document.getElementById("status").innerText =
        mode === "ai" ? "Your turn (X)" : "Player X's turn";
}

function makeMove(index) {
    if (!gameActive || board[index] !== "") return;

    board[index] = currentPlayer;
    updateBoard();

    if (checkWinner()) return;

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if (mode === "ai" && currentPlayer === "O") {
        document.getElementById("status").innerText = "AI thinking...";
        setTimeout(aiMove, 500);
    } else {
        document.getElementById("status").innerText =
            `Player ${currentPlayer}'s turn`;
    }
}

function aiMove() {
    let emptyCells = board
        .map((val, idx) => val === "" ? idx : null)
        .filter(v => v !== null);

    if (emptyCells.length === 0) return;

    let move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[move] = "O";
    updateBoard();

    if (checkWinner()) return;

    currentPlayer = "X";
    document.getElementById("status").innerText = "Your turn (X)";
}

function updateBoard() {
    document.querySelectorAll(".cell").forEach((cell, i) => {
        cell.innerText = board[i];
        cell.classList.remove("x", "o");
        if (board[i] === "X") cell.classList.add("x");
        if (board[i] === "O") cell.classList.add("o");
    });
}

function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            document.getElementById("status").innerText =
                board[a] === "X" ? "Player X Wins!" :
                mode === "ai" ? "AI Wins!" : "Player O Wins!";

            highlightWin(pattern);
            return true;
        }
    }

    if (!board.includes("")) {
        gameActive = false;
        document.getElementById("status").innerText = "It's a Draw!";
        return true;
    }
    return false;
}

function highlightWin(pattern) {
    pattern.forEach(i => {
        document.querySelectorAll(".cell")[i].classList.add("win");
    });
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;

    document.querySelectorAll(".cell").forEach(cell => {
        cell.innerText = "";
        cell.classList.remove("x", "o", "win");
    });
}
