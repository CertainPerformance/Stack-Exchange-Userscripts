import { requestAccessToken } from './requestAccessToken';

if (!localStorage.cpUserscriptVoteFromReviewAccessToken) {
    /* This should only occur the first time the script is run, ever
     * The access token only stays active for 24? hours
     * After it expires, the API will return an error, and the user will have to re-authenticate
     * (handled in highlightVoteButtonIfVotedHere)
     */
    requestAccessToken();
}

const getParamsString = () => {
    /* This is done in a function rather than set on the top level
     * to make sure that that the *latest* cpUserscriptVoteFromReviewAccessToken is retrieved from localStorage
     * just in case it was just refreshed when index.ts ran
     */
    const apiAccessToken = localStorage.cpUserscriptVoteFromReviewAccessToken;
    if (!apiAccessToken) {
        // Should not happen, except possibly on very slow connections the first time the script is ever run
        // while the browser is in the process of redirecting
        throw new Error('apiAccessToken not retrieved yet');
    }
    const thisSite = window.location.hostname
        .replace(/\.\w+$/, '') // Remove the TLD (.com, .net, ...)
        .replace(/\.stackexchange$/, ''); // The API does not need the ".stackexchange" suffix
    const paramsArr = [
        ['key', 'uzdnJ)JTbcUNb9NtC*WUQg(('],
        ['site', thisSite],
        ['filter', '!w-*Ytm8Gt4I)mVi4p2'], // .wrapper: { error_id, items }, post: { upvoted, downvoted }
        ['access_token', apiAccessToken],
    ];
    const searchParams = new URLSearchParams(paramsArr);
    const paramsString = `?${searchParams.toString()}`;
    return paramsString;
};

export const getApi = (postId: number) => {
    const url = `https://api.stackexchange.com/2.2/posts/${postId}${getParamsString()}`;
    return fetch(url)
        .then(res => res.json());
};
