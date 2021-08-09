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
                readOnly: currentNum !== null
            }
            currentRow.cols.push(currentCol)
        }
        board.rows.push(currentRow)
    }
    return board
}

export class SudokuBoard extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            board: startPuzzle()
        }
    }

    
    render() {
        window.board = this.state.board
        return (
            <div>
                {this.state.board.rows.map(i => {
                    return (
                        <div>
                            {i.cols.map(j => {
                                return <div>
                                    {j.value}
                                </div>
                            })}
                        </div>
                    )
                })}
                

                <SudokuBox value = {56}/>
            </div>
        )
    }
}

export default SudokuBoard
