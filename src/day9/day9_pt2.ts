import { input, example } from './data';

const processData = (str: string): number[][] =>
    str.split('\n').map((str) => str.split('').map((str) => Number(str)));

const findLargestBasins = (arr: number[][]) => {
    let basins = [];

    for (let x = 0; x < arr.length; x++) {
        for (let y = 0; y < arr[0].length; y++) {
            const val = arr[x][y];
            if (val !== -1 && val !== 9) {
                basins.push(0);

                findBasins(x, y, arr, basins);
            }
        }
    }

    basins = basins.sort((a, b) => b - a);

    return basins.slice(0, 3).reduce((a, b) => {
        return a * b;
    });
};

const findBasins = (
    x: number,
    y: number,
    matrix: number[][],
    basins: number[]
) => {
    if (x < 0 || y < 0 || x > matrix.length || y > matrix[0].length) {
        return;
    }

    const row = matrix[x];

    if (!row) {
        return;
    }

    const val = matrix[x][y];

    if (val === -1 || val === 9 || val === undefined) {
        return;
    }

    basins[basins.length - 1] += 1;
    matrix[x][y] = -1;

    findBasins(x + 1, y, matrix, basins);
    findBasins(x - 1, y, matrix, basins);
    findBasins(x, y + 1, matrix, basins);
    findBasins(x, y - 1, matrix, basins);
};

const processedData = processData(input);
// console.table(processedData);
console.log(findLargestBasins(processedData));
