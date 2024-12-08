# PostgreSQL相似度比较函数

## 通过插件实现
手动添加`pg_trgm`扩展来实现相似度对比。提供了两种方式
1. Levenshtein距离：这是一种衡量两个字符串之间差异的方法，可以通过pg_trgm扩展来计算。首先，你需要安装pg_trgm扩展，然后可以使用levenshtein函数来计算两个字符串之间的Levenshtein距离。
2. Jaccard相似度：这也是通过pg_trgm扩展来实现的，它基于字符串中三字母组合（trigrams）的相似度。可以使用similarity函数来计算两个字符串的Jaccard相似度。

> 此种方式受限于服务器操作权限，很多情况下不能操作到数据库添加扩展。

## 自定义函数
添加两个自定义函数，基于Levenshtein距离函数实现相似度计算。
```sql
create function similarity(s1 text, s2 text) returns double precision
    immutable
    language plpgsql
as
$$
DECLARE
  distance integer;
  max_length integer;
BEGIN
  distance := levenshtein_distance(s1, s2);
  max_length := greatest(length(s1), length(s2));
  RETURN 1 - (distance::double precision / max_length);
END;
$$;
```

```sql
create function levenshtein_distance(s1 text, s2 text) returns integer
    immutable
    language plpgsql
as
$$
DECLARE
  m integer;
  n integer;
  d integer[][];
  i integer;
  j integer;
  s1_i char;
  s2_j char;
  cost integer;
BEGIN
  m := length(s1);
  n := length(s2);
  -- 初始化二维数组，索引从 1 开始
  d := array_fill(0, ARRAY[m+1, n+1]);

  -- 初始化第一行
  FOR i IN 1..m+1 LOOP
    d[i][1] := i - 1;
  END LOOP;

  -- 初始化第一列
  FOR j IN 1..n+1 LOOP
    d[1][j] := j - 1;
  END LOOP;

  -- 计算距离
  FOR i IN 2..m+1 LOOP
    s1_i := substring(s1 FROM i-1 FOR 1);
    FOR j IN 2..n+1 LOOP
      s2_j := substring(s2 FROM j-1 FOR 1);
      IF s1_i = s2_j THEN
        cost := 0;
      ELSE
        cost := 1;
      END IF;
      d[i][j] := least(d[i-1][j] + 1, d[i][j-1] + 1, d[i-1][j-1] + cost);
    END LOOP;
  END LOOP;

  RETURN d[m+1][n+1];
END;
$$;
```

```sql
-- 执行示例
select ynytgz_dap.similarity('曲靖市麒麟区增减挂钩项目建新方案', '曲靖麒麟增减挂钩项目建案')
```

> 此种方式是字符串相似度的简单实现，能够实现简单的字符串相似度对比，复杂情况下和高性能要求下，需要考虑代码实现，或者添加扩展。