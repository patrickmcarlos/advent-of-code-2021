// https://adventofcode.com/2021/day/7
import { input } from './data';

const processedData = input.split(',').map((str) => Number(str));

const findFuelRequired = (arr: number[]) => {
    const median = arr.sort((a,b) => a - b)[Math.floor(arr.length/2)];

    let count = 0;

    arr.forEach(num => {
        count += Math.abs(median - num);
    })

    return count;
};

console.log(findFuelRequired(processedData));
