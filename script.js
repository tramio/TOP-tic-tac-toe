const Gameboard = (() => {
    const _setSize = (squaresPerSide) => {
        return board = new Array(Math.pow(squaresPerSide, 2));
    }
    const create = () => {
        _setSize(3);
    }
    const _populate = () => {
        const square = document.createElement("div");
        square.classList.add("square");
        square.setAttribute("isClicked", false);
        field.appendChild(square);
    }
    const display = () => {
        const field = document.getElementById("field");
        for (let i = 0; i < board.length; i++) {
            _populate();
        }
    }
    return {
        create,
        display,
    }
})();

const Game = (() => {
    let _currentTurn = "player1";
    const start = () => {
        Gameboard.create(3);
        Gameboard.display();
    }
    const getCurrentTurn = () => {
        _currentTurn;
    }
    const setNewTurn = () => {
        _currentTurn === "player1" ? _currentTurn = "player2" : _currentTurn = "player1";
    }
    return {
        start,
        getCurrentTurn,
        setNewTurn,
    };
})();

Game.start();

const createPlayer = (name, marker) => {
    return { name, marker };
};

const player1 = createPlayer("Earthian", "X");
const player2 = createPlayer("Anglerfish", "O");

// Loop à travers l'array: 
// Les squares écoutent : lorsqu'ils sont cliqués, ils devront
    // révéler le signe du player dont le tour est en cours
    // arrêter d'écouter
    // puis déclencher le tour du player suivant
    // (recursion)
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