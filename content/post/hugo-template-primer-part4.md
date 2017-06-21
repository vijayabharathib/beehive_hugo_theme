+++
author = "michaelhenderson"
date = "2017-06-16T22:16:06+05:30"
publishdate = "2017-06-16T22:02:51+05:30"
subtitle = "Sample content for new themes"
tags = [
    "go",
    "golang",
    "templates",
    "themes",
    "development",
]
title = "Hugo template primer - Part 4"

+++

# Hugo Parameters

Hugo provides the option of passing values to the template language
through the site configuration (for sitewide values), or through the meta
data of each specific piece of content. You can define any values of any
type (supported by your front matter/config format) and use them however
you want to inside of your templates.


## Using Content (page) Parameters

In each piece of content you can provide variables to be used by the
templates. This happens in the [front matter](/content/front-matter).

An example of this is used in this documentation site. Most of the pages
benefit from having the table of contents provided. Sometimes the TOC just
doesn't make a lot of sense. We've defined a variable in our front matter
of some pages to turn off the TOC from being displayed.

Here is the example front matter:

```
---
title: "Permalinks"
date: "2013-11-18"
aliases:
  - "/doc/permalinks/"
groups: ["extras"]
groups_weight: 30
notoc: true
---
```

Here is the corresponding code inside of the template:

      {{ if not .Params.notoc }}
        <div id="toc" class="well col-md-4 col-sm-6">
        {{ .TableOfContents }}
        </div>
      {{ end }}
