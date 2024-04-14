import boxes from "./models/boxes.js";

const _mapper = new Map();

const boardCanvas = document.getElementById("boardCanvas");
const boardCanvasCtx = boardCanvas.getContext("2d",{ willReadFrequently: true });


const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");

const colorCardCanvas = document.getElementById("colorCardCanvas");
const colorCardCtx = colorCardCanvas.getContext("2d");

canvas.height = 600;
canvas.width = 1000;

boardCanvas.height = 606;
boardCanvas.width = 1136;

const turn_indicator = document.querySelector('.turn-indicator');
let rotationAngle = 0;
let counter = 0;
turn_indicator.addEventListener('click', function() {
    rotationAngle -= 60;
    counter++;

    if(counter % 3 == 0){
        rotationAngle += 180;
    }
    this.style.transform = `rotate(${rotationAngle}deg)`;
});


document.addEventListener("DOMContentLoaded", function () {

    var gridSize = { rows: 16, columns: 30 };
    var boxDimension = 32;

    let margin = 6;

    // Draw the boxes
    boxes.forEach(function (box) {

        var _x = box.row *  (boxDimension + margin);
        var _y = box.column *  (boxDimension + margin);

        _mapper.set(box.color, { x: _x + (boxDimension / 2), 
                                 y: _y + (boxDimension / 2) });

        boardCanvasCtx.fillStyle = box.color;
        boardCanvasCtx.fillRect(_x, _y, boxDimension , boxDimension );
    });

    // let imageData = boardCanvasCtx.getImageData(270, 485, 1, 1);
    // console.log(imageData);

    
});




boardCanvas.addEventListener("click", function (e) {

    let {x,y} =  localizeMousePos(boardCanvas,e.x,e.y)
    let _data = boardCanvasCtx.getImageData(x, y, 1, 1).data;

    let hexColor = rgbToHex(_data[0],_data[1],_data[2]);
    let pos = _mapper.get(hexColor);


    if(pos != undefined)
    {
        // movePlayerPawn();
        console.log(pos);
    }else{

        console.log("basamadinKiii");
    }


})



function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function localizeMousePos(canvas, mouseX,mouseY) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (mouseX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (mouseY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

function toggleRotation(element) {
    element.classList.toggle('rotate');
  }



