export const checkOpenTables = (deleteTables: Array<HTMLTableElement>, processTable: (deleteTable: HTMLTableElement) => void) => {
    const expanderArrow = document.querySelector('.expander-arrow-small-hide')!;
    // If the below userscript is being used, the tables will be open by default, no need to click:
    // https://github.com/samliew/SO-mod-userscripts/blob/master/10kToolsHelper.user.js
    const tablesOpenViaCustomCSS = window.getComputedStyle(expanderArrow).display === 'none';
    deleteTables.forEach((table) => {
        // Only process the tables that are open:
        if (tablesOpenViaCustomCSS || !table.classList.contains('collapsed')) {
            processTable(table);
        }
    });
};
