---
date: 2025-08-06 11:22:12
pageClass: blue-archive
tags:
  - 实战
categories:
  - Linux
---

# CentOS7网络配置
## NAT方式
### 编辑网络配置文件

```bash
cd /etc/sysconfig/network-scripts/
vim ifcfg-ens33
```
### 修改以下内容
```bash
BOOTPROTO=dhcp
# 默认这里是no, 也就是默认关闭的
ONBOOT=yes

# 可选 配置静态ip地址
```
#### 重启网络服务
```bash
systemctl restart network.service
```