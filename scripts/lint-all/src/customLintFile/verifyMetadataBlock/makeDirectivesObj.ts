import { LogError } from '../../types';

// Directives, when present, should be in THIS order:
const directiveNameOrder = [
    'name',
    'description',
    'author',
    'namespace',
    'version',
    'include',
    'require',
    'run-at',
    'grant',
    'connect',
];
// No other directives allowed.
// Don't use @match - use @include for regular expression support

export const makeDirectivesObj = (metadataBlock: string, logError: LogError) => {
    const lines = metadataBlock.split(/[\r\n]+/);
    let directiveIndex = 0;
    const directivesObj: { [directiveName: string]: Array<string> } = {};
    for (const line of lines) {
        const directiveMatch = line.match(/^\/\/ @(\S+)( +)(\S.*)/);
        if (!directiveMatch) {
            logError('Directive line not formatted properly', line);
            return;
        }
        const [, directiveName, spaces, directiveContent] = directiveMatch;
        if (directiveName.length + spaces.length !== 17) {
            logError('Spaces between directive name and content incorrect', line);
        }
        if (!directiveNameOrder.includes(directiveName)) {
            logError('Unpermitted directive found', line);
            return;
        }
        while (directiveNameOrder[directiveIndex] !== directiveName && directiveNameOrder[directiveIndex]) {
            directiveIndex += 1;
        }
        if (directiveIndex >= directiveNameOrder.length) {
            logError(`Directive ${directiveName} not in proper order (Must be: ${directiveNameOrder.join(' ')})`, line);
            return;
        }
        if (!directivesObj[directiveName]) {
            directivesObj[directiveName] = [directiveContent];
        } else {
            directivesObj[directiveName].push(directiveContent);
        }
    }
    return directivesObj;
};
