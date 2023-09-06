const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  
const CellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winning-message');
const winningMessagetextElement = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('restartButton')
let circleTurn 

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
    CellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placemark(cell, currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    }else if(isDraw()){
        endGame(true)
    } else{
        swapturns()
        setBoardHoverClass()
    }

}

function endGame(draw) {
    if(draw){
        winningmessageTextElement.innerText = 'Draw!'
    }
    else{
        winningMessagetextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }

    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...CellElements].every(cell => {

        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placemark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapturns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn)
    {
        board.classList.add(CIRCLE_CLASS)
    }else{
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combinations =>{
        return combinations.every(index => {
            return CellElements[index].classList.contains(currentClass)
    })
})
}
