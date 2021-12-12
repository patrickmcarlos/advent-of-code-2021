import input from './data';

const getPowerConsumption = (input: string[]) => {
    let gamma = "";
    let epsilon = "";
    let numDigits = input[0].length;

    for (let i = 0; i < numDigits; i++) {
        let ones = 0;
        let zeros = 0;

        for (const numStr of input) {
            const val = numStr.charAt(i);

            if (val === "1") {
                ones++;
            } else {
                zeros++;
            }
        }

        if (ones > zeros) {
            gamma += "1";
            epsilon += "0";
        } else {
            gamma += "0";
            epsilon += "1";
        }
    }

    const product = parseInt(gamma, 2) * parseInt(epsilon, 2);

    return product;
}

console.log(getPowerConsumption(input));