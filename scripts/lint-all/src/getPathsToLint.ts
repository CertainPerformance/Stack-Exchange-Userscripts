// tslint:disable: no-console
import fs from 'fs';
import { resolve as pathResolve } from 'path';

const excludeDirectories = new Set(['node_modules', '.git']);

// If readDirectoryRecursive could ever be externally called more than once (which isn't possible currently),
// having pathsToReturn in persistent module scope would be a problem
const pathsToReturn = {
    javascriptPathsToESLint: [] as Array<string>,
    packageJSONDirectoriesToTSLint: [] as Array<string>,
    pathsToCustomLint: [] as Array<string>,
};

const readDirectoryRecursive = async (path: string) => {
    for (const dirOrFolderName of await fs.promises.readdir(path)) {
        if (excludeDirectories.has(dirOrFolderName)) {
            continue;
        }
        const combinedPath = `${path}/${dirOrFolderName}`;
        const stats = await fs.promises.stat(combinedPath);
        if (stats.isDirectory()) {
            await readDirectoryRecursive(combinedPath);
            continue;
        }
        // Not a directory, so:
        pathsToReturn.pathsToCustomLint.push(combinedPath);
        if (!path.includes('/templates/') && dirOrFolderName === 'package.json') {
            if (!fs.existsSync(`${path}/node_modules`)) {
                console.warn(`Skipping tslint, no node_modules found for ${path}`);
            } else {
                pathsToReturn.packageJSONDirectoriesToTSLint.push(path);
            }
        }
        if (!dirOrFolderName.endsWith('.js')) {
            continue;
        }
        if (!dirOrFolderName.match(/^Stack.*\.user\.js$/) || (
            fs.existsSync(`${path}/README.md`) &&
            !fs.existsSync(`${path}/src`)
        )) {
            // Then this is a .user.js for distribution which was not created from Typescript,
            // or it is a .js which is not a .user.js
            pathsToReturn.javascriptPathsToESLint.push(combinedPath);
        }
    }
    return pathsToReturn;
};
const rootDirectoryPath = pathResolve(`${__dirname}/../../../`);
export const getPathsToLint = () => readDirectoryRecursive(rootDirectoryPath);
