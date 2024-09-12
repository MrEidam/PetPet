const Dage = document.querySelector('#ageN');
const Aimg = document.querySelector('#anim')
const NameC = document.querySelector('#nameCa')

const Djoy = document.querySelector('#joyN');
const Dfood = document.querySelector('#fooN');
const Dclean = document.querySelector('#cleN');
const Dhealth = document.querySelector('#heaN');

let chosenAnimal = 'tiger';

const animalImage = {
    animal: {
        Normal: {
            age: [
                `./img/${chosenAnimal}/baby.png`,
                `./img/${chosenAnimal}/teen.png`,
                `./img/${chosenAnimal}/adult.png`,
                `./img/${chosenAnimal}/senior.png`
            ]
        },
        Dead: `./img/dead/${chosenAnimal}.png`,
        Gone: `./img/gone/${chosenAnimal}.png`
    }
    
    ////Spring: {},
    ////Summer: {},
    ////Fall: {},
    ////Winter: {},
}

let attributes = {
    Name: [],
    Joy: {
        value: 10,
        max: 306,
        min: -100,
        abszero: 3.06,
    },
    Hunger: {
        value: 30,
        max: 100,
        min: 0,
    },
    Clean: {
        value: 50.6,
        max: 253,
        min: 0,
    },
    Hp: {
        value: 100,
        max: 100,
        min: 0,
    },
    Age: {
        value: 0,
        max: 100,
        min: 0,
    },
    /*Joy: {
        value: 10,
        max: 100,
        min: -100,
    }*/
    Life: {
        dead: 0,
        away: 0,
    }
}

window.addEventListener('load',() => {
    ////choseTime();
    display();
    time();
});

function choseTime(){//todo Drop down displaying fucken thing
    console.log('add stuff');
}

function toCPercen(varr){
    let num = Math.floor((varr.value/(varr.max/100))*10)/10;

    if(num>100) num = 100; //todo special MAX for >100%
    if(num<varr.min){
        num = varr.min;
        varr.value = varr.min;
    }

    switch (true){
        case num >= 80:
            return `<p class="Lime">${num}%</p>`;
        case num >= 60:
            return `<p class="Yellow">${num}%</p>`;
        case num >= 40:
            return `<p class="Orange">${num}%</p>`;
        case num >= 20:
            return `<p class="DarkOrange">${num}%</p>`;
        default:
            return `<p class="Red">${num}%</p>`;
    }
}

function display(){
    Dage.innerHTML = (attributes.Age.value);
    Djoy.innerHTML = toCPercen(attributes.Joy);
    Dfood.innerHTML = toCPercen(attributes.Hunger);
    Dclean.innerHTML = toCPercen(attributes.Clean);
    Dhealth.innerHTML = toCPercen(attributes.Hp);

    if(attributes.Age.value<=6){
        NameC.innerHTML = `Junior`;
        Aimg.src = animalImage.animal.age[0];
    }else if(attributes.Age.value<18){
        NameC.innerHTML = `Teen`;
        Aimg.src = animalImage.animal.age[1];
    }else if(attributes.Age.value<60){
        NameC.innerHTML = `Adult`;
        Aimg.src = animalImage.animal.age[2];
    }else if(attributes.Age.value<100){
        NameC.innerHTML = `Senior`;
        Aimg.src = animalImage.animal.age[3];
    }else{
        NameC.innerHTML = `Dead`;
        attributes.Life.dead = 1;
        btnHide();
        Aimg.src = animalImage.animal.Dead;
    }

    if(attributes.Hp.value<=0){
        NameC.innerHTML = `Dead`;
        attributes.Life.dead = 1;
        btnHide();
        Aimg.src = animalImage.animal.Dead;
    }

    if(attributes.Life.away){
        NameC.innerHTML = `Gone`;
        btnHide();
        Aimg.src = animalImage.animal.Gone;
    }
}

function play(){
    if(attributes.Joy.value<attributes.Joy.max){
        attributes.Joy.value += Math.floor(Math.random()*20);
        attributes.Clean.value -= Math.floor(Math.random()*8); 
    }else{
        attributes.Clean.value -= Math.floor(Math.random()*5);
    }
    display();
}

function feed(){
    if(attributes.Hunger.value<attributes.Hunger.max){
        if(attributes.Hunger.value<100){
            attributes.Hunger.value += Math.floor(Math.random()*15);
            attributes.Clean.value -= Math.floor(Math.random()*7); 
    }else{
            attributes.Hunger.value += Math.floor(Math.random()*5);
            attributes.Clean.value -= Math.floor(Math.random()*7); 
            attributes.Hp.value -= Math.floor(Math.random()*4);
        }
    }else{
        attributes.Hp.value -= Math.floor(Math.random()*5);
        return;
    }
    display();
}

function clearBoy(){
    if(attributes.Clean.value<attributes.Clean.max){
        attributes.Clean.value += Math.floor(Math.random()*15);
        attributes.Joy.value -= Math.floor(Math.random()*7);
    }
    display();
}

function hapiHeal(){
    if( attributes.Hunger.value > (attributes.Hunger.max/100)* 70 && //? Hunger heal
        attributes.Joy.value    > (attributes.Joy.max/100)* 80 &&    //? Joy heal
        attributes.Clean.value  > (attributes.Clean.max/100)* 69 &&  //? Clean heal
        attributes.Hp.value < attributes.Hp.max){
    
        attributes.Hp.value += 0.1;
    
    }
}

function btnHide(){
    const actBTN = document.querySelectorAll('.actBTN');
    actBTN.forEach((e) => {
        e.style.display='none';
    });
}

function sadDetection(){
    if((attributes.Joy.value <= attributes.Joy.abszero)&&(attributes.Joy.value<0)){
        if(Math.abs(attributes.Joy.value) >= Math.floor(Math.random()*100)){
            attributes.Life.away = 1;
        }
    }
}

function addStuff(){
    if(!attributes.Life.away && !attributes.Life.dead){
        if(attributes.Hunger.value>0) attributes.Hunger.value -= 3;
        if(attributes.Clean.value>0)  attributes.Clean.value -= 1;
        if(attributes.Joy.value>-100) attributes.Joy.value -= 1;
        if(attributes.Hp.value>0) attributes.Age.value = (attributes.Age.value*10 + 1)/10;
        if((attributes.Hunger.value<=0)&&(attributes.Hp.value!=0)) attributes.Hp.value -= 4;
    }
}

function time(){
    setTimeout (() => {
        addStuff();
        hapiHeal();
        sadDetection();
        
        
        display();
        time();
    },1000);
}

function debug(){
    attributes.Clean.value = Infinity;
    attributes.Hp.value = Infinity;
    attributes.Hunger.value = Infinity;
    attributes.Joy.value = Infinity;
    attributes.Age.max = Infinity
    display();
}