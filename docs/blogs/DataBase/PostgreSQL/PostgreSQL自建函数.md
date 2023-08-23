## 给某个表插入随机数据

```sql
-- 给某个表插入随机数据 调用示例: select insert_random_data('table_name1', 10);
create function insert_random_data(tablename text, -- 表名
                                   n integer    -- 插入行数量
) returns void
    language plpgsql
as
$$
DECLARE
    i    integer;
    j    record;
    cols text;
    vals text;
BEGIN
    FOR i IN 1..n
        LOOP
            cols := '';
            vals := '';
            FOR j IN (SELECT column_name, data_type, character_maximum_length
                      FROM information_schema.columns
                      WHERE table_name = tablename)
                LOOP
                    IF cols != '' THEN
                        cols := cols || ',';
                        vals := vals || ',';
                    END IF;
                    cols := cols || j.column_name;
                    -- 处理整数类型
                    IF j.data_type = 'integer' THEN
                        vals := vals || floor(random() * 1000);
                        -- 处理小数类型
                    ELSIF j.data_type = 'numeric' THEN
                        vals := vals || random() * 1000;
                        -- 处理字符串类型
                    ELSEIF j.data_type = 'character varying' OR j.data_type = 'text' THEN
                        IF j.character_maximum_length IS NOT NULL AND j.character_maximum_length > 0 THEN
                            vals := vals || quote_literal(substr(md5(random()::text), 1, j.character_maximum_length));
                        ELSE
                            vals := vals || quote_literal(md5(random()::text));
                        END IF;
                        -- 处理时间类型
                    ELSIF j.data_type = 'timestamp without time zone' THEN
                        vals := vals ||
                                quote_literal(to_char((now() - random() * interval '1 year'), 'YYYY-MM-DD HH24:MI:SS'));
                    ELSIF j.data_type = 'date' THEN
                        vals := vals || quote_literal(to_char((now() - random() * interval '1 year'), 'YYYY-MM-DD'));
                    ELSE
                        vals := vals || quote_literal(md5(random()::text));
                    END IF;
                END LOOP;
            EXECUTE format('INSERT INTO %I (%s) VALUES (%s)', tablename, cols, vals);
        END LOOP;
END;
$$;
```

## 删除某个表的无用数据

```sql
-- 删除某个表的无用数据 调用示例: select delete_invalid_data('test_table', Array['id', 'name'])
create function delete_invalid_data(tablename text, -- 表名
                                    colnames text[] -- 字段集合名称
) returns void
    language plpgsql
as
$$
DECLARE
    i    integer;
    j    record;
    cols text[];
    sql  text;
BEGIN
    FOR j IN (SELECT column_name FROM information_schema.columns WHERE table_name = tablename)
        LOOP
            IF NOT j.column_name = ANY (colnames) THEN
                cols := array_append(cols, j.column_name::text);
            END IF;
        END LOOP;
    sql := format('DELETE FROM %I WHERE (%s) IS NULL', tablename, array_to_string(cols, ','));
    RAISE NOTICE 'SQL statement: %', sql;
    EXECUTE sql;
END;
$$;

```
