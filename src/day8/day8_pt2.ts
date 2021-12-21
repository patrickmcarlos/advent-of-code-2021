import { input } from './data';

const processData = (input: string) => {
    return input.split('\n');
};

const parseEntry = (str: string): [string[], string[]] => {
    const arr = str.split(' | ');

    return [arr[0].split(' '), arr[1].split(' ')];
};

const one = [3, 6];
const two = [1, 3, 4, 5, 7];
const three = [1, 3, 4, 6, 7];
const four = [2, 3, 4, 6];
const five = [1, 2, 4, 6, 7];
const six = [1, 2, 4, 5, 6, 7];
const seven = [1, 3, 6];
const eight = [1, 2, 3, 4, 5, 6, 7];
const nine = [1, 2, 3, 4, 6, 7];
const zero = [1, 2, 3, 5, 6, 7];

const getSortedSegmentNums = (
    segmentStr: string,
    map: Map<number, string | undefined>
) => {
    let newArr: number[] = [];

    for (let i = 0; i < segmentStr.length; i++) {
        newArr.push(findNumberFromChar(segmentStr.charAt(i), map));
    }

    return newArr.sort((a, b) => a - b);
};

const verifyTwoOrFive = (
    segmentStr: string,
    map: Map<number, string | undefined>
) => {
    const segNums = getSortedSegmentNums(segmentStr, map);

    const isTwo = !segNums.some((num, idx) => num !== two[idx]);
    const isFive = !segNums.some((num, idx) => num !== five[idx]);

    return isTwo || isFive;
};

const findNumberFromChar = (
    char: string,
    map: Map<number, string | undefined>
) => {
    const mapArr = [...map];

    for (let i = 0; i < map.size; i++) {
        const [key, value] = mapArr[i];
        if (value === char) {
            return key;
        }
    }

    return 0;
};

// steps in determining the map
// 1. Find our str of length 2 (1 digit) to find 3 & 6
// 2. find our str of length 3 (7 digit) to find 1
// 3. find out str of length 4 (4 digit) to find 2 & 4 (this could be mixed up)
// 4. Identify numbers 2 and 5 and use those to verify the segments.
// 5. Iterate through every output, convert them to a number, and sum them.
const buildMap = (signalPatterns: string[]) => {
    const map = new Map<number, string | undefined>();
    map.set(1, undefined);
    map.set(2, undefined);
    map.set(3, undefined);
    map.set(4, undefined);
    map.set(5, undefined);
    map.set(6, undefined);
    map.set(7, undefined);

    const oneStr = signalPatterns.find((sp) => sp.length === 2);
    map.set(3, oneStr.charAt(0));
    map.set(6, oneStr.charAt(1));

    const sevenStr = signalPatterns.find((sp) => sp.length === 3);

    for (let i = 0; i < sevenStr.length; i++) {
        const num = findNumberFromChar(sevenStr.charAt(i), map);
        if (num === 0) {
            map.set(1, sevenStr.charAt(i));
            break;
        }
    }

    const fourStr = signalPatterns.find((sp) => sp.length === 4);
    const fourUniques = fourStr.replace(map.get(3), '').replace(map.get(6), '');
    map.set(2, fourUniques.charAt(0));
    map.set(4, fourUniques.charAt(1));

    // now try to find 0, which is length of 6. candidates are 0 6 or 9
    const zeroStr =
        signalPatterns.find(
            (sp) => sp.length === 6 && !sp.includes(map.get(4))
        ) ??
        signalPatterns.find(
            (sp) => sp.length === 6 && !sp.includes(map.get(2))
        );

    const zeroUniques = zeroStr
        .replace(map.get(1), '')
        .replace(map.get(2), '')
        .replace(map.get(3), '')
        .replace(map.get(4), '')
        .replace(map.get(6), '');

    map.set(5, zeroUniques.charAt(0));
    map.set(7, zeroUniques.charAt(1));

    // now get 2 or 5 to verify map
    const [candidateOne, candidateTwo] = signalPatterns.filter(
        (sp) =>
            sp.length === 5 &&
            !(sp.includes(map.get(3)) && sp.includes(map.get(6)))
    );

    // Verify that segments 2 and 4 aren't mixed up
    if (!getSortedSegmentNums(candidateOne, map).includes(4)) {
        const newTwoSeg = map.get(4);
        const newFourSeg = map.get(2);
        map.set(2, newTwoSeg);
        map.set(4, newFourSeg);
    }

    // Verify that segments 5 and 7 aren't mixed up
    if (!getSortedSegmentNums(candidateOne, map).includes(7)) {
        const newFiveSeg = map.get(7);
        const newSevenSeg = map.get(5);
        map.set(5, newFiveSeg);
        map.set(7, newSevenSeg);
    }

    // Verify that segments 3 and 6 aren't mixed up
    if (!verifyTwoOrFive(candidateOne, map)) {
        const newThreeSeg = map.get(6);
        const newSixSeg = map.get(3);
        map.set(3, newThreeSeg);
        map.set(6, newSixSeg);
    }

    return map;
};

const outputToNum = (str: string, map: Map<number, string | undefined>) => {
    const numArr = [zero, one, two, three, four, five, six, seven, eight, nine];
    const sortedSegNums = getSortedSegmentNums(str, map);

    const idx = numArr.findIndex(
        (val) => !sortedSegNums.some((num, idx) => num !== val[idx])
    );

    return idx;
};

// Iterate through the signalPattern array and determine the order of the segments
// [1,2,3,4,5,6,7]
const findInstancesOfDigits = (arr: string[]) => {
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
        const [signalPatterns, outputValues] = parseEntry(arr[i]);
        const map = buildMap(signalPatterns);

        const numToAdd = Number(
            outputValues.map((str) => outputToNum(str, map)).join('')
        );

        count += numToAdd;
    }

    return count;
};

const processedData = processData(input);
console.log(findInstancesOfDigits(processedData));
