/**
 * If difference between timestamp and now is more than 2 days, return "mon #" (eg "Jan 1").
 * Otherwise, return one of: "#d", "#h", "#m", "#s", or "now".
 * This aims to imitate the date string displayed in the comment table by default.
 * @param timestamp A timestamp ultimately taken from SE's HTML - this can be relied on to be accurate
 */
export const timestampToTimeAgoStr = (timestamp: number) => {
    /* The user's machine's time (returned by Date.now()) may not be accurate
     * This is a problem, because the relative time ago given in each TR log (eg, "3m ago") must be accurate to be meaningful
     * SE handles this general issue by sending a serverTimeOffsetSec number with every page response
     * Use that information here to get an accurate secsDiff:
     */
    const secsDiff = window.StackExchange.options.serverTimeOffsetSec + ((Date.now() - timestamp) / 1000);
    const dayDiff = Math.floor(secsDiff / 86400);
    if (secsDiff < 2) {
        return 'now';
    }
    if (secsDiff < 60) {
        return `${Math.floor(secsDiff)}s`;
    }
    if (secsDiff < 3600) {
        return `${Math.floor(secsDiff / 60)}m`;
    }
    if (dayDiff === 0) {
        return `${Math.floor(secsDiff / 3600)}h`;
    }
    if (dayDiff <= 2) {
        return `${dayDiff}d`;
    }
    // So dayDiff > 2
    const date = new Date(timestamp);
    return `${date.toLocaleString(undefined, { month: 'short' })} ${date.getUTCDate()}`;
};
