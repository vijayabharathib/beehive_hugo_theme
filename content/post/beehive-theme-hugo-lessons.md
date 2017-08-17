+++
author = "vijayabharathib"
date = "2017-06-17T12:50:08+05:30"
publishdate = "2017-06-17T12:50:08+05:30"
subtitle = "lessons during beehive theme creation"
tags = ["theme","hugo","beehive"]
title = "beehive theme hugo lessons"
image = "new_logo.png"
+++

```
{{ if ne .Paginator.First.PageNumber .Paginator.PageNumber }}
  <li class="first active">
    <a href="{{ .URL }}page/{{ .Paginator.First.PageNumber }}">First
    </a>
  </li>
{{ else }}
  <li class="first inactive">
    <a href="{{ .URL }}page/{{ .Paginator.First.PageNumber }}">First
    </a>
  </li>
{{ end }}
{{/* if .Paginator.HasPrev }}
  <li class="previous">
    <a href="{{ .URL }}page/{{ .Paginator.Prev.PageNumber }}">&larr; {{ "Previous Page" }}</a>
  </li>
{{ else }}
  <li class="previous inactive">
    <a href="{{ .URL }}page/{{ .Paginator.Prev.PageNumber }}">&larr; {{ "Previous Page" }}</a>
  </li>
{{ end }}
```

if and else parts on 'first page' worked ok.

i just copied the if part of 'prev' page and placed it under else part.

obviously, the else part did not have a prev page and ended up throwing panic error.
