import { input, example, smallerExample } from './data';

const processData = (input: string) =>
    input.split('\n').map((row) => row.split('').map((str) => Number(str)));

const countFlashesAfterNSteps = (matrix: number[][], steps: number = 100) => {
    let numFlashes = 0;

    for (let i = 1; i <= steps; i++) {
        numFlashes += updateMatrix(matrix);
    }

    return numFlashes;
};

// Very important thing to note is that you NEED to use recursion to increase neighbors.
// Doing so iteratively will not work as some nodes will flash at some point but won't increase the values of its neighbors.
const updateMatrix = (matrix: number[][]) => {
    let count = 0;

    // First pass, increment all values by 1.
    for (let x = 0; x < matrix.length; x++) {
        for (let y = 0; y < matrix[0].length; y++) {
            matrix[x][y] += 1;
        }
    }

    // Second pass, increment all neighbors to flashing octopuses
    for (let x = 0; x < matrix.length; x++) {
        for (let y = 0; y < matrix[0].length; y++) {
            recursivelyIncrementNeighbors(x, y, matrix);
        }
    }

    // Third pass, count and return number of flashes, and reset any values over 9 to 0.
    for (let x = 0; x < matrix.length; x++) {
        for (let y = 0; y < matrix[0].length; y++) {
            if (matrix[x][y] === 0) {
                count++;
            }
        }
    }

    return count;
};

const recursivelyIncrementNeighbors = (x: number, y: number, matrix: number[][]) => {
    if (matrix[x][y] < 10 || matrix[x][y] === 0) {
        return;
    }

    matrix[x][y] = 0;

    // Increment neighbours
    if (x < matrix.length - 1) {
        matrix[x + 1][y] !== 0 && matrix[x + 1][y]++;
    }

    if (x > 0) {
        matrix[x - 1][y] !== 0 && matrix[x - 1][y]++;
    }

    if (y < matrix[0].length - 1) {
        matrix[x][y + 1] !== 0 && matrix[x][y + 1]++;
    }

    if (y > 0) {
        matrix[x][y - 1] !== 0 && matrix[x][y - 1]++;
    }

    if (x > 0 && y > 0) {
        matrix[x - 1][y - 1] !== 0 && matrix[x - 1][y - 1]++;
    }

    if (x < matrix.length - 1 && y > 0) {
        matrix[x + 1][y - 1] !== 0 && matrix[x + 1][y - 1]++;
    }

    if (x < matrix.length - 1 && y < matrix[0].length - 1) {
        matrix[x + 1][y + 1] !== 0 && matrix[x + 1][y + 1]++;
    }

    if (x > 0 && y < matrix[0].length - 1) {
        matrix[x - 1][y + 1] !== 0 && matrix[x - 1][y + 1]++;
    }

    // Recurse through neighbours
    if (x < matrix.length - 1) {
        recursivelyIncrementNeighbors(x + 1, y, matrix);
    }

    if (x > 0) {
        recursivelyIncrementNeighbors(x - 1, y, matrix);
    }

    if (y < matrix[0].length - 1) {
        recursivelyIncrementNeighbors(x, y + 1, matrix);
    }

    if (y > 0) {
        recursivelyIncrementNeighbors(x, y - 1, matrix);
    }

    // Diagonal
    if (x > 0 && y > 0) {
        recursivelyIncrementNeighbors(x - 1, y - 1, matrix);
    }

    if (x < matrix.length - 1 && y > 0) {
        recursivelyIncrementNeighbors(x + 1, y - 1, matrix);
    }

    if (x < matrix.length - 1 && y < matrix[0].length - 1) {
        recursivelyIncrementNeighbors(x + 1, y + 1, matrix);
    }

    if (x > 0 && y < matrix[0].length - 1) {
        recursivelyIncrementNeighbors(x - 1, y + 1, matrix);
    }

    
}

console.log(countFlashesAfterNSteps(processData(input), 100));
