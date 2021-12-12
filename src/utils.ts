export const strTo3dMatrixHelper = (str: string): number[][][] => {
    const res: number[][][] = [];
    let matrixAcc: number[][] = [];
    let rowAcc: number[] = [];
    const splitStr = str.split('\n');

    for (let row of splitStr) {
        if (row.length) {
            row.split(' ').forEach((numStr) => {
                if (numStr !== ' ' && numStr.length) {
                    rowAcc.push(Number(numStr));
                }
            });

            matrixAcc.push(rowAcc);
            rowAcc = [];
        } else {
            res.push(matrixAcc);
            matrixAcc = [];
        }
    }

    return res;
};

// Marked numbers are denoted by -1 on the board.
export const verifyBingo = (board: number[][]): boolean => {
    // The board will typically be a square.
    const height = board.length;
    const width = board[0].length;

    // Find horizontal wins (rows)
    for (let x = 0; x < height; x++) {
        const row = board[x];
        const isWinner = !row.some((val) => val !== -1);

        if (isWinner) {
            return true;
        }
    }

    // Find vertical wins (columns)
    for (let y = 0; y < width; y++) {
        let isWinner = true;

        for (let x = 0; x < height; x++) {
            const val = board[x][y];

            if (val !== -1) {
                isWinner = false;
                break;
            }
        }

        if (isWinner) {
            return true;
        }
    }

    let isWinner = true;
    // Find diagonals (top left to bottom right)
    for (let x = 0, y = 0; x < height && y < width; x++, y++) {
        if (board[x][y] !== -1) {
            isWinner = false;
            break;
        }
    }

    if (isWinner) {
        return true;
    }

    isWinner = true;
    // Find diagonals (bottom left to top right)
    for (let x = height - 1, y = 0; x >= 0 && y < width; x--, y++) {
        if (board[x][y] !== -1) {
            isWinner = false;
            break;
        }
    }

    return isWinner;
};

export const updateBoard = (board: number[][], numberCalled: number): void => {
    for (let row of board) {
        for (let i = 0; i < row.length; i++) {
            if (row[i] === numberCalled) {
                row[i] = -1;
            }
        }
    }
};
