---
layout: layouts/page
tags:
  - mySitePages
pagination:
  alias: sitePage
  data: sitePages
  size: 1
  addAllPagesToCollections: true
permalink: "{{ sitePage.content.slug.current | slug }}/index.html"
---