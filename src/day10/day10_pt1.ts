import { input, example } from './data';

const processData = (str: string) => {
    return str.split('\n');
};

const addToMap = (bracket: string, map: Map<string, number>) => {
    const val = map.get(bracket) ?? 0;
    map.set(bracket, val + 1);
};

const findTotalSyntaxErrorScore = (arr: string[]) => {
    const stack: string[] = [];
    const freq = new Map<string, number>();
    let count = 0;

    for (const str of arr) {
        for (let i = 0; i < str.length; i++) {
            const br = str.charAt(i);
            let shouldBreak = true;

            console.log({ stack, br });

            switch (br) {
                case '{':
                case '[':
                case '(':
                case '<':
                    stack.push(br);
                    shouldBreak = false;
                    break;
                default:
                    const shifted = stack.pop();

                    if (shifted === '{' && br !== '}') {
                        addToMap(br, freq);
                    } else if (shifted === '<' && br !== '>') {
                        addToMap(br, freq);
                    } else if (shifted === '(' && br !== ')') {
                        addToMap(br, freq);
                    } else if (shifted === '[' && br !== ']') {
                        addToMap(br, freq);
                    } else {
                        shouldBreak = false;
                    }

                    break;
            }

            if (shouldBreak) {
                break;
            }
        }
    }

    [...freq].forEach((row) => {
        const [key, value] = row;

        switch (key) {
            case ')':
                count += value * 3;
                break;
            case ']':
                count += value * 57;
                break;
            case '}':
                count += value * 1197;
                break;
            case '>':
                count += value * 25137;
                break;
        }
    });

    return count;
};

console.log(findTotalSyntaxErrorScore(processData(example)));
