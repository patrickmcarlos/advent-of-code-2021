import { inputPoints, inputFolds, examplePoints, exampleFolds } from './data';

// x horizontal, y vertical
// assume matrix is 1500x1500

const processPointData = (str: string) =>
    str.split('\n').map((row) => row.split(','));

const processFoldData = (str: string) =>
    str.split('\n').map((row) => row.split(' ')[2].split('='));

const foldMatrix = (axis: string, point: number, matrix: string[][]) => {
    // make sure to flip smaller side in
    if (axis === 'y') {
        const isFoldingUp = matrix.length - point < point;

        let startY = isFoldingUp ? 0 : point;
        let endY = isFoldingUp ? point : matrix.length - 1;

        for (let y = startY; y < endY; y++) {
            for (let x = 0; x < matrix[0].length; x++) {
                const cell = matrix[y][x];

                if (cell === '#') {
                    matrix[isFoldingUp ? matrix.length - y - 1 : point - y][x] =
                        '#';
                    matrix[y][x] = '.';
                }
            }
        }
    } else {
        const isFoldingRight = matrix[0].length - point > point;

        let startX = isFoldingRight ? 0 : point;
        let endX = isFoldingRight ? point : matrix.length - 1;

        for (let y = 0; y < matrix.length; y++) {
            for (let x = startX; x < endX; x++) {
                const cell = matrix[y][x];

                if (cell === '#') {
                    matrix[y][
                        isFoldingRight ? point - x : matrix[0].length - x - 1
                    ] = '#';
                    matrix[y][x] = '.';
                }
            }
        }
    }
};

export const findNumDots = (
    points: string[][],
    folds: string[][],
    matrixSize: number = 1500
) => {
    const matrix: string[][] = new Array<string[]>(matrixSize);

    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = new Array<string>(matrixSize).fill('.');
    }

    console.log(points);

    for (const point of points) {
        matrix[point[1]][point[0]] = '#';
    }

    console.table(matrix);

    // new y position is fold - (currY - fold) + 1 -> 2*fold - currY + 1
    // new x position is matrix[0].length - currX
    for (const [axis, point] of folds) {
        foldMatrix(axis, Number(point), matrix);
        console.log(matrix)
    }

    let count = 0;

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[0].length; x++) {
            if (matrix[y][x] === "#") {
                count++;
            }
        }
    }

    return count;
};

console.log(
    findNumDots(
        processPointData(examplePoints),
        processFoldData(exampleFolds),
        15
    )
);
