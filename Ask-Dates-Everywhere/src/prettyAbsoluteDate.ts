const shortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/**
 * Transform an almost-ISO date string, eg
 * 2017-12-24 01:25:57Z
 * into
 * Dec 24 '17 at 1:25
 * If the current year is the same as the one in the date, the returned string will not contain the year portion
 * eg `Jan 1 at 15:30`
 */
export const prettyAbsoluteDate = (dateTitle: string) => {
    const [year, month, day, hours, minutes] = dateTitle.match(/\d+/g)!;
    const thisYear = String(new Date().getUTCFullYear());
    return `${shortMonthNames[Number(month) - 1]} ${Number(day)} ${year === thisYear ? '' : `'${String(year).slice(2)} `}at ${hours}:${minutes.padStart(2, '0')}`;
};
