import { input } from './data';

// https://adventofcode.com/2021/day/6
// Similar idea to pt1, but we can aggregate all the values together at the beginning to optimize for memory.
export const countOfLanternfishAfterNDays = (input: string, days: number) => {
    let processedData = input.split(',');
    let currDay = 1;

    const lanternFishGroups = new Map<string, number>();

    for (let i = 0; i <= 8; i++) {
        lanternFishGroups.set(`${i}`, 0);
    }

    for (let str of processedData) {
        const freq = lanternFishGroups.get(str) ?? 0;
        lanternFishGroups.set(str, freq + 1);
    }

    while (currDay <= days) {
        let newFish = lanternFishGroups.get('0') ?? 0;

        for (let i = 0; i < 8; i++) {
            const freq = lanternFishGroups.get(`${i + 1}`) ?? 0;
            lanternFishGroups.set(`${i}`, freq);
        }

        lanternFishGroups.set('6', lanternFishGroups.get('6') + newFish);
        lanternFishGroups.set('8', newFish);

        currDay++;
    }

    let count = 0;

    for (let i = 0; i <= 8; i++) {
        count += lanternFishGroups.get(`${i}`) ?? 0;
    }

    return count;
};

console.log(countOfLanternfishAfterNDays(input, 256));