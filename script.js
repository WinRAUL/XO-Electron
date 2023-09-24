let turn = "X";
let gameover = false;

const changeTurn = ()=>{
    return turn === "X"?"0":"X";
}
const resetGame = ()=>{
    document.querySelectorAll(".boxText").forEach(e=>e.innerHTML = '');
    turn = "X"
    document.getElementById("info").innerText = "Turn : "+turn;
    console.log("reset");
    gameover = false;
}

const wins = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const checkWin = ()=>{
    const boxTexts = document.querySelectorAll(".boxText");
    wins.forEach(win=>{
        const a = boxTexts[win[0]].innerText;
        const b = boxTexts[win[1]].innerText;
        const c = boxTexts[win[2]].innerText;
        if( a === b && b === c && a !== ''){
                gameover = true;
                return;
        }
    })
}
let cells = document.getElementsByClassName("cell");
Array.from(cells).forEach(cell=>{
    let boxText = cell.querySelector(".boxText")
    cell.addEventListener('click', ()=>{
        if(boxText.innerText === ''){
            boxText.innerText = turn;
            checkWin();
            if(!gameover){ //if game is not over keep playing
                turn = changeTurn();
                document.getElementById("info").innerText = "Turn : "+turn;
            }
            else{ //if gameover
                document.getElementById("info").innerText = `${turn} WON GAME`;
                setTimeout(resetGame, 3000); //using () in function fires it up immidialtely
            }

        }
    })
})