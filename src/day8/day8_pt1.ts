import { input } from './data';

const processData = (input: string) => {
    return input.split('\n');
};

const parseEntry = (str: string): [string, string] => {
    const arr = str.split(' | ');

    return [arr[0], arr[1]];
};

const findInstancesOfDigits = (arr: string[]) => {
    let count = 0;

    for (const entry of arr) {
        const [signalPatterns, outputValues] = parseEntry(entry);

        for (const outputValue of outputValues.split(' ')) {
            switch (outputValue.length) {
                case 2:
                case 3:
                case 4:
                case 7:
                    count++;
                    break;
            }
        }
    }

    return count;
};

const processedData = processData(input);
console.log(processedData);
console.log(findInstancesOfDigits(processedData));
