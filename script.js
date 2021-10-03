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
            field.appendChild(square);
            square.addEventListener("click", () => {
                currentPlayer = Game.getCurrentTurn();
                square.classList.add(currentPlayer.marker);
                theArray[square.dataset.value] = currentPlayer.marker;
                Game.setNewTurn();
            }, { once: true });
        }
    }
    return {
        create,
        display,
    }
})();

const createPlayer = (name, marker) => {
    return { name, marker };
};
const player1 = createPlayer("Hearthian", "X");
const player2 = createPlayer("Anglerfish", "O");

const Game = (() => {
    let _currentPlayer = player1;
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
    return {
        start,
        getCurrentTurn,
        setNewTurn,
    };
})();
Game.start();

// Si les signes sont identiques pour :
    // winningCombinations
        // [1, 2, 3]
        // [4, 5, 6]
        // [7, 8, 9]
        // [1, 4, 7]
        // [2, 5, 8]
        // [3, 6, 9]
        // [1, 5, 9]
        // [3, 5, 7]
// alors regarde le signe, chope le player correspondant et fais-le win