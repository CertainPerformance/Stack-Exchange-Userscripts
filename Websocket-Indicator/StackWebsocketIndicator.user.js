// ==UserScript==
// @name             Stack Websocket Indicator
// @description      Indicates when the websocket is connected
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.0.0
// @include          /^https://(?:[^/]+\.)?(?:(?:stackoverflow|serverfault|superuser|stackexchange|askubuntu|stackapps)\.com|mathoverflow\.net)//
// @run-at           document-start
// @grant            none
// ==/UserScript==

// IMPORTANT: This script must run before the page content loads
// in order to reliably intercept the creation of the websocket
// If using Tampermonkey, you may need to enable instant script injection via:
// Settings -> Experimental -> Inject Mode -> Instant

'use strict';

const changeBorder = (color) => {
    const personalTopBar = document.querySelector('#search + ol');
    personalTopBar.style.borderLeft = `4px solid ${color}`;
    personalTopBar.style.borderRight = `4px solid ${color}`;
};
const OrigWebSocket = window.WebSocket;
// A new WebSocket will be instantiated on initial page load
// In some circumstances, SE will also try to re-instantiate a new socket after the old websocket closes
window.WebSocket = function (...args) {
    const socket = new OrigWebSocket(...args);
    // Assigning the border here rather than outside will indicate that the patching was successful:
    changeBorder('lightgreen');
    socket.addEventListener('close', () => {
        // A red border might indicate that no future notifications will occur, but it's not a guarantee; a new socket might be made
        changeBorder('red');
    });
    return socket;
};
