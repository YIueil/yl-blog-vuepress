---
  date: 2024-12-08 18:34:38
  pageClass: blue-archive
  tags:
    - 未分类
  categories:
    - 未归档
---

# Windows安装解压版PostgreSQL

##  初始化数据库

```sql
initdb.exe -D ../data -E UTF8
```

## 启动服务

```sh
pg_ctl.exe -D ../data -l ../logs/logfile start
```

## 其他常用命令

```sh

```
