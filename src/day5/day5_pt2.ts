import { input } from './data';
import {
    updateMatrixDiagonally,
    updateMatrixHorizontally,
    updateMatrixVertically,
} from './utils';

const processedInput: [[number, number], [number, number]][] = input.map(
    (rowStr) => {
        const [ptAStr, ptBStr] = rowStr.split(' -> ');
        const [ptAStrTuple, ptBStrTuple] = [
            ptAStr.split(','),
            ptBStr.split(','),
        ];
        const ptANumTuple = ptAStrTuple.map((str) => Number(str));
        const ptBNumTuple = ptBStrTuple.map((str) => Number(str));

        return [
            [ptANumTuple[0], ptANumTuple[1]],
            [ptBNumTuple[0], ptBNumTuple[1]],
        ];
    }
);

// Assume the dimension of the matrix is 1000x1000 units.
const findNumOfOverlappingPts = (
    input: [[number, number], [number, number]][]
): number => {
    const matrix: number[][] = new Array(1000);
    let count = 0;

    for (let i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(1000).fill(0);
    }

    for (const tuples of input) {
        const [firstX, firstY] = tuples[0];
        const [secondX, secondY] = tuples[1];

        if (firstX === secondX && firstY === secondY) {
            matrix[firstX][firstY] = matrix[firstX][firstY] + 1;
        } else if (firstX === secondX) {
            updateMatrixHorizontally(firstX, firstY, secondY, matrix);
        } else if (firstY === secondY) {
            updateMatrixVertically(firstY, firstX, secondX, matrix);
        } else {
            updateMatrixDiagonally(firstX, firstY, secondX, secondY, matrix);
        }
    }

    for (const row of matrix) {
        for (const element of row) {
            if (element >= 2) {
                count++;
            }
        }
    }

    return count;
};

console.log(findNumOfOverlappingPts(processedInput));
