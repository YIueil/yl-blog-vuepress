---
date: 2025-02-26 10:36:13
pageClass: blue-archive
tags:
  - git
  - github
categories:
  - git
---

# 将本地项目推送到已有的GitHub仓库
## 1 创建一个远程GitHub仓库
创建好仓库，然后获取到远程地址。
![HVKGoBgSAexPFMj.png](https://s2.loli.net/2025/02/26/HVKGoBgSAexPFMj.png)

## 2 本地项目初始化Git
进入到本地项目中，执行`git init`
## 3 本地项目添加远程项目
执行`git remote add origin git@github.com:YIueil/autox-js.git`

## 4 本地项目初始化提交内容
执行`git add .`和`git commit -m "Initial commit"`初始化Git项目内容。

## 5 进行强制推送
最后执行`git push -u origin master --force`
> 注意：强制推送会覆盖远程仓库的内容，确保远程仓库的内容可以被覆盖