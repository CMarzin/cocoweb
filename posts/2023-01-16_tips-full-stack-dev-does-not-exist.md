---
title: Full stack Developer does not exist !
description: Tips and discovery of the week.
date: 2023-01-16
tags:
  - tips
  - Veille
  - repo git
  - web tools
  - CSS
layout: layouts/post.njk
---

## Veille

### [You Will Never Be A Full Stack Developer](https://seldo.com/posts/you-will-never-be-a-full-stack-developer)
Some career advice from [Laurie Voss](https://seldo.com/about/) about the impossibility to be a "full stack developer".

### [Docker on MacOS is slow and how to fix it](https://www.paolomainardi.com/posts/docker-performance-macos/)

TL;DR
At the time of writing, the only viable option to have a decent performance and a good DX are:

1. VirtioFS to share the filesystem (Docker Desktop, Rancher Desktop, Colima) - There are still some issues.
2. Use named volumes and if you use VSCode you can rely on things like DevContainers to have a good DX - 🚀 BONUS: PoC project with Backstage and DevContainers.
3. Use DDEV + Mutagen for PHP projects (JS coming soon).
4. If you are VI/Emacs user, all you need is your editor and tools in a container, or if you want a minimal Linux GUI env, take some inspiration here.


### [Laravel real-time Code Execution Monitoring](https://laravel-news.com/laravel-real-time-code-execution-monitoring)

Inspector is a composer package to add real-time code execution monitoring to your Laravel application. It allows you to work on continuous code changes while catching bugs and bottlenecks in real-time. Before users do.

### [Building an AI web app that helps restore old blurry photos !](https://twitter.com/nutlope/status/1612146290263003136)

### [backspace: make your website carbon neutral](https://beta.backspace.eco/)

Make your website carbonneutral.
The easiest way for developers to remove their websites’ CO2 emissions.


## Web tools

### [Fontshare: Quality Fonts. Free.](https://www.fontshare.com/)

### [Jitter · Fast and simple motion design tool.](https://jitter.video/)

## CSS

### [Quick Start - Sailboat UI](https://sailboatui.com/docs/getting-started/quick-start/)
Sailboat UI is a modern UI component library for Tailwind CSS, you just need to install Tailwind CSS and configure it.

### [Text Replace Transitions · 10 janvier 2023](https://nerdy.dev/text-replace-transitions)

**tldr;**
 [view-transition](https://developer.chrome.com/docs/web-platform/view-transitions/) ’s let me, **with CSS**, describe how to dismiss the old text state and reveal the new text state.

## Repository Github

[Neodrag | One draggable to rule em all](https://github.com/puruvj/neodrag)

Multi-framework libraries for dragging. Choose your framework, the dragging API behavior will stay the same 🔥.
A lightweight directive to make your elements draggable.
