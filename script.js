document.addEventListener("keydown", movePlayer);

let playerHealth = 100;
let bossHealth = 500;
let player = document.getElementById("player");

let movingLeft = false;
let movingRight = false;
let moveInterval = null;
let movementIndicator = document.getElementById("movement-indicator"); // Novo elemento para o aviso visual

// Função para movimentar o jogador (tanto para o teclado quanto para os botões móveis)
function movePlayer(eventOrDirection) {
    let left = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
    let top = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
    let key = typeof eventOrDirection === "string" ? eventOrDirection : eventOrDirection.key;

    if ((key === "d" || key === "right") && left < 550) { // Direita
        player.style.left = left + 20 + "px";
    }
    if ((key === "a" || key === "left") && left > 0) { // Esquerda
        player.style.left = left - 20 + "px";
    }
    if ((key === "w" || key === "up") && top > 0) { // Cima
        player.style.top = top - 20 + "px";
    }
    if ((key === "s" || key === "down") && top < 350) { // Baixo
        player.style.top = top + 20 + "px";
    }
}

// Funções para controles móveis
function moveLeft() {
    movingLeft = true;
    handleMobileMove("Movendo para a Esquerda"); // Exibe a mensagem de movimento
}

function moveRight() {
    movingRight = true;
    handleMobileMove("Movendo para a Direita"); // Exibe a mensagem de movimento
}

function stopMovingLeft() {
    movingLeft = false;
    handleMobileMove(); // Para de mostrar a mensagem de movimento
}

function stopMovingRight() {
    movingRight = false;
    handleMobileMove(); // Para de mostrar a mensagem de movimento
}

// Movimenta o personagem continuamente enquanto o toque for mantido
function handleMobileMove(message) {
    // Se já existe um intervalo em andamento, interrompemos o movimento
    if (moveInterval) clearInterval(moveInterval);

    // Se o movimento para esquerda ou direita está ativo, começamos a movimentação contínua
    if (movingLeft || movingRight) {
        moveInterval = setInterval(() => {
            let left = parseInt(window.getComputedStyle(player).getPropertyValue("left"));

            if (movingLeft && left > 0) {
                player.style.left = (left - 20) + "px"; // Move para a esquerda
            }
            if (movingRight && left < 550) {
                player.style.left = (left + 20) + "px"; // Move para a direita
            }
        }, 100); // Move a cada 100ms
    } else {
        clearInterval(moveInterval); // Para o movimento quando não for pressionado
    }

    // Se houver mensagem, exibe-a
    if (message) {
        updateMovementIndicator(message);
    }
}

// Função para atualizar o aviso visual de movimento
function updateMovementIndicator(message) {
    movementIndicator.textContent = message;
    movementIndicator.style.display = "block"; // Exibe o aviso

    // Oculta o aviso após 1 segundo
    setTimeout(() => {
        movementIndicator.style.display = "none";
    }, 1000);
}

// Função de ataque
function attack() {
    let playerPos = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
    let bossPos = parseInt(window.getComputedStyle(document.getElementById("enemy")).getPropertyValue("left"));

    if (Math.abs(playerPos - bossPos) < 100) {
        bossHealth -= 20;
        // Atualize a barra de vida do chefe
        document.getElementById("player-health").style.width = bossHealth + "%";

        if (bossHealth <= 0) {
            alert("Você derrotou o chefe!");
            location.reload();
        }
    } else {
        alert("Você errou o ataque!");
    }
}

// Funções para toque único (tap) nos botões mobile
function movePlayerTouch(direction) {
    movePlayer(direction);
}

window.onload = function() {
    player = document.getElementById("player");

    const leftBtn = document.getElementById("left-btn");
    const rightBtn = document.getElementById("right-btn");
    if (leftBtn) {
        leftBtn.addEventListener("touchstart", function(e) { e.preventDefault(); movePlayerTouch("a"); });
    }
    if (rightBtn) {
        rightBtn.addEventListener("touchstart", function(e) { e.preventDefault(); movePlayerTouch("d"); });
    }
    // Botão de ataque mobile
    const attackBtn = document.getElementById("attack-btn");
    if (attackBtn) {
        attackBtn.addEventListener("touchstart", function(e) { e.preventDefault(); attack(); });
    }
}