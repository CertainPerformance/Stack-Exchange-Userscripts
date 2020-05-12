type SavedComment = Readonly<{
    commentHTML: string;
    commentHref: string;
    questionTitle: string;
    timestamp: number;
    selfDeleted?: true;
}>;
type SavedComments = {
    [commentId: number]: SavedComment;
};
type ApiComment = Readonly<{
    score: number;
    creation_date: number;
    comment_id: number;
}>;
type ApiComments = {
    readonly items: Array<ApiComment>;
};
type ApiAnswer = Readonly<{
    is_accepted: boolean;
    score: number;
    answer_id: number;
}>;
type ApiQuestion = Readonly<{
    score: number;
    question_id: number;
    closed_reason?: string;
    answers?: Array<ApiAnswer>;
}>;
type ApiQuestions = {
    readonly items: Array<ApiQuestion>;
};
type RowstatsContainersByIds = Readonly<{
    byComment: Map<number, HTMLDivElement>;
    byQuestion: Map<number, Set<HTMLDivElement>>;
}>;
