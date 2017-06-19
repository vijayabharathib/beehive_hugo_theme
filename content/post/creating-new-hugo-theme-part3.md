+++
author = "michaelhenderson"
date = "2017-06-16T22:02:51+05:30"
publishdate = "2017-06-16T22:02:51+05:30"
subtitle = "Sample content for new themes"
tags = ["hugo","theme"]
title = "Creating new hugo theme - Part 3"
+++


## The Theme Development Cycle

When you're working on a theme, you will make changes in the theme's directory, rebuild the site, and check your changes in the browser. Hugo makes this very easy:

1. Purge the public/ directory.
2. Run the built in web server in watch mode.
3. Open your site in a browser.
4. Update the theme.
5. Glance at your browser window to see changes.
6. Return to step 4.

I’ll throw in one more opinion: never work on a theme on a live site. Always work on a copy of your site. Make changes to your theme, test them, then copy them up to your site. For added safety, use a tool like Git to keep a revision history of your content and your theme. Believe me when I say that it is too easy to lose both your mind and your changes.

Check the main Hugo site for information on using Git with Hugo.

### Purge the public/ Directory

When generating the site, Hugo will create new files and update existing ones in the ```public/``` directory. It will not delete files that are no longer used. For example, files that were created in the wrong directory or with the wrong title will remain. If you leave them, you might get confused by them later. I recommend cleaning out your site prior to generating it.

Note: If you're building on an SSD, you should ignore this. Churning on a SSD can be costly.

### Hugo's Watch Option

Hugo's "`--watch`" option will monitor the content/ and your theme directories for changes and rebuild the site automatically.

### Live Reload

Hugo's built in web server supports live reload. As pages are saved on the server, the browser is told to refresh the page. Usually, this happens faster than you can say, "Wow, that's totally amazing."

### Development Commands

Use the following commands as the basis for your workflow.

```
## purge old files. hugo will recreate the public directory.
##
$ rm -rf public
##
## run hugo in watch mode
##
$ hugo server --watch --verbose
```

Here's sample output showing Hugo detecting a change to the template for the home page. Once generated, the web browser automatically reloaded the page. I've said this before, it's amazing.


```
$ rm -rf public
$ hugo server --watch --verbose
INFO: 2014/09/29 Using config file: /Users/quoha/Sites/zafta/config.toml
INFO: 2014/09/29 syncing from /Users/quoha/Sites/zafta/themes/zafta/static/ to /Users/quoha/Sites/zafta/public/
INFO: 2014/09/29 syncing from /Users/quoha/Sites/zafta/static/ to /Users/quoha/Sites/zafta/public/
WARN: 2014/09/29 Unable to locate layout: [404.html theme/404.html]
0 draft content
0 future content
0 pages created
0 tags created
0 categories created
in 2 ms
Watching for changes in /Users/quoha/Sites/zafta/content
Serving pages from /Users/quoha/Sites/zafta/public
Web Server is available at http://localhost:1313
Press Ctrl+C to stop
INFO: 2014/09/29 File System Event: ["/Users/quoha/Sites/zafta/themes/zafta/layouts/index.html": MODIFY|ATTRIB]
Change detected, rebuilding site

WARN: 2014/09/29 Unable to locate layout: [404.html theme/404.html]
0 draft content
0 future content
0 pages created
0 tags created
0 categories created
in 1 ms
```
