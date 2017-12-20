var size = 19;
var matrixmodel;
var init;
var matrixView = document.getElementById('matrix');
init(size);
showmatrix();




function init(size) {
    matrixModel = {};
    matrixModel.rows = [];
    for (var rowCounter = 0; rowCounter < size; rowCounter++) {
        var newRow = {};
        newRow.cells = [];
        for (var cellCounter = 0; cellCounter < size; cellCounter++) {
            var newCell = {};
            newCell.isWall = false;
            newRow.cells.push(newCell);
            newCell.isPilar = true;
            newCell.isBrick = false;
        }
        matrixModel.rows.push(newRow);
    }

}

function showmatrix() {
    matrixView.innerHTML = ' ';
    for (var rowCounter = 0; rowCounter < matrixModel.rows.length; rowCounter++) {
        var viewRow = matrixView.insertRow();
        var modelRow = matrixModel.rows[rowCounter];
        for (var cellCounter = 0; cellCounter < modelRow.cells.length; cellCounter++) {
            var viewCell = viewRow.insertCell();
            var modelCell = modelRow.cells[cellCounter];

            if (rowCounter == 0 || rowCounter == size - 1 || cellCounter == 0 || cellCounter == size - 1) {
                modelCell.isWall = true;
                modelCell.isPilar = false;
                viewCell.style.backgroundColor = '#8B8D7A';
            }

            else if (rowCounter == 1 ||
                rowCounter == size - 2 ||
                rowCounter == 3 ||
                rowCounter == size - 4 ||
                rowCounter == 5 ||
                rowCounter == size - 6 ||
                rowCounter == 7 ||
                rowCounter == size - 8 ||
                rowCounter == 9 ||
                rowCounter == size - 10 ||
                cellCounter == 1 ||
                cellCounter == size - 2 ||
                cellCounter == 3 ||
                cellCounter == size - 4 ||
                cellCounter == 5 ||
                cellCounter == size - 6 ||
                cellCounter == 7 ||
                cellCounter == size - 8 ||
                cellCounter == 9 ||
                cellCounter == size - 10) {
                modelCell.isPilar = false;

            }

            generateBrick2(modelCell);

            if (modelCell.isPilar) {

                viewCell.style.backgroundColor = '#778899';
            }
            if (modelCell.isBrick)
                viewCell.style.backgroundColor = '#841F27';
        }

        //if (modelCell.isWall == false && modelCell.isPilar == false) {
        //  generateBrick(modelCell);
        //}
    }

}


function generateBrick2(modelCell) {

    if (modelCell.isWall || modelCell.isPilar) return;
    modelCell.isBrick = Math.random() < 0.5;
}

function spawn1()

{

    if (Rowincounter == 2 || ColumCounter == -2) {
        generateBrick = false;
        console.log('hei');
    }

}
function generateBrick() {

    var Rowindex = 1 + Math.floor(Math.random() * (size - 3));
    var ColumnIndex = 1 + Math.floor(Math.random() * (size - 3));
    var modelCell = matrixModel.rows[Rowindex].cells[ColumnIndex];
    modelCell.isBrick = !modelCell.isWall && !modelCell.isPilar;
}

