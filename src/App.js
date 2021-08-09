import './App.css';
import React from 'react'
import SudokuBoard from './components/SudokuBoard'

const App = () => {
  return (
    <div>
      <header className = 'App-header'>
        <h1>Sudoku Board</h1>
        <SudokuBoard />
      </header>
    </div>
  )
}

export default App
