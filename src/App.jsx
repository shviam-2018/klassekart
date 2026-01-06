import { useState } from 'react'
import Pult from './components/pult.jsx'
import { generateSeating, recordSeating, initializeHistory } from './utils/seatingAlgorithm.js'
import './App.css'

function App() {
  const [students, setStudents] = useState([])
  const [studentInput, setStudentInput] = useState('')
  const [seating, setSeating] = useState([])
  const [round, setRound] = useState(0)

  const handleAddStudent = () => {
    if (studentInput.trim() && !students.includes(studentInput.trim())) {
      setStudents([...students, studentInput.trim()])
      setStudentInput('')
    }
  }

  const handleRemoveStudent = (name) => {
    setStudents(students.filter(s => s !== name))
  }

  const handleGenerateSeating = () => {
    if (students.length < 2) {
      alert('Du må ha minst 2 elever!')
      return
    }
    
    const { flatList, pairs } = generateSeating(students)
    recordSeating(pairs)
    setSeating(flatList)
    setRound(round + 1)
  }

  const handleReset = () => {
    initializeHistory()
    setSeating([])
    setStudents([])
    setStudentInput('')
    setRound(0)
  }

  // Gruppér elevene: 2 par per rad (4 elever per rad)
  const groupedRows = []
  for (let i = 0; i < seating.length; i += 4) {
    const pair1 = seating.slice(i, i + 2)
    const pair2 = seating.slice(i + 2, i + 4)
    groupedRows.push([pair1, pair2])
  }

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
                  ×
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
