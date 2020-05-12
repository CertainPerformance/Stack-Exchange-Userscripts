import { checkOpenTables } from './checkOpenTables';
import { createSettingsInterface } from './createSettingsInterface';
import { processTable } from './processTable';

export const watchForClicksOnTables = (deleteTables: Array<HTMLTableElement>) => {
    const checkOpenTablesBound = () => {
        checkOpenTables(deleteTables, processTable);
    };
    // Process all open tables when settings get enabled:
    createSettingsInterface(checkOpenTablesBound);
    // and soon after pageload, in case user has clicked on a table island
    // before the SE XHR table response has come back
    checkOpenTablesBound();
    // Process a table when it's opened:
    deleteTables.forEach((deleteTable) => {
        const h3 = deleteTable.closest('.island')!.querySelector('h3')!;
        h3.addEventListener('click', () => {
            processTable(deleteTable);
        });
    });
};
