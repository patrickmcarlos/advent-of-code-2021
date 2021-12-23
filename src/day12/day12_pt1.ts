import { input, example } from './data';

interface AdjacencyMatrix {
    [key: string]: string[];
}

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
        visitedNodes: Set<string>
    ) => {
        if (currPos === 'end') {
            resPaths.push(paths);
            return;
        }

        const availablePaths = adjMatrix[currPos].filter(
            (path) => !visitedNodes.has(path)
        );

        for (const newPath of availablePaths) {
            const newPaths = [...paths];
            const newVisitedNodes = new Set<string>([...visitedNodes]);

            if (newPath === 'end') {
                console.log({ paths, path: newPath, newVisitedNodes });
            }

            const isPathLowerCase = newPath === newPath.toLowerCase();

            if (isPathLowerCase) {
                newVisitedNodes.add(newPath);
            }

            newPaths.push(newPath);

            recursiveTravelHelper(newPaths, newPath, newVisitedNodes);
        }
    };

    recursiveTravelHelper(['start'], 'start', new Set<string>(['start']));

    return resPaths.length;
};

console.log(findNumPossiblePaths(processData(input)));
