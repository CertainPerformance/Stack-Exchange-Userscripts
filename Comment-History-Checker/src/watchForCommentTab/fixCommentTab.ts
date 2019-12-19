import { getDB } from '../commentDB';
import { getApi } from './getApi';
import { insertMissingCommentTrs } from './insertMissingCommentTrs';
import { insertTh } from './insertTh';
import { makeRowstatsContainers } from './makeRowstatsContainers';
import { processApiResponse } from './processApiResponse';

const selectorToUserId = (selector: string) => {
    const anchor = document.querySelector<HTMLAnchorElement>(selector);
    if (!anchor) {
        return null;
    }
    return anchor.href.match(/\d+/)![0];
};
export const fixCommentTab = async () => {
    const savedComments = await getDB();
    const thisProfileIsLoggedIn = selectorToUserId('a.my-profile') === selectorToUserId('.subheader a[href^="/users/"]');
    // If not logged in, OR if you're viewing the comments of a different user's profile,
    // then no rows will be dynamically inserted, and all rows will be ordinary visible comments, without color-coding
    if (thisProfileIsLoggedIn) {
        insertMissingCommentTrs(savedComments);
    }
    const table = document.querySelector('.history-table');
    if (!table) {
        // User hasn't made any comments yet
        return;
    }
    insertTh(table, thisProfileIsLoggedIn);
    const rowstatsContainersByIds = makeRowstatsContainers();
    const apiData = await Promise.all([
        getApi('questions', [...rowstatsContainersByIds.byQuestion.keys()]),
        getApi('comments', [...rowstatsContainersByIds.byComment.keys()]),
    ]);
    processApiResponse(apiData, rowstatsContainersByIds, savedComments);
};
