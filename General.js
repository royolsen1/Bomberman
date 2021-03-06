var players = [];
var numberOfPlayers;
var size = 15;
var matrixModel = [];
var matrixView = document.getElementById('matrix');
var moveUp = false;
var moveRight = false;
var moveDown = false;
var moveLeft = false;
var playerNr = 0;
init(size);
startGame(4);

function changePlayer(player) {
    playerNr = player;
}
function showMatrix() {
    matrixView.innerHTML = '';
    for (var rowCounter = 0; rowCounter < matrixModel.rows.length; rowCounter++) {
        var viewRow = matrixView.insertRow();
        var modelRow = matrixModel.rows[rowCounter];
        for (var cellCounter = 0; cellCounter < modelRow.cells.length; cellCounter++) {
            var viewCell = viewRow.insertCell();
            var modelCell = modelRow.cells[cellCounter];
            if (modelCell.isWall) {
                viewCell.style.backgroundImage = 'url("stoneWall.png")';
            } else if (modelCell.isBreakableWall) {
                viewCell.style.backgroundImage = 'url("brickWall.png")';
            } else if (modelCell.isPlayer == 0) {
                viewCell.style.backgroundColor = 'none';
            }
            if (modelCell.isBomb0 > 0) {
                viewCell.style.backgroundImage = 'url("bomb.png")';
                modelCell.isBomb0--;
                if (modelCell.isBomb0 == 0) {
                    explotion(rowCounter, cellCounter, 0);
                }
            }
            if (modelCell.isBomb1 > 0) {
                viewCell.style.backgroundImage = 'url("bomb.png")';
                modelCell.isBomb1--;
                if (modelCell.isBomb1 == 0) {
                    explotion(rowCounter, cellCounter, 1);
                }
            }
            if (modelCell.isBomb2 > 0) {
                viewCell.style.backgroundImage = 'url("bomb.png")';
                modelCell.isBomb2--;
                if (modelCell.isBomb2 == 0) {
                    explotion(rowCounter, cellCounter, 2);
                }
            }
            if (modelCell.isBomb3 > 0) {
                viewCell.style.backgroundImage = 'url("bomb.png")';
                modelCell.isBomb3--;
                if (modelCell.isBomb3 == 0) {
                    explotion(rowCounter, cellCounter, 3);
                }
            }
            if (modelCell.increaseBombAmount) {
                viewCell.style.backgroundImage = 'url("bombup.png")';
                if (modelCell.isPlayer > 0) {
                    powerUp(modelCell.isPlayer - 1, 'bombUp')
                    modelCell.increaseBombAmount = false;
                }
            }
            if (modelCell.increaseBlastRadius) {
                viewCell.style.backgroundImage = 'url("blast.png")';
                if (modelCell.isPlayer > 0) {
                    powerUp(modelCell.isPlayer - 1, 'blastUp')
                    modelCell.increaseBlastRadius = false;
                }
            }
            if (modelCell.increaseSpeed) {
                viewCell.style.backgroundImage = 'url("boots.png")';
                if (modelCell.isPlayer > 0) {
                    powerUp(modelCell.isPlayer - 1, 'speedUp')
                    modelCell.increaseSpeed = false;
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
                modelCell.increaseBlastRadius = false;
                modelCell.increaseBombAmount = false;
                modelCell.increaseSpeed = false;
                modelCell.isExplotion--;
                if (modelCell.isExplotion == 0 && modelCell.isBreakableWall) {
                    modelCell.isBreakableWall = false;
                    placePowerUp(rowCounter, cellCounter);
                }
                if (modelCell.isBomb0 > 0) {
                    modelCell.isBomb0 = 0;
                    explotion(rowCounter, cellCounter, 0);
                }
                if (modelCell.isBomb1 > 0) {
                    modelCell.isBomb1 = 0;
                    explotion(rowCounter, cellCounter, 1);
                }
                if (modelCell.isBomb2 > 0) {
                    modelCell.isBomb2 = 0;
                    explotion(rowCounter, cellCounter, 2);
                }
                if (modelCell.isBomb3 > 0) {
                    modelCell.isBomb3 = 0;
                    explotion(rowCounter, cellCounter, 3);
                }
            }
            if (modelCell.isPlayer > 0 && modelCell.isExplotion > 0) {
                players.nr[modelCell.isPlayer - 1].dead = true;
                modelCell.isPlayer = 0;
            }
        }
    }
    if (players.nr[playerNr].speedCooldown > 0) {
        players.nr[playerNr].speedCooldown--;
    }
}
function movingSpeed() {
    players.nr[playerNr].speedCooldown = players.nr[playerNr].speed;
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
            newCell.isBomb0 = 0;
            newCell.isBomb1 = 0;
            newCell.isBomb2 = 0;
            newCell.isBomb3 = 0;
            newCell.isExplotion = 0;
            newCell.increaseBombAmount = false;
            newCell.increaseBlastRadius = false;
            newCell.increaseSpeed = false;
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
    var rowIndex = players.nr[playerNr].row;
    var cellIndex = players.nr[playerNr].cell;
    if (players.nr[playerNr].speedCooldown == 0) {
        if (!players.nr[playerNr].dead) {
            if (moveRight) {
                if (!matrixModel.rows[rowIndex].cells[cellIndex + 1].isWall &&
                    !matrixModel.rows[rowIndex].cells[cellIndex + 1].isBreakableWall &&
                    !matrixModel.rows[rowIndex].cells[cellIndex + 1].isBomb &&
                    matrixModel.rows[rowIndex].cells[cellIndex + 1].isPlayer == 0) {
                    matrixModel.rows[rowIndex].cells[cellIndex].isPlayer = 0;
                    cellIndex++;
                    matrixModel.rows[rowIndex].cells[cellIndex].isPlayer = playerNr + 1;
                    players.nr[playerNr].cell = cellIndex;
                    movingSpeed();
                }
            } else if (moveDown) {
                if (!matrixModel.rows[rowIndex + 1].cells[cellIndex].isWall &&
                    !matrixModel.rows[rowIndex + 1].cells[cellIndex].isBreakableWall &&
                    !matrixModel.rows[rowIndex + 1].cells[cellIndex].isBomb &&
                    matrixModel.rows[rowIndex + 1].cells[cellIndex].isPlayer == 0) {
                    matrixModel.rows[rowIndex].cells[cellIndex].isPlayer = 0;
                    rowIndex++;
                    matrixModel.rows[rowIndex].cells[cellIndex].isPlayer = playerNr + 1;
                    players.nr[playerNr].row = rowIndex;
                    movingSpeed();
                }
            } else if (moveLeft) {
                if (!matrixModel.rows[rowIndex].cells[cellIndex - 1].isWall &&
                    !matrixModel.rows[rowIndex].cells[cellIndex - 1].isBreakableWall &&
                    !matrixModel.rows[rowIndex].cells[cellIndex - 1].isBomb &&
                    matrixModel.rows[rowIndex].cells[cellIndex - 1].isPlayer == 0) {
                    matrixModel.rows[rowIndex].cells[cellIndex].isPlayer = 0;
                    cellIndex--;
                    matrixModel.rows[rowIndex].cells[cellIndex].isPlayer = playerNr + 1;
                    players.nr[playerNr].cell = cellIndex;
                    movingSpeed();
                }
            } else if (moveUp) {
                if (!matrixModel.rows[rowIndex - 1].cells[cellIndex].isWall &&
                    !matrixModel.rows[rowIndex - 1].cells[cellIndex].isBreakableWall &&
                    !matrixModel.rows[rowIndex - 1].cells[cellIndex].isBomb &&
                    matrixModel.rows[rowIndex - 1].cells[cellIndex].isPlayer == 0) {
                    matrixModel.rows[rowIndex].cells[cellIndex].isPlayer = 0;
                    rowIndex--;
                    matrixModel.rows[rowIndex].cells[cellIndex].isPlayer = playerNr + 1;
                    players.nr[playerNr].row = rowIndex;
                    movingSpeed();
                }
            }
        }
    }
}
function placeBomb() {
    var rowIndex = players.nr[playerNr].row;
    var cellIndex = players.nr[playerNr].cell;
    if (players.nr[playerNr].bombAmount > 0 &&
        matrixModel.rows[rowIndex].cells[cellIndex].isBomb0 == 0 &&
        matrixModel.rows[rowIndex].cells[cellIndex].isBomb1 == 0 &&
        matrixModel.rows[rowIndex].cells[cellIndex].isBomb2 == 0 &&
        matrixModel.rows[rowIndex].cells[cellIndex].isBomb3 == 0) {
        if (!players.nr[playerNr].dead) {
            if (playerNr == 0) {
                matrixModel.rows[rowIndex].cells[cellIndex].isBomb0 = 180;
            } else if (playerNr == 1) {
                matrixModel.rows[rowIndex].cells[cellIndex].isBomb1 = 180;
            } else if (playerNr == 2) {
                matrixModel.rows[rowIndex].cells[cellIndex].isBomb2 = 180;
            } else if (playerNr == 3) {
                matrixModel.rows[rowIndex].cells[cellIndex].isBomb3 = 180;
            }
            players.nr[playerNr].bombAmount--;
        }
    }
}
function placePowerUp(rowIndex, cellIndex) {
    var isPowerUp = Math.floor(Math.random() * 100);
    if (isPowerUp > 75) {
        var powerUpType = Math.floor(Math.random() * 3) + 1
        if (powerUpType == 1) {
            matrixModel.rows[rowIndex].cells[cellIndex].increaseBombAmount = true;
        } else if (powerUpType == 2) {
            matrixModel.rows[rowIndex].cells[cellIndex].increaseBlastRadius = true;
        } else if (powerUpType == 3) {
            matrixModel.rows[rowIndex].cells[cellIndex].increaseSpeed = true;
        }
    }
}
function powerUp(playerId, powerUpType) {
    if (powerUpType == 'bombUp') {
        players.nr[playerId].bombAmount++;
    } else if (powerUpType == 'blastUp') {
        players.nr[playerId].blastRadius++;
    } else if (powerUpType == 'speedUp' && players.nr[playerId].speed > 5) {
        players.nr[playerId].speed -= 5;
    }
}
function explotion(rowIndex, cellIndex, playerId) {
    matrixModel.rows[rowIndex].cells[cellIndex].isExplotion = 90;
    var bombBlast = players.nr[playerNr].blastRadius;
    players.nr[playerId].bombAmount++;
    //Right
    for (var i = 0; i < bombBlast; i++) {
        if (matrixModel.rows[rowIndex].cells[cellIndex + 1 + i].isBreakableWall) {
            //  matrixModel.rows[rowIndex].cells[cellIndex + 1 + i].isBreakableWall = false;
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
            //      matrixModel.rows[rowIndex].cells[cellIndex - 1 - i].isBreakableWall = false;
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
            //      matrixModel.rows[rowIndex - 1 - i].cells[cellIndex].isBreakableWall = false;
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
            //     matrixModel.rows[rowIndex + 1 + i].cells[cellIndex].isBreakableWall = false;
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
