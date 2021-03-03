export const saveOauthResultOnOrigin = (search: string) => {
    const params = new URLSearchParams(search);
    const accessToken = params.get('access_token_vote_from_review');
    if (!accessToken) {
        // This may occur if there's a search string that doesn't include access_token_vote_from_review
        // Not sure if it could ever happen during normal operation
        return false;
    }
    localStorage.cpUserscriptVoteFromReviewAccessToken = accessToken;
    // Remove the token from the address bar:
    const { origin, pathname } = window.location;
    history.replaceState({}, '', origin + pathname);
    return true;
};
