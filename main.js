const Dage = document.querySelector('#ageN');
const Aimg = document.querySelector('#anim')

const Djoy = document.querySelector('#joyN');
const Dfood = document.querySelector('#fooN');
const Dclean = document.querySelector('#cleN');
const Dhealth = document.querySelector('#heaN');

const imgTiger = {
    Normal: {
        tiger: [
            './img/tiger/baby.png',
            './img/tiger/teen.png',
            './img/tiger/adult.png',
            './img/tiger/senior.png'
        ]
    },
    ////Spring: {},
    ////Summer: {},
    ////Fall: {},
    ////Winter: {},
    Dead: './img/dead/tiger.png'
}

let attributes = {
    Name: [],
    Joy: {
        value: 10,
        max: 100,
        min: -100,
    },
    Hunger: {
        value: 30,
        max: 150,
        min: 0,
    },
    Clean: {
        value: 50,
        max: 100,
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
}

window.addEventListener('load',() => {
    display();
    time();
})

function toCPercen(num){//todo num => %
    if(num>=90){
        return `<p class="Lime">${num}%</p>`;
    }else if(num>=70){
        return `<p class="Yellow">${num}%</p>`;
    }else if(num>=40){
        return `<p class="Orange">${num}%</p>`;
    }else if(num>=20){
        return `<p class="Red">${num}%</p>`;
    }else if(num>=0){
        return `<p class="DarkRed">${num}%</p>`;
    }else if(num<0){
        return `<p class="DarkRed">${num}%</p>`;
    }
}

function display(){
    Dage.innerHTML = (attributes.Age.value);
    Djoy.innerHTML = toCPercen(attributes.Joy.value);
    Dfood.innerHTML = toCPercen(attributes.Hunger.value);
    Dclean.innerHTML = toCPercen(attributes.Clean.value);
    Dhealth.innerHTML = toCPercen(attributes.Hp.value);

    if(attributes.Age.value<=6){
        Aimg.src = imgTiger.Normal.tiger[0];
    }else if(attributes.Age.value<18){
        Aimg.src = imgTiger.Normal.tiger[1];
    }else if(attributes.Age.value<60){
        Aimg.src = imgTiger.Normal.tiger[2];
    }else if(attributes.Age.value<100){
        Aimg.src = imgTiger.Normal.tiger[3];
    }else{
        Aimg.src = imgTiger.Dead;
    }

    if(attributes.Hp.value<=0) Aimg.src = imgTiger.Dead;
}

function play(){
    if(attributes.Joy.value<98){
        attributes.Joy.value += Math.floor(Math.random()*10);
        attributes.Clean.value -= Math.floor(Math.random()*5); 
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
            attributes.Hp.value -= Math.floor(Math.random()*14);
        }
    }else{
        attributes.attributes.Hp.value.value -= Math.floor(Math.random()*5);
        return;
    }
    display();
}

function clearBoy(){
    console.log('sup');
    if(attributes.Clean.value<100){
        attributes.Clean.value += Math.floor(Math.random()*20);
        attributes.Joy.value -= Math.floor(Math.random()*11);
    }
    display();
}

function time(){
    setTimeout (() => {
        if(attributes.Hunger.value>0) attributes.Hunger.value -= 3;
        if(attributes.Clean.value>0) attributes.Clean.value--;
        if(attributes.Joy.value>-100) attributes.Joy.value--;
        if(attributes.Hp.value>0) attributes.Age.value+=0.5;
        if((attributes.Hunger.value===0)&&(attributes.Hp.value!=0)) attributes.Hp.value -= 1.5

        
        display();



        time();
    },1000);
}
