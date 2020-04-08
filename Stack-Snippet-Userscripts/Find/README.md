# Snippet Find (&#8202;[install](https://github.com/CertainPerformance/Stack-Exchange-Userscripts/raw/master/Stack-Snippet-Userscripts/Find/StackSnippetFind.user.js)&#8202;)

In most browsers, one can press Control-F or something similar to search the current page for a phrase. Pressing Enter will usually scroll you to the next match for the found string. This is extremely useful when programming - quickly identifying the location of each reference to a variable name or key string is quite helpful when debugging.

Unfortunately, the Stack Snippet editor has some problems with this: while one can of course search while inside the editor, matches to the searched string *outside the editor* will be included (and scrolled to with Enter) as well. This might be clearer with an image. Taking [this](https://stackoverflow.com/questions/55231134/sticky-header-jagged-movement/55231200) as an example, the question involves (among other things) a `.header-text` element. Say one copies the snippet to an answer and starts debugging by looking for the CSS rule for `header-text`. Press Control-F, type in `header-text`, and you'll see:

[![screenshot](https://i.stack.imgur.com/YijP1.png)](https://i.stack.imgur.com/YijP1.png)

Even though the code in the snippet being edited only has 2 matches for the string, 14 matches from all over the page are shown because the question and other answers also contain the string being searched for. One would either have to press enter 12 times to get to the first match in the snippet editor (match #13), or shift-enter to iterate backwards, which is unintuitive. (The snippet editor matches are always at the end, eg [matches 13/14 and 14/14](https://i.stack.imgur.com/DMYMM.png)). Answer code which is partially copied from the code in the question is extremely typical on SO, so this issue of a browser finding undesirable matches outside the snippet interface is quite common.

This userscript hides the background while the snippet editor is open. These hidden elements will not be "found" by the browser when searching, so this ensures that only matches inside the interface will be found/highlighted:

[![screenshot](https://i.stack.imgur.com/jfcV5.png)](https://i.stack.imgur.com/jfcV5.png)

For more effective Control-F inside snippets, consider using [Snippet Render All Lines](https://github.com/CertainPerformance/Stack-Exchange-Userscripts/tree/master/Stack-Snippet-Userscripts/Render-All-Lines) as well.
