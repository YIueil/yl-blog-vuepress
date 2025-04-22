---
date: 2025-04-22 16:26:43
pageClass: blue-archive
tags:
  - WSL
categories:
  - Linux
---

# Windows中通过WSL创建Linux子系统

## 1 启用WSL

## 2 安装内核
```sh
# 列举出可用的linux发行版
wsl --list --online

# 安装指定版本
wsl --install -d Ubuntu-22.04

# 验证已安装的版本
wsl --list
```

## 3 文件互通
>对于`WSL`中的`Linux`子系统，默认会将`Windwos`系统的磁盘挂载到`/mnt`目录下。

```sh
yiueil@YIUEIL-B760I:/mnt$ ls
c  d  e  wsl  wslg
```