import { addListeners } from './addListeners';
import { insertStyle } from './insertStyle';

declare global {
    interface Window {
        StackExchange: StackExchange;
        $: JQueryStatic;
    }
}

insertStyle();
addListeners();
