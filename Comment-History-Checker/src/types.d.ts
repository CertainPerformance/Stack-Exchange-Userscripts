type SavedComment = Readonly<{
    commentHTML: string;
    commentHref: string;
    questionTitle: string
    timestamp: number;
    selfDeleted?: true;
}>;
type SavedComments = {
    [commentId: number]: SavedComment;
};
type StackExchange = {
    ready: (callback: () => void) => void;
    options: {
        serverTimeOffsetSec: number;
    }
};
type ApiComment = {
    score: number;
    creation_date: number;
    comment_id: number;
};
type ApiComments = {
    items: ApiComment[];
};
type ApiAnswer = {
    is_accepted: boolean;
    score: number;
    answer_id: number;
};
type ApiQuestion = {
    score: number;
    last_activity_date: number;
    question_id: number;
    closed_reason?: string;
    answers?: ApiAnswer[];
};
type ApiQuestions = {
    items: ApiQuestion[];
};
type RowstatsContainersByIds = {
    byComment: Map<number, HTMLDivElement>;
    byQuestion: Map<number, Set<HTMLDivElement>>;
};
