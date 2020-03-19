import { addThousandsSeparators } from './addThousandsSeparators';
import { getShortRep } from './getShortRep';
import { prettyAbsoluteDate } from './prettyAbsoluteDate';

const makeRegisteredUserHTML = (owner: ApiQuestion['owner']) => `
    <a href="/users/${owner.user_id}">${owner.display_name /* Yes, these are already HTML-escaped */}</a>${
    owner.user_type === 'moderator' ? '<span class="mod-flair" title="moderator">♦</span>' : ''}
    <span class="reputation-score" title="reputation score ${addThousandsSeparators(owner.reputation)}" dir="ltr">${getShortRep(owner.reputation)}</span>
`;

export const makeStartedHTMLForMiniList = ({ owner, creation_date, question_id }: ApiQuestion) => {
    // Create a string like "2019-12-24 01:25:57Z"
    const dateTitle = new Date(creation_date * 1000).toISOString().replace('T', ' ').replace(/\.\d\d\dZ/g, 'Z');
    return `
        <div class="started" style="clear: right">
            <a href="/questions/${question_id}" class="started-link">
                asked
                <span
                    title="${dateTitle}"
                    class="relativetime"
                >${prettyAbsoluteDate(dateTitle) /* Newer dates will be immediately replaced by updateRelativeDates */}</span>
            </a>
            ${owner.user_id ? makeRegisteredUserHTML(owner) : ''}
        </div>
    `;
};
