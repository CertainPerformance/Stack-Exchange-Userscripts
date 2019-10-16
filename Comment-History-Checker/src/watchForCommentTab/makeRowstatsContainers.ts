import { commentHrefToIds } from '../commentHrefToIds';

export const makeRowstatsContainers = () => {
    // Map question / comment IDs to the second td in every tr, the tds which initially contain "Comment" on pageload
    const rowstatsContainersByIds: RowstatsContainersByIds = {
        byComment: new Map(),
        byQuestion: new Map(),
    };
    // Then replace the content of those TDs with the rowstats HTML framework,
    // which will be populated once the API response comes back
    document.querySelectorAll('.history-table > tbody tr[data-postid]').forEach((tr) => {
        const commentHref = tr.querySelector('a')!.href;
        const { questionId, commentId, isAnswer } = commentHrefToIds(commentHref);
        const td = tr.children[1];
        td.textContent = '';
        const rowstatsContainer = td.appendChild(document.createElement('div'));
        rowstatsContainer.setAttribute('data-cpuserscript-rowstats', '');
        rowstatsContainer.innerHTML = `
            <div data-cpuserscript-qa-box></div>
            <div data-cpuserscript-qa-box></div>
        `;
        rowstatsContainer.children[isAnswer ? 1 : 0].setAttribute('data-cpuserscript-parent-post', '');

        if (!rowstatsContainersByIds.byQuestion.has(questionId)) {
            rowstatsContainersByIds.byQuestion.set(questionId, new Set());
        }
        rowstatsContainersByIds.byQuestion.get(questionId)!.add(rowstatsContainer);
        rowstatsContainersByIds.byComment.set(commentId, rowstatsContainer);
    });
    return rowstatsContainersByIds;
};
