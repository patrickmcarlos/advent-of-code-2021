import { rawInput, numbersDrawn } from './data';
import {
    strTo3dMatrixHelper,
    updateBoard,
    verifyBoard,
    findSumOfUnmarkedNumbers,
} from '../utils';

const processedBoards = strTo3dMatrixHelper(rawInput);
const processedNumbersDrawn = numbersDrawn.split(',').map(str => Number(str));

const findBingoFinalScore = (boards: number[][][], numbers: number[]) => {
    for (let num of numbers) {
        for (let board of boards) {
            updateBoard(board, num);
            const isWinner = verifyBoard(board);

            if (isWinner) {
                return findSumOfUnmarkedNumbers(board) * num;
            }
        }
    }

    return 0;
};

console.log(findBingoFinalScore(processedBoards, processedNumbersDrawn));
