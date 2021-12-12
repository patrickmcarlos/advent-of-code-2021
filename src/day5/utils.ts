export const updateArrHorizontally = (
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

export const updateArrVertically = (
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
