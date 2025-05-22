const rowLength = 30;
const matrixArea = rowLength * rowLength;

// up, right, left, down
const directions = [-30, +1, -1, +30];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/**
 * @param {Array} matrix
 */
function fleaJump(matrix) {
  const oldState = new Map();

  for (let i = 0; i < matrix.length; ++i) {
    let maxFleas = oldState.get(i) || matrix[i];
    if (maxFleas == 0) {
      continue;
    }

    const row = Math.floor(i / rowLength);

    const allowedDirections = [];
    if (directions[0] + i >= 0) {
      allowedDirections.push(directions[0] + i);
    }

    if (directions[1] + i < (row + 1) * rowLength) {
      allowedDirections.push(directions[1] + i);
    }

    if (directions[2] + i >= row * rowLength) {
      allowedDirections.push(directions[2] + i);
    }

    if (directions[3] + i < matrixArea) {
      allowedDirections.push(directions[3] + i);
    }

    while (maxFleas > 0) {
      const dirIdx = getRandomInt(allowedDirections.length);
      const newPos = allowedDirections[dirIdx];

      if (!oldState.has(newPos) && newPos > i) {
        oldState.set(newPos, matrix[newPos]);
      }

      matrix[newPos] += 1;
      matrix[i]--;
      maxFleas--;
    }

    oldState.delete(i);
  }

  return matrix;
}

/**
 * @param {Array} matrix
 */
function countEmptySquares(matrix) {
  let counter = 0;
  for (let i = 0; i < matrix.length; ++i) {
    if (matrix[i] > 0) {
      continue;
    }

    counter++;
  }

  return counter;
}

function runTest(matrix) {
  let runs = 50;
  while (runs > 0) {
    fleaJump(matrix);
    runs--;
  }

  return countEmptySquares(matrix);
}

function run() {
  let tests = 100;
  const counter = tests;
  let sum = 0;
  while (tests > 0) {
    let matrix = Array(matrixArea).fill(1);
    sum += runTest(matrix);
    tests--;
  }
  const average = sum / counter;

  return Math.round(average * 1e6) / 1e6;
}

console.log(run());
