import { makeHandleCloseVoteResponse } from './makeHandleCloseVoteResponse';

let canSendRequest = true;
export const getCanSendRequest = () => canSendRequest;
const setCanSendRequestToTrue = () => {
    canSendRequest = true;
};

export const submitCloseVote = (closeReasonId: string, closeAsOffTopicReasonId: string | undefined) => {
    const formData = new FormData();
    formData.append('fkey', window.StackExchange.options.user.fkey);
    formData.append('closeReasonId', closeReasonId);
    if (closeAsOffTopicReasonId) {
        formData.append('closeAsOffTopicReasonId', closeAsOffTopicReasonId);
    }
    const initOptions = {
        body: formData,
        credentials: 'same-origin' as const,
        method: 'POST',
    };
    const questionId = window.location.href.match(/\d+/)![0];
    const url = `${window.location.origin}/flags/questions/${questionId}/close/add`;
    canSendRequest = false;
    fetch(url, initOptions)
        .then(res => res.json())
        .then(makeHandleCloseVoteResponse(setCanSendRequestToTrue))
        .catch((error) => {
            canSendRequest = true;
            // tslint:disable-next-line: no-console
            console.error(error);
            const msg = 'Stack One Click VTC: An error occurred, see console for details';
            window.StackExchange.helpers.showToast(msg, { transient: false, type: 'danger' });
        });
};
