import boxes from "./models/boxes.js";

const _mapper = new Map();

const boardCanvas = document.getElementById("boardCanvas");
const _boardCanvasCtx = boardCanvas.getContext("2d");


const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");

const colorCardCanvas = document.getElementById("colorCardCanvas");
const colorCardCtx = colorCardCanvas.getContext("2d");

canvas.height = 600;
canvas.width = 1000;

boardCanvas.height = 606;
boardCanvas.width = 1136;

document.addEventListener("DOMContentLoaded", function () {
    // Get the canvas element


    // Define the grid size and box size
    var gridSize = { rows: 16, columns: 30 };
    var boxSize = { width: 32, height: 32 };


    let margin = 6;

    // Draw the boxes
    boxes.forEach(function (box) {

        var _x = box.row *  (boxSize.height + margin);
        var _y = box.column *  (boxSize.width + margin);

        _mapper.set(box.color, { x: _x, y: _y });

        _boardCanvasCtx.fillStyle = box.color;
        _boardCanvasCtx.fillRect(_x, _y, boxSize.width , boxSize.height );
    });
});




canvas.addEventListener("click", function (e) {
    ctx.getImageData(e.x, e.y, 1, 1)

})



