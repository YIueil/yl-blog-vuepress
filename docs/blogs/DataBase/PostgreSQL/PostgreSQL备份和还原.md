---
  date: 2026-03-25 11:09:13
  pageClass: blue-archive
  tags:
    - 未分类
  categories:
    - 未归档
---
# PostgreSQL备份和还原
>数据库名称、操作用户名、可以不一样。

## 1 备份
### 备份
```bash
# public
/usr/lib/postgresql/12/bin/pg_dump -h 9.77.254.9 -p 20001 -U gt_ytgz_online -d gt_ytgz_online -n public -t 'act_*' -F c --no-owner --no-privileges -f public.dump

# inst
/usr/lib/postgresql/12/bin/pg_dump -h 9.77.254.9 -p 20001 -U gt_ytgz_online -d gt_ytgz_online -n ynytgz_inst -F c --no-owner --no-privileges -f ynytgz_inst.dump

# inst仅结构
/usr/lib/postgresql/12/bin/pg_dump -h 9.77.254.9 -p 20001 -U gt_ytgz_online -d gt_ytgz_online -n ynytgz_inst -F c --schema-only --no-owner --no-privileges -f ynytgz_inst_only.dump

# sec
/usr/lib/postgresql/12/bin/pg_dump -h 9.77.254.9 -p 20001 -U gt_ytgz_online -d gt_ytgz_online -n ynytgz_sec -F c --no-owner --no-privileges -f ynytgz_sec.dump

# dap
/usr/lib/postgresql/12/bin/pg_dump -h 9.77.254.9 -p 20001 -U gt_ytgz_online -d gt_ytgz_online -n ynytgz_dap -F c --no-owner --no-privileges -f ynytgz_dap.dump

# dmap
/usr/lib/postgresql/12/bin/pg_dump -h 9.77.254.9 -p 20001 -U gt_ytgz_online -d gt_ytgz_online -n ynytgz_dmap -T ynytgz_dmap.dmap_anls_cache -F c -O -x -f ynytgz_dmap.dump
```
## 2 还原
```bash
# public
# log "导入 public schema..."
pg_restore -h 9.77.254.9 -p20001 -U gt_ytgz -dgt_ytgz -n public --no-owner --no-privileges --clean --if-exists public.dump

# inst
# log "导入 ynytgz_inst schema..."
pg_restore -h 9.77.254.9 -p20001 -U gt_ytgz -dgt_ytgz -n ynytgz_inst --no-owner --no-privileges --clean --if-exists ynytgz_inst.dump

# sec
# log "导入 ynytgz_sec schema..."
pg_restore -h 9.77.254.9 -p20001 -U gt_ytgz -dgt_ytgz -n ynytgz_sec --no-owner --no-privileges --clean --if-exists ynytgz_sec.dump

# dap
# log "导入 ynytgz_dap schema..."
pg_restore -h 9.77.254.9 -p20001 -U gt_ytgz -dgt_ytgz -n ynytgz_dap --no-owner --no-privileges --clean --if-exists ynytgz_dap.dump

```

```sh
# 使用指定的pg_restore还原
/usr/lib/postgresql/12/bin/pg_restore -h 9.77.254.9 -p20001 -U gt_ytgz -dgt_ytgz -n ynytgz_dap --no-owner --no-privileges --clean --if-exists ynytgz_dap.dump

# public 仅数据
/usr/lib/postgresql/12/bin/pg_restore -h 9.77.254.9 -p20001 -U gt_ytgz -dgt_ytgz -n public --no-owner --no-privileges --data-only  public.dump

/usr/lib/postgresql/12/bin/pg_restore -h 9.77.254.9 -p20001 -U gt_ytgz -dgt_ytgz -n ynytgz_inst --no-owner --no-privileges --clean --if-exists ynytgz_inst.dump

/usr/lib/postgresql/12/bin/pg_restore -h 9.77.254.9 -p20001 -U gt_ytgz -dgt_ytgz -n ynytgz_sec --no-owner --no-privileges --clean --if-exists ynytgz_sec.dump
```

```bash
# 开发环境还原 h#8#T80kT89k
# public
# log "导入 public schema..."
.\pg_restore -h 192.168.6.150 -p5432 -U yunnanytgz -dyunnanytgzdb -n public --no-owner --no-privileges --clean --if-exists public.dump

# inst
# log "导入 ynytgz_inst schema..."
.\pg_restore -h 192.168.6.150 -p5432 -U yunnanytgz -dyunnanytgzdb -n ynytgz_inst --no-owner --no-privileges --clean --if-exists ynytgz_inst.dump

# sec
# log "导入 ynytgz_sec schema..."
.\pg_restore -h 192.168.6.150 -p5432 -U yunnanytgz -dyunnanytgzdb -n ynytgz_sec --no-owner --no-privileges --clean --if-exists ynytgz_sec.dump

# dap
# log "导入 ynytgz_dap schema..."
.\pg_restore -h 192.168.6.150 -p5432 -U yunnanytgz -dyunnanytgzdb -n ynytgz_dap --no-owner --no-privileges --clean --if-exists ynytgz_dap.dump
```