import { highlightCommentsWithoutData } from './highlightCommentsWithoutData';
import { populateRowstatsWithApiData } from './populateRowstatsWithApiData';
import { removeEmptyContainers } from './removeEmptyContainers';
import { removeRedundantTrs } from './removeRedundantTrs';

export const processApiResponse = (
    [questionData, commentData]: [ApiQuestions, ApiComments],
    rowstatsContainersByIds: RowstatsContainersByIds,
    savedComments: SavedComments,
) => {
    populateRowstatsWithApiData(questionData, commentData, rowstatsContainersByIds);
    const apiQuestionIds = new Set(questionData.items.map(({ question_id }) => question_id));
    const apiAnswerIds = new Set(([] as number[]).concat(
        ...questionData.items.map(
            ({ answers = [] }) => answers.map(({ answer_id }) => answer_id),
        ),
    ));
    const apiPostIds = new Set([...apiQuestionIds, ...apiAnswerIds]);
    const apiCommentIds = new Set(commentData.items.map(({ comment_id }) => comment_id));
    highlightCommentsWithoutData(rowstatsContainersByIds, apiCommentIds, apiPostIds, savedComments);
    removeEmptyContainers();
    removeRedundantTrs(apiCommentIds);
};
