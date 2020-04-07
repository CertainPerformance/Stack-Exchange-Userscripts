# Snippet Visible Cursor (&#8202;[install](https://github.com/CertainPerformance/Stack-Exchange-Userscripts/raw/master/Stack-Snippet-Userscripts/Visible-Cursor/StackSnippetVisibleCursor.user.js)&#8202;)

The CodeMirror text cursor elements are styled to have `border-left: 1px solid #0C0D0E;`. When the browser is zoomed to levels below 100%, this border is occasionally not visible when between certain characters, and you won't be able to see where you're typing without either entering a character or using the arrow keys to move a character to the left or right. (The lower the zoom level, the more frequently a random position will have an invisible text cursor.)

This fixes the display so that the text cursor will always be visible at every character position, regardless of browser zoom, by setting the thickness to `thin`. The actual resulting thickness may be browser-dependent, but it works properly in Chrome, at least.
