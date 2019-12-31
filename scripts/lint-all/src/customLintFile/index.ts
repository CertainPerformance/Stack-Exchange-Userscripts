import fs from 'fs';
import { promisify } from 'util';
import { LogError } from '../types';
import { verifyMetadataBlock } from './verifyMetadataBlock';
import { verifyNewlineAtEnd } from './verifyNewlineAtEnd';
import { verifyNoObjectSpread } from './verifyNoObjectSpread';
import { verifySetTimeoutInterval } from './verifySetTimeoutInterval';

const readFileProm = promisify(fs.readFile);
const verifiers = [
    verifyMetadataBlock,
    verifyNewlineAtEnd,
    verifyNoObjectSpread,
    verifySetTimeoutInterval,
];

export const customLintFile = async (
    path: string,
    makeLogError: (path: string) => LogError,
) => {
    if (path.endsWith('.png')) {
        return;
    }
    const text = await readFileProm(path, 'utf-8');
    const logError = makeLogError(path);
    for (const verifier of verifiers) {
        verifier({ text, path, logError });
    }
};
