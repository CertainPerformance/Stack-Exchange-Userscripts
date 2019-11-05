type VoteResponse = Readonly<{
    Success: boolean;
    Warning: boolean;
    Message?: string;
    LastVoteTypeId?: number;
    NewScore: number;
}>;
type ApiPostItem = Readonly<{
    downvoted: boolean;
    upvoted: boolean;
}>;
type ApiPostResponse = Readonly<{
    error_id?: number;
    items: ApiPostItem[];
}>;
