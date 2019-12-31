# Dev Tips

## Dependency graph

Each Typescript userscript has a dependency graph called `madge-dependency-graph.png` in its main directory, for easy visualization of which modules depend on which other modules. To create these yourself with `npm run graph`, you'll need [Madge](https://www.npmjs.com/package/madge) and [Graphviz](https://www.graphviz.org/).

## Live changes
It's handy to be able to see the effects of your changes to the Typescript source on the runnable userscript immediately (which is as close to live reloading as one can get). To achieve this:

(1) Enable extension access to local file access, if needed ([Tampermonkey instructions](https://www.tampermonkey.net/faq.php#Q204))

(2) In your userscript manager, change the userscript's metadata block to `@require` the live development version, which will be built in the userscript's root directory and end in `LiveDev.user.js`. Also remove *all* code below the metadata block. For example, the complete script in your userscript manager may look like:

```
// ==UserScript==
// @name             Stack Comment History Checker
// @description      Review the status and reception of your comments and their parent posts
// @author           CertainPerformance
// @namespace        https://github.com/CertainPerformance/Stack-Exchange-Userscripts
// @version          1.0.0
// @include          /^https://(?:[^/]+\.)?(?:(?:stackoverflow|serverfault|superuser|stackexchange|askubuntu|stackapps)\.com|mathoverflow\.net)/(?:users/.*\?tab=activity|questions/\d|review/[^/]+(?:/\d+|$))/
// @require          file://D:/Javascript/Stack-Exchange-Userscripts/Comment-History-Checker/StackCommentHistoryCheckerLiveDev.user.js
// @grant            none
// ==/UserScript==
```

(3) Run `npm run watch`. After you make a change, if the build succeeds, refreshing a page the script runs on should result in the updated script running, no copy-pasting required

## Reading Stack Exchange's Javascript

To read and debug Stack Exchange's JS, first identify the location of the code you want to trace on the site. For example, in Chrome, after clicking on an element, go to the Event Listeners tab and [click](https://raw.githubusercontent.com/CertainPerformance/Stack-Exchange-Userscripts/master/images/Trace-SE-JS-Listeners.png) on a listener link to view the [location in the minified code](https://raw.githubusercontent.com/CertainPerformance/Stack-Exchange-Userscripts/master/images/Trace-SE-JS-Minified.png) where the listener was attached. To view the unminified code, go to `dev.stackoverflow.com/content//${pathname}`, where `${pathname}` is the same pathname as the one for the minified script. For example, if the script on the page is

    https://cdn.sstatic.net/Js/full.en.js

then, to view the unminified source, go to

    https://dev.stackoverflow.com/content//Js/full.en.js

The same pattern can be used to view the source of `wmd.en.js`, `stub.en.js`, etc.

Once you've found a location in the minified code, find unique string(s) around it and search for those strings in the unminified source, and you should be able to identify the [corresponding source location](https://raw.githubusercontent.com/CertainPerformance/Stack-Exchange-Userscripts/master/images/Trace-SE-JS-Source.png). From there, you can see the readable variable names, comments, and so on.

Unfortunately, this method isn't foolproof - you may have to fiddle with the URL on dev.stackoverflow.com, or you may not be able to find the source at all.
