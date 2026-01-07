import { useState } from 'react'
import Pult from './components/pult.jsx'
import { addStudent, removeStudent } from './services/studentService.js'
import { generateSeating, groupSeatingByRows } from './services/seatingService.js'
import './App.css'

function App() {
  const [students, setStudents] = useState([])
  const [studentInput, setStudentInput] = useState('')
  const [seating, setSeating] = useState([])
  const [previousSeats, setPreviousSeats] = useState([])
  const [round, setRound] = useState(0)

  const handleAddStudent = () => {
    const updatedStudents = addStudent(students, studentInput)
    if (updatedStudents.length > students.length) {
      setStudents(updatedStudents)
      setStudentInput('')
    }
  }

  const handleRemoveStudent = (name) => {
    setStudents(removeStudent(students, name))
  }

  const handleGenerateSeating = () => {
    const nyttKart = generateSeating(students, previousSeats)
    if (!nyttKart) {
      alert('Du må ha minst 2 elever!')
      return
    }
    
    setSeating(nyttKart)
    setPreviousSeats(nyttKart)
    setRound(round + 1)
  }

  const handleReset = () => {
    setSeating([])
    setStudents([])
    setStudentInput('')
    setPreviousSeats([])
    setRound(0)
  }

  // Gruppér parene: 2 par per rad
  const groupedRows = seating.length > 0 ? groupSeatingByRows(seating) : []

  return (
    <div className='appContainer'>
      <h1>Klassekart</h1>
      
      <div className='inputSection'>
        <div className='inputGroup'>
          <input
            type="text"
            value={studentInput}
            onChange={(e) => setStudentInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddStudent()}
            placeholder="Skriv inn elevenavn"
            className='inputField'
          />
          <button onClick={handleAddStudent} className='addBtn'>Legg til</button>
        </div>

        <div className='studentsList'>
          <h3>Elever ({students.length})</h3>
          <div className='studentsTags'>
            {students.map((student) => (
              <span key={student} className='studentTag'>
                {student}
                <button
                  onClick={() => handleRemoveStudent(student)}
                  className='removeTag'
                >
                  X
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className='buttonGroup'>
          <button onClick={handleGenerateSeating} className='generateBtn'>
            Generer klassekart
          </button>
          <button onClick={handleReset} className='resetBtn'>
            Tilbakestill
          </button>
        </div>
      </div>

      {seating.length > 0 && (
        <div className='seatingDisplay'>
          <h2>Runde {round}</h2>
          {groupedRows.map((row, rowIdx) => (
            <div key={rowIdx} className='pultContainer'>
              {row[0] && row[0].length > 0 && (
                <div className='par'>
                  {row[0].map((student, idx) => (
                    <Pult key={`${rowIdx}-0-${idx}`} name={student} />
                  ))}
                </div>
              )}
              {row[1] && row[1].length > 0 && (
                <div className='par'>
                  {row[1].map((student, idx) => (
                    <Pult key={`${rowIdx}-1-${idx}`} name={student} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App
