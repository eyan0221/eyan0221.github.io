---
layout: post
title: "Github Pages and Octopress"
date: 2014-09-05 17:37:05 +0800
comments: true
categories: [Github, git, Octopress]
toc: true
author: Emma Yan
---

One way to create and write your own blog.

## Create new repository in github
For example, eyan0221.github.io.git

## Install rvm
```
curl -L https://get.rvm.io | bash -s stable
rvm install 1.9.3
rvm use 1.9.3
ruby --version
```

## Setup Octopress
```
git clone git://github.com/imathis/octopress.git octopress
cd octopress/
gem install bundler
bundle install
rake install
```

## Deploy Github Pages
```
sudo apt-get install nodejs
rake setup_github_pages
rake new_post
rake preview        # check output in http://localhost:4000
rake generate
rake deploy
git push git@github.com:eyan0221/eyan0221.github.io.git source
```

## markup
* copy image to <octopress>/source/images/ and use below syntax to embed images
{% codeblock %}
{% img /images/name.png %}
{% endcodeblock %}

## Reference
1.  [zerodie Github](http://zerodie.github.io/blog/2012/01/19/octopress-github-pages/)
2.  [Octopress Setup](http://octopress.org/docs/setup/)
3.  [Markdown Syntax](http://daringfireball.net/projects/markdown/syntax)
4.  [Markdown Wiki](http://en.wikipedia.org/wiki/Markdown)
5.  [TOC in Octopress](http://brizzled.clapper.org/blog/2012/02/04/generating-a-table-of-contents-in-octopress/)
6.  [brizzled github](https://github.com/bmc/brizzled)
7.  [Another Octopress TOC](http://jkamenik.github.io/blog/2013/07/07/octopress-toc/)
