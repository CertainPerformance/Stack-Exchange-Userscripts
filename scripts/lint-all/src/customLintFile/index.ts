import fs from 'fs';
import { LogError } from '../types';
import { verifyMetadataBlock } from './verifyMetadataBlock';
import { verifyNewlineAtEnd } from './verifyNewlineAtEnd';
import { verifyNoObjectSpread } from './verifyNoObjectSpread';
import { verifySetTimeoutInterval } from './verifySetTimeoutInterval';

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
    if (path.endsWith('.png') || path.endsWith('.gif')) {
        return;
    }
    const text = await fs.promises.readFile(path, 'utf-8');
    const logError = makeLogError(path);
    for (const verifier of verifiers) {
        verifier({ text, path, logError });
    }
};
