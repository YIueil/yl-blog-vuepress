---
date: 2026-05-28 17:54:50
pageClass: blue-archive
tags:
  - 未分类
categories:
  - Linux
---

# Linux常用命令

## 服务相关
```bash
# 服务模糊搜索
systemctl list-units --type=service | grep <服务名称>

# 例如
systemctl list-units --type=service | grep zerotier

# 查询用户启动项
systemctl --user list-unit-files --state=enabled
```
