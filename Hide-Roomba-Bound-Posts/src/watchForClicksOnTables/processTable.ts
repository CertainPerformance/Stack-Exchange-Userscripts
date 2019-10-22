import { getApi } from './getApi';
import { processApiResponse } from './processApiResponse';
import * as settingsStore from './settingsStore';
import { showToastError } from './showToastError';

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
    const trsByQuestionId = trs.reduce<TrsByQuestionId>((a, tr) => {
        const questionId = Number(tr.querySelector('a')!.href.match(/\d+/)![0]);
        if (!a[questionId]) {
            a[questionId] = [];
        }
        a[questionId].push(tr);
        return a;
    }, {});

    const questionIdsStr = Object.keys(trsByQuestionId).join(';');
    table.style.backgroundColor = '#fffee3';
    getApi(questionIdsStr)
        .then((apiResponse) => {
            table.removeAttribute('style');
            processApiResponse(apiResponse, trsByQuestionId, trs);
        })
        .catch((error) => {
            table.removeAttribute('style');
            console.error(error);
            showToastError('Stack Hide Roomba Bound Posts: An error occurred, see console for details');
        });
};
