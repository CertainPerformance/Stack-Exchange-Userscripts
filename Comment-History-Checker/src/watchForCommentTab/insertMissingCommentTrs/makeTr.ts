import { commentHrefToIds } from '../../commentHrefToIds';
import { escapeHTML } from './escapeHTML';
import { timestampToDateDivHTML } from './timestampToDateDivHTML';

export const makeTr = (savedComment: SavedComment, isTrailing: boolean) => {
    const {
        questionTitle, // This may be out of date if the question was edited - user will have to visit the question page to get an updated title, by design
        commentHTML,
        commentHref,
        timestamp,
    } = savedComment;
    const tr = document.createElement('tr');
    if (isTrailing) {
        tr.setAttribute('data-cpuserscript-unverified-trailing-row', '');
    }
    // Some of the below changes are not *necessary*, but they make the inserted rows' HTML consistent with the default markup
    tr.setAttribute('class', '');
    const partialHref = commentHref.match(/\/questions.+/)![0];
    // postId refers to the post the comment was made on - may be a question or answer:
    const { postId } = commentHrefToIds(commentHref);
    tr.dataset.postid = String(postId);
    const dateDivHTML = timestampToDateDivHTML(timestamp);
    tr.innerHTML = `
    <td>
        ${dateDivHTML}
    </td>
    <td>comment</td>
    <td>
        <b><a href="${partialHref}" class="answer-hyperlink timeline-answers">${escapeHTML(questionTitle)}</a></b>
        <br>
        <span class="comments">${commentHTML}</span>
    </td>
    `;
    return tr;
};
