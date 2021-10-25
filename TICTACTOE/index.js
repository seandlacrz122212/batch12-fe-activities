const selectPlayerX = document.querySelector("#playerX");
const selectPlayerO = document.querySelector("#playerO");
const selectFirstPlayer = document.querySelector(".selectFirstPlayer");
const board = document.querySelector(".board");
const navigation = document.querySelector(".navigation");
const reset = document.querySelector("#restartButton");
const previousMove = document.querySelector("#previousMove");
const nextMove = document.querySelector("#nextMove");
const reset2 = document.querySelector("#restart2");
const checkMoves = document.querySelector("#checkMoves");
const winningMessage = document.querySelector(".winning-message");
const winInnerText = document.querySelector("[data-winning-message-text]");
const xScore = document.querySelector("#xScore");
const oScore = document.querySelector("#oScore");
const cellElements = document.querySelectorAll(".cell");
const xClass = "x";
const oClass = "O";
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let scoreX = 0;
let scoreO = 0;
let move = "";
let currentClass = "";
let history = [];

selectFirstPlayer.classList.add("show");

/* --SELECT WHO'S TURN FIRST
    BOARD CLASS ADD x or o */
selectPlayerX.addEventListener("click", () => {
  currentClass = xClass;
  board.classList.add(currentClass);
  selectFirstPlayer.classList.remove("show");
});
selectPlayerO.addEventListener("click", () => {
  currentClass = oClass;
  board.classList.add(currentClass);
  selectFirstPlayer.classList.remove("show");
});

/* --PLAYER ACTION ON CLICK-- */
const handleClick = (e) => {
  const cell = e.target;
  placeMark(cell, currentClass);
  if (checkwin(currentClass)) {
    winInnerText.innerHTML = `PLAYER ${currentClass} WON!`;
    winningMessage.classList.add("show");
    updatedBoardStatus();
    updateMoves();
  } else if (isDraw()) {
    winInnerText.innerHTML = `IT'S A TIE!`;
    winningMessage.classList.add("show");
  } else {
    updatedBoardStatus();
    updateMoves();
    swapTurns();
  }
};

/* --PLACE PLAYER MARK ON CELL-- */
const placeMark = (cell, currentClass) => {
  cell.classList.add(currentClass);
};

/*--SWAP TURNS, CHANGES BOARD CLASS-- */
const swapTurns = () => {
  if (currentClass === "x") {
    board.classList.remove("x");
    board.classList.add("O");
    currentClass = "O";
  } else {
    board.classList.remove("O");
    board.classList.add("x");
    currentClass = "x";
  }
};

/* --ADD EVENTLISTENERS ON EVERY CELLS-- */
for (cell of cellElements) {
  cell.addEventListener("click", handleClick, { once: true });
}

/* --UPDATE BOARDSTATUS-- */
const updatedBoardStatus = () => {
  let row1 = [];
  let row2 = [];
  let row3 = [];
  let mark = "";

  for (let i = 0; i < cellElements.length; i++) {
    if (cellElements[i].classList.contains("x")) {
      mark = "x";
    } else if (cellElements[i].classList.contains("O")) {
      mark = "o";
    } else {
      mark = "";
    }

    if (i <= 2) {
      row1.push(mark);
    } else if (i > 2 && i < 6) {
      row2.push(mark);
    } else {
      row3.push(mark);
    }
  }

  history.push([row1, row2, row3]);
  console.log(history);
};

/* --UPDATE NUMBER OF MOVE-- */
const updateMoves = () => {
  move = history.length - 1;
  console.log(`number of move: ${move}`);
};

/* --CHECK FOR WINNER-- */
const checkwin = (currentClass) => {
  let x = document.querySelectorAll(".cell");
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return x[index].classList.contains(currentClass);
    });
  });
};

/* --CHECK FOR DRAW START-- */
const isDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("O");
  });
};
/* --CHECK FOR DRAW END-- */

/* --RESTART BUTTON START-- */
const restartFunction = () => {
  location.reload();
};
reset.addEventListener("click", restartFunction);
reset2.addEventListener("click", restartFunction);
/* --RESTART BUTTON END-- */

/* --CHECK MOVES BUTTON START-- */
checkMoves.addEventListener("click", () => {
  winningMessage.classList.remove("show");
  navigation.classList.add("show");
  nextMove.disabled = true;
  previousMove.disabled = false;
  for (cell of cellElements) {
    cell.removeEventListener("click", handleClick);
  }

  if (nextMove.disabled === true) {
    nextMove.style.cursor = "not-allowed";
  }
});
/* --CHECK MOVES BUTTON END-- */

/* --PREVIOUS MOVE-- */
previousMove.addEventListener("click", () => {
  nextMove.disabled = false;
  nextMove.style.cursor = "pointer";
  move = move - 1;
  updateBoardOnClick();
  console.log(history[move]);
  console.log(`number of move: ${move + 1}`);
  if (move < 1) {
    previousMove.disabled = true;
    previousMove.style.cursor = "not-allowed";
  }
});
/* --PREVIOUS MOVE END-- */

/* --NEXT MOVE-- */
nextMove.addEventListener("click", () => {
  previousMove.disabled = false;
  previousMove.style.cursor = "pointer";
  move = move + 1;
  updateBoardOnClick();
  
  console.log(`number of move: ${move + 1}`);
  if (move === history.length - 1) {
    nextMove.disabled = true;
    nextMove.style.cursor = "not-allowed";
  }
});


/* --NEXT MOVE END-- */

/* --updateBoard function for previous & next move buttons-- */
const updateBoardOnClick = () => {
  board.innerHTML = "";
  console.log(history[move]);
  for (let i = 0; i < history[move].length; i++) {
    for (let j = 0; j < history[move][i].length; j++) {
      console.log(history[move][i][j]);
      let div = document.createElement("div");
      div.classList.add("cell");

      if (history[move][i][j] === "x") {
        div.classList.add("x");
      } else if (history[move][i][j] === "o") {
        div.classList.add("O");
      }
      board.append(div);
    }
  }
};