import '../../common/declareGlobalStackExchange';
import { insertStyle } from './insertStyle';
import { watchForTabChanges } from './watchForTabChanges';

// Element may not exist if on a profile other than the one that's logged in
const mainbarFull = document.querySelector('#mainbar-full');
if (mainbarFull) {
    window.StackExchange.ready(() => {
        /* Need to wait for SE's JS to call StackExchange.user.expandPostBody
         * which inserts the expander-arrow-small-hide elements into the TRs
         * see https://dev.stackoverflow.com/content//Js/user.en.js
         */
        insertStyle();
        watchForTabChanges(mainbarFull);
    });
}
