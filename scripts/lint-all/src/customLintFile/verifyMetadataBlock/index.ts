import { Verifier } from '../../types';
import { makeDirectivesObj } from './makeDirectivesObj';

const directiveNamesWithExactlyOneLine = [
    'name',
    'namespace',
    'version',
];

// tslint:disable-next-line: cyclomatic-complexity
export const verifyMetadataBlock: Verifier = ({ text, logError }) => {
    const metadataBlockMatch = text.match(/\/\/ ==UserScript==[\r\n]+(.*?)[\r\n]+\/\/ ==\/UserScript==/s);
    if (!metadataBlockMatch) {
        return;
    }
    const metadataBlock = metadataBlockMatch[1];
    const directivesObj = makeDirectivesObj(metadataBlock, logError);
    if (!directivesObj) {
        return;
    }
    const missingDirectiveName = directiveNamesWithExactlyOneLine.find(
        directiveName => !directivesObj[directiveName],
    );
    if (missingDirectiveName) {
        logError(`Missing directive line for ${missingDirectiveName}`);
        return;
    }
    const duplicateDirectiveName = directiveNamesWithExactlyOneLine.find(
        directiveName => directivesObj[directiveName] && directivesObj[directiveName].length > 1,
    );
    if (duplicateDirectiveName) {
        logError(`Only one directive line permitted for ${duplicateDirectiveName}`);
    }
    if (!/^(?!0)\d+\.\d+\.\d+$/.test(directivesObj.version[0])) {
        logError('Bad version string', directivesObj.version[0]);
    }
    for (const requireContent of directivesObj.require || []) {
        if (requireContent.startsWith('file')) {
            continue;
        }
        if (!requireContent.includes('#sha256')) {
            logError('A #sha256 hash is required to verify required resource integrity', requireContent);
        }
    }
    if (!directivesObj.grant[0]) {
        logError('@grant required, otherwise Tampermonkey will have to guess');
    }
    if (directivesObj.namespace[0] !== 'https://github.com/CertainPerformance/Stack-Exchange-Userscripts') {
        logError('@namespace must be https://github.com/CertainPerformance/Stack-Exchange-Userscripts');
    }
    for (const includeContent of directivesObj.include) {
        if (!includeContent.startsWith('/^') || !includeContent.endsWith('/')) {
            logError('@include must start with /^ and end with /', includeContent);
            continue;
        }
        const unnecessarilyEscapedForwardSlashMatch = includeContent.match(/^\/\^(?:\\.|.)*?\\\//);
        if (unnecessarilyEscapedForwardSlashMatch) {
            logError('Unnecessarily escaped forward slash in @include', unnecessarilyEscapedForwardSlashMatch[0]);
            continue;
        }
        try {
            const patternContent = includeContent.slice(1, includeContent.length - 1);
            // tslint:disable-next-line: no-unused-expression
            new RegExp(patternContent);
        } catch (e) {
            logError('Invalid regular expression in @include', includeContent);
        }
    }

    if (directivesObj['run-at']) {
        if (directivesObj['run-at'].length !== 1) {
            logError('Only one directive line permitted for run-at');
        } else if (directivesObj['run-at'][0] === 'document-start' && !text.includes('Inject Mode') && !text.includes('Stack Sidebar Question Stats')) {
            // If document-start is being used, make sure user configures their TM to inject the script instantly, else it may be injected too late
            // Exception: Sidebar Question Stats uses document-start only because it has to run before Roomba Forecaster, which also uses document-start
            logError('document-start found, but no explanation (that instant script injection is required) was found - make sure to mention Inject Mode: Instant');
        }
    }
};
