import { input, example } from './data';

const processData = (str: string) => {
    return str.split('\n').map((row) => row.split(''));
};

const complementMap = {
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<',
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>',
};

const findMiddleCompletionScore = (arr: string[][]) => {
    let scoreArr = [];

    for (const row of arr) {
        let stack = [];
        let bracketsToAdd = [];

        for (let i = 0; i < row.length; i++) {
            const curr = row[i];

            switch (curr) {
                case '[':
                case '(':
                case '{':
                case '<':
                    stack.push(curr);
                    break;
                default:
                    let complement = complementMap[stack[stack.length - 1]];

                    if (curr === complement) {
                        stack.pop();
                    } else {
                        while (
                            complementMap[stack[stack.length - 1]] !== curr &&
                            stack.length > 0
                        ) {
                            bracketsToAdd.push(complementMap[stack.pop()]);
                        }

                        if (!stack.length) {
                            console.log({ stack, curr, str: row.join('') });
                        }

                        stack.pop();
                    }

                    break;
            }
        }

        while (stack.length) {
            bracketsToAdd.push(complementMap[stack.pop()]);
        }

        let score = 0;

        for (const bracket of bracketsToAdd) {
            score = score * 5;

            switch (bracket) {
                case ')':
                    score += 1;
                    break;
                case ']':
                    score += 2;
                    break;
                case '}':
                    score += 3;
                    break;
                case '>':
                    score += 4;
                    break;
            }
        }

        scoreArr.push(score);
    }

    scoreArr = scoreArr.sort((a, b) => a - b);

    return scoreArr[Math.floor(scoreArr.length / 2)];
};

console.log(findMiddleCompletionScore(processData('[<(<<[(({([[<<[][]><{}()>><{<><>>[<>[]]>]]((<(<>[]){<>{}}>{{()[]}(<>[])})))<((((()[])[()<>])))')));