import { addThousandsSeparators } from './addThousandsSeparators';

/**
 * Turn reputation number into a short, pretty string. Eg:
 * 900 -> 900
 * 1111 -> 1,111
 * 9999 -> 9,999
 * 10_000 -> 10k
 * 10_100 -> 10.1k
 * 99_900 -> 99.9k
 * 100_100 -> 100k
 * 234_567 -> 235k
 * 1_000_000 -> 1000k
 */
export const getShortRep = (reputation: number) => {
    if (reputation < 1000) {
        return String(reputation);
    }
    if (reputation < 10_000) {
        return addThousandsSeparators(reputation);
    }
    if (reputation < 100_000) {
        const hundreds = Math.round(reputation / 100);
        return hundreds % 10 === 0
            ? `${hundreds / 10}k`
            : String(hundreds).replace(/.$/, '.$&') + 'k';
    }
    const thousands = Math.round(reputation / 1000);
    return `${thousands}k`;
};
