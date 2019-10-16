export const commentHrefToIds = (commentHref: string) => {
    // commentHref will be in a format like:
    // https://stackoverflow.com/questions/1732348/regex-match-open-tags-except-xhtml-self-contained-tags#comment1612336_1732454
    //                                     questionId                                                          commentId postId
    const match = commentHref.match(/\/questions\/(\d+)\/[^\/]+(?:\/\d+)?[^#]*#comment(\d+)_(\d+)/)!;
    // postId refers to the post the comment was made on - may be a question or answer
    const [, questionId, commentId, postId] = match.map(Number);
    return { questionId, commentId, postId, isAnswer: postId !== questionId };
};
