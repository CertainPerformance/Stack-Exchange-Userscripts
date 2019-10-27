type Settings = {
    enabled: boolean,
    showPostsWithReopenVotes: boolean,
};
type ApiAnswer = {
    score: number;
};
type ApiQuestion = {
    accepted_answer_id?: number;
    answers: ApiAnswer[];
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
};
type ApiQuestionsResponse = {
    items: ApiQuestion[];
    error_id?: number;
};

type TrsByQuestionId = {
    [questionId: string]: HTMLTableRowElement[];
};
