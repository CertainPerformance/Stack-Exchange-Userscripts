const questionFilter = '!6hZ(LC39RZp_fXm)k.WmxI2EbQC-cYI0bobCM88qaT*W7W';
/* https://api.stackexchange.com/docs/questions-by-ids
 * questionFilter is generated from:
 *
 * {
 *     answer: {
 *         score
 *     }
 *     wrapper: {
 *         error_id
 *         items
 *     }
 *     question: {
 *         accepted_answer_id
 *         answers
 *         closed_reason
 *         comment_count
 *         creation_date
 *         locked_date
 *         owner
 *         question_id
 *         reopen_vote_count
 *         score
 *         view_count
 *     }
 *     shallow_user: {
 *         user_type
 *     }
 * }
 */

const thisSite = window.location.hostname
    .replace(/\.\w+$/, '') // Remove the TLD (.com, .net, ...)
    .replace(/\.stackexchange$/, ''); // The API does not need the ".stackexchange" suffix
const paramsObj = [
    ['filter', questionFilter],
    ['key', 'U4DMV*8nvpm3EOpvf69Rxw(('],
    ['pagesize', '50'],
    ['site', thisSite],
];
const params = new URLSearchParams(paramsObj);

export const getApi = (questionIdsStr: string) => {
    return fetch(`https://api.stackexchange.com/2.2/questions/${questionIdsStr}?${params}`)
        .then(res => res.json())
        .then(apiQuestionsResponse => (apiQuestionsResponse as ApiQuestionsResponse));
};
