# Snippt Lag Fixer (&#8202;[install](https://github.com/CertainPerformance/Stack-Exchange-Userscripts/raw/master/Stack-Snippet-Userscripts/Lag-Fixer/StackSnippetLagFixer.user.js)&#8202;)

By default, Stack Snippets in post previews re-render *immediately* when changes are made to the textarea. On lower-end machines, or with certain hardware or graphics setups, these re-renders can get pretty expensive, especially when there are multiple snippets in the preview, making the whole tab difficult to use.

This userscript re-renders previews with snippets only after there has been no input activity for a time (700ms by default; you can adjust this by changing the variable at the top of the script), *or* after the mouse is moved.

Before userscript:

[![before](https://github.com/CertainPerformance/Stack-Exchange-Userscripts/raw/master/Stack-Snippet-Userscripts/Lag-Fixer/before.gif)](https://github.com/CertainPerformance/Stack-Exchange-Userscripts/raw/master/Stack-Snippet-Userscripts/Lag-Fixer/before.gif)

After userscript:

[![after](https://github.com/CertainPerformance/Stack-Exchange-Userscripts/raw/master/Stack-Snippet-Userscripts/Lag-Fixer/after.gif)](https://github.com/CertainPerformance/Stack-Exchange-Userscripts/raw/master/Stack-Snippet-Userscripts/Lag-Fixer/after.gif)
