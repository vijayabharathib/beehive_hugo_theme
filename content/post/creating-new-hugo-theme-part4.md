+++
author = "michaelhenderson"
date = "2017-06-16T22:02:51+05:30"
publishdate = "2017-06-16T22:02:51+05:30"
subtitle = "Sample content for new themes"
tags = ["hugo","theme"]
title = "Creating new hugo theme - Part 4"
+++



## Update the Home Page Template

The home page is one of a few special pages that Hugo creates automatically. As mentioned earlier, it looks for one of three files in the theme's layout/ directory:

1. index.html
2. _default/list.html
3. _default/single.html

We could update one of the default templates, but a good design decision is to update the most specific template available. That's not a hard and fast rule (in fact, we'll break it a few times in this tutorial), but it is a good generalization.

### Make a Static Home Page

Right now, that page is empty because we don't have any content and we don't have any logic in the template. Let's change that by adding some text to the template.

```
$ vi themes/zafta/layouts/index.html
<!DOCTYPE html>
<html>
<body>
  <p>hugo says hello!</p>
</body>
</html>
:wq

$
```

Build the web site and then verify the results.

```
$ hugo --verbose
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

$ find public -type f -name '*.html' | xargs ls -l
-rw-r--r--  1 quoha  staff  78 Sep 29 21:26 public/index.html

$ cat public/index.html
<!DOCTYPE html>
<html>
<body>
  <p>hugo says hello!</p>
</html>
```

#### Live Reload

Note: If you're running the server with the `--watch` option, you'll see different content in the file:

```
$ cat public/index.html
<!DOCTYPE html>
<html>
<body>
  <p>hugo says hello!</p>
<script>document.write('<script src="http://'
        + (location.host || 'localhost').split(':')[0]
    + ':1313/livereload.js?mindelay=10"></'
        + 'script>')</script></body>
</html>
```

When you use `--watch`, the Live Reload script is added by Hugo. Look for live reload in the documentation to see what it does and how to disable it.

### Build a "Dynamic" Home Page

"Dynamic home page?" Hugo's a static web site generator, so this seems an odd thing to say. I mean let's have the home page automatically reflect the content in the site every time Hugo builds it. We'll use iteration in the template to do that.

#### Create New Posts

Now that we have the home page generating static content, let's add some content to the site. We'll display these posts as a list on the home page and on their own page, too.

Hugo has a command to generate a skeleton post, just like it does for sites and themes.

```
$ hugo --verbose new post/first.md
INFO: 2014/09/29 Using config file: /Users/quoha/Sites/zafta/config.toml
INFO: 2014/09/29 attempting to create  post/first.md of post
INFO: 2014/09/29 curpath: /Users/quoha/Sites/zafta/themes/zafta/archetypes/default.md
ERROR: 2014/09/29 Unable to Cast <nil> to map[string]interface{}

$
```

That wasn't very nice, was it?

The "new" command uses an archetype to create the post file. Hugo created an empty default archetype file, but that causes an error when there's a theme. For me, the workaround was to create an archetypes file specifically for the post type.

