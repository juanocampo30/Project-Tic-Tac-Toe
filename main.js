let boardGame = document.querySelector('#boardContainer');
boardGame.addEventListener('click', playGame);

let currentPlayer = 1;

const winningCombinations = [
    
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
];

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
    
    for (let combo of winningCombinations) {
        
        const [a, b, c] = combo; 

        const valueA = arrayBoard[a[0]][a[1]];
        const valueB = arrayBoard[b[0]][b[1]];
        const valueC = arrayBoard[c[0]][c[1]];
        
        if (valueA !== '' && valueA === valueB && valueA === valueC) {
            announceWinner(players);
            clearBoard();
            return; 
        }
    }
}

/*-------------------------------------------------------------------------------*/

function clearBoard() {
    let boardCases = document.querySelectorAll('.boardCase');
    boardCases.forEach(function (value) {
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
    setTimeout(function () {
        checkForWinner(players);
        switchPlayer();
    },100);

}