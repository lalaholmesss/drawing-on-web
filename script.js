class DrawingApp {
    constructor(canvasSelector, controls) {
        this.canvas = document.querySelector(canvasSelector);
        this.ctx = this.canvas.getContext("2d");
        
        this.controls = {
            clearButton: document.getElementById(controls.clearButton),
            sizeSlider: document.getElementById(controls.sizeSlider),
            colorInputs: document.querySelectorAll(controls.colorInputs),
            eraserButton: document.querySelector(controls.eraserButton),
        };

        this.isDrawing = false;
        this.brushWidth = 5;
        this.currentColor = "#000000";
        this.isEraser = false;
        this.backgroundColor = "#FFFFFF";

        this.initCanvas();
        this.addEventListeners();
    }

    initCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    addEventListeners() {
        this.canvas.addEventListener("mousedown", (e) => this.startDrawing(e));
        this.canvas.addEventListener("mouseup", () => this.stopDrawing());
        this.canvas.addEventListener("mousemove", (e) => this.draw(e));

        this.controls.colorInputs.forEach((colorInput) => {
            colorInput.addEventListener("click", () => this.changeColor(colorInput));
        });
        this.controls.eraserButton.addEventListener("click", () => this.toggleEraser());
        this.controls.clearButton.addEventListener("click", () => this.clearCanvas());
        this.controls.sizeSlider.addEventListener("change", (e) => this.updateBrushSize(e));
    }

    startDrawing(e) {
        this.isDrawing = true;
        this.ctx.beginPath();
        this.ctx.lineWidth = this.brushWidth;
        this.ctx.lineCap = "round";
        this.ctx.strokeStyle = this.isEraser ? this.backgroundColor : this.currentColor;
        this.ctx.moveTo(e.offsetX, e.offsetY);
    }

    stopDrawing() {
        this.isDrawing = false;
        this.ctx.closePath();
    }

    draw(e) {
        if (!this.isDrawing) return;
        this.ctx.lineTo(e.offsetX, e.offsetY);
        this.ctx.stroke();
    }

    changeColor(colorInput) {
        this.isEraser = false;
        if (colorInput.tagName === "DIV") {
            this.currentColor = getComputedStyle(colorInput).backgroundColor;
        } else if (colorInput.tagName === "INPUT") {
            this.currentColor = colorInput.value;
        }
    }

    toggleEraser() {
        this.isEraser = true;
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    updateBrushSize(e) {
        this.brushWidth = e.target.value;
    }
}

const app = new DrawingApp("canvas", {
    clearButton: "clear",
    sizeSlider: "size-slider",
    colorInputs: ".colors div, .colors input[type='color']",
    eraserButton: ".fa-eraser",
});
