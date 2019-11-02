const questionsByQuestionId: QuestionsByQuestionId = new Map();
const answersByAnswerId: AnswersByAnswerId = new Map();

export const getPostsState = () => ({ questionsByQuestionId, answersByAnswerId });
