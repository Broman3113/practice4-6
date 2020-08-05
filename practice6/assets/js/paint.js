window.onload = function () { start(); }
function start() {
    let canvas = document.getElementById('draw');
    let output = document.getElementById("demo");
    const context = canvas.getContext("2d");
    let myColor = 'black';
    let myWidth = '5';
    document.getElementById('color').oninput = function () {
        myColor = this.value;
    }
    document.getElementById('width').oninput = function () {
        myWidth = this.value;
        output.innerHTML = this.value;
    }
    
     // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)

    let clickX = new Array();
    let clickY = new Array();
    let clickDrag = new Array();
    let paint;
    let mouseX;
    let mouseY;

    //specific only for this layout
    let offsetLeft = canvas.parentElement.parentElement.offsetLeft;
    let offsetTop = canvas.parentElement.parentElement.offsetTop;

    canvas.addEventListener('mousedown', function (e) {
        mouseX = e.pageX - this.offsetLeft - offsetLeft;
        mouseY = e.pageY - this.offsetTop - offsetTop;
        paint = true;
        addClick(mouseX, mouseY);
        redraw();
    });
    canvas.addEventListener('mousemove', function (e) {
        if (paint) {
            addClick(e.pageX - this.offsetLeft - offsetLeft, e.pageY -
                this.offsetTop - offsetTop, true);
            redraw();
        }
    });
    canvas.addEventListener('mouseup', function (e) {
        paint = false;

    });
    canvas.addEventListener('mouseleave', function (e) {
        paint = false;
    });

    function addClick(x, y, dragging) {
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
    }
    function redraw() {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
        context.strokeStyle = myColor;
        context.lineWidth = myWidth;
        context.lineJoin = "round";
        for (var i = 0; i < clickX.length; i++) {
            context.beginPath();
            if (clickDrag[i] && i) {
                context.moveTo(clickX[i - 1], clickY[i - 1]);
            } else {
                context.moveTo(clickX[i] - 1, clickY[i]);
            }
            context.lineTo(clickX[i], clickY[i]);
            context.closePath();
            context.stroke();
        }
    }

    const clearCanvas = document.querySelector('#clearCanvas');
    clearCanvas.addEventListener('click', reset);
    function reset() {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        delete context;
        delete canvas;
        start();
    }

};
