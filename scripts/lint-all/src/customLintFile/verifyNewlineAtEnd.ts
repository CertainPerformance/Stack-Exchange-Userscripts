import { Verifier } from '../types';
export const verifyNewlineAtEnd: Verifier = ({ text, path, logError }) => {
    // Test all files except those which are Webpack bundles:
    if (path.endsWith('.user.js') && (path.includes('/dist/') || path.includes('LiveDev'))) {
        return;
    }
    if (text[text.length - 1] !== '\n') {
        logError('No newline found at end');
    }
};
