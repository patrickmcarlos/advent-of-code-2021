import { input, example } from './data';

const processData = (str: string): number[][] =>
    str.split('\n').map((str) => str.split('').map((str) => Number(str)));

const findLowPoints = (arr: number[][]) => {
    let count = 0;

    for (let x = 0; x < arr.length; x++) {
        for (let y = 0; y < arr[0].length; y++) {
            const point = arr[x][y];
            const isLowPoint = checkIfLowPoint(point, x, y, arr);

            if (isLowPoint) {
                count += point + 1;
            }
        }
    }

    return count;
};

const checkIfLowPoint = (
    num: number,
    x: number,
    y: number,
    matrix: number[][]
) => {
    const right = y < matrix[0].length - 1 ? matrix[x][y + 1] : Infinity;
    const left = y > 0 ? matrix[x][y - 1] : Infinity;
    const up = x > 0 ? matrix[x - 1][y] : Infinity;
    const down = x < matrix.length - 1 ? matrix[x + 1][y] : Infinity;

    const isLowestPoint = ![up, down, left, right].some(
        (neighbour) => neighbour <= num
    );

    return isLowestPoint;
};

const processedData = processData(input);
// console.table(processedData);
console.log(findLowPoints(processedData));
