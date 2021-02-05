type ToastSettings = {
    transient: false;
    type: 'danger';
} | {
    transientTimeout: number;
    transient: true;
    type: 'info';
};
/* Need to export something so that this gets interpreted as a module by TS, so that `declare global` works below
 * even if the export is rarely or never going to be used by importers
 * Could instead just export the interface, but then every single script would have to `declare global...`, which is WET
 *
 * Tiny downside: This way, *every* userscript will have window.StackExchange typed as existing,
 * even in the rare occasions that a userscript `@include`s a URL not on a StackExchange site
 */
export type StackExchange = {
    ready: (callback: () => void) => void;
    helpers: {
        suggestedTransientTimeout: (message: string, isToast: boolean) => number;
        showToast: (message: string, settings: ToastSettings) => void;
    };
    options: {
        serverTimeOffsetSec: number;
        site: {
            name: string;
        };
        user: {
            fkey: string;
            rep: number;
            userId: number;
        };
    };
    realtime: {
        updateRelativeDates: () => void;
    };
    topbar: {
        hideAll: () => void;
    };
    using: (moduleName: string, callback: () => void) => void;
};
declare global {
    interface Window {
        StackExchange: StackExchange;
    }
    const GM_info: undefined | {
        script: {
            name: string;
        }
    };
}
