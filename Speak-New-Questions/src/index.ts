import '../../common/declareGlobalStackExchange';
import { handleQuestionListPage } from './questionListPage';
import { handleQuestionPage } from './questionPage';
import { handleFakePage } from './handleFakePage';

declare global {
    interface Window {
        $: JQueryStatic;
    }
}

if (window.location.href === 'https://example.com/fakepage') {
    handleFakePage();
} else if (/\/questions\/\d+/.test(window.location.href)) {
    handleQuestionPage();
} else {
    handleQuestionListPage();
}
