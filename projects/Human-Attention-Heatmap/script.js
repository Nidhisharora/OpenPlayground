const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const canvas = document.getElementById('heatmapCanvas');
const ctx = canvas.getContext('2d');

let tracking = false;
let positions = [];

startBtn.addEventListener('click', startTracking);
stopBtn.addEventListener('click', stopTracking);

function startTracking() {
    tracking = true;
    positions = [];
    startBtn.disabled = true;
    stopBtn.disabled = false;
    document.addEventListener('mousemove', trackMouse);
    document.addEventListener('scroll', trackScroll);
}

function stopTracking() {
    tracking = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    document.removeEventListener('mousemove', trackMouse);
    document.removeEventListener('scroll', trackScroll);
    drawHeatmap();
}

function trackMouse(e) {
    if (tracking) {
        positions.push({
            x: e.clientX + window.scrollX,
            y: e.clientY + window.scrollY
        });
    }
}

function trackScroll() {
    if (tracking) {
        // Add the center of the viewport as a position when scrolling
        const centerX = window.innerWidth / 2 + window.scrollX;
        const centerY = window.innerHeight / 2 + window.scrollY;
        positions.push({ x: centerX, y: centerY });
    }
}

function drawHeatmap() {
    const docWidth = Math.max(document.body.scrollWidth, document.body.offsetWidth, document.documentElement.clientWidth, document.documentElement.scrollWidth, document.documentElement.offsetWidth);
    const docHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);

    canvas.width = docWidth;
    canvas.height = docHeight;
    canvas.style.width = docWidth + 'px';
    canvas.style.height = docHeight + 'px';

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    positions.forEach(pos => {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(255, 0, 0, 0.1)'; // Semi-transparent red
        ctx.fill();
    });
}