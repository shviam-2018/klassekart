import { generateNewSeating } from '../utils/seatingAlgorithm.js';

// Seating generation and grouping logic
export function generateSeating(students, previousSeats) {
  if (students.length < 2) {
    return null;
  }
  return generateNewSeating(students, previousSeats);
}

// Group pairs into rows (2 pairs per row for display)
export function groupSeatingByRows(seating) {
  const groupedRows = [];
  for (let i = 0; i < seating.length; i += 2) {
    const pair1 = seating[i];
    const pair2 = seating[i + 1];
    groupedRows.push([pair1, pair2]);
  }
  return groupedRows;
}
