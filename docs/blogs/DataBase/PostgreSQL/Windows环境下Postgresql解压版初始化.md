---
  date: 2023/8/15 2:26
  pageClass: blue-archive
  tags:
    - PostgreSQL
  categories:
    - 未归档
---
# Windows环境下Postgresql解压版初始化

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
