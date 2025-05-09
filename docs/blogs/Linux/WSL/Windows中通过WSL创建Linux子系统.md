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
```sh
# 大陆提前开启代理提速
wsl.exe --install
```

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

## 4 网络配置
> 参考：[使用 WSL 访问网络应用程序 | Microsoft Learn](https://learn.microsoft.com/zh-cn/windows/wsl/networking)

- 默认都是使用的NAT模式，这种模式下局域网其他设备访问本机的wsl文件时不方便。
- 使用镜像网络，可以wsl和主机相同的网络。其他局域网设备访问就可以通过宿主机ip进行访问了。
```ini
[wsl2]
networkingMode=bridged
```