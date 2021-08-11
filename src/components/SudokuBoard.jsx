import React, { Component } from 'react'
import generator from 'sudoku'
import SudokuBox from './SudokuBox'
// Generating the board


const startPuzzle = () => {
    const rawGame = generator.makepuzzle()
    let board = {rows: []}
    for (let i = 0; i < 9; i++) { 
        let currentRow = {cols: []}
        for (let j = 0; j < 9; j++) {
            let currentNum = rawGame[9 * i + j]
            if (currentNum != null) {
                currentNum++
            }
            let currentCol = {
                i: i,
                j: j,
                value: currentNum,
                readOnly: currentNum !== null,
                isCorrect: true
            }
            currentRow.cols.push(currentCol)
        }
        board.rows.push(currentRow)
    }
    return board
}

const clearBoard = () => {
        const rawGame = null
    let board = {rows: []}
    for (let i = 0; i < 9; i++) { 
        let currentRow = {cols: []}
        for (let j = 0; j < 9; j++) {
            let currentNum = rawGame
            let currentCol = {
                i: i,
                j: j,
                value: currentNum,
                readOnly: currentNum !== null,
                isCorrect: true
            }
            currentRow.cols.push(currentCol)
        }
        board.rows.push(currentRow)
    }
    return board
}

const convertBoardTo2dArr = (b) => {
    console.log(b)
    let arr = []
    for (let i = 0; i < 9; i++) {
        let currentRow = []
        for (let j = 0; j < 9; j++){
            currentRow.push(b.rows[i].cols[j].value)
        }
    arr.push(currentRow)
    }
    return arr
}

const convert2dArrToJSON = (boa) => {
    const rawGame = boa
    let board = {rows: []}
    for (let i = 0; i < 9; i++) { 
        let currentRow = {cols: []}
        for (let j = 0; j < 9; j++) {
            let currentNum = rawGame[i][j]
            let currentCol = {
                i: i,
                j: j,
                value: currentNum,
                readOnly: true,
                isCorrect: true
            }
            currentRow.cols.push(currentCol)
        }
        board.rows.push(currentRow)
    }
    return board
}

const checkIfValid = (board, number, pos) => {

    // First check col and row, the box
    // The second condition in if statement makes sure to ignore the inputed value.
    // So if inputed 3 in a row, it will not fire off as wrong because you just inputed 3
    for (let i = 0; i < 9; i++) {
        if (board[pos[0]][i] === number && pos[1] !== i) return false
    }

    for (let i = 0; i < 9; i++) {
        if (board[i][pos[1]] === number && pos[0] !== i) return false
    }

    let boxX = Math.floor(pos[1] / 3)
    let boxY = Math.floor(pos[0] / 3)

    for (let i = boxY * 3; i < boxY * 3 + 3; i++) {
        for (let j = boxX * 3; j < boxX * 3 + 3; j++) {
            if (board[i][j] === number && [i, j] !== pos) return false
        }
    }
    return true
}

const findEmptyBox = (board) => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === null)
                return [i, j]
        }
    }
    return false
}

const solve = (board) => {
    let emptyBoxesLeft = findEmptyBox(board)
    let [i, j] = [2, 3]
    if (!emptyBoxesLeft) return true 
    else {
        [i, j] = emptyBoxesLeft
    }


    for (let n = 1; n < 10; n++) {
        if (checkIfValid(board, n, [i, j])) {
            board[i][j] = n

            if (solve(board)) return board

            board[i][j] = null
        }
    }
    return false
}

window.solve = solve
window.b2A = convertBoardTo2dArr
window.a2B = convert2dArrToJSON


const firstPuzzle = startPuzzle()


export class SudokuBoard extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            board: firstPuzzle,
            solutionBoard: convert2dArrToJSON(solve(convertBoardTo2dArr(firstPuzzle))),
        }
    }

    handleValueChange = (val, i, j) => {
        val = parseInt(val)
        let newBoard = this.state.board
        newBoard.rows[i].cols[j].value = parseInt(val)
        // Colouring the box based on either sudoku logic or blank space
        newBoard.rows[i].cols[j].isCorrect = val === this.state.solutionBoard.rows[i].cols[j].value || val === NaN ? true : false
        this.setState({
            board: newBoard
        })
    }

    
    handleSolve = () => {
        this.setState({
            board: this.state.solutionBoard
        })
    }

    handleNewGame = () => {
        const firstP = startPuzzle()
        this.setState({
            board: firstP,
            solutionBoard: convert2dArrToJSON(solve(convertBoardTo2dArr(firstP))),
        })
    }

    clearGame = () => {
        this.setState({
            board: clearBoard()
        })
    }
    
    render() {
        window.state = this.state
        return (
            <div>
                {this.state.board.rows.map(i => {
                    return (
                        <div>
                            {i.cols.map(j => {
                                return (
                                <SudokuBox key = {'k' + String(j.i * 9 + j.j)} number = {j.value} 
                                readOnly = {j.readOnly} 
                                col = {j.j}
                                row = {j.i}
                                board = {this.state.board}
                                changeValue = {(val, i, j) => this.handleValueChange(val, i, j)}
                                correctAns = {j.isCorrect}
                                />
                                )
                            })}
                        </div>
                    )
                })}
                   <div className = 'buttons'>
                        <button onClick = {this.handleSolve}>Solve</button>
                        <button onClick = {this.handleNewGame}>New Game</button>
                        <button onClick = {this.clearGame}>Clear Board</button>
                    </div> 
            </div>
        )
    }
}

export default SudokuBoard
