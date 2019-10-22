type Settings = {
    enabled: boolean,
    showPostsWithReopenVotes: boolean,
};
type ToastSettings = {
    transient: false;
    type: 'danger';
};
type StackExchange = {
    helpers: {
        suggestedTransientTimeout(message: string, isToast: boolean): number;
        showToast(message: string, settings: ToastSettings): void;
    },
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
