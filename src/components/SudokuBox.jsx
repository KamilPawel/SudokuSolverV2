import React from 'react'
import './Sudoku.css'
import { useState } from 'react'





const SudokuBox = (props) => {
    
    const [boxValue, setValue] = useState(props.value)

    const isCharacterValid = (char) => {
        // If read-only then abort
        if (props.readOnly) return
        for (let i = 1; i <= 9; i++) {
            // Conditions: num 1 - 9 or null or nothing
            if (parseInt(char) === parseInt(i) || char === null || char === '') return true
        }
        return false
    }

    const handleChange = (event) => {
        let number = event.target.value
        if (isCharacterValid(number)) {
            setValue(number)
            props.changeValue(number, props.row, props.col)
        }
    }
    

    const styleBox = {
        color: props.readOnly ? "black" : 'grey',
        background: props.correctAns ? 'white' : 'red'
    }

    return (
        <input 
            type = 'text'
            className = 'sudokuBox'
            value = {props.number || ""}
            onChange = {handleChange}
            style = {styleBox}
            maxLength = '1'
        />
    )
}

export default SudokuBox
