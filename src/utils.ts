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