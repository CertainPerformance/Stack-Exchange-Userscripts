# Right Content (&#8202;[install](https://github.com/CertainPerformance/Stack-Exchange-Userscripts/raw/master/Right-Content/StackRightContent.user.js)&#8202;)

When on a Stack Overflow question page, the userscripts [One Click VTC](https://github.com/CertainPerformance/Stack-Exchange-Userscripts/tree/master/One-Click-VTC) and [Speak New Questions](https://github.com/CertainPerformance/Stack-Exchange-Userscripts/tree/master/Speak-New-Questions) require empty space to the left of the main page content, so there's enough space to put the userscripts' interfaces. This is just fine for users with wide screens or with a low browser zoom level, but not for others, who may just not have enough horizontal empty space there.

This userscript pushes the main page content to the right, so that there's enough space on the left for the userscript interfaces, even for those with thinner screens.

For additional space, [disable the left sidebar too](https://stackoverflow.com/users/preferences/).

Screenshot when window is 1450px wide at 100% zoom level, with both One Click VTC and Speak New Questions enabled:

![screenshot](https://raw.githubusercontent.com/CertainPerformance/Stack-Exchange-Userscripts/master/Right-Content/userscript-screenshot.png)

To avoid layout flickering during pageload, this script must run before before the page content loads.If using Tampermonkey, enable instant script injection via:

Settings -> Experimental -> Inject Mode -> Instant
