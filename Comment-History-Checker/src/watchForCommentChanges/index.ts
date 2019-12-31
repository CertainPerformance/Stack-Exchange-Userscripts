import { watchForNewComments } from './watchForNewComments';
import { watchForSelfDeletedComments } from './watchForSelfDeletedComments';

export const watchForCommentChanges = () => {
    watchForSelfDeletedComments();
    window.StackExchange.ready(() => {
        window.setTimeout(watchForNewComments);
    });
};
