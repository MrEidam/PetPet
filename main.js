const Djoy = document.querySelector('#joyN');
const Dfood = document.querySelector('#fooN');
const Dclean = document.querySelector('#cleN');
const Dhealth = document.querySelector('#heaN');

let joy=10, hunger=30, clean=50, hp=100;

function display(){
    Djoy.innerHTML = joy;
    Dfood.innerHTML = hunger;
    Dclean.innerHTML = clean;
    Dhealth.innerHTML = hp;
}

function play(){
    if(joy<98){
        joy += Math.floor(Math.random()*10);
        clean -= Math.floor(Math.random()*5); 
    }else{
        clean -= Math.floor(Math.random()*5);
    }
    display();
}

function feed(){
    if(hunger<150){
        if(hunger<100){
            hunger += Math.floor(Math.random()*15);
            clean -= Math.floor(Math.random()*5); 
    }else{
            hunger += Math.floor(Math.random()*5);
            clean -= Math.floor(Math.random()*5); 
            hp -= Math.floor(Math.random()*14);
        }
    }else{
        return;
    }
    display();
}

function clearBoy(){
    console.log('sup');
    if(clean<100){
        clean += Math.floor(Math.random()*20);
        joy -= Math.floor(Math.random()*11);
    }
    display();
}