---
date: 2025-02-26 10:55:07
pageClass: blue-archive
tags:
  - git
  - 待完成
categories:
  - git
---

# Git常用命令

## 1 变基
### 1.1 合并最近几次提交
> 一个复杂的任务可能产生多次提交，推送到远程时，可能需要进行合并后再推送，保证远程 Git 的可读性。
```bash
# 合并最近两次提交
git rebase -i HEAD~2
```