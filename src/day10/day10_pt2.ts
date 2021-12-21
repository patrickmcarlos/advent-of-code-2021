import { input, example } from './data';

const processData = (str: string) => {
    return str.split('\n').map((row) => row.split(''));
};

const bracketComplementMap = {
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
            const bracket = row[i];

            switch (bracket) {
                case '[':
                case '(':
                case '{':
                case '<':
                    stack.push(bracket);
                    break;
                default:
                    let peek = stack[stack.length - 1];
                    let complement = bracketComplementMap[peek];

                    if (bracket === complement) {
                        stack.pop();
                    } else {
                        while (
                            bracketComplementMap[stack[stack.length - 1]] !==
                                bracket &&
                            stack.length > 0
                        ) {
                            bracketsToAdd.push(complement);
                            stack.pop();
                        }

                        stack.pop();
                    }

                    break;
            }
        }

        while (stack.length) {
            bracketsToAdd.push(bracketComplementMap[stack.pop()]);
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

console.log(findMiddleCompletionScore(processData(input)));
