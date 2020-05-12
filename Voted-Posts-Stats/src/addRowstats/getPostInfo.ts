import { showToastError } from '../../../common/showToast';
import { getApi } from './getApi';
import { getPostsState } from './getPostsState';
import { insertTH } from './insertTH';
import { populateTRs } from './populateTRs';

export const getPostInfo = async (questionIds: Array<number>) => {
    const { questionsByQuestionId, answersByAnswerId } = getPostsState();
    const questionIdsToFetch = questionIds.filter(questionId => !questionsByQuestionId.has(questionId));
    const { items, error_id } = await getApi(questionIdsToFetch);
    if (error_id) {
        showToastError(`Stack Voted Posts Stats Error: Stack Exchange API response code ${error_id}`);
        return;
    }
    items.forEach((question) => {
        questionsByQuestionId.set(question.question_id, question);
        if (question.answers) {
            question.answers.forEach((answer) => {
                answersByAnswerId.set(answer.answer_id, answer);
            });
        }
    });
    insertTH();
    populateTRs();
};
