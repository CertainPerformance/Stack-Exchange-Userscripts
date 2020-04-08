# Snippet Render All Lines (&#8202;[install](https://github.com/CertainPerformance/Stack-Exchange-Userscripts/raw/master/Stack-Snippet-Userscripts/Lag-Fixer/StackSnippetRenderAllLines.user.js)&#8202;)

Due to [performance issues](https://codemirror.net/doc/manual.html#option_viewportMargin), CodeMirror ony renders ~10 code lines above and below the viewport. For example, if you're currently scrolled to the point that lines 50 to 80 are visible, lines below ~40 will not exist in the DOM, nor will lines above ~90. This can improve performance when on a lower-end machines, or when there are an unreasonably large number of lines.

The disadvantage of hiding lines is that text inside the hidden lines can't be searched for with the browser's Find. For example, if you see a variable `someVarName` and want to search for all references to it, Control-F will only show you results between lines 40 and 90 or so. To actually find all references, you'll need to manually scroll through the whole code area while re-searching, which is tedious and disorienting while debugging.

This userscript re-enables easy Find-ing by rendering all lines. The vast majority snippets in Stack Exchange are of a reasonable size, and *most* developers have decent enough machines anyway, so the negative performance impact should almost always be negligible.

For more effective Control-F inside snippets, consider using [Snippet Find](https://github.com/CertainPerformance/Stack-Exchange-Userscripts/tree/master/Stack-Snippet-Userscripts/Find) as well.
