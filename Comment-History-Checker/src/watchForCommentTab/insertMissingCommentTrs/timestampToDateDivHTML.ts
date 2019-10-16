import { timestampToTimeAgoStr } from './timestampToTimeAgoStr';

export const timestampToDateDivHTML = (timestamp: number) => {
    const dateTitleAttr = new Date(timestamp).toISOString()
        .replace('T', ' ')
        .replace('.000', '');
    const timeAgoStr = timestampToTimeAgoStr(timestamp);
    if (/^\d/.test(timeAgoStr)) {
        return `<div class="date" title="${dateTitleAttr}">${timeAgoStr}</div>`;
    }
    // This doesn't take into account years, but that's OK
    const [month, day] = timeAgoStr.split(' ');
    return `
    <div class="date">
      <div class="date_brick" title="${dateTitleAttr}">${month}<br>${day}</div>
    </div>
    `;
};
