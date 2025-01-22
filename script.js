const canvas = document.querySelector("canvas");
const clear = document.getElementById("clear");
const slider = document.getElementById("size-slider");
const colors = document.querySelectorAll("colors");

ctx = canvas.getContext("2d");

let isDrawing = false;
let brushWidth = 5;
window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
})

const startDrawing = () => {
    isDrawing = true;
    ctx.beginPath(); // creating a new path to draw so it doesn't start drawing from the 
                     // last end point each time
    ctx.lineWidth = brushWidth;
}

const stopDrawing = () => {
    isDrawing = false;
}
const drawing = (e) => {
    if(!isDrawing) return;
    ctx.lineTo(e.offsetX, e.offsetY); // create the line
    console.log(e.offsetX, e.offsetY); // draw
    ctx.stroke()
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousemove", drawing);
slider.addEventListener("change", () => brushWidth = slider.value);

