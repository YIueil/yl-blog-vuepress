# yl-blog-vuepress

基于 `vuepress`生成的静态个人博客网站

## 发布方式

- 通过本地构建结果, 在 github 上创建新的 blog-pages 分支, 然后配置 pages 到 blog-pages 分支的 root 下

- 通过 github-actions ⭐推荐

## 常见问题

### 在本地新增的 md 文件推送后没有更新到发布网站中?
 - Markdown的文档中没有一级标题😏

### 构建失败
```shell
TypeError: Cannot read properties of undefined (reading 'replace')
    at formatISODate (file:///home/runner/work/yl-blog-vuepress/yl-blog-vuepress/docs/.vuepress/.temp/.server/app.7ac5ce42.mjs:3089:27)
    at file:///home/runner/work/yl-blog-vuepress/yl-blog-vuepress/docs/.vuepress/.temp/.server/app.7ac5ce42.mjs:6234:35
    at Array.forEach (<anonymous>)
    at setup (file:///home/runner/work/yl-blog-vuepress/yl-blog-vuepress/docs/.vuepress/.temp/.server/app.7ac5ce42.mjs:6233:11)
    at _sfc_main$2.setup (file:///home/runner/work/yl-blog-vuepress/yl-blog-vuepress/docs/.vuepress/.temp/.server/app.7ac5ce42.mjs:6364:25)
    at callWithErrorHandling (/home/runner/work/yl-blog-vuepress/yl-blog-vuepress/node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:156:18)
    at setupStatefulComponent (/home/runner/work/yl-blog-vuepress/yl-blog-vuepress/node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:7190:25)
    at setupComponent (/home/runner/work/yl-blog-vuepress/yl-blog-vuepress/node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:7151:36)
    at renderComponentVNode (/home/runner/work/yl-blog-vuepress/yl-blog-vuepress/node_modules/@vue/server-renderer/dist/server-renderer.cjs.prod.js:354:15)
    at renderVNode (/home/runner/work/yl-blog-vuepress/yl-blog-vuepress/node_modules/@vue/server-renderer/dist/server-renderer.cjs.prod.js:483:14)
Error: Process completed with exit code 1.
```
 - 或许你提交了一个没有头部信息的MarkDown, 或者时间格式不对
> 来自移动端