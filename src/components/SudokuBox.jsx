import React from 'react'
import './Sudoku.css'


const SudokuBox = (props) => {
    return (
        <input 
            className = 'sudokuBox'
            value = {props.value || ""}
        />
    )
}

export default SudokuBox
