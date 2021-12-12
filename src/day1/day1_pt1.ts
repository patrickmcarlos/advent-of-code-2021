import input from './data';

/*
As the submarine drops below the surface of the ocean, it automatically performs a sonar sweep of the nearby sea floor. On a small screen, the sonar sweep report (your puzzle input) appears: each line is a measurement of the sea floor depth as the sweep looks further and further away from the submarine.

This report indicates that, scanning outward from the submarine, the sonar sweep found depths of 199, 200, 208, 210, and so on.

The first order of business is to figure out how quickly the depth increases, just so you know what you're dealing with - you never know if the keys will get carried into deeper water by an ocean current or a fish or something.

To do this, count the number of times a depth measurement increases from the previous measurement.
*/

// Since our input data is a string we will need to cast it into an array.
const calculateNumIncreases = (arr: string[]) => {
    let count = 0;
    let currIdx = 0,
        nextIdx = 1;

    while (nextIdx < arr.length) {
        const curr = Number(arr[currIdx]);
        const next = Number(arr[nextIdx]);

        if (next > curr) {
            count++;
        }

        currIdx++;
        nextIdx++;
    }

    return count;
};

// ts-node day1
console.log(calculateNumIncreases(input));
