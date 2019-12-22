# Style Code After Edit Refresh (&#8202;[install](https://github.com/CertainPerformance/Stack-Exchange-Userscripts/raw/master/Style-Code-After-Edit-Refresh/StackStyleCodeAfterEditRefresh.user.js)&#8202;)

Stack Exchange's Javascript has a bug where, when a post is edited and "An edit has been made to this post" is clicked, Stack Snippets inside the refreshed post do not appear with buttons (so they aren't runnable), nor do non-snippet code blocks receive syntax highlighting inside the refreshed post. See bug reports [here](https://meta.stackexchange.com/q/334625), [here](https://meta.stackoverflow.com/q/388534), and [here](https://meta.stackoverflow.com/q/392257).

The problem is that the function that adds syntax highlighting and snippet controls (which is called `styleCode`, located on `window`) does not get called after an edit. Stack Exchange can fix this by editing `realtime-se.js` so that the `postEdit` function calls `styleCode` after calling `reloadPosts`: Change

    reloadPosts([post.id]);

to

    reloadPosts([post.id]).then(styleCode);

In the meantime, this userscript fixes the problem by watching for ajax requests that refresh an edited post, and calls `styleCode` when the edit finishes.
