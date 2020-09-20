# Websocket Indicator (&#8202;[install](https://github.com/CertainPerformance/Stack-Exchange-Userscripts/raw/master/Websocket-Indicator/StackWebsocketIndicator.user.js)&#8202;)

Adds a visual indicator to the topbar indicating whether the websocket to Stack Exchange is open or not:

![screenshot](https://raw.githubusercontent.com/CertainPerformance/Stack-Exchange-Userscripts/master/Websocket-Indicator/userscript-screenshot.png)

When the vertical lines are green, the socket is active. When the vertical lines are red, the socket is closed.

The websocket is used for server-sent notifications, including:

- New questions, answers, comments, and edits
- Inbox messages
- Reputation changes

If something happens with your network connection (for example, if you change wireless networks, or your router gets restarted), the socket may close, and these notifications will not occur on that browser tab anymore. This userscript gives you an easy visual indicator of when the connection has broken (and thus of when you probably want to reload the page).

Stack Exchange will sometimes try to re-instantiate the socket after a few minutes if its connection has died (in which case the lines will turn green if the new socket succeeds), but it doesn't always occur; reloading the whole page to start from scratch is a more reliable method.
