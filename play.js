// Funzione per generare un numero randomico tra due valori
function rand(lowest, highest){
    var adjustedHigh = (highest - lowest) + 1;       
    return Math.floor(Math.random() * adjustedHigh) + parseFloat(lowest);
}

// Funzione per rimuovere una classe da un elemento HTML
function removeClass(obj, classe) {
    return obj.classList.remove(classe);
}

// Funzione per aggiungere una classe a un elemento HTML
function addClass(obj, classe) {
    return obj.classList.add(classe);
}

// Funzione per creare un nuovo elemento HTML
function create(element) {
    return document.createElement(element);
}

// Funzione per selezionare un elemento tramite querySelector
function querySelector(obj) {
    return document.querySelector(obj);
}

// Quando il documento è completamente caricato...
document.addEventListener('DOMContentLoaded', () => {
    // Selezione degli elementi principali
    const bird = querySelector(".flappy");
    const displayGioco = querySelector(".container");
    const ground = querySelector(".ground-moving");

    // Inizializzazione dello score
    score();

    // Posizione iniziale dell'uccello
    let birdSx = 220;
    let birdBot = 100;
    let gravita = 2; // gravità che tira giù l’uccello
    let game_over = false;
    let gap = 430; // gap tra ostacolo sopra e sotto

    // Funzione che fa cadere l’uccello continuamente
    function startGioco() {
        birdBot -= gravita;
        bird.style.bottom = birdBot + "px";
        bird.style.left = birdSx + "px";
    }

    // Inizio movimento dell’uccello
    const idTempoGioco = setInterval(startGioco, 20);

    // Listener per il salto
    function control(e){
        if(e.keyCode === 32) { // Spazio
            salta();
        }
    }

    // Funzione per far saltare l’uccello
    function salta(){
        if(birdBot < 500) birdBot += 50;
        bird.style.bottom = birdBot + 'px';
        console.log(birdBot);
    }

    // Ascolta pressione tasto
    document.addEventListener('keyup', control);

    // Funzione per generare gli ostacoli (alto e basso)
    function generaostacolo() {
        let ostacoloSx = 570; // posizione iniziale
        let height = rand(40, 150); // altezza randomica
        let ostacoloBot = height;

        const ostacolo = create("div");
        const ostacolosopra = create("div");

        if (!game_over) {
            addClass(ostacolo, 'ostacolo');
            addClass(ostacolosopra, 'ostacolosopra');
        }

        // Imposta z-index per layer visivi
        ostacolo.style.zIndex = '+2';
        ostacolosopra.style.zIndex = '+3';

        // Inserisci gli ostacoli nel DOM
        displayGioco.appendChild(ostacolo);
        displayGioco.appendChild(ostacolosopra);
        ostacolo.style.left = ostacoloSx + "px";
        ostacolosopra.style.left = ostacoloSx + "px";
        ostacolo.style.bottom = ostacoloBot + "px";
        ostacolosopra.style.bottom = ostacoloBot + gap + "px";

        // Funzione per muovere gli ostacoli da destra a sinistra
        function muoviostacolo() {
            ostacoloSx -= 2; // si muove verso sinistra
            ostacolo.style.left = ostacoloSx + "px";
            ostacolosopra.style.left = ostacoloSx + "px";

            // Se esce fuori dallo schermo, lo rimuove
            if (ostacoloSx === -60) {
                clearInterval(timerId);
                displayGioco.removeChild(ostacolo);
                displayGioco.removeChild(ostacolosopra);
            } 

            // Collisione con ostacolo o pavimento
            if (
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

            // Se passa un ostacolo, aumenta lo score
            if (ostacoloSx < 10 && ostacoloSx > -2 && !game_over) {
                increaseScore();
            }
        }

        const timerId = setInterval(muoviostacolo, 20);

        // Crea nuovo ostacolo ogni 2 secondi circa
        if (!game_over)
            setTimeout(generaostacolo, 2070);
    }   

    // Inizia subito a generare ostacoli
    generaostacolo();

    // Crea e mostra lo score a video
    function score(){
        let score = create('h1');
        let sky = querySelector('.cielo');
        score.innerText = '0';
        score.id = 'score';
        sky.append(score);
    }

    // Incrementa il punteggio
    function increaseScore(){
        let score = querySelector('#score');
        score.innerText = +score.innerText + 1;
    }

    // Funzione per gestire la fine del gioco
    function gameover(timerId) {
        if (game_over) return;
    
        clearInterval(idTempoGioco); // ferma la caduta dell’uccello
        clearInterval(timerId); // ferma il movimento ostacoli
        game_over = true;
        document.removeEventListener("keyup", control); // blocca salto
    
        addClass(ground, 'pavimento');
        removeClass(ground, 'ground-moving');

        // Crea overlay per fine gioco
        const overlay = create('div');
        overlay.classList.add('game-over-overlay');

        // Testo "Game Over"
        const gameOverText = create('h1');
        gameOverText.innerText = 'GAME OVER!';
        
        // Bottoni di replay e home
        const buttons = create('div');
        
        const homeButton = create('a');
        homeButton.innerText = 'Home';
        homeButton.href = './homepage.html';
        
        const replay = create('a');
        replay.innerText = 'Retry';
        replay.href = './game.html';
    
        // Appende bottoni e testo all’overlay
        buttons.append(homeButton, replay);
        overlay.append(gameOverText, buttons);
    
        // Mostra overlay sopra il gioco
        const displayGioco = querySelector('.container');
        displayGioco.style.position = 'relative';
        displayGioco.appendChild(overlay);
    }
})
