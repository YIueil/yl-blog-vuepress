---
date: 2025-04-22 18:40:40
pageClass: blue-archive
tags:
  - 未分类
categories:
  - Linux
---

# Linux下修改文本文件

## 1 使用`Vim`

## 2 使用`nano`

## 3 使用`sed`命令直接进行替换
```sh
# 将~/.zshrc配置文件中的ZSH_THEME=".*", 替换为ZSH_THEME="macovsky", 并立即生效。
# .*标识匹配任意单个字符。
sed -i 's/ZSH_THEME=".*"/ZSH_THEME="macovsky"/' ~/.zshrc && source ~/.zshrc
```