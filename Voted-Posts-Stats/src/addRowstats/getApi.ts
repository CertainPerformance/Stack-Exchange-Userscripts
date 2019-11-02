const questionFilter = '!*7PmBPEzvIHchpOMByA174F6_hcW';
/* https://api.stackexchange.com/docs/questions-by-ids
 * questionFilter is generated from:
 * {
 *     answer: {
 *         answer_id
 *         is_accepted
 *         score
 *     }
 *     .wrapper: {
 *         error_id
 *         items
 *     }
 *     question: {
 *         accepted_answer_id
 *         answers
 *         question_id
 *         score
 *     }
 */

const thisSite = window.location.hostname
    .replace(/\.\w+$/, '') // Remove the TLD (.com, .net, ...)
    .replace(/\.stackexchange$/, ''); // The API does not need the ".stackexchange" suffix
const paramsArr = [
    ['key', 'I6*G8zzGnUzYq*dbUXppjg(('],
    ['site', thisSite],
    ['filter', questionFilter],
];
const searchParams = new URLSearchParams(paramsArr);
const paramsString = `?${searchParams.toString()}`;

export const getApi = async (questionIds: number[]) => {
    if (!questionIds.length) {
        return { items: [] };
    }
    const url = `https://api.stackexchange.com/2.2/questions/${questionIds.join(';')}${paramsString}`;
    const response = await fetch(url);
    const responseObj = await response.json();
    return responseObj as ApiQuestions;
};
