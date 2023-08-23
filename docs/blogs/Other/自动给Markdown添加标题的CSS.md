---
  date: 2023/8/24 0:14
  pageClass: blue-archive
  tags:
    - CSS
  categories:
    - 未归档
---

# 自动给Markdown添加标题的CSS

```css
/**
 * GitHub Markdown Style with Headings Numbering
 */

/* General */

body {
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: #24292e;
    background-color: #fff;
}

a {
    color: #0366d6;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

h1, h2, h3, h4, h5, h6 {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 600;
    line-height: 1.25;
}

h1 {
    font-size: 36px;
}

h2 {
    font-size: 30px;
}

h3 {
    font-size: 24px;
}

h4 {
    font-size: 20px;
}

h5 {
    font-size: 18px;
}

h6 {
    font-size: 16px;
}

h1:before,
h2:before,
h3:before,
h4:before,
h5:before,
h6:before {
    content: none;
}

h1 {
    counter-reset: section1;
    counter-increment: document;
}

h1:before {
    content: counters(document, ".") " ";
}

h2 {
    counter-reset: section2;
    counter-increment: section1;
}

h2:before {
    content: counters(document, ".") "." counters(section1, ".") " ";
}

h3 {
    counter-increment: section2;
}

h3:before {
    content: counters(document, ".") "." counters(section1, ".") "." counters(section2, ".") " ";
}

hr {
    margin-top: 32px;
    margin-bottom: 32px;
    height: 0;
    border: 0;
    border-top: 1px solid #eaecef;
}

p {
    margin-top: 0;
    margin-bottom: 16px;
}

blockquote {
    margin: 0;
    padding: 0 1em;
    color: #6a737d;
    border-left: 4px solid #dfe2e5;
}

blockquote p {
    margin: 0;
    padding: 0;
}

ul, ol {
    margin-top: 0;
    margin-bottom: 16px;
}

li > p {
    margin-top: 16px;
}

li + li {
    margin-top: 8px;
}

hr + ul,
hr + ol,
blockquote + ul,
blockquote + ol,
table + ul,
table + ol {
    margin-top: 16px;
}

/* Code Blocks */

pre {
    margin-top: 0;
    margin-bottom: 16px;
    font-size: 85%;
    line-height: 1.45;
    background-color: #f6f8fa;
    border-radius: 3px;
    overflow: auto;
    word-wrap: normal;
    padding: 16px;
}

pre code {
    display: inline-block;
    padding: 0;
    margin: 0;
    font-size: inherit;
    line-height: inherit;
    white-space: pre;
    overflow: visible;
}

pre > code {
    padding: 0;
    margin: 0;
    font-size: 100%;
    word-break: normal;
    color: inherit;
    background-color: transparent;
    border: 0;
}

code {
    font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace;
    font-size: 85%;
    background-color: rgba(27, 31, 35, .05);
    padding: 0.2em 0.4em;
    border-radius: 3px;
}

/* Tables */

table {
    display: block;
    width: 100%;
    overflow: auto;
}

table th {
    font-weight: 600;
}

table td, table th {
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
}

table tr {
    background-color: #fff;
    border-top: 1px solid #c6cbd1;
}

table tr:nth-child(2n) {
    background-color: #f6f8fa;
}

/* Images */

img {
    max-width: 100%;
    box-sizing: initial;
    background-color: #fff;
}

/* Labels */

span.label {
    display: inline-block;
    font-size: 75%;
    font-weight: 600;
    line-height: 1;
    padding: 0.15em 0.5em;
    text-transform: uppercase;
    border-radius: 3px;
}

span.label-gray {
    color: #6a737d;
    background-color: rgba(27, 31, 35, .08);
}

span.label-blue {
    color: #fff;
    background-color: #0366d6;
}

/* Miscellaneous */

details {
    display: block;
}

summary {
    display: list-item;
    cursor: pointer;
}

kbd {
    display: inline-block;
    font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace;
    font-size: 85%;
    line-height: 1.45;
    color: #24292e;
    background-color: #fafbfc;
    border: 1px solid #d1d5da;
    border-radius: 3px;
    box-shadow: inset 0 -1px 0 #d1d5da;
    padding: 0.2em 0.4em;
    margin: 0;
}

kbd:not([class]) {
    font-family: inherit;
    font-size: 100%;
    line-height: inherit;
    background-color: transparent;
    border: none;
    box-shadow: none;
    padding: 0;
    margin: 0;
}

kbd:before,
kbd:after {
    content: none;
}

abbr[title] {
    text-decoration: underline dotted;
    cursor: help;
    border-bottom: none;
}

mark {
    background-color: #ffeb3b;
    color: rgba(0, 0, 0, 0.87);
}

del {
    color: #24292e;
    background-color: #fcb7b7;
}

ins {
    color: #24292e;
    background-color: #acf2bd;
}
```
