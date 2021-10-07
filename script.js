let theArray;

const NextRoundButton = (() => {
    const button = document.getElementById("next-round-btn");
    const display = () => {
        button.style.display = "inline-block";
    }
    const hide = () => {
        button.style.display = "none";
    }
    const enable = () => {
        button.addEventListener("click", () => {
            Game.startNewRound();
            NextRoundButton.hide();
        });
    }
    return {
        display,
        hide,
        enable,
    }
})();
NextRoundButton.enable();

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
            square.addEventListener("click", displayCurrentMarker, { once: true });
            field.appendChild(square);
        }
    }
    const displayCurrentMarker = (e) => {
        currentPlayer = Game.getCurrentTurn();
        e.target.classList.add(currentPlayer.marker);
        theArray[e.target.dataset.value] = currentPlayer.marker;
        Game.checkWin();
        Game.checkTie();
        if (Game.hasWinner || Game.hasTie) {
            NextRoundButton.display();
        }
        if (!Game.hasWinner && !Game.hasTie) Game.setNewTurn(); // if noone won
    }
    const reset = () => {
        const squares = Page.getAllSquares();
        squares.forEach(square => {
            square.classList.remove("O", "X");
            square.addEventListener("click", displayCurrentMarker, { once: true });
        });
    }
    return {
        create,
        display,
        displayCurrentMarker,
        reset,
    }
})();

const createPlayer = (name, marker) => {
    let score = 0;
    return { name, marker, score };
};
const player1 = createPlayer("Hearthian", "X");
const player2 = createPlayer("Anglerfish", "O");

const Page = (() => {
    const updateScoreDisplay = () => {
        document.getElementById("player1-score").textContent = `${player1.name}: ${player1.score}`;
        document.getElementById("player2-score").textContent = `${player2.name}: ${player2.score}`;
    }
    const updateRoundDisplay = () => {
        document.getElementById("round-counter").textContent = `Round ${Game.round}`;
    }
    const getAllSquares = () => {
        return Array.from(document.querySelectorAll(".square"));
    }
    let squares = getAllSquares();
    return {
        updateScoreDisplay,
        updateRoundDisplay,
        getAllSquares,
    }
})();

const Game = (() => {
    let hasWinner = false;
    let hasTie = false;
    const legend = document.getElementById("legend");
    let _currentPlayer = "";
    const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    let round = 1;
    const start = () => {
        theArray = Gameboard.create(3);
        Gameboard.display();
        Page.updateScoreDisplay();
        Page.updateRoundDisplay();
        setNewTurn();
    }
    const getCurrentTurn = () => {
        return _currentPlayer;
    }
    const setNewTurn = () => {
        _currentPlayer == player1 ? _currentPlayer = player2 : _currentPlayer = player1;
        legend.textContent = `It's ${_currentPlayer.name}'s turn!`;
    }
    const _isWin = ([a, b, c]) => {
        return (theArray[a] == player1.marker || theArray[a] == player2.marker) && theArray[a] == theArray[b] && theArray[a] == theArray[c];
    }
    const _getWinner = ([a, b, c]) => {
        if (theArray[a] == player1.marker) {
            return player1;
        } else {
            return player2;
        }
    }
    const _setNewRound = () => {
        Game.round++;
    }
    const _updateScore = () => {
        winningPlayer.score++;
        Page.updateScoreDisplay();
    }
    const checkWin = () => {
        winningCombinations.forEach(combination => {
            if (_isWin(combination)) {
                Game.hasWinner = true;
                (function displayWinner() {
                    winningPlayer = _getWinner(combination);
                    legend.textContent = `${winningPlayer.name} won!`;
                })();
                _updateScore();
                makeSquaresStopListening();
            }
        });
    }
    const _valuesAreDefined = (array) => {
        return typeof array[0] != "undefined"
        && typeof array[1] != "undefined"
        && typeof array[2] != "undefined"
        && typeof array[3] != "undefined"
        && typeof array[4] != "undefined"
        && typeof array[5] != "undefined"
        && typeof array[6] != "undefined"
        && typeof array[7] != "undefined"
        && typeof array[8] != "undefined";
    }
    let _isTie = () => {
        return _valuesAreDefined(theArray) && !Game.hasWinner;
    }
    const _announceTie = () => {
        legend.textContent = "It's a tie!";
    }
    const checkTie = () => {
        if (_isTie()) {
            Game.hasTie = true;
            _announceTie();
        }
    }
    const makeSquaresStopListening = () => {
        const squares = Page.getAllSquares();
        squares.forEach(square => {
            square.removeEventListener("click", Gameboard.displayCurrentMarker, { once: true });
        });
    }
    const reset = () => {
        Game.hasWinner = false;
        Game.hasTie = false;
        theArray = Gameboard.create(3);
    }
    function startNewRound() {
        _setNewRound();
        Page.updateRoundDisplay();
        Gameboard.reset();
        Game.reset();
        legend.textContent = `It's ${_currentPlayer.name}'s turn!`;
    }
    return {
        start,
        getCurrentTurn,
        setNewTurn,
        checkWin,
        checkTie,
        reset,
        startNewRound,
        round,
        hasWinner,
        hasTie,
    };
})();
Game.start();