## 1 递归查询
```sql
WITH RECURSIVE SubDirectories AS (
    -- 非递归部分：选择根目录
    select dv.id, dv.name
    from ynytgz_dap.dcc_dictionarytype dt
             inner join ynytgz_dap.dcc_dictionaryvalue dv on dv.fk_type_id = dt.id
    where dt.name = '用地用海分类'
      and dv.name = :一级目录
    UNION ALL
    -- 递归部分：选择子目录
    SELECT child.id,
           child.name
    FROM ynytgz_dap.dcc_dictionaryvalue child
             INNER JOIN SubDirectories parent ON child.fk_dictionaryvalue_id = parent.id
)
-- 最终查询：选择所有子目录
SELECT name
FROM SubDirectories
```