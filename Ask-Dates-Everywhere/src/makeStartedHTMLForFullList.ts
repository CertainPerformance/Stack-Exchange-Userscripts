import { addThousandsSeparators } from './addThousandsSeparators';
import { getShortRep } from './getShortRep';
import { prettyAbsoluteDate } from './prettyAbsoluteDate';

export const makeStartedHTMLForFullList = ({ owner, creation_date, question_id }: ApiQuestion) => {
    const { reputation } = owner;
    const dateTitle = new Date(creation_date * 1000).toISOString().replace('T', ' ').replace(/\.\d\d\dZ/g, 'Z');
    return `
        <div style="float: right; width: 400px; clear: right;"></div>
        <div class="started fr">
            <div class="user-info user-hover">
                <div class="user-action-time">
                    <a href="/questions/${question_id}" class="started-link">asked
                        <span
                            title="${ /* 2019-12-24 01:25:57Z */ dateTitle}"
                            class="relativetime"
                        >${prettyAbsoluteDate(dateTitle) /* Newer dates will be immediately replaced by updateRelativeDates */}</span>
                    </a>
                </div>
                <div class="user-gravatar32">
                    <a href="/users/${owner.user_id}">
                        <div class="gravatar-wrapper-32"><img src="${owner.profile_image}" alt=""
                                width="32" height="32" class="bar-sm"></div>
                    </a>
                </div>
                <div class="user-details">
                    <a href="/users/${owner.user_id}">${owner.display_name}</a>
                    <div class="-flair">
                        <span class="reputation-score" title="reputation score ${addThousandsSeparators(reputation)}" dir="ltr">${getShortRep(reputation)}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
};
