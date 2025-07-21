---
date: 2025-07-07 15:01:31
pageClass: blue-archive
tags:
  - 实战
categories:
  - 未归档
---

# CentOS7下进行磁盘挂载
## 1 挂载命令
```sh
mount -t cifs -o iocharset=utf8,username=gt_ytgz,password=yn_299792458,vers=1.0,rw,uid=app,gid=app //9.77.254.117/gt_ytgz /opt/file
```

## 2 取消挂载
```sh
umount /opt/file

#强制取消挂载
umount -f /opt/file
```