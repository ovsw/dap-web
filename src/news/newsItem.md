---
layout: layouts/page
tags:
  - mySiteNews
pagination:
  alias: siteNewsItem
  data: siteNews
  size: 1
  addAllPagesToCollections: true
permalink: "/news/{{ siteNewsItem.content.slug.current }}/index.html"
---