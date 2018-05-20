# Beehive Theme- A lean publishing engine running on Hugo!

## This theme is work in progress
Started this theme to power my my blog https://pineboat.in. Designing this from the ground up to be minimalistic. [Beautiful](https://github.com/halogenica/beautifulhugo) hugo theme is my go to reference for most of my work on this theme.

## Key Features
- [X] Accessibility
- [x] Mobile First
- [x] Progressive Web App
- [x] Offline Content (Service Workers)
- [x] Reusable Pagination
- [x] Sidebars
- [x] Multiple Authors
- [X] SVG Icons
- [X] CSS Grid Layout
- [X] SEO Optimization
- [X] Search Engine
- [X] Social Integration
- [X] High Performance
- [X] Less network requests
- [ ] Featured Articles
- [X] Subscriptions
- [ ] Proper Caching 


## Development

Spring up the docker container to run hugo server:

```sh
docker-compose up
```

On another terminal, run `watch` script to compile styles:

```
docker-compose exec web npm run watch
```