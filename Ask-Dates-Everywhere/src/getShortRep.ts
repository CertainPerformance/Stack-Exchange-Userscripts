import { addThousandsSeparators } from './addThousandsSeparators';

/**
 * Turn reputation number into a short, pretty string. Eg:
 * 900 -> 900
 * 1111 -> 1,111
 * 9999 -> 9,999
 * 10000 -> 10k
 * 11111 -> 11k
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
    const thousands = Math.round(reputation / 1000);
    return `${thousands}k`;
};
