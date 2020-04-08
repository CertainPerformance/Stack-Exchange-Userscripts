import { commentHrefToIds } from '../../commentHrefToIds';
import { makeTr } from './makeTr';

// Make sure to only select trs with data-postids;
// Old comments have year-indicator TRs show up in the table, eg <tr><th>2018</th></tr>, which we don't want to select
const getTrs = () => [...document.querySelectorAll<HTMLTableRowElement>('.history-table > tbody tr[data-postid]')];
const trToIds = (tr: HTMLTableRowElement) => commentHrefToIds(tr.querySelector<HTMLAnchorElement>('a[href^="/questions"]')!.href);

/**
 * Finds and inserts comments that, given the date range, are in the database and should exist in the table, but don't
 */
export const insertMissingCommentTrs = (savedComments: SavedComments) => {
    /* All this function does is change the DOM to insert missing comments as TRs - no data is saved or returned
     * because the DOM can be treated as the source of truth:
     * From the trs (inserted by the userscript or not), everything needed can be retrieved - the comment hrefs contain all IDs needed later
     */

    // The keys of savedComments are the numeric commentIds, and so will already be in ascending numeric order in basically every implementation: no need to .sort
    // (until a commentId reaches the limit of array indicies, 2 ** 32 - 1, which is a long way off)
    const savedCommentsArrLatestFirst = Object.values(savedComments).reverse();
    const commentTrs = getTrs();
    const [startTRIndexInSavedCommentsArr, endTRIndexInSavedCommentsArr] = [commentTrs[0], commentTrs[commentTrs.length - 1]]
        .map((tr) => {
            const commentIdToFind = trToIds(tr).commentId;
            // In saved comments, find first commentId which is equal to (likely) or earlier than the commentId of this tr
            // (that is, a theoretical TR created from the found commentId should be the same, or come right below this `tr` being iterated over)
            return savedCommentsArrLatestFirst.findIndex(({ commentHref }) => (
                commentHrefToIds(commentHref).commentId <= commentIdToFind
            ));
        });
    // This may not exist if the user has made less than a page-full of comments on this site:
    const pageNumbersElm = document.querySelector('#user-tab-activity .user-tab-paging .is-selected');
    const thisPageNumber = pageNumbersElm ? Number(pageNumbersElm.textContent) : 1;
    const sliceStartIndex = (startTRIndexInSavedCommentsArr === -1 || thisPageNumber === 1)
        ? 0
        : startTRIndexInSavedCommentsArr;
    /* sliceEndIndex is usually endTRIndexInSavedCommentsArr + 7,
     * to show up to 7 deleted comments in between the buttom of this page and the top of the next page
     * The comments that would be visible if user navigates to the next page will be hidden later, once the SE API response is processed
     */
    const sliceEndIndex = endTRIndexInSavedCommentsArr === -1
        ? savedCommentsArrLatestFirst.length - 1
        : Math.min(endTRIndexInSavedCommentsArr + 7, savedCommentsArrLatestFirst.length - 1);
    const allCommentsToBeShownOnThisPage = savedCommentsArrLatestFirst.slice(sliceStartIndex, sliceEndIndex);

    const commentIdsAlreadyOnPage = new Set(commentTrs.map(tr => trToIds(tr).commentId));
    const tBody = commentTrs[0].parentElement!;
    const lastOriginalTrCommentId = trToIds(commentTrs[commentTrs.length - 1]).commentId;
    const insertTr = (savedComment: SavedComment) => {
        const thisCommentId = commentHrefToIds(savedComment.commentHref).commentId;
        // If a tr for this commentId already exists, nothing to create:
        if (commentIdsAlreadyOnPage.has(thisCommentId)) {
            return;
        }
        const trThisNewRowShouldBeInsertedBefore = getTrs().find(tr => trToIds(tr).commentId < thisCommentId);
        const isTrailing = thisCommentId < lastOriginalTrCommentId;
        const trToInsert = makeTr(savedComment, isTrailing);
        // If trThisNewRowShouldBeInsertedBefore is null, the TR will be inserted at the end of the tbody, like appendChild, as desired:
        tBody.insertBefore(trToInsert, trThisNewRowShouldBeInsertedBefore || null);
    };
    allCommentsToBeShownOnThisPage.forEach(insertTr);
};
