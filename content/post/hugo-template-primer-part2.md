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
title = "Hugo template primer - Part 1"

+++


## Functions

Go template ship with a few functions which provide basic functionality. The go
template system also provides a mechanism for applications to extend the
available functions with their own. [Hugo template
functions](/layout/functions) provide some additional functionality we believe
are useful for building websites. Functions are called by using their name
followed by the required parameters separated by spaces. Template
functions cannot be added without recompiling hugo.

**Example:**

    {{ add 1 2 }}

## Includes

When including another template you will pass to it the data it will be
able to access. To pass along the current context please remember to
include a trailing dot. The templates location will always be starting at
the /layout/ directory within Hugo.

**Example:**

    {{ template "chrome/header.html" . }}


## Logic

Go templates provide the most basic iteration and conditional logic.

### Iteration

Just like in go, the go templates make heavy use of range to iterate over
a map, array or slice. The following are different examples of how to use
range.

**Example 1: Using Context**

    {{ range array }}
        {{ . }}
    {{ end }}

**Example 2: Declaring value variable name**

    {{range $element := array}}
        {{ $element }}
    {{ end }}

**Example 2: Declaring key and value variable name**

    {{range $index, $element := array}}
        {{ $index }}
        {{ $element }}
    {{ end }}

### Conditionals

If, else, with, or, & and provide the framework for handling conditional
logic in Go Templates. Like range, each statement is closed with `end`.


Go Templates treat the following values as false:

* false
* 0
* any array, slice, map, or string of length zero

**Example 1: If**

    {{ if isset .Params "title" }}<h4>{{ index .Params "title" }}</h4>{{ end }}

**Example 2: If -> Else**

    {{ if isset .Params "alt" }}
        {{ index .Params "alt" }}
    {{else}}
        {{ index .Params "caption" }}
    {{ end }}

**Example 3: And & Or**

    {{ if and (or (isset .Params "title") (isset .Params "caption")) (isset .Params "attr")}}

**Example 4: With**

An alternative way of writing "if" and then referencing the same value
is to use "with" instead. With rebinds the context `.` within its scope,
and skips the block if the variable is absent.

The first example above could be simplified as:

    {{ with .Params.title }}<h4>{{ . }}</h4>{{ end }}

**Example 5: If -> Else If**

    {{ if isset .Params "alt" }}
        {{ index .Params "alt" }}
    {{ else if isset .Params "caption" }}
        {{ index .Params "caption" }}
    {{ end }}
