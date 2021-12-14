// https://adventofcode.com/2021/day/7
import { input } from './data';

const processedData = input.split(',').map((str) => Number(str));

const calculateFuelRequired = (num: number) => {
    return (num * (num + 1)) / 2;
};

const findFuelRequired = (arr: number[]) => {
    const mean = Math.round(arr.reduce((a,b) => a + b) / arr.length);

    let count = 0;

    arr.forEach((num) => {
        count += calculateFuelRequired(Math.abs(mean - num));
    });

    return count;
};

// Returns 94004217 which is wrong?
console.log(findFuelRequired(processedData));