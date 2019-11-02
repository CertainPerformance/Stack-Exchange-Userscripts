import { showToastError } from '../../../common/showToast';
import { getPostInfo } from './getPostInfo';
import { postLinkToIds } from './postLinkToIds';

const dedupe = (arr: number[]) => [...new Set(arr)];
export const addRowstats = () => {
    const tableExists = document.querySelector('.history-table');
    // Might not be a table, if the user hasn't cast any votes of this type:
    if (!tableExists) {
        return;
    }
    const anchors = [...document.querySelectorAll('.history-table a[href]')];
    const questionIds = dedupe(anchors.map(a => postLinkToIds((a as HTMLAnchorElement).href).questionId));
    getPostInfo(questionIds)
        .catch((error) => {
            console.error(error);
            showToastError('Stack Voted Posts Stats: An error occurred, see console for details');
        });

};