```
$ vi themes/zafta/archetypes/post.md
+++
Description = ""
Tags = []
Categories = []
+++
:wq

$ find themes/zafta/archetypes -type f | xargs ls -l
-rw-r--r--  1 quoha  staff   0 Sep 29 21:53 themes/zafta/archetypes/default.md
-rw-r--r--  1 quoha  staff  51 Sep 29 21:54 themes/zafta/archetypes/post.md

$ hugo --verbose new post/first.md
INFO: 2014/09/29 Using config file: /Users/quoha/Sites/zafta/config.toml
INFO: 2014/09/29 attempting to create  post/first.md of post
INFO: 2014/09/29 curpath: /Users/quoha/Sites/zafta/themes/zafta/archetypes/post.md
INFO: 2014/09/29 creating /Users/quoha/Sites/zafta/content/post/first.md
/Users/quoha/Sites/zafta/content/post/first.md created

$ hugo --verbose new post/second.md
INFO: 2014/09/29 Using config file: /Users/quoha/Sites/zafta/config.toml
INFO: 2014/09/29 attempting to create  post/second.md of post
INFO: 2014/09/29 curpath: /Users/quoha/Sites/zafta/themes/zafta/archetypes/post.md
INFO: 2014/09/29 creating /Users/quoha/Sites/zafta/content/post/second.md
/Users/quoha/Sites/zafta/content/post/second.md created

$ ls -l content/post
total 16
-rw-r--r--  1 quoha  staff  104 Sep 29 21:54 first.md
-rw-r--r--  1 quoha  staff  105 Sep 29 21:57 second.md

$ cat content/post/first.md
+++
Categories = []
Description = ""
Tags = []
date = "2014-09-29T21:54:53-05:00"
title = "first"

+++
my first post

$ cat content/post/second.md
+++
Categories = []
Description = ""
Tags = []
date = "2014-09-29T21:57:09-05:00"
title = "second"

+++
my second post

$
```

Build the web site and then verify the results.

```
$ rm -rf public
$ hugo --verbose
INFO: 2014/09/29 Using config file: /Users/quoha/Sites/zafta/config.toml
INFO: 2014/09/29 syncing from /Users/quoha/Sites/zafta/themes/zafta/static/ to /Users/quoha/Sites/zafta/public/
INFO: 2014/09/29 syncing from /Users/quoha/Sites/zafta/static/ to /Users/quoha/Sites/zafta/public/
INFO: 2014/09/29 found taxonomies: map[string]string{"category":"categories", "tag":"tags"}
WARN: 2014/09/29 Unable to locate layout: [404.html theme/404.html]
0 draft content
0 future content
2 pages created
0 tags created
0 categories created
in 4 ms
$
```

The output says that it created 2 pages. Those are our new posts:

```
$ find public -type f -name '*.html' | xargs ls -l
-rw-r--r--  1 quoha  staff  78 Sep 29 22:13 public/index.html
-rw-r--r--  1 quoha  staff   0 Sep 29 22:13 public/post/first/index.html
-rw-r--r--  1 quoha  staff   0 Sep 29 22:13 public/post/index.html
-rw-r--r--  1 quoha  staff   0 Sep 29 22:13 public/post/second/index.html
$
```

The new files are empty because because the templates used to generate the content are empty. The homepage doesn't show the new content, either. We have to update the templates to add the posts.

### List and Single Templates

In Hugo, we have three major kinds of templates. There's the home page template that we updated previously. It is used only by the home page. We also have "single" templates which are used to generate output for a single content file. We also have "list" templates that are used to group multiple pieces of content before generating output.

Generally speaking, list templates are named "list.html" and single templates are named "single.html."

There are three other types of templates: partials, content views, and terms. We will not go into much detail on these.

### Add Content to the Homepage

The home page will contain a list of posts. Let's update its template to add the posts that we just created. The logic in the template will run every time we build the site.

```
$ vi themes/zafta/layouts/index.html
<!DOCTYPE html>
<html>
<body>
  {{ range first 10 .Data.Pages }}
    <h1>{{ .Title }}</h1>
  {{ end }}
</body>
</html>
:wq

$
```

Hugo uses the Go template engine. That engine scans the template files for commands which are enclosed between "{{" and "}}". In our template, the commands are:

1. range
2. .Title
3. end

The "range" command is an iterator. We're going to use it to go through the first ten pages. Every HTML file that Hugo creates is treated as a page, so looping through the list of pages will look at every file that will be created.

The ".Title" command prints the value of the "title" variable. Hugo pulls it from the front matter in the Markdown file.

The "end" command signals the end of the range iterator. The engine loops back to the top of the iteration when it finds "end." Everything between the "range" and "end" is evaluated every time the engine goes through the iteration. In this file, that would cause the title from the first ten pages to be output as heading level one.

