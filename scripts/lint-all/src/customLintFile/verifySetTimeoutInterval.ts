import { Verifier } from '../types';

// Require that all references to setTimeout, clearInterval, etc are prefixed with window
// to avoid an unusual bug in a few versions of Chrome: https://stackoverflow.com/q/55329629
export const verifySetTimeoutInterval: Verifier = ({ text, path, logError }) => {
    // Only verify TS and JS files which are outside of lint-all:
    if (!/\.[tj]s$/.test(path) || path.includes('scripts/lint-all/')) {
        return;
    }
    const lineMatches = text.match(/.*(?<!window\.)\b(?:setInterval|clearInterval|setTimeout|clearTimeout).*/g) || [];
    // localForage 1.7.3 in Comment History Checker includes a setTimeout,
    // but it's in a block that won't be executed if the user has window.MutationObserver,
    // which all supported browsers have
    const throwingMatches = lineMatches.filter(match => !match.includes('local_forage'));
    for (const match of throwingMatches) {
        logError('Explicitly referencing window before setTimeout and similar is required, see https://stackoverflow.com/q/55329629', match.trim());
    }
};
