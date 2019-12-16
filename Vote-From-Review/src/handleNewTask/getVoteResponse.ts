import { getPostId } from './getPostId';

export const getVoteResponse = (voteParam: string) => {
    const formData = new FormData();
    const fkey = window.StackExchange.options.user.fkey;
    formData.append('fkey', fkey);
    const initOptions = {
        body: formData,
        credentials: 'same-origin' as const,
        method: 'POST',
    };
    const url = `${window.location.origin}/posts/${getPostId()}/vote/${voteParam}`;
    return fetch(url, initOptions)
        .then(res => res.json())
        .then(resultUntyped => resultUntyped as VoteResponse);
};
