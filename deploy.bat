@echo off

:: 生成静态文件
call npm run docs:build

:: 进入生成的文件夹
cd docs.vuepress\dist

:: 初始化 Git 仓库并提交更改
git init
git add -A
git commit -m "deploy"

:: 发布
git push -f git@github.com:YIueil/yl-blog-vuepress.git master:gh-pages

:: 返回上级目录
cd ../
