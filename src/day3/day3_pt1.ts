import input from './data';

// https://adventofcode.com/2021/day/3
const getPowerConsumption = (input: string[]) => {
    let gamma = '', epsilon = '';
    let numDigits = input[0].length;

    for (let i = 0; i < numDigits; i++) {
        let ones = 0;
        let zeros = 0;

        for (const numStr of input) {
            const val = numStr.charAt(i);
            val === '1' ? ones++ : zeros++;
        }

        if (ones > zeros) {
            gamma += '1';
            epsilon += '0';
        } else {
            gamma += '0';
            epsilon += '1';
        }
    }

    const product = parseInt(gamma, 2) * parseInt(epsilon, 2);

    return product;
};

console.log(getPowerConsumption(input));
