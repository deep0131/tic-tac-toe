let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGame = document.querySelector("#newGame");
let audTurnO = new Audio("turnO.mp3");
let audTurnX = new Audio("turnX.mp3");
let audWin = new Audio("win.mp3");
let audDraw = new Audio("gamedraw.mp3");
let draw = document.querySelector(".draw");

let turn0 = true; // player0 turn
let count = 0;  // To check draw

const winPatterns = [ [0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5] ];

const resetGame = () =>{
   turn0 = true;
   count = 0;
   enableBoxes();
   removeChange();
   newGame.classList.add("hide");
   resetBtn.classList.remove("hide");
   audWin.load();
   draw.classList.add("hide");
   audDraw.load();
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turn0){ //if player0's  turn
            box.innerText = "O";
            audTurnO.play();
            turn0 = false;
        } else {  //if playerX's  turn
            box.innerText = "X";
            audTurnX.play();
            turn0 = true;
        }
        box.disabled = true; 
        count++;
        
        let isWinner = checkWinner();
        
        if(count === 9 && !isWinner){
            gameDraw();
            audDraw.play();
        }
    });
});

const gameDraw = () => {
    draw.classList.remove("hide");
    newGame.classList.remove("hide");
    resetBtn.classList.add("hide");
}

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const removeChange = () =>{
    for(let pattern of winPatterns){

        let pos1v = boxes[pattern[0]];
        let pos2v = boxes[pattern[1]];
        let pos3v = boxes[pattern[2]];

        pos1v.classList.remove("boxChange");
        pos2v.classList.remove("boxChange");
        pos3v.classList.remove("boxChange");
    }
}

const getWinner = () =>{
    disableBoxes();
}

const checkWinner =() => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        let pos1c = boxes[pattern[0]];
        let pos2c = boxes[pattern[1]];
        let pos3c = boxes[pattern[2]];

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val=== pos3Val){
                resetBtn.classList.add("hide");
                newGame.classList.remove("hide");
                pos1c.classList.add("boxChange");
                pos2c.classList.add("boxChange");
                pos3c.classList.add("boxChange");
                getWinner();
                audWin.play();
                return true;
            }
        }
    }
}

resetBtn.addEventListener("click", resetGame);
newGame.addEventListener("click", resetGame);
