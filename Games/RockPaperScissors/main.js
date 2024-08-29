let you;
let playerScore = 0;

let opponent;
let opponentScore = 0;

const choices = ["rock", "paper", "scissors"];

window.onload = () => {
    for(let i=0;i<3;i++){
        let choice = document.createElement("img");
        choice.id = choices[i];
        choice.src = `0${choices[i]}.png`;
        choice.setAttribute("draggable", "false");
        choice.addEventListener("click", function() {
            selectChoice(false, this.id);
        });
        document.getElementById("choices").append(choice);
    }
}

document.addEventListener('keyup', (event) => {
    if(event.key === '1' || event.key === '+'){
        you = 'rock';
        selectChoice(true);
    }
    if(event.key === '2' || event.key === 'ě'){
        you = 'paper';
        selectChoice(true);
    }
    if(event.key === '3' || event.key === 'š'){
        you = 'scissors';
        selectChoice(true);
    }
});

function outcome(you, opponent){
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
}

function selectChoice(fast, choice = null){
    if(!fast && choice !== null){
        you = choice;
    }
    document.getElementById("your-choice").src = `${you}.png`;

    opponent = choices[Math.floor(Math.random()*3)];
    document.getElementById("opponent-choice").src = `${opponent}.png`;

    outcome(you, opponent);

    document.getElementById("opponent-score").innerHTML = opponentScore;
    document.getElementById("your-score").innerHTML = playerScore;
}