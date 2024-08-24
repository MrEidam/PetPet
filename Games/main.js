let hasMouse = false;
let hasTouch = false;
const games = [
    {
        name: '2048',
        link: '2048',
    },{
        name: 'Dice War',
        link: 'DiceWar',
    },{
        name: 'Number Quess 6',
        link: 'NumberQuess6',
    },{
        name: 'Rock Paper Scissors',
        link: 'RockPaperScissors',
    },
];

window.onload = () => {
    for(let i = 0; i < games.length; i++) {
        document.body.innerHTML += `
        <a href="./${games[i].link}" class="game">
            <img src="./${games[i].link}/icon.png" alt="${games[i].name}">
        </a>`;
    }

    // Add listeners to detect the first interaction
    window.addEventListener('pointermove', detectMouse);
    window.addEventListener('pointerdown', detectMouse);

    const blob = document.querySelector('#blob');

    document.body.onpointermove = event => {
        const { clientX, clientY } = event;
        if(hasMouse){
            // Center the blob around the cursor
            blob.style.left = `${clientX}px`;
            blob.style.top = `${clientY}px`;
        }
    };
}


function detectMouse(event) {
    if (event.pointerType === 'mouse') {
        hasMouse = true;
    } else if (event.pointerType === 'touch') {
        hasTouch = true;
    }
    // Clean up listeners after detection
    window.removeEventListener('pointermove', detectMouse);
    window.removeEventListener('pointerdown', detectMouse);
}