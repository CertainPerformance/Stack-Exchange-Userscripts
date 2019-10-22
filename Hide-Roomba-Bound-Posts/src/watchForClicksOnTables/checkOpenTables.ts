export const checkOpenTables = (deleteTables: HTMLTableElement[], processTable: (deleteTable: HTMLTableElement) => void) => {
    deleteTables.forEach((table) => {
        // Only process the tables that are open:
        if (!table.classList.contains('collapsed')) {
            processTable(table);
        }
    });
};
