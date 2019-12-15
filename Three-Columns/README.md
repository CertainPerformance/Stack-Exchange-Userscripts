# Three Columns (&#8202;[install](https://github.com/CertainPerformance/Stack-Exchange-Userscripts/raw/master/Three-Columns/dist/StackThreeColumns.user.js)&#8202;)

Allows those with reasonably wide monitors to make the most of their screen real-estate when posting, by making the question, the post textarea, and the post preview visible at once in side-by-side columns:

![screenshot](https://raw.githubusercontent.com/CertainPerformance/Stack-Exchange-Userscripts/master/Three-Columns/userscript-screenshot.png)

Whenever you start composing an answer, a question, or start editing a post, if the 3-column layout is not already active, it's created automatically. You can close and open the layout by pressing the script-created button at the bottom of the post. The rest of the page will remain visible in the left column.

Almost all of the changes the script makes are through CSS only - the actual DOM is not rearranged, so everything else on the page, including other userscripts, should continue to behave normally, for the most part.

## Why?

* It's handy to be able to copy code directly from the question to the answer textarea without having to scroll

* Similarly, you can compare OP's desired output against your code without having to scroll up and down

* The default post textarea is *incredibly tiny* (IMO). If you fill more than 10 rows or so (which is quite likely for any reasonable answer, especially one with multiple paragraphs and code), you'll probably find yourself scrolling the textarea frequently. (You'll either have to do that, or manually resize the textarea to a reasonable size, which is tedious to have to do every time you want to write an answer.) In contrast, it's much easier to navigate and edit large amounts of Markdown inside a full-height textarea.

* We aren't perfect typers. When you see that the post preview doesn't match the output you were aiming for, you'll have to find the corresponding location in the textarea and make changes. This is a lot easier to do when the textarea and the preview are side-by-side, and when the vertical position of the problem in the preview (often) roughly corresponds to the vertical position in the textarea that needs to be edited.

Caveat: The Community Wiki option is hidden in the 3-column layout, because (at least in my experience) it's rarely used, and takes up precious vertical space that could be utilized by the textarea. To make a post Community Wiki, exit the 3-column layout first.

Recommended to be used in combination with [Preview Antifocus](https://github.com/CertainPerformance/Stack-Exchange-Userscripts/tree/master/Preview-Antifocus), to prevent the textarea from stealing focus when clicking on the post preview.
