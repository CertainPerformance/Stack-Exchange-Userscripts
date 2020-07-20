import { Verifier } from '../types';

export const verifyDollarPrefixedByWindow: Verifier = ({ path, text, logError }) => {
    if (!/\.[tj]s$/.test(path)) {
        return;
    }
    // Not perfect, but good enough
    const textWithoutComments = text
        .replace(/\/\*.*?\*\//gs, '')
        .replace(/\/\/.*/g, '');

    const match = textWithoutComments.match(/[^.]\$\(.*/);
    if (match) {
        logError(`$ found which was not preceeded by window. Always use window.$: ${match[0]}`);
    }
};
