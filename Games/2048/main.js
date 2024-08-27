var board;
const newBoard = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
];
var score = 0;
const rows = 4;
const columns = 4;
let startX, startY, endX, endY;

window.onload = function(){
    setGame();
}

function setGame(){

    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
    ];

    /*board = [
        [2,2,2,2],
        [2,2,2,2],
        [4,4,8,8],
        [4,4,8,8],
    ];*/

    for(let r=0;r<rows;r++){
        for(let c=0;c<columns;c++){
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile,num);
            document.getElementById("board").append(tile);
        }
    }
    setTwo();
    setTwo();
}

function updateTile(tile, num){
    tile.innerText="";
    tile.classList.value=""; //clear the classList
    tile.classList.add("tile");
    if(num>0) {
        tile.innerText=num.toString();
        if(num<=4096){
            tile.classList.add("x"+num.toString());
        }else{
            tile.classList.add("x8192");
        }                
    }
}

function filterZero(row){
    return row.filter(num => num != 0); //cteare a new array without 0
}

function slide(row){
    //[0, 2, 2, 2] 
    row = filterZero(row); //[2, 2, 2]
    for(let i = 0; i < row.length-1; i++){
        if(row[i] == row[i+1]){
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        }
    } //[4, 0, 2]
    row = filterZero(row); //[4, 2]
    //add zeroes
    while(row.length < columns){
        row.push(0);
    } //[4, 2, 0, 0]
    return row;
}

document.addEventListener('keyup', (e) => {
    switch(e.code){
        case "ArrowLeft": slideLeft(); setTwo(); break;
        case "ArrowRight": slideRight(); setTwo(); break;
        case "ArrowUp": slideUp(); setTwo(); break;
        case "ArrowDown": slideDown(); setTwo(); break;
    }
    document.getElementById("score").innerText = score;
});

function slideLeft(){
    for(let r = 0; r < rows; r++){
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for(let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight(){
    for(let r = 0; r < rows; r++){
        let row = board[r];         //[0, 2, 2, 2]
        row.reverse();              //[2, 2, 2, 0]
        row = slide(row)            //[4, 2, 0, 0]
        board[r] = row.reverse();   //[0, 0, 2, 4];
        for(let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp(){
    for(let c = 0; c < columns; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
        for(let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown(){
    for(let c = 0; c < columns; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
        for(let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function setTwo(){
    if(!hasEmptyTile()){
        return;
    }
    let found = false;
    while(!found){
        //find random row and column to place a 2 in
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if(board[r][c] == 0){
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            tile.classList.add("new-tile");
            found = true;
        }
    }
}

function hasEmptyTile(){
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) { //at least one zero in the board
                return true;
            }
        }
    }
    return false;
}

document.addEventListener('touchstart', function(e){
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
}, {passive: true});

document.addEventListener('touchend', function(e){
    endX = e.changedTouches[0].clientX;
    endY = e.changedTouches[0].clientY;
    handleSwipe();
}, {passive: true});

function handleSwipe(){
    let diffX = endX - startX;
    let diffY = endY - startY;

    if(Math.abs(diffX)==Math.abs(diffY)){
        console.log('Dot :3');
    }else if(Math.abs(diffX) > Math.abs(diffY)){ //- Horizontal swipe
        if(diffX > 0){  //? Right
            slideRight();
            setTwo();
            document.getElementById("score").innerText = score;
        }else{          //? Left
            slideLeft();
            setTwo();
            document.getElementById("score").innerText = score;
        }
    }else{ //- Vertical swipe
        if(diffY > 0){  //? Down
            slideDown();
            setTwo();
            document.getElementById("score").innerText = score;
        }else{          //? Up
            slideUp();
            setTwo();
            document.getElementById("score").innerText = score;
        }
    }
}
async function reset(){
    document.getElementById("board").innerHTML = '';
    setGame();
    score = 0;
    document.querySelector('#score').innerText = '0';
    /*board = newBoard;
    setTwo();
    setTwo();*/
}