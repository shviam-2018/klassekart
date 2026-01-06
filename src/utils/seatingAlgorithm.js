// Stokker liste tilfeldig
function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

// Lager nytt klassekart
// Ingen sitter med samme person som sist
export function generateNewSeating(students, previousSeats) {
  let newSeats = [];
  let attempts = 0;

//sjekke om noen sitter sammen som sist, ved å bruke for 
// loop og some metode hvis 2 folk sitter sammen som sist
//  stokke på nytt
  do {
    const shuffled = shuffle(students);
    newSeats = [];

    for (let i = 0; i < shuffled.length; i += 2) {
      if (shuffled[i + 1]) {
        newSeats.push([shuffled[i], shuffled[i + 1]]);
      } else {
        newSeats.push([shuffled[i]]);
      }
    }

    attempts++;
    // Unngå uendelig løkke, sjekker siste setting etter 100 forsøk stopper det
  } while (
    previousSeats.length > 0 &&
    previousSeats.some(prev =>
      newSeats.some(
        pair =>
          prev.includes(pair[0]) && prev.includes(pair[1])
      )
    ) &&
    attempts < 100
  );

  return newSeats;
}