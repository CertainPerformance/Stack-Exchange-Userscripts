const filters = {
    comments: '!SWJ_S9Hse(rWelcqk1', // wrapper.items, comment -> { score, comment_id })
    questions: '!5RCI6qPDF8)WPM-vVxWYF-1w0', // wrapper.items, question -> { answers, closed_reason, question_id, score }, answer -> { score, is_accepted, answer_id }
};
const thisSite = window.location.hostname
    .replace(/\.\w+$/, '') // Remove the TLD (.com, .net, ...)
    .replace(/\.stackexchange$/, ''); // The API does not need the ".stackexchange" suffix
const defaultParamsArr = [
    ['key', ')b5jvgz1hz0gdK)*4WvlPA(('],
    ['site', thisSite],
];

type GetApi = {
    (method: 'comments', ids: Array<number>): Promise<ApiComments>;
    (method: 'questions', ids: Array<number>): Promise<ApiQuestions>;
};
export const getApi: GetApi = async (method: 'comments' | 'questions', ids: Array<number>) => {
    if (!ids.length) {
        return { items: [] };
    }
    const searchParams = new URLSearchParams(defaultParamsArr);
    searchParams.set('filter', filters[method]);
    const paramsString = `?${searchParams.toString()}`;
    const url = `https://api.stackexchange.com/2.2/${method}/${ids.join(';')}${paramsString}`;
    const response = await fetch(url);
    const responseObj = await response.json();
    return responseObj;
};
