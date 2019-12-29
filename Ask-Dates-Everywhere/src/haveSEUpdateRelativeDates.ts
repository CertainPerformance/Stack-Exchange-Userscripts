export const haveSEUpdateRelativeDates = () => {
    // updateRelativeDates is defined in full.en.js, which is loaded dynamically by stub.en.js - probably won't exist immediately on pageload
    if (window.StackExchange.realtime) {
        window.StackExchange.realtime.updateRelativeDates();
    } else {
        const full = document.head.querySelector('script[src*="/Js/full."]');
        if (full) {
            // Should always exist under normal circumstances
            full.addEventListener('load', () => {
                window.StackExchange.realtime.updateRelativeDates();
            });
        }
    }
};
