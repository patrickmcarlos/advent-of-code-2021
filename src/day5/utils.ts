export const updateMatrixHorizontally = (
    row: number,
    colStart: number,
    colEnd: number,
    matrix: number[][]
) => {
    // Should make sure we can handle an init column that is larger than the end column.
    let start = Math.min(colStart, colEnd);
    let end = Math.max(colStart, colEnd);

    for (let i = start; i <= end; i++) {
        matrix[row][i] = matrix[row][i] + 1;
    }
};

export const updateMatrixVertically = (
    col: number,
    rowStart: number,
    rowEnd: number,
    matrix: number[][]
) => {
    // Should make sure we can handle an init row that is larger than the end row.
    let start = Math.min(rowStart, rowEnd);
    let end = Math.max(rowStart, rowEnd);

    for (let i = start; i <= end; i++) {
        matrix[i][col] = matrix[i][col] + 1;
    }
};

export const updateMatrixDiagonally = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    matrix: number[][]
) => {
    if (x1 === x2 && y1 === y2) {
        matrix[x1][y1] += 1;
    } else {
        const xDiff = x1 - x2;
        const yDiff = y1 - y2;
        let currX = x1;
        let currY = y1;

        while (currX !== x2 && currY !== y2) {
            matrix[currX][currY] += 1;

            xDiff > 0 ? currX-- : currX++;
            yDiff > 0 ? currY-- : currY++;
        }

        matrix[x2][y2] += 1;
    }
};
