import { getBestAnswer } from './getBestAnswer';

export const populateRowstatsWithApiData = (questionData: ApiQuestions, commentData: ApiComments, rowstatsContainersByIds: RowstatsContainersByIds) => {
    /* Insert question scores (for all rows),
     * question acceptance attribute,
     * answer score (for the answer the comment is on, or for the best answer on the question),
     * answer acceptance attribute (for the same answer as above),
     * answer count (if >= 2 answers),
     * comment score (if score > 0)
     */
    questionData.items.forEach(({ answers = [], closed_reason, question_id, score }) => {
        const answersByAnswerId = answers.reduce<{ [answerId: number]: ApiAnswer }>((a, answer) => {
            a[answer.answer_id] = answer;
            return a;
        }, {});
        const plusMore = answers && answers.length > 1 ? answers.length - 1 : 0;
        rowstatsContainersByIds.byQuestion.get(question_id)!.forEach((rowstatsContainer) => {
            const [questionBox, answerBox] = rowstatsContainer.children;
            questionBox.textContent = String(score);
            if (plusMore) {
                rowstatsContainer.insertAdjacentHTML('beforeend', `<div data-cpuserscript-more-answers=""><span>+ ${plusMore} more</span></div>`);
            }
            const commentAnchor = rowstatsContainer.closest('td')!.nextElementSibling!.querySelector('a')!;
            if (closed_reason && !commentAnchor.textContent!.endsWith(']')) {
                commentAnchor.innerHTML += ` [${closed_reason}]`;
            }
            const bestAnswer = getBestAnswer(answers);
            if (bestAnswer && bestAnswer.is_accepted) {
                questionBox.setAttribute('data-cpuserscript-accepted', '');
            }
            const postId = Number(rowstatsContainer.closest('tr')!.dataset.postid);
            const postIsQuestion = commentAnchor.href.endsWith(String(question_id));
            const answerToDisplay = postIsQuestion ? bestAnswer : answersByAnswerId[postId];
            if (!answerToDisplay) {
                return;
            }
            if (answerToDisplay.is_accepted) {
                answerBox.setAttribute('data-cpuserscript-accepted', '');
            }
            answerBox.textContent = String(answerToDisplay.score);
        });
    });
    commentData.items.forEach(({ score, comment_id }) => {
        if (score > 0) {
            const rowstatsContainer = rowstatsContainersByIds.byComment.get(comment_id)!;
            rowstatsContainer.insertAdjacentHTML('beforeend', `<div data-cpuserscript-comment-score>${score}</div>`);
        }
    });
};
