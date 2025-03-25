document.addEventListener("keydown", movePlayer);

document.addEventListener("keydown", movePlayer);

let playerHealth = 100;
let bossHealth = 500;
let player = document.getElementById("player");

function movePlayer(event) {
    let left = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
    let top = parseInt(window.getComputedStyle(player).getPropertyValue("top"));

    if (event.key === "d" && left < 550) { // Mover para a direita
        player.style.left = left + 20 + "px";
    }
    if (event.key === "a" && left > 0) { // Mover para a esquerda
        player.style.left = left - 20 + "px";
    }
    if (event.key === "w" && top > 0) { // Mover para cima
        player.style.top = top - 20 + "px";
    }
    if (event.key === "s" && top < 350) { // Mover para baixo
        player.style.top = top + 20 + "px";
    }
}


function attack() {
    let playerPos = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
    let bossPos = parseInt(window.getComputedStyle(document.getElementById("enemy")).getPropertyValue("left"));

    if (Math.abs(playerPos - bossPos) < 100) {
        bossHealth -= 20;
        document.getElementById("player-health").style.width = bossHealth + "%";

        if (bossHealth <= 0) {
            alert("Você derrotou o chefe!");
            location.reload();
        }
    } else {
        alert("Você errou o ataque!");
    }
}
