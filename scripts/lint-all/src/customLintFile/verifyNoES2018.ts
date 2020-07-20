import { Verifier } from '../types';
// must use require, it seems - using import syntax results in undefined
// tslint:disable-next-line: no-require-imports
import acorn = require('acorn');

export const verifyNoES2018: Verifier = ({ path, text, logError }) => {
    // Only test possibly transpiled JS. Anything other than a userscript for dist can be in modern syntax.
    if (!/\.user\.js$/.test(path)) {
        return;
    }
    try {
        acorn.parse(text, { ecmaVersion: 2017 });
    } catch (err) {
        logError(`Could not parse in ES2017: ${err}`);
    }
};
