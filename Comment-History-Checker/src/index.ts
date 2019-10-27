import '../../common/declareGlobalStackExchange';
import { watchForCommentChanges } from './watchForCommentChanges';
import { watchForCommentTab } from './watchForCommentTab';

declare global {
    interface Window {
        $: JQueryStatic;
    }
}

if (window.location.href.includes('?tab=activity')) {
    watchForCommentTab();
} else {
    watchForCommentChanges();
}
