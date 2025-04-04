let board = Array(9).fill(null);
        let xIsNext = true;
        let gameActive = false;

        function startGame(startingPlayer) {
            board.fill(null);
            xIsNext = startingPlayer === 'X';
            gameActive = true;
            document.getElementById("status").innerText = "";
            renderBoard();
        }

        function renderBoard() {
            const boardElement = document.getElementById("board");
            boardElement.innerHTML = "";
            board.forEach((cell, index) => {
                const cellElement = document.createElement("div");
                cellElement.classList.add("cell");
                cellElement.innerText = cell || "";
                cellElement.addEventListener("click", () => handleMove(index));
                boardElement.appendChild(cellElement);
            });
        }

        function handleMove(index) {
            if (!gameActive || board[index]) return;
            board[index] = xIsNext ? "X" : "O";
            xIsNext = !xIsNext;
            checkWinner();
            renderBoard();
        }

        function checkWinner() {
            const winningCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            for (const [a, b, c] of winningCombinations) {
                if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                    document.getElementById("status").innerText = `Winner: ${board[a]}`;
                    gameActive = false;
                    return;
                }
            }
            if (!board.includes(null)) {
                document.getElementById("status").innerText = "It's a Draw!";
                gameActive = false;
            }
        }

        function resetGame() {
            board.fill(null);
            gameActive = false;
            document.getElementById("status").innerText = "";
            renderBoard();
        }

        renderBoard();