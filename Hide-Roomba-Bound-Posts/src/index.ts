import { insertStyle } from './insertStyle';
import { waitForTablesToExist } from './waitForTablesToExist';

declare global {
    interface Window {
        StackExchange: StackExchange;
    }
}

const youarehere = document.querySelector('.youarehere') as HTMLElement;
if (youarehere.dataset.value === 'delete') {
    insertStyle();
    waitForTablesToExist();
}
