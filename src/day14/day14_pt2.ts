import { input, example } from './data';

type InputData = { polymerTemplate: string; rules: [string, string][] };

const processData = (input: string): InputData => {
    const rows = input.split('\n');
    const polymerTemplate = rows.shift();

    const rules = rows.map((row) => row.split(' -> ') as [string, string]);
    return { polymerTemplate, rules };
};

// We know that the length of the template arr will double.
// As iterating through a large is computationally intensive we need to find some mathematical pattern that allows us to determine
// the least and most frequent elements as we increase the number of steps.
const findDiffInMostAndLeastCommonElements = (
    { polymerTemplate, rules }: InputData,
    numSteps: number = 10
) => {
    const ruleMap = generateRuleMap(rules);
    const templateArr = polymerTemplate.split('');
    let currStep = 0;

    while (currStep < numSteps) {
        let left = 0;
        let right = 1;
        let offset = 0;
        const elementsToInsert: { char: string; idx: number }[] = [];

        while (right < templateArr.length) {
            const charToAdd = ruleMap.get(
                `${templateArr[left]}${templateArr[right]}`
            );

            elementsToInsert.push({ char: charToAdd, idx: right + offset });
            offset++;
            left++;
            right++;
        }

        for (const { idx, char } of elementsToInsert) {
            templateArr.splice(idx, 0, char);
        }

        const { min, max } = findMinMax(templateArr);

        console.log({
            min,
            max,
            length: templateArr.length,
            diff: max - min,
            sum: max + min,
        });

        currStep++;
    }

    const { min, max } = findMinMax(templateArr);

    return max - min;
};

const generateRuleMap = (rules: [string, string][]): Map<string, string> => {
    const map = new Map<string, string>();

    for (const [key, value] of rules) {
        map.set(key, value);
    }

    return map;
};

const findMinMax = (arr: string[]): { min: number; max: number } => {
    const map: { [key: string]: number } = {};

    for (const char of arr) {
        const currVal = map[char] ?? 0;
        map[char] = currVal + 1;
    }

    let rows = Object.entries(map);
    let min = rows[0][1];
    let max = rows[0][1];

    for (const [key, value] of Object.entries(map)) {
        max = Math.max(max, value);
        min = Math.min(min, value);
    }

    return { min, max };
};

const processedData = processData(input);

console.log(findDiffInMostAndLeastCommonElements(processedData, 10));
