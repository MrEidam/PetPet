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

let moneyDisplay = document.querySelector('#money');
let money = 0;

async function display(){
    moneyDisplay.innerHTML = money;
}

async function nft(amount){ //! MONEY POPPING
    let dabloons = document.createElement('h4');
    dabloons.classList.add('coins');
    if(amount>0) dabloons.innerHTML = `+${amount}`;
    else dabloons.innerHTML = `${amount}`
    document.body.append(dabloons);
    money += amount;
    display();
    setTimeout(() => {
        dabloons.remove();
    }, 150);
}

function ranD6(){
    return Math.floor(Math.random()*6)+1;
}

function enemyRoll(){
    enemyScore = 0;
    enemy.forEach(e => {
        const point = ranD6();
        enemyScore += point;
        e.src = `./Dices/${point}.png`;
        e.classList.value="dice";
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
        e.classList.value="dice";
        e.classList.add("pop");
        setTimeout(() => {
            e.classList.remove('pop');
        },500);
    });
    plaScore.innerHTML = playerScore;
}

async function won(){
    let won = document.createElement('h1');
    won.classList.add('result', 'won');
    won.innerText = "You've won!";
    document.body.append(won);
    setTimeout(() => {
        won.remove();
    }, 600);
}

async function lost(){
    let lost = document.createElement('h1');
    lost.classList.add('result', 'lost');
    lost.innerText = "You've lost!";
    document.body.append(lost);
    setTimeout(() => {
        lost.remove();
    }, 600);
}

async function draw(){
    let draw = document.createElement('h1');
    draw.classList.add('result', 'draw');
    draw.innerText = "It's a draw!";
    document.body.append(draw);
    setTimeout(() => {
        draw.remove();
    }, 600);
}

function gamble(){
    enemyRoll();
    playerRoll();
    setTimeout(() => {
        if(playerScore>enemyScore){
            won();
            nft(playerScore-enemyScore);
        }else if(playerScore<enemyScore){
            lost();
            nft(playerScore-enemyScore);
        }else{
            draw();
            nft(10)
            console.log(`Player: ${playerScore}`);
            console.log(`Enemy: ${enemyScore}`);
        }
    }, 700);
}