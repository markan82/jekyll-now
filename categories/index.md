---
layout: page
permalink: /categories/
title: Categories
---
<ul class="posts-list">
  {% for category in site.categories %}
    {% capture category_name %}{{ category | first }}{% endcapture %}
    <li><h4><a href="{{ site.baseurl }}{{ category_name }}">{{ category_name }} ({{ site.categories[category_name].size }})</a></h4></li>
  {% endfor %}
</ul>

<!-- <div id="archives">
{% for category in site.categories %}
  <div class="archive-group">
    {% capture category_name %}{{ category | first }}{% endcapture %}
    <div id="#{{ category_name | slugize }}"></div>
    <p></p>
    <li>
    <h3 class="category-head">{{ category_name }}</h3>
    <a name="{{ category_name | slugize }}"></a>
    {% for post in site.categories[category_name] %}
    <article class="archive-item">
      <h4><a href="{{ site.baseurl }}{{ post.url }}">{{post.title}}</a></h4>
    </article>
    {% endfor %}
  </div>
{% endfor %}
</div> -->