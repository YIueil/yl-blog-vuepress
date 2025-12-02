---
date: 2025-12-02 18:12:47
pageClass: blue-archive
tags:
  - yum
categories:
  - CentOS
---

# CentOS离线RPM依赖包安装
> 可以通过yum命令将rpm包以及其依赖的子包进行统一的下载后，再在目标离线服务器进行安装。

```sh
# 将postgresql以及其相关依赖的RPM包保存到当前目录。
yum install --downloadonly --downloaddir=. postgresql
# 这个示例将nginx所需的依赖全部进行下载, 并将相关的依赖RPM包保存到当前的目录。
yum install --downloadonly --downloaddir=. gcc wget gcc-c++ automake autoconf libtool libxml2-devel libxslt-devel perl-devel perl-ExtUtils-Embed pcre-devel openssl-devel
```
