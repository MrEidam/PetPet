const dice = document.querySelector('#dice');       //img
let answear = document.querySelector('#answear'); //text ans
let number = document.querySelector('#num');        //num selec

let moneyDisplay = document.querySelector('#money');
let money = 0;

async function display(){
    moneyDisplay.innerHTML = money;
}

async function nft(amount){ //! MONEY POPPING
    let dabloons = document.createElement('h4');
    dabloons.classList.add('coins');
    dabloons.innerHTML = `+${amount}`;
    document.body.append(dabloons);
    money += amount;
    display();
    setTimeout(() => {
        dabloons.remove();
    }, 150);
}

async function correct(){
    let won = document.createElement('h1');
    won.classList.add('result', 'won');
    won.innerHTML = `Correct!<br> +10 coins`;
    document.body.append(won);
    nft(10);
    setTimeout(() => {
        won.remove();
    }, 600);
}

async function wrong(){
    let lost = document.createElement('h1');
    lost.classList.add('result', 'lost');
    lost.innerText = "Wrong!";
    document.body.append(lost);
    setTimeout(() => {
        lost.remove();
    }, 600);
}

function roll(){
    let newDice = Math.floor(Math.random()*6);
    
    console.log(newDice);
    
    dice.src = `./${newDice+1}.png`;
    
    if(number.value == newDice+1){
        correct();
    }else{
        wrong();
    }
}