type ApiQuestion = Readonly<{
    creation_date: number;
    question_id: number;
    owner: Readonly<{
        display_name: string;
        profile_image: string;
        reputation: number;
        user_id: number;
        user_type: 'unregistered' | 'registered' | 'moderator' | 'does_not_exist';
    }>;
}>;
type ApiResponse = {
    readonly items: Array<ApiQuestion>;
};
type ApiQuestionsByQuestionId = {
    [questionId: string]: ApiQuestion & { accessed: number };
};
