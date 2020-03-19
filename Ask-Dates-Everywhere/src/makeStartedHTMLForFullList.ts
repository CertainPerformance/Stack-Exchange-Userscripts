import { addThousandsSeparators } from './addThousandsSeparators';
import { getShortRep } from './getShortRep';
import { prettyAbsoluteDate } from './prettyAbsoluteDate';

const makeRegisteredUserGravatar = (owner: ApiQuestion['owner']) => `
    <a href="/users/${owner.user_id}">
        <div class="gravatar-wrapper-32">
            <img src="${owner.profile_image}" alt="" width="32" height="32" class="bar-sm">
        </div>
    </a>
`;
const makeRegisteredUserDetails = (owner: ApiQuestion['owner']) => `
    <a href="/users/${owner.user_id}">${owner.display_name}</a>
    ${owner.user_type === 'moderator' ? '<span class="mod-flair" title="moderator">♦</span>' : ''}
    <div class="-flair">
        <span class="reputation-score" title="reputation score ${addThousandsSeparators(owner.reputation)}" dir="ltr">${getShortRep(owner.reputation)}</span>
    </div>
`;

export const makeStartedHTMLForFullList = ({ owner, creation_date, question_id }: ApiQuestion) => {
    // Create a string like "2019-12-24 01:25:57Z"
    const dateTitle = new Date(creation_date * 1000).toISOString().replace('T', ' ').replace(/\.\d\d\dZ/g, 'Z');
    return `
        <div style="float: right; width: 400px; clear: right;"></div>
        <div class="started fr">
            <div class="user-info user-hover">
                <div class="user-action-time">
                    <a href="/questions/${question_id}" class="started-link">asked
                        <span
                            title="${dateTitle}"
                            class="relativetime"
                        >${prettyAbsoluteDate(dateTitle) /* Newer dates will be immediately replaced by updateRelativeDates */}</span>
                    </a>
                </div>
                <div class="user-gravatar32">
                    ${owner.user_id ? makeRegisteredUserGravatar(owner) : '<span class="anonymous-gravatar"></span>'}
                </div>
                <div class="user-details">
                    ${owner.user_id ? makeRegisteredUserDetails(owner) : owner.display_name}
                </div>
            </div>
        </div>
    `;
};
