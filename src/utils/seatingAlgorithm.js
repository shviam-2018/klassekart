/**
 * Seating Algorithm for Classroom
 * 
 * Regler:
 * 1. Tilfeldig plassering
 * 2. Ingen skal sitte ved siden av noen de har sittet ved siden av før
 * 3. Elever i par (2) og grupper på 4 (2 par)
 * 4. Grupper på 4 skal ha minst 1 person fra tidligere sittegruppe
 */

// Tracker som husker hvem som har sittet sammen før
let adjacencyHistory = [];

export function initializeHistory() {
  adjacencyHistory = [];
}

export function recordSeating(seatingArrangement) {
  // seatingArrangement er en array av par [student1, student2]
  seatingArrangement.forEach((pair) => {
    if (pair && pair.length === 2) {
      const [student1, student2] = pair.sort();
      const pairKey = `${student1}|${student2}`;
      
      if (!adjacencyHistory.includes(pairKey)) {
        adjacencyHistory.push(pairKey);
      }
    }
  });
}

function haveSatTogether(student1, student2) {
  const pairKey = `${[student1, student2].sort().join('|')}`;
  return adjacencyHistory.includes(pairKey);
}

function isValidPair(student1, student2) {
  return !haveSatTogether(student1, student2);
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateSeating(studentNames) {
  if (!Array.isArray(studentNames) || studentNames.length < 2) {
    return { pairs: [], flatList: [] };
  }

  const shuffled = shuffleArray(studentNames);
  const pairs = [];
  const used = new Set();
  
  // Lag par - prøv å finne gyldige par (som ikke har sittet sammen før)
  for (let i = 0; i < shuffled.length; i++) {
    if (used.has(shuffled[i])) continue;
    
    let partner = null;
    
    // Først, prøv å finne en gyldig partner
    for (let j = i + 1; j < shuffled.length; j++) {
      if (!used.has(shuffled[j]) && isValidPair(shuffled[i], shuffled[j])) {
        partner = shuffled[j];
        break;
      }
    }
    
    // Hvis ingen gyldig partner, ta hvem som helst
    if (!partner) {
      for (let j = i + 1; j < shuffled.length; j++) {
        if (!used.has(shuffled[j])) {
          partner = shuffled[j];
          break;
        }
      }
    }
    
    if (partner) {
      pairs.push([shuffled[i], partner]);
      used.add(shuffled[i]);
      used.add(partner);
    }
  }
  
  // Håndter odd one out
  for (const student of shuffled) {
    if (!used.has(student)) {
      pairs.push([student]);
      used.add(student);
    }
  }
  
  // Flatt liste for display (hver elev en pult)
  const flatList = pairs.flat();
  
  return { pairs, flatList };
}

export function getAdjacencyHistory() {
  return adjacencyHistory;
}
