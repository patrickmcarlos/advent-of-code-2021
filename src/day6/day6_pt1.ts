import { input } from './data';

// https://adventofcode.com/2021/day/6
export const countOfLanternfishAfterNDays = (input: string, days: number) => {
    let processedData = input.split(',').map(str => Number(str));

    let currDay = 1;

    while (currDay <= days) {
        let numNewFish = 0;

        processedData = processedData.map((fish) => {
            if (fish === 0) {
                numNewFish++;
                return 6;
            } else {
                return fish - 1;
            }
        });

        for (let i = 0; i < numNewFish; i++) {
            processedData.push(8);
        }

        currDay++;
    }

    return processedData.length;
};

console.log(countOfLanternfishAfterNDays(input, 80));
