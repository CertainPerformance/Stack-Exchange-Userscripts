import { watchForClicksOnTables } from './watchForClicksOnTables';
export const waitForTablesToExist = () => {
    // Wait for both delete tables to be created from the multiple ajax request done by the page
    const containerForAllTables = document.querySelector('.subheader + div');
    if (!containerForAllTables) {
        // Not logged in, or not enough reputation:
        return;
    }
    new MutationObserver((_, observer) => {
        const deleteTables = ['topDelete', 'recentDelete']
            .map(dataMode => document.querySelector<HTMLTableElement>(`div[data-mode="${dataMode}"] > table`));
        if (deleteTables.some(table => !table)) {
            return;
        }
        observer.disconnect();
        watchForClicksOnTables(deleteTables as HTMLTableElement[]);
    })
        .observe(containerForAllTables, { childList: true, subtree: true });
};
