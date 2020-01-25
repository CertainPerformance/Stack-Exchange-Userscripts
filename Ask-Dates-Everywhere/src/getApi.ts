/* Filter is constructed from:
 * wrapper -> { items }
 * question -> { creation_date, owner }
 * shallow_user -> { display_name, profile_image, reputation, user_id, user_type }
 */
const filter = '!iCA6(zQJbylNesjF799NMC';
const thisSite = window.location.hostname
    .replace(/\.\w+$/, '') // Remove the TLD (.com, .net, ...)
    .replace(/\.stackexchange$/, ''); // The API does not need the ".stackexchange" suffix
const paramsArr = [
    ['key', 'XnYMba9ARHQZOA4OnV8bdw(('],
    ['filter', filter],
    ['site', thisSite],
    ['pagesize', '50'],
];
const searchParams = new URLSearchParams(paramsArr);
const paramsString = `?${searchParams.toString()}`;

export const getApi = async (questionIdsToFetch: number[]) => {
    if (questionIdsToFetch.length === 0) {
        return { items: [] };
    }
    const url = `https://api.stackexchange.com/2.2/questions/${questionIdsToFetch.join(';')}${paramsString}`;
    const response = await fetch(url);
    const responseObj = await response.json();
    return responseObj as ApiResponse;
};
