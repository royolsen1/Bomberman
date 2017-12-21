var players = [];
var numberOfPlayers;
var size = 15;
var matrixModel = [];
var matrixView = document.getElementById('matrix');
var moveUp = false;
var moveRight = false;
var moveDown = false;
var moveLeft = false;
init(size);

function showMatrix() {
    matrixView.innerHTML = '';
    for (var rowCounter = 0; rowCounter < matrixModel.rows.length; rowCounter++) {
        var viewRow = matrixView.insertRow();
        var modelRow = matrixModel.rows[rowCounter];
        for (var cellCounter = 0; cellCounter < modelRow.cells.length; cellCounter++) {
            var viewCell = viewRow.insertCell();
            var modelCell = modelRow.cells[cellCounter];
            if (modelCell.isWall) {
                viewCell.style.backgroundColor = 'grey';
            } else if (modelCell.isBreakableWall) {
                viewCell.style.backgroundImage = 'url("wall.png")';
            } else if (modelCell.isPlayer == 0) {
                viewCell.style.backgroundImage = 'url("grass.png")';
            }
            if (modelCell.isBomb > 0) {
                viewCell.style.backgroundImage = 'url("bomb.png")';
                modelCell.isBomb--;
                if (modelCell.isBomb == 0) {
                    explotion(rowCounter, cellCounter);
                }
            }
            if (modelCell.isPlayer == 1) {
                viewCell.style.backgroundImage = 'url("bombermanP1.png")';
            }
            if (modelCell.isPlayer == 2) {
                viewCell.style.backgroundImage = 'url("bombermanP2.png")';
            }
            if (modelCell.isPlayer == 3) {
                viewCell.style.backgroundImage = 'url("bombermanP3.png")';
            }
            if (modelCell.isPlayer == 4) {
                viewCell.style.backgroundImage = 'url("bombermanP4.png")';
            }
            if (modelCell.isExplotion > 0) {
                viewCell.style.backgroundImage = 'url("flame.png")';
                modelCell.isExplotion--;
            }
            if (modelCell.isPlayer > 0 && modelCell.isExplotion > 0) {
                players.nr[modelCell.isPlayer - 1].dead = true;
                modelCell.isPlayer = 0;
            }
        }
    }
    if (players.nr[0].speedCooldown > 0) {
        players.nr[0].speedCooldown--;
    }
}

function movingSpeed() {
    players.nr[0].speedCooldown = players.nr[0].speed;
}

function initPlayers() {
    players = {};
    players.nr = [];
    for (var i = 0; i < numberOfPlayers; i++) {
        var newPlayer = {};
        newPlayer.nr = i + 1;
        newPlayer.speed = 30;
        newPlayer.speedCooldown = 0;
        newPlayer.bombAmount = 1;
        newPlayer.blastRadius = 1;
        newPlayer.row;
        newPlayer.cell;
        newPlayer.dead = false;
        players.nr.push(newPlayer);
    }
}
function init(size) {
    matrixModel = {};
    matrixModel.rows = [];
    for (var rowCounter = 0; rowCounter < size; rowCounter++) {
        var newRow = {};
        newRow.cells = [];
        for (var cellCounter = 0; cellCounter < size; cellCounter++) {
            var newCell = {};
            newCell.isPlayer = 0;
            newCell.isWall = true;
            newCell.isBreakableWall = false;
            newCell.isSpawn = false;
            newCell.isBomb = 0;
            newCell.isExplotion = 0;
            newRow.cells.push(newCell);
        }
        matrixModel.rows.push(newRow);
    }
}

