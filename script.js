const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const lobby = document.getElementById("lobby");
const playButton = document.getElementById("playButton");

let gameRunning = false;
let keys = {};
let bullets = [];

// O'yinni boshlash
playButton.addEventListener("click", () => {
    lobby.style.display = "none";
    canvas.style.display = "block";
    gameRunning = true;
    animate();
});

// Tugmalarni kuzatish
window.addEventListener("keydown", (e) => keys[e.code] = true);
window.addEventListener("keyup", (e) => keys[e.code] = false);

// Sichqoncha bosilganda o'q otish
window.addEventListener("mousedown", (e) => {
    if (!gameRunning) return;
    
    // Sichqoncha koordinatasini hisoblash
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // O'q yo'nalishini aniqlash (burchak)
    let angle = Math.atan2(mouseY - player.y, mouseX - player.x);
    
    bullets.push({
        x: player.x,
        y: player.y,
        vx: Math.cos(angle) * 8, // O'q tezligi
        vy: Math.sin(angle) * 8
    });
});

let player = {
    x: 300,
    y: 200,
    speed: 4,
    width: 30,
    height: 40
};

function drawPlayer(x, y) {
    // 1. Tana (Kiyim)
    ctx.fillStyle = "#3498db"; // Ko'k kiyim
    ctx.fillRect(x - 12, y, 24, 20);

    // 2. Kalla (Yuz)
    ctx.fillStyle = "#FFDBAC"; 
    ctx.fillRect(x - 15, y - 25, 30, 25);

    // 3. Soch (Jigarrang va tartibsiz)
    ctx.fillStyle = "#4B2C20";
    ctx.fillRect(x - 17, y - 30, 34, 10); // Tepa qismi
    ctx.fillRect(x - 17, y - 25, 5, 12);  // Yon sochlar
    ctx.fillRect(x + 12, y - 25, 5, 12);

    // 4. Ko'zlar
    ctx.fillStyle = "black";
    ctx.fillRect(x - 8, y - 18, 4, 4);
    ctx.fillRect(x + 4, y - 18, 4, 4);
}

function update() {
    // Harakat va Chegaralar
    if (keys["KeyW"] && player.y > 30) player.y -= player.speed;
    if (keys["KeyS"] && player.y < canvas.height - 20) player.y += player.speed;
    if (keys["KeyA"] && player.x > 20) player.x -= player.speed;
    if (keys["KeyD"] && player.x < canvas.width - 20) player.x += player.speed;

    // O'qlarni yangilash
    bullets.forEach((bullet, index) => {
        bullet.x += bullet.vx;
        bullet.y += bullet.vy;

        // O'q ekrandan chiqib ketsa, o'chirib tashlash
        if (bullet.x < 0 || bullet.x > canvas.width || bullet.y < 0 || bullet.y > canvas.height) {
            bullets.splice(index, 1);
        }
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // O'qlarni chizish
    ctx.fillStyle = "yellow";
    bullets.forEach(b => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, 4, 0, Math.PI * 2);
        ctx.fill();
    });

    // Qahramonni chizish
    drawPlayer(player.x, player.y);
}

function animate() {
    if (!gameRunning) return;
    update();
    draw();
    requestAnimationFrame(animate);
}