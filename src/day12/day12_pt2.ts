import { input, example } from './data';

interface AdjacencyMatrix {
    [key: string]: string[];
}

interface VisitFrequencyMap {
    [key: string]: number;
}

const hasNodeBeenVisitedTwice = (freqMap: VisitFrequencyMap) =>
    Object.values(freqMap).some((val) => val === 2);

const processData = (str: string) =>
    str.split('\n').map((row) => row.split('-'));

const generateAdjacencyMatrix = (arr: string[][]): AdjacencyMatrix => {
    const matrix: AdjacencyMatrix = {};
    for (const row of arr) {
        const [from, to] = row;

        const fromArr = matrix[from] ?? [];
        fromArr.push(to);
        matrix[from] = fromArr;

        const toArr = matrix[to] ?? [];
        toArr.push(from);
        matrix[to] = toArr;
    }

    return matrix;
};

export const findNumPossiblePaths = (input: string[][]) => {
    const adjMatrix = generateAdjacencyMatrix(input);
    const resPaths: string[][] = [];

    const recursiveTravelHelper = (
        paths: string[],
        currPos: string,
        freqMap: VisitFrequencyMap
    ) => {
        if (currPos === 'end') {
            resPaths.push(paths);
            return;
        }

        const availablePaths = adjMatrix[currPos].filter(
            (path) =>
                (freqMap[path] ?? 0) <
                    (hasNodeBeenVisitedTwice(freqMap) ? 1 : 2) &&
                path !== 'start'
        );

        for (const newPath of availablePaths) {
            const newPaths = [...paths];
            const newVisitedNodes = { ...freqMap };

            const isPathLowerCase = newPath === newPath.toLowerCase();

            if (isPathLowerCase) {
                const freq = newVisitedNodes[newPath] ?? 0;
                newVisitedNodes[newPath] = freq + 1;
            }

            newPaths.push(newPath);

            recursiveTravelHelper(newPaths, newPath, newVisitedNodes);
        }
    };

    recursiveTravelHelper(['start'], 'start', {});

    return resPaths.length;
};

console.log(findNumPossiblePaths(processData(input)));
