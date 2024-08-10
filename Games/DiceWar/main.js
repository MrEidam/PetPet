let enemy = [
    document.querySelector('#enDice1'),
    document.querySelector('#enDice2'),
    document.querySelector('#enDice3'),
    document.querySelector('#enDice4'),
    document.querySelector('#enDice5'),
];
let player = [
    document.querySelector('#plDice1'),
    document.querySelector('#plDice2'),
    document.querySelector('#plDice3'),
    document.querySelector('#plDice4'),
    document.querySelector('#plDice5'),
];
let enScore = document.querySelector('#enemyScore');
let plaScore = document.querySelector('#playerScore');

let enemyScore = 0;
let playerScore = 0;

function ranD6(){
    return Math.floor(Math.random()*6)+1;
}

function enemyRoll(){
    enemyScore = 0;
    enemy.forEach(e => {
        const point = ranD6();
        enemyScore += point;
        e.src = `./Dices/${point}.png`;
        e.classList.value="";
        e.classList.add("pop");
        setTimeout(() => {
            e.classList.remove('pop');
        },500);
    });
    enScore.innerHTML = enemyScore;
}

function playerRoll(){
    playerScore = 0;

    player.forEach(e => {
        const point = ranD6();
        playerScore += point;
        e.src = `./Dices/${point}.png`;
        e.classList.value="";
        e.classList.add("pop");
        setTimeout(() => {
            e.classList.remove('pop');
        },500);
    });
    plaScore.innerHTML = playerScore;
}

function gamble(){
    enemyRoll();
    playerRoll();
    setTimeout(() => {
        if(playerScore>enemyScore){
            alert('You won!');
        }else if(playerScore<enemyScore){
            alert(`You've lost`);
        }else{
            alert('Draw');
            console.log(`Player: ${playerScore}`);
            console.log(`Enemy: ${enemyScore}`);
        }
    }, 700);
}