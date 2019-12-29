type ApiQuestion = Readonly<{
    creation_date: number;
    question_id: number;
    owner: Readonly<{
        reputation: number;
        user_id: number;
        display_name: string;
        profile_image: string;
    }>;
}>;
type ApiResponse = {
    readonly items: ApiQuestion[];
};
type ApiQuestionsByQuestionId = {
    [questionId: string]: ApiQuestion & { accessed: number };
};
