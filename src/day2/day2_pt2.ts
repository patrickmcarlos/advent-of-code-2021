import input from './data';

// https://adventofcode.com/2021/day/2
const getProductOfHorizontalAndDepth = (arr: string[]) => {
    let depth = 0,
        horizontal = 0,
        aim = 0;

    for (let instruction of arr) {
        const [action, numStr] = instruction.split(' ');
        const num = Number(numStr);

        switch (action) {
            case 'forward':
                horizontal += num;
                depth += aim * num;
                break;
            case 'down':
                aim += num;
                break;
            case 'up':
                aim -= num;
                break;
        }
    }

    return depth * horizontal;
};

console.log(getProductOfHorizontalAndDepth(input));
