let start = false;
let h2 = document.querySelector("h2");
let btns = document.querySelectorAll(".boxes");
let level = 0;
let boxes = ["red", "green", "yellow", "blue"]
let gameSeq = []
let userSeq = []
let clickable=false;

const boxFlash = (randBox) => {
    randBox.classList.add("flash")
    setTimeout(() => {
        randBox.classList.remove("flash");
    }, 300)
}

const userFlash = (box) => {
    box.classList.add("userFlash")
    setTimeout(() => {
        box.classList.remove("userFlash");
    }, 100)
}
const updateLevel = () => {
    userSeq=[]
    level++;
    h2.innerHTML = `Level ${level}`

    let randIdx = Math.floor(Math.random() * 4);
    let randClr = boxes[randIdx]
    gameSeq.push(randClr)
    let randBox = document.querySelector(`.${randClr}`)
    boxFlash(randBox)
}
const startGame = ()=>{
     if(!start){
        updateLevel();
        start=true;
     }
}
//checking mobile or pc
if(window.innerWidth<600){
        h2.innerHTML="Click to start!"
        h2.addEventListener("touchstart",()=>{
            setTimeout(() => {
                startGame();
            }, 500);
         
        })
    }
    else{
        document.addEventListener("keypress",()=>{
            startGame();
        })
    }



const getColorOfBox = (classList) => {
    return classList[1]
}

const checkAns = (idx)=>{
          if(userSeq[idx]===gameSeq[idx]){
            if(userSeq.length===gameSeq.length){
                setTimeout(() => {
                    updateLevel()
                }, 1000);
   
            }
          }
          else{
            if(window.innerWidth<600){
                h2.style.fontSize="30px"
            h2.innerHTML="Game Over!Click to play again"
            }
            else{
                h2.innerHTML="Game Over! Press any key to play again"
            }
            GameOVerIndicator()
            scoreDisplay(level)
            reset();
            
           
          }
}

const GameOVerIndicator=()=>{
    document.querySelector("body").style.backgroundColor="red"
    setTimeout(() => {
        document.querySelector("body").style.backgroundColor="rgb(161, 146, 146)"
    }, 150);
}
const btnPress =(btn)=>{
    
    let boxClicked= getColorOfBox(btn.classList)
    userSeq.push(boxClicked)
    userFlash(btn)
    checkAns(userSeq.length-1)
    
    
}
for(let btn of btns){
    btn.addEventListener("click",()=>{
        if(start){
        btnPress(btn)
    }})
}

const reset = ()=>{
    level =0;
    start = false;
    clickable=true;
    gameSeq=[]
    userSeq=[]
}
const scoreDisplay =(level)=>{
    let p = document.createElement("h1")
    p.innerHTML = `Your score was ${level}`
    let b = document.querySelector(".box-container")
    b.after(p)

    setTimeout(()=>{
        p.innerHTML=""
    },3000)
}
