import input from './data';

const getLifeSupportRating = (input: string[]) => {
    let oxygenArr = [...input];
    let co2Arr = [...input];
    let numDigits = input[0].length;

    for (let i = 0; i < numDigits; i++) {
        let oxygenOnes = 0;
        let oxygenZeros = 0;

        let co2Ones = 0;
        let co2Zeros = 0;

        for (const numStr of oxygenArr) {
            const val = numStr.charAt(i);

            if (val === '1') {
                oxygenOnes++;
            } else {
                oxygenZeros++;
            }
        }

        for (const numStr of co2Arr) {
            const val = numStr.charAt(i);

            if (val === '1') {
                co2Ones++;
            } else {
                co2Zeros++;
            }
        }

        if (oxygenArr.length > 1) {
            let filteredOxygenArr = oxygenArr.filter(
                (str) =>
                    str.charAt(i) === (oxygenOnes >= oxygenZeros ? '1' : '0')
            );
            oxygenArr = filteredOxygenArr.length
                ? filteredOxygenArr
                : [oxygenArr.pop()];
        }

        if (co2Arr.length > 1) {
            let filteredCo2Arr = co2Arr.filter(
                (str) => str.charAt(i) === (co2Ones >= co2Zeros ? '0' : '1')
            );
            co2Arr = filteredCo2Arr.length ? filteredCo2Arr : [co2Arr.pop()];
        }

        if (co2Arr.length === 1 && oxygenArr.length === 1) {
            break;
        }
    }

    const product = parseInt(oxygenArr[0], 2) * parseInt(co2Arr[0], 2);

    return product;
};

console.log(getLifeSupportRating(input));
