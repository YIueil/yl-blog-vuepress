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

方式一：
```bash
# 交互式变基  需要在新打开的编辑器中使用对后续的提交使用 squash 合并最近两次提交
git rebase -i HEAD~2
```

方式二：
```sh
# 1. 重置到指定的父提交（不保留提交，保留修改）
git reset --soft HEAD~3
# 2. 重新提交一次
git commit -m "合并后的提交信息"
```

### 1.2 查询近期的提交内容
```sh
# --oneline: 单行显示. --no-merges: 排除合并请求
git log --since="2026-01-12" --author="YIueil" --oneline --no-merges
```

