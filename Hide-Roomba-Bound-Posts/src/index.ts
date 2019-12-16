import '../../common/declareGlobalStackExchange';
import { insertStyle } from './insertStyle';
import { waitForTablesToExist } from './waitForTablesToExist';

const youarehere = document.querySelector<HTMLElement>('.youarehere');
if (youarehere && youarehere.dataset.value === 'delete') {
    insertStyle();
    waitForTablesToExist();
}
