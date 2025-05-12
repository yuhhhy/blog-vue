---
title: "彻底解决 Prismjs 代码高亮夜间模式下字体很糊的问题"
author: "一曝十寒"
coverImage: "/images/prismjs-0.jpg"
date: "2025-05-12"
tags: ["CSS"]
---
# Prismjs

我在开发个人博客的时候，需要实现一个代码高亮功能。所以我搜索了代码高亮库，比较主流的有 `highlightjs` 、`prismjs`，我一开始使用的是prismjs。当然highlightjs也可以实现同样的效果，我也用了，但是觉得没找到好看的主题

在Node中安装prismjs：

```bash
npm install prismjs
```

引入：

```bash
import Prism from 'prismjs'
```

使用：（更多请查看 [Prismjs.com](https://prismjs.com/)）

```js
// 对经过markdown-it格式化后的html，使用这种方式
document.querySelectorAll('pre code').forEach((block) => {
    Prism.highlightElement(block)
})
// 或者在异步方法结束后使用
Prism.highlightAll()


// 对于字符串，使用这种方式
const code = `var data = 1`
const html = Prism.highlight(code, Prism.languages.javascript, 'javascript')

// 在原生html中，使用这种方式
<!DOCTYPE html>
<html>
<head>
    ...
    <link href="themes/prism.css" rel="stylesheet" />
</head>
<body>
    ...
    <script src="prism.js"></script>
</body>
</html>
```

# 遇到的问题

正常情况下，prismjs渲染的代码是这样的：

![prismjs-1](/images/prismjs-1.jpg)

但是夜间模式下，代码就会显得很糊：

![prismjs-2](/images/prismjs-2.jpg)

可以看到，代码块出现了重影的效果，让人看了眼花。这是为什么呢？让我们看看使用开发者工具检查一下。

![prismjs-3](/images/prismjs-3.jpg)

我们发现原来是默认的hilightjs给 `<code>` 标签设置了 `text-shadow` 样式，所以我们只要在CSS中添加样式覆盖默认样式就好：

```css
.code {
    text-shadow: none;
}
```

或者不放心还可以加上：

```css
.pre .code {
    text-shadow: none;
}
```

这样即使在夜间模式也不会出现模糊的效果了！

# 最终效果

![prismjs-4](/images/prismjs-4.jpg)

![prismjs-5](/images/prismjs-5.jpg)
