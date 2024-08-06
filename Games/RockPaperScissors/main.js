let you;
let playerScore = 0;

let opponent;
let opponentScore = 0;

const choices = ["rock", "paper", "scissors"];

window.onload = () => {
    for(let i=0;i<3;i++){
        let choice = document.createElement("img");
        choice.id = choices[i];
        choice.src = `${choices[i]}.png`;
        choice.addEventListener("click", selectChoice);
        document.getElementById("choices").append(choice);
    }
}

function selectChoice(){
    you = this.id;
    document.getElementById("your-choice").src = `${you}.png`;

    opponent = choices[Math.floor(Math.random()*3)];
    document.getElementById("opponent-choice").src = `${opponent}.png`;

    if(you===opponent){
        playerScore++;
        opponentScore-=-1;
    }else{
        if(you==="rock"){
            if(opponent==="paper"){
                opponentScore++;
            }
            if(opponent==="scissors"){
                playerScore++;
            }
        }else if(you === "paper"){
            if(opponent==="rock"){
                playerScore++;
            }
            if(opponent==="scissors"){
                opponentScore++;
            }
        }else{
            if(opponent==="rock"){
                opponentScore++;
            }
            if(opponent==="paper"){
                playerScore++;
            }
        }
    }
    document.getElementById("opponent-score").innerHTML = opponentScore;
    document.getElementById("your-score").innerHTML = playerScore;
}