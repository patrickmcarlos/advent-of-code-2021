import input from './data';

const getProductOfHorizontalAndDepth = (arr: string[]) => {
    let depth = 0, horizontal = 0;

    for (let instruction of arr) {
        const [action, num] = instruction.split(' ');

        switch (action) {
            case 'forward':
                horizontal += Number(num);
                break;
            case 'down':
                depth += Number(num);
                break;
            case 'up':
                depth -= Number(num);
                break;
        }
    }

    return depth * horizontal;
}

console.log(getProductOfHorizontalAndDepth(input));