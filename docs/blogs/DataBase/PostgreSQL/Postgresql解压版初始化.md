---
  date: 2023/8/15 2:26
  pageClass: blue-archive
  tags:
    - 未分类
  categories:
    - 未归档
---
# Postgresql解压版初始化

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
