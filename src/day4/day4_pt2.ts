import { rawInput, numbersDrawn } from './data';
import {
    strTo3dMatrixHelper,
    updateBoard,
    verifyBoard,
    findSumOfUnmarkedNumbers,
} from './utils';

const processedBoards = strTo3dMatrixHelper(rawInput);
const processedNumbersDrawn = numbersDrawn.split(',').map(str => Number(str));

// https://adventofcode.com/2021/day/4
const findBingoFinalScore = (boards: number[][][], numbers: number[]) => {
    let numBoardsWon = 0;
    for (let num of numbers) {
        for (let i = 0; i < boards.length; i++) {
            updateBoard(boards[i], num);
            const isWinner = verifyBoard(boards[i]);

            if (isWinner && numBoardsWon < boards.length - 1) {
                boards[i] = [];
                numBoardsWon++;
            } else if (isWinner) {
                return findSumOfUnmarkedNumbers(boards[i]) * num;
            }
        }
    }

    return 0;
};

console.log(findBingoFinalScore(processedBoards, processedNumbersDrawn));
