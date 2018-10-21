
var searchBox = document.querySelector('#search-input');
var app_id = searchBox.getAttribute('data-algolia-appid');
var api_key = searchBox.getAttribute('data-algolia-apikey');
var index_name = searchBox.getAttribute('data-algolia-index');
var client = algoliasearch(app_id, api_key);
var index = client.initIndex(index_name);

  var footer= '<div style="font-size: .7em;display: flex;">' 
    + '<span>Search Powered by </span>' 
    + '<a href="https://www.algolia.com" style="display:flex;">'
    +' <img style="margin: 0 5px" src="/images/algolia.svg" alt="Algolia logo">'
    +'</img> Algolia </a></div>'
  autocomplete('#search-input',
    { 
      hint: false,
      autoselect: true,
      debug:true,
      keyboardShortcuts: ['s','/'] 
    }, [
      {
        source: autocomplete.sources.hits(index, { hitsPerPage: 10 }),
        displayKey: 'title',
        templates: {
          suggestion: function(suggestion) {
            return suggestion._highlightResult.title.value;
          },
          footer
      }
    }
  ]).on('autocomplete:selected', function(event, suggestion, dataset) {
    console.log(event,suggestion, dataset);
    event.target.value='';
    window.location.href = suggestion.url;
  });

 