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
    for(let i=0; i<games.length; i++){
        document.body.innerHTML += `
        <a href="./${games[i].link}" class="game">
            <img src="./img/${games[i].link}.png" alt="${games[i].name}">
        </a>`
    }
}