export const postLinkToIds = (postLink: string) => {
    /* postLink will be in a format like:
     * https://stackoverflow.com/questions/1732348/regex-match-open-tags-except-xhtml-self-contained-tags
     *                                     questionId
     * or
     * https://stackoverflow.com/questions/1732348/regex-match-open-tags-except-xhtml-self-contained-tags/1732454#1732454
     *                                     questionId                                                     answerId
     */
    const match = postLink.match(/\/questions\/(\d+)\/[^\/]+(?:\/(\d+))?/)!;
    const [, questionId, answerId] = match;
    return { questionId: Number(questionId), answerId: answerId ? Number(answerId) : undefined };
};
