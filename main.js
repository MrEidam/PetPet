const Dage = document.querySelector('#ageN');
const Aimg = document.querySelector('#anim')

const Djoy = document.querySelector('#joyN');
const Dfood = document.querySelector('#fooN');
const Dclean = document.querySelector('#cleN');
const Dhealth = document.querySelector('#heaN');

const imgTiger = {
    Normal: {
        tiger: [
            '../img/tiger/baby.png',
            '../img/tiger/teen.png',
            '../img/tiger/adult.png',
            '../img/tiger/senior.png'
        ]
    },
    ////"Spring": {},
    Dead: './img/dead/tiger.png'
}

let joy=10, hunger=30, clean=50, hp=100, age=0;

window.addEventListener('load',() => {
    display();
    time();
})

function display(){
    Dage.innerHTML = age;
    Djoy.innerHTML = joy;
    Dfood.innerHTML = hunger;
    Dclean.innerHTML = clean;
    Dhealth.innerHTML = hp;

    if(age<=6){
        Aimg.src = imgTiger.Normal.tiger[0];
    }else if(age<18){
        Aimg.src = imgTiger.Normal.tiger[1];
    }else if(age<60){
        Aimg.src = imgTiger.Normal.tiger[2];
    }else if(age<100){
        Aimg.src = imgTiger.Normal.tiger[3];
    }else{
        Aimg.src = imgTiger.Dead;
    }

    if(hp<=0) Aimg.src = imgTiger.Dead;
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

function time(){
    setTimeout (() => {
        if(hunger>0) hunger--;
        clean--;
        joy--;
        if(hp>0) age+=0.5;
        if(hunger===0) hp--;

        
        display();



        time();
    },1000);
}