import boxes from "./models/boxes.js";
const _mapper = new Map();


const colorBoardCanvas = document.getElementById("colorBoardCanvas");
const mainCanvas = document.getElementById("mainCanvas");
const colorCardCanvas = document.getElementById("colorCardCanvas");

const colorBoardCanvasCtx = colorBoardCanvas.getContext("2d", { willReadFrequently: true });
const mainCanvasCtx = mainCanvas.getContext("2d");
const colorCardCtx = colorCardCanvas.getContext("2d");


console.log(`${mainCanvas.height} ${mainCanvas.width}`)
console.log(`${colorBoardCanvas.height} ${colorBoardCanvas.width}`)
mainCanvas.height = 600;
mainCanvas.width = 1000;
colorBoardCanvas.height = 606;
colorBoardCanvas.width = 1136;
console.log("------------------")
console.log(`${mainCanvas.height} ${mainCanvas.width}`)
console.log(`${colorBoardCanvas.height} ${colorBoardCanvas.width}`)



const turn_indicator = document.querySelector('.turn-indicator');
let rotationAngle = 0;
let counter = 0;
turn_indicator.addEventListener('click', function () {
    rotationAngle -= 60;
    counter++;

    if (counter % 3 == 0) {
        rotationAngle += 180;
    }
    this.style.transform = `rotate(${rotationAngle}deg)`;
});


document.addEventListener("DOMContentLoaded", function () {

    var boxDimension = 32;
    let margin = 6;

    // Draw the boxes
    for (let curColumn = 0; curColumn < boxes.length; curColumn++) {
        for (let curRow = 0; curRow < boxes[curColumn].length; curRow++) {

            var _x = curColumn * (boxDimension + margin);
            var _y = curRow * (boxDimension + margin);

            let box = boxes[curColumn][curRow];
            _mapper.set(box.color, {
                x: _x + (boxDimension / 2),
                y: _y + (boxDimension / 2),
                name: box.name
            });

            colorBoardCanvasCtx.fillStyle = box.color;
            colorBoardCanvasCtx.fillRect(_x, _y, boxDimension, boxDimension);
        }
    }
});

colorBoardCanvas.addEventListener("click", function (e) {

    let { x, y } = localizeMousePos(colorBoardCanvas, e.x, e.y)
    let data = colorBoardCanvasCtx.getImageData(x, y, 1, 1).data;

    let hexColor = rgbToHex(data[0], data[1], data[2]);
    let pos = _mapper.get(hexColor);


    if (pos != undefined) {
        // movePlayerPawn();
        console.log(pos);
    } else {

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

function localizeMousePos(canvas, mouseX, mouseY) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (mouseX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (mouseY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

function toggleRotation(element) {
    element.classList.toggle('rotate');
}



