import '../../common/declareGlobalStackExchange';
import { addListeners } from './addListeners';
import { insertStyle } from './insertStyle';

declare global {
    interface Window {
        $: JQueryStatic;
    }
}

insertStyle();
addListeners();
