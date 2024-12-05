function querySelector(obj) {
    return document.querySelector(obj);
}

document.addEventListener('DOMContentLoaded',() =>{
<<<<<<< HEAD
const bird = document.querySelector(".flappy");
const displayGioco = document.querySelector(".container");
const ground = document.querySelector(".pavimento");

let birdSx = 220;
let birdBot = 100;
let gravita = 2;
let game_over = false;
let gap = 430
=======
    let inter = 0;
    const bird = querySelector(".flappy");
    const displayGioco = querySelector(".container");
    const ground = querySelector(".pavimento");

    let birdSx = 220;
    let birdBot = 100;
    let gravita = 2;
    let game_over = false;
>>>>>>> refs/remotes/origin/main

    function startGioco() {
        birdBot -= gravita;
        bird.style.bottom = birdBot + "px";
        bird.style.left = birdSx + "px";
    }
    let idTempoGioco = setInterval(startGioco, 20);

<<<<<<< HEAD
function generaostacolo(){
    let ostacoloSx = 500;
    let Altezza = Math.random() * 60;
    let ostacoloBot = Altezza;
    const ostacolo = document.createElement("div");
    const ostacolosopra = document.createElement("div");
    if (!game_over){
        ostacolo.classList.add("ostacolo");
        ostacolosopra.classList.add("ostacolosopra");
    }
    displayGioco.appendChild(ostacolo);
    displayGioco.appendChild(ostacolosopra);
    ostacolo.style.left = ostacoloSx + "px";
    ostacolosopra.style.left = ostacoloSx + "px";
    ostacolo.style.bottom = ostacoloBot + "px";
    ostacolosopra.style.bottom = ostacoloBot + gap + "px";

    
    function muoviostacolo(){
        ostacoloSx -= 2;
        ostacolo.style.left = ostacoloSx + "px";
        ostacolosopra.style.left = ostacoloSx + "px";

        console.log(ostacoloSx)
        if(ostacoloSx ===  0){
            clearInterval(timerId);
            displayGioco.removeChild(ostacolo);
            displayGioco.removeChild(ostacolosopra);
        }
        if(ostacoloSx > 200 && ostacoloSx < 280 && birdSx === 220 && (birdBot < ostacoloBot + 153 || birdBot > ostacoloBot + gap -200 ) || birdBot === 0){
            gameover();
            clearInterval(inter);
=======
    function control(e){
        if (e.keyCode === 32){
            salto()
        }
    }

    function salto(){
        if(birdBot < 500) birdBot += 50
        bird.style.bottom = birdBot + "px";
    }

    document.addEventListener("keyup", control);

    function generaostacolo(){
        let ostacoloSx = 500;
        let Altezza = Math.random() * 60;
        let ostacoloBot = Altezza;
        const ostacolo = document.createElement("div");
        ostacolo.classList.add("ostacolo");
        displayGioco.appendChild(ostacolo);
        ostacolo.style.left = ostacoloSx + "px";
        ostacolo.style.bottom = ostacoloBot + "px";

        function muoviostacolo(){
            ostacoloSx -= 2;
            ostacolo.style.left = ostacoloSx + "px";
            console.log(ostacoloSx)
            if(ostacoloSx ===  0){
                clearInterval(inter);
                displayGioco.removeChild(ostacolo);
            }
            if(ostacoloSx > 200 && ostacoloSx < 280 && birdSx === 200 || birdBot === 0){
                gameover(); 
            }
>>>>>>> refs/remotes/origin/main
        }
        inter = setInterval(muoviostacolo,20);
        setTimeout(generaostacolo, 3000);
    }
<<<<<<< HEAD
    let timerId = setInterval(muoviostacolo,20);
    //!game_over ? setTimeout(generaostacolo, 3000)
    if (!game_over){
        setTimeout(generaostacolo, 2700);
    }
}
generaostacolo();
=======
    generaostacolo();
>>>>>>> refs/remotes/origin/main

    function gameover(){
        clearInterval(idTempoGioco)

<<<<<<< HEAD

function gameover(){
    clearInterval(idTempoGioco)
    game_over == true;
    document.removeEventListener("keyup", control)
}

=======
        game_over == true;
        document.removeEventListener("keyup", control)
    }
>>>>>>> refs/remotes/origin/main
})