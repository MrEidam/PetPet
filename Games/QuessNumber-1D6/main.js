const dice = document.querySelector('#dice');       //img
let answear = document.querySelector('#answear'); //text ans
let number = document.querySelector('#num');        //num selec

function roll(){
    let newDice = Math.floor(Math.random()*6);
    
    console.log(newDice);
    
    dice.src = `./${newDice+1}.png`;
    
    if(number.value == newDice+1){
        answear.innerHTML = `<p class='won'>Correct! +10 coins</p>`;
    }else{
        answear.innerHTML = `<p class='lose'>Wrong!</p>`
    }
}