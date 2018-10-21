---
author: "vijayabharathib"
date: "2018-10-21T19:43:15+05:30"
title: "Search..."
---
<style type="text/css">
#search-input {
    font-size: 1.5em;
}
.algolia-autocomplete {
  width: 100%;
}
.algolia-autocomplete .aa-input, .algolia-autocomplete .aa-hint {
  width: 100%;
}
.algolia-autocomplete .aa-hint {
  color: #999;
}
.algolia-autocomplete .aa-dropdown-menu {
  width: 100%;
  background-color: #111;
  border: 1px solid #999;
  border-top: none;
}
.algolia-autocomplete .aa-dropdown-menu .aa-suggestion {
  cursor: pointer;
  padding: 10px 4px;
  border-bottom: 1px dotted #555;
}
.algolia-autocomplete .aa-dropdown-menu .aa-suggestion.aa-cursor {
  /* background-color: #B2D7FF; */
  background-color: black;
}
.algolia-autocomplete .aa-dropdown-menu .aa-suggestion em {
  font-weight: bold;
  font-style: normal;
}

.algolia-branding {
    font-size: .7em;
    background: #aaa;
}

.algolia-branding img {
    width: 60px;
}
</style>
<!-- The following contains sample app id, index name and apikey from Algolia for a mock ecommerce site. Replace with your own algolia details. -->
<input data-algolia-appid='latency' data-algolia-index='bestbuy' data-algolia-apikey='3d9875e51fbd20c7754e65422f7ce5e1' type="text" id="search-input" placeholder="Search terms..." />
<script src="https://cdn.jsdelivr.net/algoliasearch/3/algoliasearch.min.js"></script>
<script src="https://cdn.jsdelivr.net/autocomplete.js/0/autocomplete.min.js"></script>
<script src='/js/algolia.js'></script>