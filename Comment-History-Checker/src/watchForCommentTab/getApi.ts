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

export const getApi = async <T extends 'comments' | 'questions'>(method: T, ids: Array<number>) => {
    if (!ids.length) {
        return { items: [] };
    }
    const searchParams = new URLSearchParams(defaultParamsArr);
    searchParams.set('filter', filters[method]);
    const paramsString = `?${searchParams.toString()}`;
    const url = `https://api.stackexchange.com/2.2/${method}/${ids.join(';')}${paramsString}`;
    const response = await fetch(url);
    const responseObj = await response.json();
    return responseObj as T extends 'comments' ? ApiComments : ApiQuestions;
};
