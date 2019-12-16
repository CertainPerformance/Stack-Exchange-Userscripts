import { getDB, setDB } from '../commentDB';
import { saveComment } from './saveComment';

export const makeSaveAllVisibleComments = (userHref: string) => async () => {
    const anchorsToSave = [...document.querySelectorAll<HTMLAnchorElement>('a.comment-user')]
        .filter(({ href }) => href === userHref);
    if (!anchorsToSave.length) {
        return;
    }
    const savedComments = await getDB();
    const anyChangesMade = anchorsToSave.reduce((a, anchor) => saveComment(anchor, savedComments) || a, false);
    if (anyChangesMade) {
        await setDB(savedComments);
    }
};