function placeObjects() {
    for (var rowCounter = 0; rowCounter < matrixModel.rows.length; rowCounter++) {
        var modelRow = matrixModel.rows[rowCounter];
        for (var cellCounter = 0; cellCounter < modelRow.cells.length; cellCounter++) {
            var modelCell = modelRow.cells[cellCounter];
            if (rowCounter == 1 && cellCounter == 1 && numberOfPlayers >= 1) {
                modelCell.isPlayer = 1;
                modelCell.isSpawn = true;
                players.nr[0].cell = cellCounter;
                players.nr[0].row = rowCounter;
            }
            if (rowCounter == size - 2 && cellCounter == size - 2) {
                if (numberOfPlayers >= 2) {
                    modelCell.isPlayer = 2;
                    players.nr[1].cell = cellCounter;
                    players.nr[1].row = rowCounter;
                }
                modelCell.isSpawn = true;
            }
            if (rowCounter == size - 2 && cellCounter == 1) {
                if (numberOfPlayers >= 3) {
                    modelCell.isPlayer = 3;
                    players.nr[2].cell = cellCounter;
                    players.nr[2].row = rowCounter;
                }
                modelCell.isSpawn = true;
            }
            if (rowCounter == 1 && cellCounter == size - 2) {
                if (numberOfPlayers >= 4) {
                    modelCell.isPlayer = 4;
                    players.nr[3].cell = cellCounter;
                    players.nr[3].row = rowCounter;
                }
                modelCell.isSpawn = true;
            }
            if (rowCounter == 0 ||
                rowCounter == size - 1 ||
                cellCounter == 0 ||
                cellCounter == size - 1) {
            } else if (
                rowCounter == 1 ||
                rowCounter == 3 ||
                rowCounter == 5 ||
                rowCounter == 7 ||
                rowCounter == 9 ||
                rowCounter == 11 ||
                rowCounter == 13 ||
                cellCounter == 1 ||
                cellCounter == 3 ||
                cellCounter == 5 ||
                cellCounter == 7 ||
                cellCounter == 9 ||
                cellCounter == 11 ||
                cellCounter == 13) {
                modelCell.isWall = false;
            }
            if ((rowCounter == 1 && cellCounter == 2) ||
                (rowCounter == 1 && cellCounter == 3) ||
                (rowCounter == 2 && cellCounter == 1) ||
                (rowCounter == 3 && cellCounter == 1) ||
                (rowCounter == 1 && cellCounter == size - 3) ||
                (rowCounter == 1 && cellCounter == size - 4) ||
                (rowCounter == 2 && cellCounter == size - 2) ||
                (rowCounter == 3 && cellCounter == size - 2) ||
                (rowCounter == size - 2 && cellCounter == 2) ||
                (rowCounter == size - 2 && cellCounter == 3) ||
                (rowCounter == size - 3 && cellCounter == 1) ||
                (rowCounter == size - 4 && cellCounter == 1) ||
                (rowCounter == size - 2 && cellCounter == size - 3) ||
                (rowCounter == size - 2 && cellCounter == size - 4) ||
                (rowCounter == size - 3 && cellCounter == size - 2) ||
                (rowCounter == size - 4 && cellCounter == size - 2)) {
                modelCell.isSpawn = true;
            }
            if (!modelCell.isSpawn && !modelCell.isWall) {
                var breakableWall = Math.floor(Math.random() * 100);
                if (breakableWall <= 92) {
                    modelCell.isBreakableWall = true;
                }

            }
        }
    }
}
function startGame(nr) {
    numberOfPlayers = nr;
    document.getElementById('playerSelect').innerHTML = '';
    initPlayers();
    placeObjects();
    showMatrix();
    game();
}

function game() {
    playerMove();
    showMatrix();
    setTimeout(function () { game() }, 16);
}

function playerMove() {
    var rowIndex = players.nr[0].row;
    var cellIndex = players.nr[0].cell;
    if (players.nr[0].speedCooldown == 0) {
        if (!players.nr[0].dead) {
            if (moveRight) {
                if (!matrixModel.rows[rowIndex].cells[cellIndex + 1].isWall &&
                    !matrixModel.rows[rowIndex].cells[cellIndex + 1].isBreakableWall &&
                    !matrixModel.rows[rowIndex].cells[cellIndex + 1].isBomb) {
                    matrixModel.rows[rowIndex].cells[cellIndex].isPlayer = 0;
                    cellIndex++;
                    matrixModel.rows[rowIndex].cells[cellIndex].isPlayer = 0 + 1;
                    players.nr[0].cell = cellIndex;
                    movingSpeed();
                }
            } else if (moveDown) {
                if (!matrixModel.rows[rowIndex + 1].cells[cellIndex].isWall &&
                    !matrixModel.rows[rowIndex + 1].cells[cellIndex].isBreakableWall &&
                    !matrixModel.rows[rowIndex + 1].cells[cellIndex].isBomb) {
                    matrixModel.rows[rowIndex].cells[cellIndex].isPlayer = 0;
                    rowIndex++;
                    matrixModel.rows[rowIndex].cells[cellIndex].isPlayer = 0 + 1;
                    players.nr[0].row = rowIndex;
                    movingSpeed();
                }
            } else if (moveLeft) {
                if (!matrixModel.rows[rowIndex].cells[cellIndex - 1].isWall &&
                    !matrixModel.rows[rowIndex].cells[cellIndex - 1].isBreakableWall &&
                    !matrixModel.rows[rowIndex].cells[cellIndex - 1].isBomb) {
                    matrixModel.rows[rowIndex].cells[cellIndex].isPlayer = 0;
                    cellIndex--;
                    matrixModel.rows[rowIndex].cells[cellIndex].isPlayer = 0 + 1;
                    players.nr[0].cell = cellIndex;
                    movingSpeed();
                }
            } else if (moveUp) {
                if (!matrixModel.rows[rowIndex - 1].cells[cellIndex].isWall &&
                    !matrixModel.rows[rowIndex - 1].cells[cellIndex].isBreakableWall &&
                    !matrixModel.rows[rowIndex - 1].cells[cellIndex].isBomb) {
                    matrixModel.rows[rowIndex].cells[cellIndex].isPlayer = 0;
                    rowIndex--;
                    matrixModel.rows[rowIndex].cells[cellIndex].isPlayer = 0 + 1;
                    players.nr[0].row = rowIndex;
                    movingSpeed();
                }
            }
        }
    }
}

