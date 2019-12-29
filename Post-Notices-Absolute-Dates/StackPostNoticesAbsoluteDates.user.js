// ==UserScript==
// @name             Stack Post Notices Absolute Dates
// @description      Replaces the relative dates of post notices with absolute dates
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.0.0
// @include          /^https://(?:[^/]+\.)?(?:(?:stackoverflow|serverfault|superuser|stackexchange|askubuntu|stackapps)\.com|mathoverflow\.net)/(?:questions/\d|review)/
// @grant            none
// ==/UserScript==

const shortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/**
 * Transform an almost-ISO date string, eg
 * 2017-12-24 01:25:57Z
 * into
 * Dec 24 '17 at 1:25
 * If the current year is the same as the one in the date, the returned string will not contain the year portion
 * eg `Jan 1 at 15:30`
 */
const prettyAbsoluteDate = (dateTitle) => {
    const timeAgoSecs = (((new Date()).getTime() - new Date(dateTitle).getTime()) / 1000) + window.StackExchange.options.serverTimeOffsetSec;
    if (timeAgoSecs < (60 * 60 * 24 * 2)) {
        // Less than 2 days old; preserve the "X hours ago" or "yesterday"
        return;
    }
    const [year, month, day, hours, minutes] = dateTitle.match(/\d+/g);
    const thisYear = String(new Date().getUTCFullYear());
    return `${shortMonthNames[Number(month) - 1]} ${Number(day)} ${year === thisYear ? '' : `'${String(year).slice(2)} `}at ${hours}:${minutes.padStart(2, '0')}`;
};

const fixedNotices = new Set();
const fixNotices = () => {
    document.querySelectorAll('.js-post-notice').forEach((notice) => {
        if (fixedNotices.has(notice)) {
            return;
        }
        fixedNotices.add(notice);
        const closeRelativeTimeSpan = notice.querySelector('.relativetime');
        if (!closeRelativeTimeSpan) {
            // Not sure when a post notice wouldn't have a date, but just in case
            return;
        }
        const absoluteDateString = prettyAbsoluteDate(closeRelativeTimeSpan.title);
        if (absoluteDateString) {
            closeRelativeTimeSpan.textContent = absoluteDateString;
        }
    });
};
fixNotices();
// For new review tasks
window.$(document).on('ajaxComplete', fixNotices);
