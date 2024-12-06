// funzione per rimuovere la classe ad un oggetto
function removeClass(obj, classe) {
    return obj.classList.remove(classe);
}

// funzione per aggiungere la classe ad un oggetto
function addClass(obj, classe) {
    return obj.classList.add(classe);
}

// funzione per creare un elemento HTML
function create(element) {
    return document.createElement(element);
}

// funzione per ottenere oggetto da querySelector
function querySelector(obj) {
    return document.querySelector(obj);
}

document.addEventListener('DOMContentLoaded', () => {
    const bird = querySelector(".flappy");
    const displayGioco = querySelector(".container");
    const ground = querySelector(".ground-moving");

    let birdSx = 220;
    let birdBot = 100;
    let gravita = 2;
    let game_over = false;
    let gap = 430;

    function startGioco() {
        birdBot -= gravita;
        bird.style.bottom = birdBot + "px";
        bird.style.left = birdSx + "px";
    }
    const idTempoGioco = setInterval(startGioco, 20);

    function control(e){
        if(e.keyCode === 32) {
            salta();
        }
    }

    function salta(){
        if(birdBot < 500) birdBot += 50;
        bird.style.bottom = birdBot + 'px';
        console.log(birdBot);
    }
    document.addEventListener('keyup', control);

    function generaostacolo() {
        let ostacoloSx = 500;
        let height = Math.random() * 60;
        let ostacoloBot = height;
        const ostacolo = create("div");
        const ostacolosopra = create("div");

        if (!game_over) {
            ostacolo.classList.add('ostacolo');
            ostacolosopra.classList.add('ostacolosopra');
            addClass(ostacolo, "ostacolo");
            addClass(ostacolosopra, "ostacolosopra");
        }

        displayGioco.appendChild(ostacolo);
        displayGioco.appendChild(ostacolosopra);
        ostacolo.style.left = ostacoloSx + "px";
        ostacolosopra.style.left = ostacoloSx + "px";
        ostacolo.style.bottom = ostacoloBot + "px";
        ostacolosopra.style.bottom = ostacoloBot + gap + "px";

        function muoviostacolo() {
            ostacoloSx -= 2;
            ostacolo.style.left = ostacoloSx + "px";
            ostacolosopra.style.left = ostacoloSx + "px";

            // console.log(ostacoloSx)
            if (ostacoloSx === -60) {
                clearInterval(timerId);
                displayGioco.removeChild(ostacolo);
                displayGioco.removeChild(ostacolosopra);
            } if (
                ostacoloSx > 200 && ostacoloSx < 280 && birdSx === 220 && 
                (
                    birdBot < ostacoloBot + 152 || 
                    birdBot > ostacoloBot + gap - 200
                ) || birdBot === 0
            ) {
                gameover(timerId);
                game_over = true;
                clearInterval(timerId);
            }
        }
        const timerId = setInterval(muoviostacolo, 20);
        //!game_over ? setTimeout(generaostacolo, 3000)
        if (!game_over)
            setTimeout(generaostacolo, 2700);
    }
    generaostacolo();

    function gameover(timerId) {
        if(game_over) return;

        // blocco di codice che stoppa flappy dal poter volare
        clearInterval(idTempoGioco);
        clearInterval(timerId);
        game_over = true;
        document.removeEventListener("keyup", control);
        console.log('game over.');

        addClass(ground, 'pavimento');
        removeClass(ground, 'ground-moving');

        // blocco di codice per la schermata di Game Over.
        let gameOverText = create('h1');
        let divGameOver = querySelector('.gameover-text');
        let buttons = create('div');
        let homeButton = create('a');
        let replay = create('a');

        addClass(buttons, 'gameover-buttons');
        gameOverText.innerText = 'GAME OVER!';
        homeButton.innerText = 'Home';
        homeButton.href = './homepage.html';

        replay.innerText = 'Retry';
        replay.href = './game.html';

        gameOverText.id = 'gameOver-Text';

        // displayGioco.style.backgroundColor = 'grey';
        // displayGioco.style.display = 'flex';
        // displayGioco.style.flexFlow = 'row wrap';
        // displayGioco.style.justifyContent = 'center';
        // displayGioco.style.alignItems = 'center';

        buttons.append(homeButton, replay);
        divGameOver.after(gameOverText, buttons);
    }
})
