// Student management logic
export function addStudent(students, studentInput) {
  if (studentInput.trim() && !students.includes(studentInput.trim())) {
    return [...students, studentInput.trim()];
  }
  return students;
}

export function removeStudent(students, name) {
  return students.filter(s => s !== name);
}
