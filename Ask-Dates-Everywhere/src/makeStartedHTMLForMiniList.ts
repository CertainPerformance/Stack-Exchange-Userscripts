import { addThousandsSeparators } from './addThousandsSeparators';
import { getShortRep } from './getShortRep';
import { prettyAbsoluteDate } from './prettyAbsoluteDate';

export const makeStartedHTMLForMiniList = ({ owner, creation_date, question_id }: ApiQuestion) => {
    const { reputation } = owner;
    const dateTitle = new Date(creation_date * 1000).toISOString().replace('T', ' ').replace(/\.\d\d\dZ/g, 'Z');
    return `
        <div class="started" style="clear: right">
            <a href="/questions/${question_id}" class="started-link">
                asked
                <span
                    title="${ /* 2019-12-24 01:25:57Z */ dateTitle}"
                    class="relativetime"
                >${prettyAbsoluteDate(dateTitle) /* Newer dates will be immediately replaced by updateRelativeDates */}</span>
            </a>
            <a href="/users/${owner.user_id}">${owner.display_name /* Yes, these are already HTML-escaped */}</a>
            <span class="reputation-score" title="reputation score ${addThousandsSeparators(reputation)}" dir="ltr">${getShortRep(reputation)}</span>
        </div>
    `;
};
