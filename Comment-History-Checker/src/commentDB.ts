/* The ultimate output bundle will not be minified, for the sake of easier debugging
 * But localforage, if imported ordinarily without minification, will be a HUGE part of the output bundle
 * despite its implementation being near-irrelevant to this script
 * So, the minified version of localforage is imported instead
 */
// @ts-ignore
import * as localforageUntyped from '../node_modules/localforage/dist/localforage.min.js';
const localforage = localforageUntyped as typeof import('localforage');

// Only allow a get or set operation after the previous operation is complete:
let lastProm: Promise<SavedComments | void> = Promise.resolve();
export const getDB = async () => {
    await lastProm;
    lastProm = localforage.getItem<SavedComments>('cpuserscriptCommentHistoryCheckerSavedComments');
    return (await lastProm) || {};
};
export const setDB = async (newData: SavedComments) => {
    await lastProm;
    lastProm = localforage.setItem('cpuserscriptCommentHistoryCheckerSavedComments', newData);
    return lastProm;
};

// To debug the database, temporarily add this to the userscript metadata block (or insert it into the DOM as a script tag) so window.localforage can be used:
// @require          https://cdn.jsdelivr.net/npm/localforage@1.7.3/dist/localforage.min.js#sha256=1ff66c1e32922549d0c824076703e69fb5535857934c8faa8023f51a4881f732
