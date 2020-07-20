import fs from 'fs';
import { LogError } from '../types';
import { verifyDollarPrefixedByWindow } from './verifyDollarPrefixedByWindow';
import { verifyMetadataBlock } from './verifyMetadataBlock';
import { verifyNewlineAtEnd } from './verifyNewlineAtEnd';
import { verifyNoES2018 } from './verifyNoES2018';
import { verifySetTimeoutInterval } from './verifySetTimeoutInterval';

const verifiers = [
    verifyDollarPrefixedByWindow,
    verifyMetadataBlock,
    verifyNewlineAtEnd,
    verifyNoES2018,
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
