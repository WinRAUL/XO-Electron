let turn = "X";
let gameover = false;
const winSounds = [
    new Audio("./static/win_calm.wav"),
    new Audio("./static/win_hard.wav"),
];
const bgSounds = [
    new Audio("./static/bg_calm_mix1.wav"),
    new Audio("./static/bg_calm_mix2.wav"),
    new Audio("./static/bg_saxophone.wav"),
    new Audio("./static/bg_tension.wav"),
];
let bgMusic = bgSounds[0]; //default
const playBg = ()=>{
    bgMusic.pause();
    bgMusic.currentTime = 0;
    bgMusic = bgSounds[Math.floor(Math.random() * bgSounds.length)]
    bgMusic.play()
    if(audioPlaying == false)
        bgMusic.muted = true;
}
let winMusic = winSounds[0];
const playWin = ()=>{
    bgMusic.pause();
    winMusic = winSounds[Math.floor(Math.random() * winSounds.length)]
    winMusic.play();
    if(audioPlaying==false)
        winMusic.muted = true;
}
let audioPlaying = true; //default in 'on'
const soundImages = ['volume-up-fill.svg','volume-mute-fill.svg',0];
const charImages = ['buriburizaemon.png','sinchain.png',0];
// eslint-disable-next-line no-unused-vars
const toggleAudio = ()=>{
    bgMusic.muted = audioPlaying //to mute if audio is playing
    winMusic.muted = audioPlaying
    audioPlaying = !audioPlaying
    soundImages[2] = (soundImages[2] == 0) ? 1 : 0; //toggle index
    const soundControl = document.querySelector("#soundControl img");
    soundControl.src=`/assets/${soundImages[soundImages[2]]}`;
}

window.addEventListener("load", () => {
    playBg();
});

setInterval(() => {
    if(bgMusic.paused && winMusic.paused)
        playBg();
}, 3000);

const changeTurn = ()=>{
    charImages[2] = (charImages[2]==0)?1:0; //toggle image
    return turn === "X"?"0":"X";
}

const resetGame = ()=>{
    document.querySelectorAll(".cell").forEach(e=>
        e.innerHTML = `<span class="boxText" hidden></span><img class="characterImg">`
    );
    document.getElementById("winner").style.display="none";
    turn = "X"
    document.getElementById("info").innerText = "Turn : "+turn;
    console.log("game reset");
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
                playWin();
                return;
        }
    })
}
const board = document.getElementById("board").children;    //entrypoint
Array.from(board).forEach(cell=>{
    cell.addEventListener('click', ()=>{
        const boxText = cell.firstChild;
        if(boxText.innerText === '' && gameover === false){
            boxText.innerText = turn;
            boxText.nextSibling.src= `assets/${charImages[charImages[2]]}`;
            checkWin();
            if(!gameover){ //game not over keep changing turns
                turn = changeTurn();
                document.getElementById("info").innerText = "Turn : "+turn;
            }
            else{ //if gameover
                document.getElementById("info").innerText = `${turn} WON GAME`;
                document.getElementById("winner").style.display="block";
                setTimeout(resetGame, 3000);
                console.log("gameover")
            }
        }
    })
})