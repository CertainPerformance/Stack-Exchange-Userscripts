export const getBestAnswer = (answers: Array<ApiAnswer>) => {
    if (!answers.length) {
        return null;
    }
    const acceptedAnswer = answers.find(({ is_accepted }) => is_accepted);
    if (acceptedAnswer) {
        return acceptedAnswer;
    }
    const highestScoreAnswer = answers.reduce((a, answer) => (
        answer.score > a.score ? answer : a
    ));
    return highestScoreAnswer;
};
