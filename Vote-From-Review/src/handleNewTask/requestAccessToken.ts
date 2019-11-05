/* Need the user to authenticate the API client so that an access_token can be stored in localStorage on the current domain
 *
 * Authorization process:
 * (0) Starting from https://stackoverflow.com/review/reopen/1234:
 * (1) Window href changes to https://stackoverflow.com/oauth/dialog, including a state parameter which indicates the domain to redirect back to on success
 * (2) User approves API permissions
 * (3) SE redirects to something like:
 *         https://stackexchange.com/oauth-vote-from-review#access_token=someAccessToken&expires=86400&state=https%3a%2f%2fstackoverflow.com%2freview%2freopen%2f1234
 *         (See below for redirect_uri explanation)
 * (4) Userscript running on https://stackexchange.com/oauth-vote-from-review reads the query string in the hash and redirects to:
 *         https://stackoverflow.com/review/reopen/1234?#access_token=someAccessToken
 * (5) Userscript running on https://stackoverflow.com/review/reopen/1234 reads the query string and saves the access_token into localStorage
 *
 * This could also be done with GM_setValue / GM.setValue, but they have different interfaces and are only supported in certain environments
 * Would prefer to use GM_setValue everywhere, but that would make the script incompatible with Greasemonkey 4.0 users
 *
 * Explanation of redirect_uri ('https://stackexchange.com/oauth-vote-from-review'):
 * It's a fake URL which 404s. There is not any useful content there, but API authorization requires any success redirect to be to a *single* domain
 * Eg, if the vote-from-review client settings permitted redirects to stackoverflow.com, redirects to any other SE domain would not be permitted
 * So, the https://stackexchange.com/oauth-vote-from-review page is @include-d in the metadata block
 * to exist a single stepping-stone URL for cross-domain communication
 *
 * Not using the more official stackexchange.com/oauth/login_success url to avoid possible collisions with other scripts
 *
 * This could be done without using the API at all by fetching the URL of the post and parsing the inline <script>,
 * but that's quite wasteful compared to the API, especially for those who review a lot
 */

const paramsArr = [
    ['client_id', '16456'],
    ['scope', 'private_info'],
    ['redirect_uri', 'https://stackexchange.com/oauth-vote-from-review'],
    ['state', window.location.href],
];
const searchParams = new URLSearchParams(paramsArr);
const paramsString = `?${searchParams.toString()}`;
const url = `https://stackoverflow.com/oauth/dialog${paramsString}`;

export const requestAccessToken = () => {
    if (!window.location.hash) {
        window.location.href = url;
    }
};
