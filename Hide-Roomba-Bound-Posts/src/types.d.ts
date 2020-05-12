type Settings = Readonly<{
    enabled: boolean,
    showPostsWithReopenVotes: boolean,
}>;
type ApiAnswer = {
    readonly score: number;
};
type ApiQuestion = Readonly<{
    accepted_answer_id?: number;
    answers: Array<ApiAnswer>;
    closed_reason?: string;
    comment_count: number;
    creation_date: number;
    locked_date?: number;
    owner: {
        user_type: string;
    };
    question_id: number;
    reopen_vote_count: number;
    score: number;
    view_count: number;
}>;
type ApiQuestionsResponse = Readonly<{
    items: Array<ApiQuestion>;
    error_id?: number;
}>;

type TrsByQuestionId = {
    [questionId: string]: Array<HTMLTableRowElement>;
};
