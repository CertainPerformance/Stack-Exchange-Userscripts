import { Verifier } from '../types';

// Because ES2018 is too new IMO
// True AST parsing would be much more elegant

export const verifyNoObjectSpread: Verifier = ({ text, logError }) => {
    // Also excludes object rest syntax
    if (!/\.[tj]s$/.test(text)) {
        return;
    }
    // Not perfectly accurate due to functions in objects, but probably good enough:
    const match = text.match(/{[^{}]*\S\.{3}|\.{3}[^}]*}/);
    if (match) {
        logError(`Object spread not allowed (yet): ${match[0]}`);
    }
};
