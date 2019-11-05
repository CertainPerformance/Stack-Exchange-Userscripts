export const saveOauthResultOnOrigin = (hash: string) => {
    const params = new URLSearchParams(hash.slice(1));
    const accessToken = params.get('access_token_vote_from_review');
    if (!accessToken) {
        // This is quite unlikely, the static page does not have any hashes that have meaning for the user when permalinked
        console.error('Stack Vote From Review: No access_token found in hash', hash);
        return;
    }
    localStorage.cpUserscriptVoteFromReviewAccessToken = accessToken;
};