function placeBomb() {
    var rowIndex = players.nr[0].row;
    var cellIndex = players.nr[0].cell;
    if (!players.nr[0].dead) {
        matrixModel.rows[rowIndex].cells[cellIndex].isBomb = 180;
    }
}

function explotion(rowIndex, cellIndex) {
    matrixModel.rows[rowIndex].cells[cellIndex].isExplotion = 90;
    var bombBlast = players.nr[0].blastRadius;
    //Right
    for (var i = 0; i < bombBlast; i++) {
        if (matrixModel.rows[rowIndex].cells[cellIndex + 1 + i].isBreakableWall) {
            matrixModel.rows[rowIndex].cells[cellIndex + 1 + i].isBreakableWall = false;
            matrixModel.rows[rowIndex].cells[cellIndex + 1 + i].isExplotion = 90;
            i = bombBlast;
        } else if (matrixModel.rows[rowIndex].cells[cellIndex + 1 + i].isWall) {
            i = bombBlast;
        } else {
            matrixModel.rows[rowIndex].cells[cellIndex + 1 + i].isExplotion = 90;
        }
    }
    //Left
    for (var i = 0; i < bombBlast; i++) {
        if (matrixModel.rows[rowIndex].cells[cellIndex - 1 - i].isBreakableWall) {
            matrixModel.rows[rowIndex].cells[cellIndex - 1 - i].isBreakableWall = false;
            matrixModel.rows[rowIndex].cells[cellIndex - 1 - i].isExplotion = 90;
            i = bombBlast;
        } else if (matrixModel.rows[rowIndex].cells[cellIndex - 1 - i].isWall) {
            i = bombBlast;
        } else {
            matrixModel.rows[rowIndex].cells[cellIndex - 1 - i].isExplotion = 90;
        }
    }
    //Up
    for (var i = 0; i < bombBlast; i++) {
        if (matrixModel.rows[rowIndex - 1 - i].cells[cellIndex].isBreakableWall) {
            matrixModel.rows[rowIndex - 1 - i].cells[cellIndex].isBreakableWall = false;
            matrixModel.rows[rowIndex - 1 - i].cells[cellIndex].isExplotion = 90;
            i = bombBlast;
        } else if (matrixModel.rows[rowIndex - 1 - i].cells[cellIndex].isWall) {
            i = bombBlast;
        } else {
            matrixModel.rows[rowIndex - 1 - i].cells[cellIndex].isExplotion = 90;
        }
    }
    //Down
    for (var i = 0; i < bombBlast; i++) {
        if (matrixModel.rows[rowIndex + 1 + i].cells[cellIndex].isBreakableWall) {
            matrixModel.rows[rowIndex + 1 + i].cells[cellIndex].isBreakableWall = false;
            matrixModel.rows[rowIndex + 1 + i].cells[cellIndex].isExplotion = 90;
            i = bombBlast;
        } else if (matrixModel.rows[rowIndex + 1 + i].cells[cellIndex].isWall) {
            i = bombBlast;
        } else {
            matrixModel.rows[rowIndex + 1 + i].cells[cellIndex].isExplotion = 90;
        }
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e) {
    if (e.keyCode == 39) {
        moveRight = true;
    }
    else if (e.keyCode == 37) {
        moveLeft = true;
    }
    else if (e.keyCode == 38) {
        moveUp = true;
    }
    else if (e.keyCode == 40) {
        moveDown = true;
    }
    if (e.keyCode == 32) {
        placeBomb();
    }
}
function keyUpHandler(e) {
    if (e.keyCode == 39) {
        moveRight = false;
    }
    else if (e.keyCode == 37) {
        moveLeft = false;
    }
    else if (e.keyCode == 38) {
        moveUp = false;
    }
    else if (e.keyCode == 40) {
        moveDown = false;
    }
}
