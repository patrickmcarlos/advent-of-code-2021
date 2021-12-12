import input from './data';

// https://adventofcode.com/2021/day/1
const calculateNumIncreases = (arr: string[]) => {
    let count = 0;
    let currIdx = 0,
        nextIdx = 1;

    while (nextIdx < arr.length) {
        const curr = Number(arr[currIdx]);
        const next = Number(arr[nextIdx]);

        if (next > curr) {
            count++;
        }

        currIdx++;
        nextIdx++;
    }

    return count;
};

// ts-node day1
console.log(calculateNumIncreases(input));