It's helpful to remember that some variables, like .Data, are created before any output files. Hugo loads every content file into the variable and then gives the template a chance to process before creating the HTML files.

Build the web site and then verify the results.

```
$ rm -rf public
$ hugo --verbose
INFO: 2014/09/29 Using config file: /Users/quoha/Sites/zafta/config.toml
INFO: 2014/09/29 syncing from /Users/quoha/Sites/zafta/themes/zafta/static/ to /Users/quoha/Sites/zafta/public/
INFO: 2014/09/29 syncing from /Users/quoha/Sites/zafta/static/ to /Users/quoha/Sites/zafta/public/
INFO: 2014/09/29 found taxonomies: map[string]string{"tag":"tags", "category":"categories"}
WARN: 2014/09/29 Unable to locate layout: [404.html theme/404.html]
0 draft content
0 future content
2 pages created
0 tags created
0 categories created
in 4 ms
$ find public -type f -name '*.html' | xargs ls -l
-rw-r--r--  1 quoha  staff  94 Sep 29 22:23 public/index.html
-rw-r--r--  1 quoha  staff   0 Sep 29 22:23 public/post/first/index.html
-rw-r--r--  1 quoha  staff   0 Sep 29 22:23 public/post/index.html
-rw-r--r--  1 quoha  staff   0 Sep 29 22:23 public/post/second/index.html
$ cat public/index.html
<!DOCTYPE html>
<html>
<body>

    <h1>second</h1>

    <h1>first</h1>

</body>
</html>
$
```

Congratulations, the home page shows the title of the two posts. The posts themselves are still empty, but let's take a moment to appreciate what we've done. Your template now generates output dynamically. Believe it or not, by inserting the range command inside of those curly braces, you've learned everything you need to know to build a theme. All that's really left is understanding which template will be used to generate each content file and becoming familiar with the commands for the template engine.

And, if that were entirely true, this tutorial would be much shorter. There are a few things to know that will make creating a new template much easier. Don't worry, though, that's all to come.

### Add Content to the Posts

We're working with posts, which are in the content/post/ directory. That means that their section is "post" (and if we don't do something weird, their type is also "post").

Hugo uses the section and type to find the template file for every piece of content. Hugo will first look for a template file that matches the section or type name. If it can't find one, then it will look in the _default/ directory. There are some twists that we'll cover when we get to categories and tags, but for now we can assume that Hugo will try post/single.html, then _default/single.html.

Now that we know the search rule, let's see what we actually have available:

```
$ find themes/zafta -name single.html | xargs ls -l
-rw-r--r--  1 quoha  staff  132 Sep 29 17:31 themes/zafta/layouts/_default/single.html
```

We could create a new template, post/single.html, or change the default. Since we don't know of any other content types, let's start with updating the default.

Remember, any content that we haven't created a template for will end up using this template. That can be good or bad. Bad because I know that we're going to be adding different types of content and we're going to end up undoing some of the changes we've made. It's good because we'll be able to see immediate results. It's also good to start here because we can start to build the basic layout for the site. As we add more content types, we'll refactor this file and move logic around. Hugo makes that fairly painless, so we'll accept the cost and proceed.

Please see the Hugo documentation on template rendering for all the details on determining which template to use. And, as the docs mention, if you're building a single page application (SPA) web site, you can delete all of the other templates and work with just the default single page. That's a refreshing amount of joy right there.

#### Update the Template File

```
$ vi themes/zafta/layouts/_default/single.html
<!DOCTYPE html>
<html>
<head>
  <title>{{ .Title }}</title>
</head>
<body>
  <h1>{{ .Title }}</h1>
  {{ .Content }}
</body>
</html>
:wq

$
```

Build the web site and verify the results.

