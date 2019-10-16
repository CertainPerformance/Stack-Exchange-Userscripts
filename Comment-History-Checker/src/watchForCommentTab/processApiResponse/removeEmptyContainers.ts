export const removeEmptyContainers = () => {
    const commentTrs = document.querySelectorAll('.history-table > tbody tr[data-postid]');
    commentTrs.forEach((commentTr) => {
        const rowstatsContainer = commentTr.querySelector('[data-cpuserscript-rowstats]')!;
        const [questionBox, answerBox] = rowstatsContainer.children;
        if (!questionBox.textContent) {
            // If there's no question info, there's no info at all; the question was deleted, remove the whole container
            rowstatsContainer.remove();
        } else if (!answerBox.textContent) {
            answerBox.remove();
        }
    });
};
