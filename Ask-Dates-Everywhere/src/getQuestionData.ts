import { getApi } from './getApi';

export const getQuestionData = async (questionIdsToRetrieve: Array<number>) => {
    if (!localStorage.cpUserscriptAskDatesEverywhereQuestionData) {
        localStorage.cpUserscriptAskDatesEverywhereQuestionData = '{}';
    }
    const apiQuestionsByQuestionId = JSON.parse(localStorage.cpUserscriptAskDatesEverywhereQuestionData as string) as ApiQuestionsByQuestionId;

    const accessed = Date.now();
    for (const questionId of questionIdsToRetrieve) {
        if (apiQuestionsByQuestionId[questionId]) {
            apiQuestionsByQuestionId[questionId].accessed = accessed;
        }
    }
    const uncachedQuestionids = questionIdsToRetrieve.filter(questionId => !apiQuestionsByQuestionId[questionId]);
    const apiResponse = await getApi(uncachedQuestionids);
    for (const apiQuestion of apiResponse.items) {
        apiQuestionsByQuestionId[apiQuestion.question_id] = { ...apiQuestion, accessed };
    }
    for (const [questionId, apiQuestion] of Object.entries(apiQuestionsByQuestionId)) {
        // Keep previously retrieved question info around for 1 week
        // (Don't want localStorage to get too big, nor should the saved user rep numbers get too out of date)
        if (accessed - apiQuestion.accessed > 1000 * 60 * 60 * 24 * 7) {
            delete apiQuestionsByQuestionId[questionId];
        }
    }
    localStorage.cpUserscriptAskDatesEverywhereQuestionData = JSON.stringify(apiQuestionsByQuestionId);
    return apiQuestionsByQuestionId;
};
