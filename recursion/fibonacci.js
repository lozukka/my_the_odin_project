//Fibonacci
// function fibs that returns an array containing Fibonacci sequence. Example input 8 = [0, 1, 1, 2, 3, 5, 8, 13]

function fibs(n) {
  const sequence = [0, 1];
  for (let i = 0; i < n - 2; i++) {
    const sumPair = sequence.slice(-2);
    sequence.push(sumPair[0] + sumPair[1]);
    console.log(sequence);
  }
}

// same with recursively
function fibsRec(n) {
  if (n < 1) {
    return;
  }
  if (n === 1) {
    return [0];
  }
  if (n === 2) {
    return [0, 1];
  }
  const result = fibsRec(n - 1);
  result.push(result.at(-1) + result.at(-2));
  return result;
}
