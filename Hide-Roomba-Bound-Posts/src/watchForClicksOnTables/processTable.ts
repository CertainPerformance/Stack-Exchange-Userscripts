import { showToastError } from '../../../common/showToast';
import { getApi } from './getApi';
import { processApiResponse } from './processApiResponse';
import * as settingsStore from './settingsStore';

const processedTables = new Set();
/**
 * If the table hasn't been processed yet,
 * make an API request and give attributes to the table's TRs,
 * based on whether the post the TR is for will roomba or not
 */
export const processTable = (table: HTMLTableElement) => {
    if (!settingsStore.get().enabled || processedTables.has(table)) {
        return;
    }
    processedTables.add(table);
    const trs = [...table.querySelectorAll('tr')];
    const trsByQuestionId: TrsByQuestionId = {};
    for (const tr of trs) {
        const questionId = Number(tr.querySelector('a')!.href.match(/\d+/)![0]);
        if (!trsByQuestionId[questionId]) {
            trsByQuestionId[questionId] = [];
        }
        trsByQuestionId[questionId].push(tr);
    }

    const questionIdsStr = Object.keys(trsByQuestionId).join(';');
    table.style.backgroundColor = '#fffee3';
    getApi(questionIdsStr)
        .then((apiResponse) => {
            table.removeAttribute('style');
            processApiResponse(apiResponse, trsByQuestionId, trs);
        })
        .catch((error) => {
            table.removeAttribute('style');
            // tslint:disable-next-line: no-console
            console.error(error);
            showToastError('Stack Hide Roomba Bound Posts: An error occurred, see console for details');
        });
};
