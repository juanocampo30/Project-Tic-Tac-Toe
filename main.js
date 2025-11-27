let boardGame = document.querySelector('#boardContainer');
boardGame.addEventListener('click', playGame);

let currentPlayer = 1;

/*-------------------------------------------------------------------------------*/

let arrayBoard = (function () {
    let boardArray = [];

    for (let i = 0; i < 3; i++) {
        boardArray[i] = [];
        for (let j = 0; j < 3; j++) {
            boardArray[i][j] = '';
        }
    }

    return boardArray;
})();

/*-------------------------------------------------------------------------------*/

function CreatePlayer(name, token) {
    this.name = name;
    this.token = token;
}

function createPlayerObjects() {

    let player1Name = document.querySelector('#nameOne').value;
    let player2Name = document.querySelector('#nameTwo').value;
    let player1Token = document.querySelector('#token1').value;
    let player2Token = document.querySelector('#token2').value;

    if (player1Name === '') {
        player1Name = 'Player 1'
    }

    if (player2Name === '') {
        player2Name = 'Player 2'
    }

    let player1 = new CreatePlayer(player1Name, player1Token);
    let player2 = new CreatePlayer(player2Name, player2Token);

    return { player1, player2 };
}

/*-------------------------------------------------------------------------------*/

function getCaseinfo(e) {
    const coordinates = [
        [0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]
    ]
    let caseId = e.target.id;
    let caseCoordinates = coordinates[caseId];

    return { caseId, caseCoordinates }
}

/*-------------------------------------------------------------------------------*/

function displayTokenInCase(e, players) {

    e.target.textContent = players[`player${currentPlayer}`].token;

}

/*-------------------------------------------------------------------------------*/

function putTokenInArray(caseInfo, players) {

    arrayBoard[caseInfo.caseCoordinates[0]][caseInfo.caseCoordinates[1]] = players[`player${currentPlayer}`].token;

}

/*-------------------------------------------------------------------------------*/

function switchPlayer() {
    if (currentPlayer === 1) {
        currentPlayer = 2;
    } else if (currentPlayer === 2) {
        currentPlayer = 1;
    }
}
/*-------------------------------------------------------------------------------*/

function announceWinner(players) {
    if (currentPlayer === 1 && players.player1.name === undefined) {
        alert('Player 1 won the game');
    } else if (currentPlayer === 2 && players.player2.name === undefined) {
        alert('Player 2 won the game');
    } else if (currentPlayer === 1) {
        alert(`${players.player1.name} won the game`);
    } else if (currentPlayer === 2) {
        alert(`${players.player2.name} won the game`);
    }
}


function checkForWinner(players) {
    if (arrayBoard[0][0] === 'X' && arrayBoard[0][1] === 'X' && arrayBoard[0][2] === 'X' ||
        arrayBoard[0][0] === 'O' && arrayBoard[0][1] === 'O' && arrayBoard[0][2] === 'O' ||
        arrayBoard[1][0] === 'X' && arrayBoard[1][1] === 'X' && arrayBoard[1][2] === 'X' ||
        arrayBoard[1][0] === 'O' && arrayBoard[1][1] === 'O' && arrayBoard[1][2] === 'O' ||
        arrayBoard[2][0] === 'X' && arrayBoard[2][1] === 'X' && arrayBoard[2][2] === 'X' ||
        arrayBoard[2][0] === 'O' && arrayBoard[2][1] === 'O' && arrayBoard[2][2] === 'O' ||
        arrayBoard[0][0] === 'X' && arrayBoard[1][0] === 'X' && arrayBoard[2][0] === 'X' ||
        arrayBoard[0][0] === 'O' && arrayBoard[1][0] === 'O' && arrayBoard[2][0] === 'O' ||
        arrayBoard[0][1] === 'X' && arrayBoard[1][1] === 'X' && arrayBoard[2][1] === 'X' ||
        arrayBoard[0][1] === 'O' && arrayBoard[1][1] === 'O' && arrayBoard[2][1] === 'O' ||
        arrayBoard[0][2] === 'X' && arrayBoard[1][2] === 'X' && arrayBoard[2][2] === 'X' ||
        arrayBoard[0][2] === 'O' && arrayBoard[1][2] === 'O' && arrayBoard[2][2] === 'O' ||
        arrayBoard[0][0] === 'X' && arrayBoard[1][1] === 'X' && arrayBoard[2][2] === 'X' ||
        arrayBoard[0][0] === 'O' && arrayBoard[1][1] === 'O' && arrayBoard[2][2] === 'O' ||
        arrayBoard[0][2] === 'X' && arrayBoard[1][1] === 'X' && arrayBoard[2][0] === 'X' ||
        arrayBoard[0][2] === 'O' && arrayBoard[1][1] === 'O' && arrayBoard[2][0] === 'O'
    ) {
        announceWinner(players);
        clearBoard();
    }
}

/*-------------------------------------------------------------------------------*/

function clearBoard() {
    let boardCases = document.querySelectorAll('.boardCase');
    boardCases.forEach(function(value){
        value.innerHTML = '';
    })

    arrayBoard = (function () {
        let boardArray = [];

        for (let i = 0; i < 3; i++) {
            boardArray[i] = [];
            for (let j = 0; j < 3; j++) {
                boardArray[i][j] = '';
            }
        }

        return boardArray;
    })();

}

/*-------------------------------------------------------------------------------*/

function playGame(e) {
    let players = createPlayerObjects();
    let caseInfo = getCaseinfo(e);
    displayTokenInCase(e, players);
    putTokenInArray(caseInfo, players);
    checkForWinner(players);
    switchPlayer();
}