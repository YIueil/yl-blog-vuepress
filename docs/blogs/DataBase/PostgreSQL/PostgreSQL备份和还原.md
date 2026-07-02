---
  date: 2026-03-25 11:09:13
  pageClass: blue-archive
  tags:
    - 未分类
  categories:
    - 未归档
---
# PostgreSQL备份和还原

## 1 备份
### 备份
```bash
# public
pg_dump -h 9.77.254.9 -p 20001 -U gt_ytgz_online -d gt_ytgz_online -n public -t 'act_*' -F c --no-owner --no-privileges -f public.dump

# inst
pg_dump -h 9.77.254.9 -p 20001 -U gt_ytgz_online -d gt_ytgz_online -n ynytgz_inst -F c --no-owner --no-privileges -f ynytgz_inst.dump

# inst仅结构
pg_dump -h 9.77.254.9 -p 20001 -U gt_ytgz_online -d gt_ytgz_online -n ynytgz_inst -F c --schema-only --no-owner --no-privileges -f ynytgz_inst.dump

# sec
pg_dump -h 9.77.254.9 -p 20001 -U gt_ytgz_online -d gt_ytgz_online -n ynytgz_sec -F c --no-owner --no-privileges -f ynytgz_sec.dump

# dap
pg_dump -h 9.77.254.9 -p 20001 -U gt_ytgz_online -d gt_ytgz_online -n ynytgz_dap -F c --no-owner --no-privileges -f ynytgz_dap.dump

# dmap
pg_dump -h 9.77.254.9 -p 20001 -U gt_ytgz_online -d gt_ytgz_online -n ynytgz_dmap -T ynytgz_dmap.dmap_anls_cache -F c -O -x -f ynytgz_dmap.dump
```
## 2 还原
