import '../../common/declareGlobalStackExchange';
import { insertStyle } from './insertStyle';
import { waitForTablesToExist } from './waitForTablesToExist';

const youarehere = document.querySelector('.youarehere');
if (youarehere && (youarehere as HTMLElement).dataset.value === 'delete') {
    insertStyle();
    waitForTablesToExist();
}
