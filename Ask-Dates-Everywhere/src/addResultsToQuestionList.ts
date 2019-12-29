import { haveSEUpdateRelativeDates } from './haveSEUpdateRelativeDates';
import { makeStartedHTMLForFullList } from './makeStartedHTMLForFullList';
import { makeStartedHTMLForMiniList } from './makeStartedHTMLForMiniList';

export const addResultsToQuestionList = (
    startedsToFixByQuestionId: Map<number, HTMLElement>,
    apiQuestionsByQuestionId: ApiQuestionsByQuestionId,
    questionsContainerIsMiniList: boolean,
) => {
    for (const [questionId, started] of startedsToFixByQuestionId.entries()) {
        const apiQuestion = apiQuestionsByQuestionId[questionId];
        if (!apiQuestion) {
            // Shouldn't happen, unless the question gets deleted in the milliseconds between the websocket response and the userscript request
            continue;
        }
        if (questionsContainerIsMiniList) {
            started.insertAdjacentHTML('afterend', makeStartedHTMLForMiniList(apiQuestion));
        } else {
            started.insertAdjacentHTML('beforebegin', makeStartedHTMLForFullList(apiQuestion));
        }
    }
    haveSEUpdateRelativeDates();
};
