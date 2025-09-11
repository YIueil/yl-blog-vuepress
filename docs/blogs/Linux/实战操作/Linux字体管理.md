---
date: 2025-09-11 11:05:14
pageClass: blue-archive
tags:
  - 服务器
  - 字体
categories:
  - Linux
---

# Linux 字体管理

> 查看已经安装的字体

```sh
fc-list

# 提示不是命令则先安装包fontconfig
yum -y install fontconfig
```

> 下载党政机关字体

[党政机关字体](https://pan.baidu.com/s/1E_Bjfc00P6I6TBZqnS6TYA)

提取码: xixv

> 在进入目录/usr/share/fonts/winfonts 没有则创建，刷新字体库

```sh
sudo fc-cache –fv
```

> 再次查看已经安装的字体

```sh
fc-list

/usr/share/fonts/winfonts/方正仿宋_GBK.TTF: FZFangSong\-Z02:style=Regular
/usr/share/fonts/winfonts/方正小标宋_GBK.TTF: FZXiaoBiaoSong\-B05:style=Regular