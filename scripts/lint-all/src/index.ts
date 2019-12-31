import { exec } from 'child_process';
import { promisify } from 'util';
import { customLintFile } from './customLintFile';
import { getPathsToLint } from './getPathsToLint';
import { MakeLogError } from './types';

let anyErrors = false;

const execProm = promisify(exec);
const execPromAndLogStdOut = async (...args: Parameters<typeof execProm>) => {
    try {
        await execProm(...args);
    } catch (e) {
        console.log((e as { stdout: string }).stdout);
        anyErrors = true;
    }
};

const makeLogError: MakeLogError = path => (message, line) => {
    anyErrors = true;
    console.error(path);
    if (line) {
        console.error(`    ${line}`);
    }
    console.error(`    ${message}`);
};

(async () => {
    const { javascriptPathsToESLint, packageJSONDirectoriesToTSLint, pathsToCustomLint } = await getPathsToLint();
    for (const pathToCustomLint of pathsToCustomLint) {
        await customLintFile(pathToCustomLint, makeLogError);
    }
    for (const directory of packageJSONDirectoriesToTSLint) {
        await execPromAndLogStdOut('npm run lint', { cwd: directory });
        console.log(`tslinted ${directory}`);
    }
    for (const javascriptFilePath of javascriptPathsToESLint) {
        await execPromAndLogStdOut(`npx eslint ${javascriptFilePath} -c ./.eslintrc`);
        console.log(`eslinted ${javascriptFilePath}`);
    }
    if (!anyErrors) {
        console.log('Lint-free!');
    }
})()
    .catch((err) => {
        console.error('Error processing files:');
        console.error(err);
    });
