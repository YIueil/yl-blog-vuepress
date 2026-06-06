---
date: 2026-05-25 16:45:26
pageClass: blue-archive
tags:
  - 未分类
categories:
  - CentOS
  - 负载监控
---

# CentOS7监控CPU、内存占用

```bash
# 安装 sysstat
yum install -y sysstat
# 启动服务
systemctl enable --now sysstat
# 修改配置
vi /etc/sysconfig/sysstat
# 默认10分钟统计一次
```

```bash
# 增加CPU压力
### 查看CPU核数
cat /proc/cpuinfo | grep "processor" | wc -l
## 跑满两核心 ROOT账号执行
sh cpu_usage.sh consume 2
### 释放 ROOT账号执行
sh cpu_usage.sh release

# 增加内存压力 ROOT账号执行
### 施加1G内存占用
sh memory_usage.sh consume 1G
### 释放 ROOT账号执行
sh memory_usage.sh release

# 搜集报告
### 搜集某一天的CPU使用情况
sar -u -f /var/log/sa/sa29
### 搜集某一天的内存使用情况
sar -r -f /var/log/sa/sa29
```