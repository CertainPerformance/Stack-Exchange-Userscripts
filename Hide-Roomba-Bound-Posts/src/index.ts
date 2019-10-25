import { insertStyle } from './insertStyle';
import { waitForTablesToExist } from './waitForTablesToExist';

declare global {
    interface Window {
        StackExchange: StackExchange;
    }
}

const youarehere = document.querySelector('.youarehere');
if (youarehere && (youarehere as HTMLElement).dataset.value === 'delete') {
    insertStyle();
    waitForTablesToExist();
}
