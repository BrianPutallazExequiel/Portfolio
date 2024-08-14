// Menu Burger
const burger = document.querySelector('#burger');
const navItem = document.querySelector('.header__nav-list');
function toggleNavDisplay() {
    if (window.innerWidth > 820) {
        navItem.style.display = 'flex';
    } else {
        navItem.style.display = burger.checked ? 'flex' : 'none';
    }
}
burger.addEventListener('change', toggleNavDisplay);
window.addEventListener('resize', toggleNavDisplay);
toggleNavDisplay();

// Theme Switch 
var canvas;
var context;
var screenH;
var screenW;
var stars = [];
var fps = 50;
var numStars = 50;

$(document).ready(function () {
    // Calculate the screen size
    screenH = $(window).height();
    screenW = $(window).width();

    // Get the canvas
    canvas = $('#space');

    // Fill out the canvas
    canvas.attr('height', screenH);
    canvas.attr('width', screenW);
    context = canvas[0].getContext('2d');

    // Create all the stars
    createStars();

    setInterval(animate, 1000 / fps);

    // Redraw stars when window is resized
    $(window).resize(function () {
        screenH = $(window).height();
        screenW = $(window).width();
        canvas.attr('height', screenH);
        canvas.attr('width', screenW);
        stars = [];
        createStars();
    });
});
function createStars() {
    for (var i = 0; i < numStars; i++) {
        var x = Math.round(Math.random() * screenW);
        var y = Math.round(Math.random() * screenH);
        var length = 3 + Math.random() * 4; // Hacer las estrellas más grandes
        var opacity = Math.random();

        // Create a new star and draw
        var star = new Star(x, y, length, opacity);

        // Add the the stars array
        stars.push(star);
    }
}

/**
 * Animate the canvas
 */
function animate() {
    context.clearRect(0, 0, screenW, screenH);
    $.each(stars, function () {
        this.draw(context);
    });
}

/**
 * Star
 * 
 * @param int x
 * @param int y
 * @param int length
 * @param float opacity
 */
function Star(x, y, length, opacity) {
    this.x = parseInt(x);
    this.y = parseInt(y);
    this.length = parseInt(length);
    this.opacity = opacity;
    this.factor = 1;
    this.increment = Math.random() * .03;
}

/**
 * Draw a star
 * 
 * This function draws a star.
 * You need to give the context as a parameter 
 * 
 * @param context
 */
Star.prototype.draw = function (context) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate((Math.PI * 1 / 10));

    if (this.opacity > 1) {
        this.factor = -1;
    } else if (this.opacity <= 0) {
        this.factor = 1;
        this.x = Math.round(Math.random() * screenW);
        this.y = Math.round(Math.random() * screenH);
    }

    this.opacity += this.increment * this.factor;

    context.beginPath();
    for (var i = 5; i--;) {
        context.lineTo(0, this.length);
        context.translate(0, this.length);
        context.rotate((Math.PI * 2 / 10));
        context.lineTo(0, - this.length);
        context.translate(0, - this.length);
        context.rotate(-(Math.PI * 6 / 10));
    }
    context.lineTo(0, this.length);
    context.closePath();
    context.fillStyle = "rgba(255, 255, 255, 0.4)"; // Color blanco con 40% de opacidad
    context.shadowBlur = 5;
    context.shadowColor = '#ffffff'; // Sombra blanca
    context.fill();

    context.restore();
}

