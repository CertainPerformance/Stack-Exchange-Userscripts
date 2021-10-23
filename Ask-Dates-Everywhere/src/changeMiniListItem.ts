import { addThousandsSeparators } from './addThousandsSeparators';
import { getShortRep } from './getShortRep';
import { prettyAbsoluteDate } from './prettyAbsoluteDate';

const makeRegisteredUserHTML = (owner: ApiQuestion['owner']) => `
    <a href="/users/${owner.user_id}">${owner.display_name /* Yes, these are already HTML-escaped */}</a>${owner.user_type === 'moderator' ? '<span class="flex--item s-badge ml2 s-badge__moderator s-badge__xs mtn2" title="Moderator">Mod</span>' : ''}
    <span class="reputation-score" title="reputation score ${addThousandsSeparators(owner.reputation)}" dir="ltr">${getShortRep(owner.reputation)}</span>
`;

const makeStartedHTMLForMiniList = ({ owner, creation_date, question_id }: ApiQuestion) => {
    // Create a string like "2019-12-24 01:25:57Z"
    const dateTitle = new Date(creation_date * 1000).toISOString().replace('T', ' ').replace(/\.\d\d\dZ/g, 'Z');
    return `
        <a href="/questions/${question_id}" class="started-link">
            asked
            <span
                title="${dateTitle}"
                class="relativetime"
            >${prettyAbsoluteDate(dateTitle) /* Newer dates will be immediately replaced by updateRelativeDates */}</span>
        </a>
        ${owner.user_id ? makeRegisteredUserHTML(owner) : ''}
    `;
};

export const changeMiniListItem = (started: HTMLElement, apiQuestion: ApiQuestion) => {
    started.style.display = 'flex';
    started.style.flexDirection = 'column';
    started.style.alignItems = 'flex-end';
    started.parentElement!.style.alignItems = 'flex-start'; // Keep tags from vertically expanding
    const existingChildrenContainer = document.createElement('div');
    for (const child of [...started.childNodes]) {
        existingChildrenContainer.appendChild(child);
    }
    started.appendChild(existingChildrenContainer);
    const newChildrenContainer = started.appendChild(document.createElement('div'));
    newChildrenContainer.innerHTML = makeStartedHTMLForMiniList(apiQuestion);
};
