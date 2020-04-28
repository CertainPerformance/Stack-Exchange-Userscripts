import { makeHandleCloseVoteResponse } from './makeHandleCloseVoteResponse';
import { showToastError } from '../../../common/showToast';

let canSendRequest = true;
export const getCanSendRequest = () => canSendRequest;
const setCanSendRequestToTrue = () => {
    canSendRequest = true;
};

export const submitCloseVote = (closeReasonId: string, siteSpecificCloseReasonId: string | undefined) => {
    const formData = new FormData();
    formData.append('fkey', window.StackExchange.options.user.fkey);
    formData.append('closeReasonId', closeReasonId);
    if (siteSpecificCloseReasonId) {
        formData.append('siteSpecificCloseReasonId', siteSpecificCloseReasonId);
    }
    const initOptions = {
        body: formData,
        credentials: 'same-origin' as const,
        method: 'POST',
    };
    const questionId = Number(window.location.href.match(/\d+/)![0]);
    const url = `${window.location.origin}/flags/questions/${questionId}/close/add`;
    canSendRequest = false;
    fetch(url, initOptions)
        .then(res => res.json())
        .then(makeHandleCloseVoteResponse(questionId, setCanSendRequestToTrue))
        .catch((error) => {
            canSendRequest = true;
            // tslint:disable-next-line: no-console
            console.error(error);
            showToastError('Stack One Click VTC: An error occurred while trying to vote, see console for details');
        });
};
