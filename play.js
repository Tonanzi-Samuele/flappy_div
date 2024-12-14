function rand( lowest, highest){
    var adjustedHigh = (highest - lowest) + 1;       
    return Math.floor(Math.random()*adjustedHigh) + parseFloat(lowest);
}

// funzione per ottenere oggetto da ID
// function getElementById(id) {
//     return document.getElementById(id);
// }

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
    score();

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
        let height = rand(70, 200);
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
                    birdBot < ostacoloBot + 153 || 
                    birdBot > ostacoloBot + gap - 200
                ) || birdBot === 0
            ) {
                gameover(timerId);
                game_over = true;
                clearInterval(timerId);
            }
            if (ostacoloSx < 10 && ostacoloSx > -2 && !game_over) {
                increaseScore();
            }
        }
        const timerId = setInterval(muoviostacolo, 20);
        //!game_over ? setTimeout(generaostacolo, 3000)
        if (!game_over)
            setTimeout(generaostacolo, 2070);
    }   
    generaostacolo();

    function score(){
        let score = create('h1');
        let sky = querySelector('.cielo');

        score.innerText = '0';
        score.id = 'score';
        sky.append(score);
    }

    function increaseScore(){
        let score = querySelector('#score');
        score.innerText = +score.innerText + 1;
    }
    function gameover(timerId) {
        if (game_over) return;
    
        // Blocca il movimento
        clearInterval(idTempoGioco);
        clearInterval(timerId);
        game_over = true;
        document.removeEventListener("keyup", control);
    
        addClass(ground, 'pavimento');
        removeClass(ground, 'ground-moving');
        const overlay = create('div');
        overlay.classList.add('game-over-overlay');

        const gameOverText = create('h1');
        gameOverText.innerText = 'GAME OVER!';
        
        const buttons = create('div');
        
        const homeButton = create('a');
        homeButton.innerText = 'Home';
        homeButton.href = './homepage.html';
        
        const replay = create('a');
        replay.innerText = 'Retry';
        replay.href = './game.html';
    
        buttons.append(homeButton, replay);
        overlay.append(gameOverText, buttons);
    
        // Aggiungi l'overlay al contenitore del gioco
        const displayGioco = querySelector('.container');
        displayGioco.style.position = 'relative'; // Per assicurare il posizionamento dell'overlay
        displayGioco.appendChild(overlay);
    }
//     function gameover(timerId) {
//         if(game_over) return;

//         // blocco di codice che stoppa flappy dal poter volare
//         clearInterval(idTempoGioco);
//         clearInterval(timerId);
//         game_over = true;
//         document.removeEventListener("keyup", control);
//         console.log('game over.');

//         addClass(ground, 'pavimento');
//         removeClass(ground, 'ground-moving');

//         // blocco di codice per la schermata di Game Over.
//         let gameOverText = create('h1');
//         let divGameOver = querySelector('.gameover-text');
//         let buttons = create('div');
//         let homeButton = create('a');
//         let replay = create('a');

//         addClass(buttons, 'gameover-buttons');
//         gameOverText.innerText = 'GAME OVER!';
//         homeButton.innerText = 'Home';
//         homeButton.href = './homepage.html';

//         replay.innerText = 'Retry';
//         replay.href = './game.html';

//         gameOverText.id = 'gameOver-Text';

//         divGameOver.style.zIndex = +99;
//         // displayGioco.style.backgroundColor = 'grey';
//         // displayGioco.style.display = 'flex';
//         // displayGioco.style.flexFlow = 'row wrap';
//         // displayGioco.style.justifyContent = 'center';
//         // displayGioco.style.alignItems = 'center';

//         buttons.append(homeButton, replay);
//         divGameOver.after(gameOverText, buttons);
//     }
})
