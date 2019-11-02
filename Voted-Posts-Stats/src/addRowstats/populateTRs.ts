import { getBestAnswer } from './getBestAnswer';
import { getPostsState } from './getPostsState';
import { postLinkToIds } from './postLinkToIds';

export const populateTRs = () => {
    const { questionsByQuestionId, answersByAnswerId } = getPostsState();
    document.querySelectorAll('.history-table tbody tr[data-postid]').forEach((tr) => {
        const { questionId, answerId } = postLinkToIds((tr.querySelector('a[href]') as HTMLAnchorElement).href);
        const question = questionsByQuestionId.get(questionId);
        const rowstatsContainer = tr.children[1].appendChild(document.createElement('span'));
        rowstatsContainer.setAttribute('data-cpuserscript-rowstats', '');
        if (!question) {
            // Question may be deleted
            return;
        }
        const moreCount = question.answers ? question.answers.length - 1 : null;
        const answerToShow = answerId
            ? answersByAnswerId.get(answerId)
            : question.answers
                ? getBestAnswer(question.answers)
                : null;
        const answerHTML = answerToShow
            ? `
                <span${answerToShow.is_accepted ? ' data-cpuserscript-accepted' : ''}>${answerToShow.score}</span>
                <span>${moreCount ? `+ ${moreCount} more` : ''}</span>
              `
            : '';
        rowstatsContainer.innerHTML = `
            <span${question.accepted_answer_id ? ' data-cpuserscript-accepted' : ''}>${question.score}</span>
            ${answerHTML}
        `;
        const parentPost = rowstatsContainer.children[answerId ? 1 : 0];
        // If vote was on answer, the answer may have been deleted:
        if (parentPost) {
            parentPost.setAttribute('data-cpuserscript-parent-post', '');
        }
    });
};
