import { getDB, setDB } from '../commentDB';

export const saveDeletedComment = async (commentId: number) => {
    const savedComments = await getDB();
    const thisSavedComment = savedComments[commentId];
    // This probably shouldn't ever happen
    // if a comment is deleted, that comment *should* have been put into the DB, either on pageload, or when user clicks to show new or hidden comments
    if (!thisSavedComment) {
        return;
    }
    // I don't consider object spread to be sufficiently supported to use it
    savedComments[commentId] = Object.assign({}, thisSavedComment, { selfDeleted: true });
    await setDB(savedComments);
};
