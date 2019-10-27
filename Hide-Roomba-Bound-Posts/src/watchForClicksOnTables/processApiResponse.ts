import { showToastError } from '../../../common/showToast';
import { willQuestionRoomba } from './willQuestionRoomba';

export const processApiResponse = ({ error_id, items }: ApiQuestionsResponse, trsByQuestionId: TrsByQuestionId, trs: HTMLTableRowElement[]) => {
    if (error_id) {
        showToastError(`Stack Hide Roomba Bound Posts Error: Stack Exchange API response code ${error_id}`);
        return;
    }
    const trsToBeProcessed = new Set(trs);
    items.forEach((questionObj) => {
        // Roomba only applies to questions. If a TR links to an answer, that TR's roomba status will be the same as the parent question's roomba status
        const willRoomba = willQuestionRoomba(questionObj);
        trsByQuestionId[questionObj.question_id].forEach((tr) => {
            if (willRoomba === 'willRoombaIfReopenAgesAway') {
                tr.setAttribute('data-cpuserscript-roomba-bound-but-reopen-votes', '');
            } else if (willRoomba) {
                tr.setAttribute('data-cpuserscript-roomba-bound', '');
            } else {
                tr.setAttribute('data-cpuserscript-will-not-roomba', '');
            }
            trsToBeProcessed.delete(tr);
        });
    });
    // Remaining TRs which were not included in API response must have been deleted in between table population and userscript enabling - hide them permanently
    trsToBeProcessed.forEach((tr) => {
        tr.setAttribute('data-cpuserscript-already-deleted', '');
        tr.style.display = 'none';
    });
};
