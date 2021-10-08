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
NextRoundButton.hide();
NextRoundButton.enable();

const NewGameButton = (() => {
    const button = document.getElementById("new-game-btn");
    const display = () => {
        button.style.display = "inline-block";
    }
    const hide = () => {
        button.style.display = "none";
    }
    const enable = () => {
        button.addEventListener("click", () => {
            Game.start();
            NewGameButton.hide();
        });
    }
    return {
        display,
        hide,
        enable,
    }
})();
NewGameButton.display();
NewGameButton.enable();

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
        Game.checkRoundTie();
        if (Game.round < 3 && (Game.hasRoundWinner || Game.hasRoundTie)) {
            NextRoundButton.display();
        }
        if (!Game.hasRoundWinner && !Game.hasRoundTie) Game.setNewTurn();
        if (Game.isOver()) {
            Game.setGameWinner();
            Page.updateWinnerDisplay();
        }
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
        if (!Game.isLastRound()) {
            document.getElementById("round-counter").textContent = `Round ${Game.round}`;
        }
        else {
            document.getElementById("round-counter").textContent = `Round ${Game.round} (ultimate!)`;
        }
    }
    const updateWinnerDisplay = () => {
        typeof Game.gameWinner != "undefined" ? _displayGameWinner() : _displayGameTie();
    }
    const _displayGameWinner = () => {
        legend.textContent = `${Game.gameWinner.name} won this game ${Game.gameWinner.score} to ${Game.gameLoser.score}!`
    }
    const _displayGameTie = () => {
        legend.textContent = `No winner? Alright, ice cream for everyone!`
    }
    const getAllSquares = () => {
        return Array.from(document.querySelectorAll(".square"));
    }
    let squares = getAllSquares();
    return {
        updateScoreDisplay,
        updateRoundDisplay,
        updateWinnerDisplay,
        getAllSquares,
    }
})();

const Game = (() => {
    let hasRoundWinner = false;
    let hasRoundTie = false;
    let gameWinner;
    let gameLoser;
    const legend = document.getElementById("legend");
    let _currentPlayer = "";
    const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    let round = 1;
    let isLastRound = () => {
        return Game.round == 3;
    }
    let isOver = () => {
        return Game.round == 3 && (Game.hasRoundTie || Game.hasRoundWinner);
    }
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
    const _getRoundWinner = ([a, b, c]) => {
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
                Game.hasRoundWinner = true;
                (function displayRoundWinner() {
                    winningPlayer = _getRoundWinner(combination);
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
    let _isRoundTie = () => {
        return _valuesAreDefined(theArray) && !Game.hasRoundWinner;
    }
    const _announceRoundTie = () => {
        legend.textContent = "It's a tie!";
    }
    const checkRoundTie = () => {
        if (_isRoundTie()) {
            Game.hasRoundTie = true;
            _announceRoundTie();
        }
    }
    const makeSquaresStopListening = () => {
        const squares = Page.getAllSquares();
        squares.forEach(square => {
            square.removeEventListener("click", Gameboard.displayCurrentMarker, { once: true });
        });
    }
    const reset = () => {
        Game.hasRoundWinner = false;
        Game.hasRoundTie = false;
        theArray = Gameboard.create(3);
    }
    function startNewRound() {
        _setNewRound();
        Page.updateRoundDisplay();
        Gameboard.reset();
        Game.reset();
        legend.textContent = `It's ${_currentPlayer.name}'s turn!`;
    }
    const setGameWinner = () => {
        if (player1.score > player2.score) {
            Game.gameWinner = player1;
            Game.gameLoser = player2;
        }
        if (player1.score < player2.score) {
            Game.gameWinner = player2;
            Game.gameLoser = player1;
        }
    }
    return {
        start,
        getCurrentTurn,
        setNewTurn,
        checkWin,
        checkRoundTie,
        reset,
        startNewRound,
        setGameWinner,
        isOver,
        isLastRound,
        gameWinner,
        gameLoser,
        round,
        hasRoundWinner,
        hasRoundTie,
    };
})();