const choosePlayerPrompt = document.querySelector('.choosePlayer')
const choose = document.querySelectorAll('.choose')
const playerX = document.getElementById('playerX')
const playerO = document.getElementById('playerO')
let tileCells = document.querySelectorAll('.tile')

const cells = Array.from(tileCells)
const board = document.querySelector('.tile-container')
const winningMessage = document.querySelector('.win-text')
const winningMessageContainer = document.querySelector('.win-prompt')
const currentPlayerX = document.querySelector('.x')
const currentPlayerO = document.querySelector('.o')
 

const undoBtn = document.getElementById('previous')
const redoBtn = document.getElementById('next')
const mainButtons = document.querySelector('.mainButtons')
const closeBtn = document.querySelector('.close') 
const restart = document.querySelector('.restart')
const x_score = document.getElementById('xscore')
const o_score = document.getElementById('oscore')

//const board = ['', '', '', '', '', '', '', '', '',];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let Oscore = 0
let Xscore = 0
let oTurn = null
let placement = null
let moves = []

const Xclass = "x"
const Oclass = "o"

//start choosing player 
choose.forEach(chooseNow => {
    chooseNow.addEventListener('click', () => {
        if (chooseNow.id === 'playerX'){
            oTurn = false;
        } else {
            oTurn = true
            board.classList.add(Oclass)
        }
        choosePlayerPrompt.style.display  = 'none'
        mainButtons.classList.add('hidden')
    })
})

isGameActive()

closeBtn.addEventListener('click', isGameActive)

//restart 
function isGameActive() {
    oTurn = false
    tileCells.forEach(cell => {
        cell.classList.remove(Xclass)
        cell.classList.remove(Oclass)
        cell.addEventListener('click', cellClick, {once: true})
    })
    setHover()
    let moves = []
    mainButtons.classList.add('hidden')
    winningMessageContainer.classList.remove('show') 
}

// event listener for all tiles
function cellClick (e){
    const cell = e.target
    const currentClass = oTurn ? Oclass : Xclass
    putMark(cell, currentClass)
    if (checkWin(currentClass)){
        endGame(false)
    } else if (isDraw()){
        endGame(true)
    } else {
    changeTurn()
    setHover()
    }
}

//save movement so that prev and next will work
function storeMove(tileCells){
    let arr1 = []
    let arr2 = []
    let arr3 = []
    let move = null

    tileCells.forEach((value, index) =>  {
        if (value.classList.contains(Xclass)) {
            move = 'x'
        } else if ( value.classList.contains(Oclass)){
            move = 'o'
        } else {
            move = ''
        } 
        if (index <= 2) {
            arr1.push(move)
        } else if (index >= 3 && index < 6){
            arr2.push(move)
        } else{
            arr3.push(move)
        }
    })
    moves.push([arr1, arr2, arr3])
    placement = moves.length - 1
}

function undoMove() {
    redoBtn.disabled = false
    if (placement > 0){
        placement -= 1
        loadTiles (placement)
    }
    if (placement === 0) {
        undoBtn.disabled = true
    }
}

undoBtn.addEventListener('click', undoMove)

function redoMove (){
    undoBtn.disabled = false
    if (placement >= 0 && placement < moves.length - 1){
        placement +=1 
        loadTiles (placement)
    }if (placement === moves.length - 1){
        redoBtn.disabled = true
    }
}

redoBtn.addEventListener('click', redoMove)
//get the value
function loadTiles(index) {
    board.innerHTML = ''
    for (let i = 0; i < moves[index].length; i++) {
        for (let j = 0; j < moves[index][i].length; j++){
            let div = document.createElement('div')
                if (moves[index][i][j] == 'x'){
                    div.classList.add('x')
                } else  if (moves[index][i][j] == 'o'){
                    div.classList.add('o')
                } else {
                }
            div.classList.add('tile')       
            board.appendChild(div)
        }   
    }   
}

//update the score
function endGame (draw){
    if (draw){
        winningMessage.innerText = `It's a Tie!`
        console.log(draw)
    }else {
        if (oTurn){
            Oscore += 1
            o_score.innerHTML = Oscore
        } else {
            Xscore += 1
            x_score.innerHTML = Xscore
        }
        winningMessage.innerText = `Player ${oTurn ? "O" : "X"} Won!`
    }
    winningMessageContainer.classList.add('show')
    mainButtons.classList.add('hidden')
    cells.forEach((cell) =>{
        board.classList.remove('x')
        board.classList.remove('o')
        cell.removeEventListener('click', cellClick)
    })
}

function putMark(cell,currentClass){
    cell.classList.add(currentClass)
}

function changeTurn(){
    oTurn = !oTurn
}

function setHover(){
    board.classList.remove(Xclass)
    board.classList.remove(Oclass)
    if (oTurn){
        board.classList.add(Oclass)
    } else {
        board.classList.add(Xclass)
    }
}

function checkWin (currentClass){
    storeMove(cells)
    return winningConditions.some(combo => {
        return combo.every(index => {
            return tileCells[index].classList.contains(currentClass)
        })
    }) 
} 
//draw function
function isDraw(){
    return [...tileCells].every(cell => {
        return cell.classList.contains(Xclass) || cell.classList.contains(Oclass)
    })
}

closeBtn.addEventListener('click', closing = () => {
    winningMessageContainer.style.display  = 'none'
    mainButtons.classList.remove('hidden')
})