export const willQuestionRoomba = (questionObj: ApiQuestion) => {
    const {
        answers = [],
        accepted_answer_id,
        score: questionScore,
        locked_date,
        view_count,
        comment_count,
        creation_date,
        owner,
        closed_reason,
        reopen_vote_count,
    } = questionObj;
    const questionAgeInDays = (Date.now() - creation_date) / (1000 * 60 * 60 * 24);
    const isMetaSite = window.location.host.includes('meta.');
    const maxScoreAnswer = Math.max(...answers.map(({ score }) => score));
    // Roomba rules: https://stackoverflow.com/help/roomba

    /* RemoveDeadQuestions: If the question is more than 30 days old, and ...
     *   has −1 or lower score
     *   has no answers
     *   is not locked
     */
    if (questionScore < 0 && answers.length === 0 && !locked_date) {
        return true;
    }

    /* RemoveAbandonedQuestions: If the question is more than 365 days old, and ...
     *   has a score of 0 or less, or a score of 1 and a deleted owner
     *   has no answers
     *   is not locked
     *   has view count <= the age of the question in days times 1.5
     *   has 1 or 0 comments
     *   isn't on a meta site
     */
    if (
        (questionScore <= 0 || (questionScore === 1 && owner.user_type === 'does_not_exist')) &&
        answers.length === 0 &&
        !locked_date &&
        view_count <= (questionAgeInDays * 1.5) &&
        comment_count <= 1 &&
        !isMetaSite
    ) {
        return true;
    }

    /* RemoveAbandonedClosed: If the question was closed more than 9 days ago, and ...
         not closed as a duplicate
         has a score of 0 or less
         is not locked
         has no answers with a score > 0
         has no accepted answer
         has no pending reopen votes
         has not been edited in the past 9 days
    */
    if (
        closed_reason !== 'duplicate' &&
        questionScore <= 0 &&
        !locked_date &&
        maxScoreAnswer <= 0 &&
        !accepted_answer_id
    ) {
        if (reopen_vote_count === 0) {
            return true;
        }
        return 'willRoombaIfReopenAgesAway';
    }
    // "Has not been edited" condition is ignored, because 9 days will eventually be reached

    return false;
};
