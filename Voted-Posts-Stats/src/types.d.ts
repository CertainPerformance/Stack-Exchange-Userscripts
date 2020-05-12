type ApiAnswer = Readonly<{
    is_accepted: boolean;
    score: number;
    answer_id: number;
}>;
type ApiQuestion = Readonly<{
    score: number;
    question_id: number;
    accepted_answer_id?: number;
    answers?: Array<ApiAnswer>;
}>;
type ApiQuestions = Readonly<{
    items: Array<ApiQuestion>;
    error_id?: number;
}>;

type QuestionsByQuestionId = Map<number, ApiQuestion>;
type AnswersByAnswerId = Map<number, ApiAnswer>;
