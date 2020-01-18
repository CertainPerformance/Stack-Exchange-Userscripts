# Instant Syntax Highlighting (&#8202;[install](https://github.com/CertainPerformance/Stack-Exchange-Userscripts/raw/master/Instant-Syntax-Highlighting/StackInstantSyntaxHighlighting.user.js)&#8202;)

While writing a post, syntax highlighting on the post preview will only occur after 5 seconds of inactivity, by default. This userscript reduces that debounce time to 200 ms, so that code gets syntax highlighted near immediately.

Also, by default, syntax highlighting also does not occur when initially focusing on a textarea of a post you're editing, nor is it called after you press "Save & insert into post" in a Stack Snippet, resulting in the post preview remaining unhighlighted until you make *another* change. This userscript fixes those issues too, so the post preview should never remain without syntax highlighting for any significant period of time.

Installing this *might* result in decreased performance for lower-end machines when the code blocks to be processed are long and complicated.
