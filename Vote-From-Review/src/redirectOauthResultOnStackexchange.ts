export const redirectOauthResultOnStackexchange = () => {
    const params = new URLSearchParams(window.location.hash);
    const accessToken = params.get('#access_token');
    const originURL = params.get('state');
    if (!accessToken || !originURL) {
        // Unlikely to occur unless user manually navigates to the non-existent page https://stackexchange.com/oauth-vote-from-review
        console.error('Stack Vote From Review: Required parameters missing from URL hash');
        return;
    }
    const newUrl = `${originURL}#access_token_vote_from_review=${accessToken}`;
    window.location.href = newUrl;
};
