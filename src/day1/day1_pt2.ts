import input from './data';

/*
Instead, consider sums of a three-measurement sliding window.
*/

// Since our input data is a string we will need to cast it into an array.
const getSumWindow = (arr: string[], start: number, end: number) => {
    let sum = 0;

    for (let i = start; i <= end; i++) {
        sum += Number(arr[i]);
    }

    return sum;
};

const calculateNumIncreases = (arr: string[]) => {
    let count = 0;
    let [firstWindowStartIdx, firstWindowEndIdx] = [0, 2];
    let [secondWindowStartIdx, secondWindowEndIdx] = [1, 3];

    while (secondWindowEndIdx < arr.length) {
        const firstWindowSum = getSumWindow(
            arr,
            firstWindowStartIdx,
            firstWindowEndIdx
        );
        const secondWindowSum = getSumWindow(
            arr,
            secondWindowStartIdx,
            secondWindowEndIdx
        );

        if (secondWindowSum > firstWindowSum) {
            count++;
        }

        firstWindowStartIdx++;
        firstWindowEndIdx++;
        secondWindowStartIdx++;
        secondWindowEndIdx++;
    }

    return count;
};

console.log(calculateNumIncreases(input));
