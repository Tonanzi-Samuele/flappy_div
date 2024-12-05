function querySelector(obj) {
    return document.querySelector(obj);
}

document.addEventListener('DOMContentLoaded',() =>{
    let inter = 0;
    const bird = querySelector(".flappy");
    const displayGioco = querySelector(".container");
    const ground = querySelector(".pavimento");

    let birdSx = 220;
    let birdBot = 100;
    let gravita = 2;
    let game_over = false;

    function startGioco() {
        birdBot -= gravita;
        bird.style.bottom = birdBot + "px";
        bird.style.left = birdSx + "px";
    }
    let idTempoGioco = setInterval(startGioco, 20);

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
        }
        inter = setInterval(muoviostacolo,20);
        setTimeout(generaostacolo, 3000);
    }
    generaostacolo();

    function gameover(){
        clearInterval(idTempoGioco)

        game_over == true;
        document.removeEventListener("keyup", control)
    }
})