```
$ rm -rf public
$ hugo --verbose
INFO: 2014/09/29 Using config file: /Users/quoha/Sites/zafta/config.toml
INFO: 2014/09/29 syncing from /Users/quoha/Sites/zafta/themes/zafta/static/ to /Users/quoha/Sites/zafta/public/
INFO: 2014/09/29 syncing from /Users/quoha/Sites/zafta/static/ to /Users/quoha/Sites/zafta/public/
INFO: 2014/09/29 found taxonomies: map[string]string{"tag":"tags", "category":"categories"}
WARN: 2014/09/29 Unable to locate layout: [404.html theme/404.html]
0 draft content
0 future content
2 pages created
0 tags created
0 categories created
in 4 ms

$ find public -type f -name '*.html' | xargs ls -l
-rw-r--r--  1 quoha  staff   94 Sep 29 22:40 public/index.html
-rw-r--r--  1 quoha  staff  125 Sep 29 22:40 public/post/first/index.html
-rw-r--r--  1 quoha  staff    0 Sep 29 22:40 public/post/index.html
-rw-r--r--  1 quoha  staff  128 Sep 29 22:40 public/post/second/index.html

$ cat public/post/first/index.html
<!DOCTYPE html>
<html>
<head>
  <title>first</title>
</head>
<body>
  <h1>first</h1>
  <p>my first post</p>

</body>
</html>

$ cat public/post/second/index.html
<!DOCTYPE html>
<html>
<head>
  <title>second</title>
</head>
<body>
  <h1>second</h1>
  <p>my second post</p>

</body>
</html>
$
```

Notice that the posts now have content. You can go to localhost:1313/post/first to verify.

### Linking to Content

The posts are on the home page. Let's add a link from there to the post. Since this is the home page, we'll update its template.

```
$ vi themes/zafta/layouts/index.html
<!DOCTYPE html>
<html>
<body>
  {{ range first 10 .Data.Pages }}
    <h1><a href="{{ .Permalink }}">{{ .Title }}</a></h1>
  {{ end }}
</body>
</html>
```

Build the web site and verify the results.

```
$ rm -rf public
$ hugo --verbose
INFO: 2014/09/29 Using config file: /Users/quoha/Sites/zafta/config.toml
INFO: 2014/09/29 syncing from /Users/quoha/Sites/zafta/themes/zafta/static/ to /Users/quoha/Sites/zafta/public/
INFO: 2014/09/29 syncing from /Users/quoha/Sites/zafta/static/ to /Users/quoha/Sites/zafta/public/
INFO: 2014/09/29 found taxonomies: map[string]string{"tag":"tags", "category":"categories"}
WARN: 2014/09/29 Unable to locate layout: [404.html theme/404.html]
0 draft content
0 future content
2 pages created
0 tags created
0 categories created
in 4 ms

$ find public -type f -name '*.html' | xargs ls -l
-rw-r--r--  1 quoha  staff  149 Sep 29 22:44 public/index.html
-rw-r--r--  1 quoha  staff  125 Sep 29 22:44 public/post/first/index.html
-rw-r--r--  1 quoha  staff    0 Sep 29 22:44 public/post/index.html
-rw-r--r--  1 quoha  staff  128 Sep 29 22:44 public/post/second/index.html

$ cat public/index.html
<!DOCTYPE html>
<html>
<body>

    <h1><a href="/post/second/">second</a></h1>

    <h1><a href="/post/first/">first</a></h1>

</body>
</html>

$
```

### Create a Post Listing

We have the posts displaying on the home page and on their own page. We also have a file public/post/index.html that is empty. Let's make it show a list of all posts (not just the first ten).

We need to decide which template to update. This will be a listing, so it should be a list template. Let's take a quick look and see which list templates are available.

```
$ find themes/zafta -name list.html | xargs ls -l
-rw-r--r--  1 quoha  staff  0 Sep 29 17:31 themes/zafta/layouts/_default/list.html
```

As with the single post, we have to decide to update _default/list.html or create post/list.html. We still don't have multiple content types, so let's stay consistent and update the default list template.
