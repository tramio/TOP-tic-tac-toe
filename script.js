let theArray;

const Gameboard = (() => {
    const _setSize = (squaresPerSide) => {
        return board = new Array(Math.pow(squaresPerSide, 2));
    }
    const create = () => {
        return _setSize(3);
    }
    const display = () => {
        const field = document.getElementById("field");
        for (let i = 0; i < board.length; i++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.setAttribute("data-value", i)
            square.addEventListener("click", Gameboard.displayCurrentMarker, { once: true });
            field.appendChild(square);
        }
    }
    const displayCurrentMarker = (e) => {
        currentPlayer = Game.getCurrentTurn();
        e.target.classList.add(currentPlayer.marker);
        theArray[e.target.dataset.value] = currentPlayer.marker;
        Game.checkWin();
        Game.setNewTurn();
    }
    return {
        create,
        display,
        displayCurrentMarker,
    }
})();

const createPlayer = (name, marker) => {
    return { name, marker };
};
const player1 = createPlayer("Hearthian", "X");
const player2 = createPlayer("Anglerfish", "O");

const Game = (() => {
    let _currentPlayer = player1;
    const _winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    const start = () => {
        theArray = Gameboard.create(3);
        Gameboard.display();
    }
    const getCurrentTurn = () => {
        return _currentPlayer;
    }
    const setNewTurn = () => {
        _currentPlayer === player1 ? _currentPlayer = player2 : _currentPlayer = player1;
    }
    const _isWin = ([a, b, c]) => {
        return (theArray[a] == player1.marker || theArray[a] == player2.marker) && theArray[a] == theArray[b] && theArray[a] == theArray[c];
    }
    const _getWinner = ([a, b, c]) => {
        theArray[a] == player1.marker ? console.log("player1 won!") : console.log("player2 won!");
    }
    const checkWin = () => {
        _winningCombinations.forEach(combination => {
            if (_isWin(combination)) {
                _getWinner(combination);
                const remainingSquares = Array.from(document.querySelectorAll(".square"));
                remainingSquares.forEach(square => {
                    square.removeEventListener("click", Gameboard.displayCurrentMarker, { once: true });
                })
            };
        });
    }
    const reset = () => {
        const squares = Array.from(document.querySelectorAll(".square"));
        squares.forEach(square => {
            square.classList.remove("O");
            square.classList.remove("X");
            square.addEventListener("click", Gameboard.displayCurrentMarker, { once: true });
        theArray = Gameboard.create(3);
        });
    }
    return {
        start,
        getCurrentTurn,
        setNewTurn,
        checkWin,
        reset,
    };
})();
Game.start();