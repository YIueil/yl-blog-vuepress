---
  date: 2025-01-06 15:59:25
  pageClass: blue-archive
  tags:
    - 未分类
  categories:
    - 未归档
---

# SQL查询优化思路、案例

## 1 查询统计SQL

通常是查询统计等相关的SQL中会含有大量的表关联和查询逻辑，SQL复杂，并且不同的人都改过。如果写的时候没有注意效率，可能导致最终的整体SQL都较为卡顿。

```sql
SELECT DISTINCT P.ID                                           as PID,
                C.ID                                           as CID,
                c.lclx                                         as splx,
                c.spjb                                         as spjb,
                p.CREATEUSERID,
                T.TASKID                                       as TASKID,
                T.BPD_INSTANCE_ID                              as PIID,
                T.activityname                                 AS ACTIVITYNAME,
                T.Rcvd_Datetime                                AS RCVD_DATETIME,
                T.owner,
                case
                    when BT.TYPENAME = '用途管制' and p.businessname != '建设项目用地预审与选址意见书' then 'form'
                    when BT.TYPENAME = '建设规划' or p.businessname = '建设项目用地预审与选址意见书' then 'ysForm'
                    end                                        as formType,
                case
                    when p.processstate = '在办' and T.activityname in ('省政府批准', '市政府批准', '县政府批准') then T.activityname
                    when p.processstate = '在办' then '在办'
                    when p.processstate = '挂起' then '挂起'
                    when p.processstate = '资料归档' then '办结'
                    when p.processstate = '结案' then '办结'
                    when p.processstate = '强制结案' then '办结'
                    when p.processstate = '不予受理' then '不予受理'
                    when p.processstate = '退文办结' then '退文办结'
                    when p.processstate = '撤销接件' then '撤销接件'
                    when p.processstate = '退件' then '退件'
                    when bg.bzxh = '1' and p.PROCESSSTATE = '补件' and
                         (T.activityname not in ('州市经办人汇总意见', '省级经办人汇总意见', '州市主办科室核实', '省级主办处室核实', '省级主办科室核实'))
                        then '第一次补正'
                    when bg.bzxh = '2' and p.PROCESSSTATE = '补件' and
                         (T.activityname not in ('州市经办人汇总意见', '省级经办人汇总意见', '州市主办科室核实', '省级主办处室核实', '省级主办科室核实'))
                        then '第二次补正'
                    when bg.bzxh = '1' and p.PROCESSSTATE = '补件' then '第一次补正'
                    when bg.bzxh = '2' and p.PROCESSSTATE = '补件' then '第二次补正'
                    end                                        as opttype,
                case when T.ASSIGNEE is NULL then 0 else 1 end as taskStatus,
                DA.TIMELIMIT,
                case

                    when c.spjb = '区县' and c.lclx = '专班' then '县级预审查'

                    when c.spjb = '州市' and c.lclx = '专班' then '州市级预审查'

                    when c.spjb = '省级' and c.lclx = '专班' then '省级预审查'

                    when c.spjb = '区县' and c.lclx = '审批' then '县级审批'

                    when c.spjb = '州市' and c.lclx = '审批' then '州市级审批'

                    when c.spjb = '省级' and c.lclx = '审批' then '省级审批'

                    else (c.spjb || c.lclx) end                as szcj

FROM (select p1.id,

             max(T1.TASK_ID)         as TASKID,

             max(T1.BPD_INSTANCE_ID) as BPD_INSTANCE_ID,

             max(T1.Rcvd_Datetime)   as Rcvd_Datetime,

             max(T1.activityname)    as activityname,

             max(T1.owner)           as owner,

             max(T1.ASSIGNEE)        as ASSIGNEE,

             max(T1.due_time)        as due_time,

             max(T1.TASK_DEF_KEY_)   as TASK_DEF_KEY_

      from (select art.id_           as TASK_ID,

                   art.proc_inst_id_ as BPD_INSTANCE_ID,

                   art.create_time_  as Rcvd_Datetime,

                   art.name_         as activityname,

                   art.owner_        as owner,

                   art.ASSIGNEE_     as ASSIGNEE,

                   art.due_date_     as due_time,

                   art.TASK_DEF_KEY_ as TASK_DEF_KEY_

            from public.act_ru_task art

            where (art.owner_ is not null or art.assignee_ is not null)

            union all

            select art.id_           as TASK_ID,

                   art.proc_inst_id_ as BPD_INSTANCE_ID,

                   art.create_time_  as Rcvd_Datetime,

                   art.name_         as activityname,

                   art.owner_        as owner,

                   art.ASSIGNEE_     as ASSIGNEE,

                   art.due_date_     as due_time,

                   art.TASK_DEF_KEY_ as TASK_DEF_KEY_

            from public.act_ru_task art

                     inner join public.act_ru_identitylink ari

                                on art.id_ = ari.task_id_

            where art.owner_ is null

              and art.assignee_ is null

              and ari.type_ = 'candidate'

            union all

            select max(art.id_)           as TASK_ID,

                   max(art.proc_inst_id_) as BPD_INSTANCE_ID,

                   max(art.start_time_)   as Rcvd_Datetime,

                   max(art.name_)         as activityname,

                   max(art.owner_)        as owner,

                   max(art.ASSIGNEE_)     as ASSIGNEE,

                   max(art.due_date_)     as due_time,

                   max(art.TASK_DEF_KEY_) as TASK_DEF_KEY_

            from public.Act_Hi_Taskinst art

                     inner join public.act_hi_identitylink ari

                                on art.id_ = ari.task_id_

                     inner join ynytgz_inst.pcc_project p on p.PROCESSINSTANCEID = art.proc_inst_id_

            where art.end_time_ is not null

              and ari.type_ = 'candidate'

              and art.start_time_ in

                  (select max(art.start_time_) as Rcvd_Datetime

                   from public.Act_Hi_Taskinst art

                            inner join public.act_hi_identitylink ari

                                       on art.id_ = ari.task_id_

                   where art.end_time_ is not null

                     and ari.type_ = 'candidate'

                   group by art.proc_inst_id_)

              and P.LIFESTATE in ('正常')

              AND P.PROCESSSTATE in ('结案')

            group by art.proc_inst_id_) T1

               INNER JOIN ynytgz_inst.PCC_PROJECT p1 ON T1.BPD_INSTANCE_ID = p1.PROCESSINSTANCEID

      group by p1.id) T

         INNER JOIN ynytgz_inst.PCC_PROJECT P ON T.BPD_INSTANCE_ID = P.PROCESSINSTANCEID

         left join ynytgz_sec.dcc_user du on du.id = p.createuserid

         left join ynytgz_sec.dcc_realm rm on rm.guid = du.realmguid

         LEFT JOIN ynytgz_inst.BZ_CASEINSTRELATION CR ON P.ID = CR.PID

         LEFT JOIN ynytgz_inst.BZ_PROJECTCASE C ON CR.CID = C.ID

         left join (

            select max(pc.id)                           as maxcid,

                   min(p.createtime)                       minCreateTime,

                   min(pc.id)                           as mincid,

                   sbzjb                                   sbzjb,

                   bool_or(po.activityname is not null) as pzzt

            from ynytgz_inst.bz_projectcase pc

                     INNER JOIN ynytgz_inst.bz_caseinstrelation r on r.cid = pc.id

                     INNER JOIN ynytgz_inst.pcc_project p on p.id = r.pid and p.businessname not in ('县级审批备案', '州市审批备案')

                     LEFT JOIN ynytgz_inst.pcc_projectoperate po

                               on po.projectid = p.id and po.activityname like '%政府批准%' and opttype = '提交'

            where p.lifestate = '正常'

            group by sbzjb

        ) base on base.maxcid = c.id

         INNER JOIN ynytgz_dap.DAP_BUSINESS B ON P.FK_BUSINESS_Id = B.ID

         INNER JOIN ynytgz_dap.DAP_BUSINESSTYPE BT on BT.ID = B.FK_BUSINESSTYPE_ID AND BT.TYPENAME IN ('用途管制', '建设规划')

         LEFT JOIN ynytgz_dap.DAP_BUSINESSPROCESS DBP ON DBP.FK_BUSINESS_Id = B.ID AND P.BUSINESSPROCESSID = DBP.ID

         left join ynytgz_inst.zz_bzgzxx bg on bg.cid = c.id

         LEFT JOIN ynytgz_dap.DCC_PROCESS DB ON DB.ID = DBP.FK_PROCESS_ID

         LEFT JOIN ynytgz_dap.DAP_BUSINESSACTIVITY DA

                   ON DA.WFACTIVITYID = T.TASK_DEF_KEY_ AND DA.FK_PROCESSREVISION_ID = DB.FK_ACTIVEREVISION_ID

         left join ynytgz_inst.zz_xmjbqk zm on zm.cid = c.id

         left join ynytgz_inst.xx_xmjbqk xm on xm.cid = c.id

         left join ynytgz_inst.zz_pzjbxx zp on zp.cid = c.id

         left join ynytgz_inst.bz_sltzs sl on sl.cid = c.id

         left join ynytgz_inst.bz_lsydxxb lsyd on lsyd.cid = c.id

         LEFT JOIN ynytgz_inst.zz_pfjl pf ON pf.cid = C.ID

         LEFT JOIN ynytgz_inst.bz_fwgz fw ON fw.cid = C.ID

         LEFT join ynytgz_dap.dap_businessresourceconfig dbc

                   on dbc.resourceid = p.fk_business_id and dbc.subtype = '审批层级'

WHERE 1 = 1

  and p.businessgroupname not in ('18版历史数据', '22版历史数据')

  and :loginName is not null

```

  

## 2 查询逻辑分析

  

产品通用查询的过程主要分三块：

  

1. 主查询

2. 总数查询

3. 子查询

  

最终的前端查询时间由这三块查询的效率决定，需要保证这三个查询都不会太慢，最终前端的请求响应的总时长才不会太长。理想的情况下是各个查询都保持在毫秒级，最终的接口速度才会比较快。

  

![截图](24a1357d21631b2c47123c5e9c825f78.png)

  

![截图](8cf47464f388c04c54144c56ff9f82f2.png)

  

## 3 优化思路

  

### 3.1 主查询优化

  

#### 3.1.1 不关联业务表

  

通常主查询查询的数据量扫描的数据更大，将业务表从主查询中的**业务表**移动到子查询通常能提高查询效率。

  

![截图](3dd134331b8714adf34143ebb9dabad1.png)

  

#### 3.1.2 减少返回的字段列

  

减少返回的字段列的意义在于，在主查询中返回过多列，计算的列，或者是函数计算列，都会花费更多的时间。也可以都交给子查询查询。原来得到子查询中。返回的字段非常多，并且存在**判断**，**字符串拼接**。更复杂的情况可能还存在**函数调用**，**工作日计算**，**数据加和**等。

  

> 将业务表移除后，多余的字段也一并移动到子查询。

  

![截图](8114d65936616de5f742303915a5e350.png)

  

#### 3.1.3 TASK表关联

  

确定当前案件是否需要关联task，如果只是需要关联查询**流程环节**，**办理时限**等相关信息，是可以也移动到子查询进行管理查询的。

  

> 注意: 如果需要用环节或者TaskId作为查询的检索条件，那么还是需要在主查询中关联Task表。

>

> 如果随着业务增长，Task表过于庞大，查询实在卡顿的备选优化方案，可以通过添加监听器，记录**流程环节**等相关信息到projectcase表中。从而避免直接查询Task相关表。

  

```sql

FROM

    (select p1.id,

         max(T1.TASK_ID) as TASKID ,

         max(T1.BPD_INSTANCE_ID) as BPD_INSTANCE_ID,

         max(T1.Rcvd_Datetime)   as Rcvd_Datetime,

         max(T1.activityname)         as activityname,

         max(T1.owner)        as owner,

         max(T1.ASSIGNEE)     as ASSIGNEE,

         max(T1.due_time)     as due_time,

         max(T1.TASK_DEF_KEY_) as TASK_DEF_KEY_

         from

    (select art.id_           as TASK_ID,

             art.proc_inst_id_ as BPD_INSTANCE_ID,

             art.create_time_  as Rcvd_Datetime,

             art.name_         as activityname,

             art.owner_        as owner,

             art.ASSIGNEE_     as ASSIGNEE,

             art.due_date_     as due_time,

             art.TASK_DEF_KEY_ as TASK_DEF_KEY_

      from ${DS_ACTIVITI}.act_ru_task art

      where (art.owner_ is not null or art.assignee_ is not null)

      union all

      select art.id_           as TASK_ID,

             art.proc_inst_id_ as BPD_INSTANCE_ID,

             art.create_time_  as Rcvd_Datetime,

             art.name_         as activityname,

             art.owner_        as owner,

             art.ASSIGNEE_     as ASSIGNEE,

             art.due_date_     as due_time,

             art.TASK_DEF_KEY_ as TASK_DEF_KEY_

      from ${DS_ACTIVITI}.act_ru_task art

               inner join ${DS_ACTIVITI}.act_ru_identitylink ari

                          on art.id_ = ari.task_id_

      where art.owner_ is null

        and art.assignee_ is null

        and ari.type_ = 'candidate'

      union all

      select max(art.id_)           as TASK_ID,

             max(art.proc_inst_id_) as BPD_INSTANCE_ID,

             max(art.start_time_)   as Rcvd_Datetime,

             max(art.name_)         as activityname,

             max(art.owner_)        as owner,

             max(art.ASSIGNEE_)     as ASSIGNEE,

             max(art.due_date_)     as due_time,

             max(art.TASK_DEF_KEY_) as TASK_DEF_KEY_

      from ${DS_ACTIVITI}.Act_Hi_Taskinst art

               inner join ${DS_ACTIVITI}.act_hi_identitylink ari

                          on art.id_ = ari.task_id_

               inner join ${DS_INST}.pcc_project p on p.PROCESSINSTANCEID = art.proc_inst_id_

      where art.end_time_ is not null

        and ari.type_ = 'candidate'

        and art.start_time_ in

            (select max(art.start_time_) as Rcvd_Datetime

             from ${DS_ACTIVITI}.Act_Hi_Taskinst art

                      inner join ${DS_ACTIVITI}.act_hi_identitylink ari

                                 on art.id_ = ari.task_id_

             where art.end_time_ is not null

               and ari.type_ = 'candidate'

             group by art.proc_inst_id_)

        and P.LIFESTATE in ('正常')

        AND P.PROCESSSTATE in ('结案')

      group by art.proc_inst_id_) T1

```

  

#### 3.1.4 过滤条件优化

  

1. 可选的条件使用option参数选项来进行替换。

2. 条件尽量使用索引字段，同时避免错误的使用函数作为条件。

3. 单个条件的对比使用=而不是使用in。

  

#### 3.1.5 最终优化后的主查询:

  

此时主查询已经非常简单，查询速度在100-200ms内。

  

```sql

SELECT DISTINCT P.ID                                                                                 as PID,

                C.ID                                                                                 as CID,

                c.lclx                                                                               as splx,

                c.spjb                                                                               as spjb,

                p.PROCESSINSTANCEID,

                p.CREATEUSERID,

                case

                    when BT.TYPENAME = '用途管制' and p.businessname != '建设项目用地预审与选址意见书' then 'form'

                    when BT.TYPENAME = '建设规划' or p.businessname = '建设项目用地预审与选址意见书' then 'ysForm' end as formType,

                case

                    when c.spjb = '区县' and c.lclx = '专班' then '县级预审查'

                    when c.spjb = '州市' and c.lclx = '专班' then '州市级预审查'

                    when c.spjb = '省级' and c.lclx = '专班' then '省级预审查'

                    when c.spjb = '区县' and c.lclx = '审批' then '县级审批'

                    when c.spjb = '州市' and c.lclx = '审批' then '州市级审批'

                    when c.spjb = '省级' and c.lclx = '审批' then '省级审批'

                    else (c.spjb || c.lclx) end                                                      as szcj

FROM  ynytgz_inst.PCC_PROJECT P

         LEFT JOIN ynytgz_inst.BZ_CASEINSTRELATION CR ON P.ID = CR.PID

         LEFT JOIN ynytgz_inst.BZ_PROJECTCASE C ON CR.CID = C.ID

         INNER JOIN ynytgz_dap.DAP_BUSINESS B ON P.FK_BUSINESS_Id = B.ID

         INNER JOIN ynytgz_dap.DAP_BUSINESSTYPE BT on BT.ID = B.FK_BUSINESSTYPE_ID AND BT.TYPENAME IN ('用途管制', '建设规划')

WHERE 1 = 1

```

  

### 3.2 子查询优化

  

前面我们将大量的内容移动到了子查询中，此时子查询可能变得查询缓慢，需要进一步优化。

  

> 主要的优化点在于减少数据扫描和数据计算，以及添加索引等常规的SQl优化方案进行优化。

>

> 本次优化的主要优化内容是，针对子查询中的Task表查询部分，添加ProcessInstanceId条件提前进行过滤，减少子查询，从而实现了小表驱动大表，大幅提高了子查询的查询效率。

  

优化后的子查询:

  

```sql

    <config name="getQueryBox_Detail" dbname="instances">

        <sql><![CDATA[

                select distinct c.PROJECTNAME,

                    fa.famc,

                    fa.faid,

                    qk.dzjgh,

                    p.PROCESSINSTANCEID,

                    T.activityname                                                    AS ACTIVITYNAME,

                    T.Rcvd_Datetime                                                   AS RCVD_DATETIME,

                    splxname,

                    sfzdxm,

                    pzzyxx.id,

                    pzzyxx.wfzyxzjsydmj,

                    pzzyxx.wfzynydmj,

                    pzzyxx.wfzygdmj,

                    pzzyxx.wfzywlydmj,

                    sqzymjqk.gdhj,

                    sqzymjqk.qzsthj,

                    sqzymjqk.qzyjjbnthj,

                    fhgtkjghqk.bhyntmj,

                    gdzlxq.gdzldb,

                    c.shsj,

                    c.submitdatetime,

                    c.zsscdatetime,

                    c.zsscjzdatetime,

                    c.zxmmc,

                    c.projectcode,

                    c.spqx,

                    p.PROCESSSTATE,

                    p.LIFESTATE,

                    p.id                                                                 PID,

                    p.PROCESSINSTANCEID                                                  piid,

                    c.BUILDADDRESS,

                    c.JHWH,

                    to_char(p.STARTTIME, 'yyyy-mm-dd hh24:mi:ss')                        starttime,

                    p.BUSINESSNAME,

                    p.endtime,

                    case

                        when p.BUSINESSNAME = '乡村建设规划许可' then bjj.yddwgr

                        else

                            bjj.jsdw end                                              as jsdw,

                    c.xzqh,

                    c.casecode,

                    case

                        when p.processstate = '补件' then to_char(pp1.submittime, 'yyyy-mm-dd hh24:mi:ss')

                        else to_char(pp.submittime, 'yyyy-mm-dd hh24:mi:ss')

                        end                                                           as createtime,

                    case

                        when p.processstate = '补件' then to_char(pp.createtime, 'yyyy-mm-dd hh24:mi:ss')

                        else to_char(p.createtime, 'yyyy-mm-dd hh24:mi:ss')

                        end                                                           as acceptTime,

                    case

                        when c.lclx = '审批' and c.spjb in ('州市', '省级')

                            then to_char(pp.submittime, 'yyyy-mm-dd hh24:mi:ss')

                        end                                                           as subProcessTime,

                    T.TASKID                                                          as TASKID,

                    ROUND(CAST(ynytgz_dap.UF_GETWORKDAY(Rcvd_Datetime, LOCALTIMESTAMP) as numeric), 2) ||

                    '天'                                                               AS SPENDDAYS,

                    ROUND(CAST(ynytgz_dap.UF_GETWORKDAY(PTL.RECEIVETIME, LOCALTIMESTAMP) as numeric), 2) ||

                    '天'                                                               AS ACESPENDDAYS,

                    PTL.RECEIVETIME,

                    case

                        when p.processstate = '在办' and T.activityname in ('省政府批准', '市政府批准', '县政府批准') then T.activityname

                        when p.processstate = '在办' then '在办'

                        when p.processstate = '挂起' then '挂起'

                        when p.processstate = '资料归档' then '办结'

                        when p.processstate = '结案' then '办结'

                        when p.processstate = '强制结案' then '办结'

                        when p.processstate = '不予受理' then '不予受理'

                        when p.processstate = '退文办结' then '退文办结'

                        when p.processstate = '撤销接件' then '撤销接件'

                        when p.processstate = '退件' then '退件'

                        when bg.bzxh = '1' and p.PROCESSSTATE = '补件' and

                             (T.activityname not in ('州市经办人汇总意见', '省级经办人汇总意见', '州市主办科室核实', '省级主办处室核实', '省级主办科室核实'))

                            then '第一次补正'

                        when bg.bzxh = '2' and p.PROCESSSTATE = '补件' and

                             (T.activityname not in ('州市经办人汇总意见', '省级经办人汇总意见', '州市主办科室核实', '省级主办处室核实', '省级主办科室核实'))

                            then '第二次补正'

                        when bg.bzxh = '1' and p.PROCESSSTATE = '补件' then '第一次补正'

                        when bg.bzxh = '2' and p.PROCESSSTATE = '补件' then '第二次补正' end as opttype

            from (select p1.id,

                         max(T1.TASK_ID)         as TASKID,

                         max(T1.BPD_INSTANCE_ID) as BPD_INSTANCE_ID,

                         max(T1.Rcvd_Datetime)   as Rcvd_Datetime,

                         max(T1.activityname)    as activityname,

                         max(T1.owner)           as owner,

                         max(T1.ASSIGNEE)        as ASSIGNEE,

                         max(T1.due_time)        as due_time,

                         max(T1.TASK_DEF_KEY_)   as TASK_DEF_KEY_

                  from (

                           select art.id_           as TASK_ID,

                                  art.proc_inst_id_ as BPD_INSTANCE_ID,

                                  art.create_time_  as Rcvd_Datetime,

                                  art.name_         as activityname,

                                  art.owner_        as owner,

                                  art.ASSIGNEE_     as ASSIGNEE,

                                  art.due_date_     as due_time,

                                  art.TASK_DEF_KEY_ as TASK_DEF_KEY_

                           from public.act_ru_task art

                                    inner join public.act_ru_identitylink ari

                                               on art.id_ = ari.task_id_

                           where ari.type_ = 'candidate'

                             and art.proc_inst_id_ in (:PROCESSINSTANCEID)

                           union all

                           select max(art.id_)           as TASK_ID,

                                  max(art.proc_inst_id_) as BPD_INSTANCE_ID,

                                  max(art.start_time_)   as Rcvd_Datetime,

                                  max(art.name_)         as activityname,

                                  max(art.owner_)        as owner,

                                  max(art.ASSIGNEE_)     as ASSIGNEE,

                                  max(art.due_date_)     as due_time,

                                  max(art.TASK_DEF_KEY_) as TASK_DEF_KEY_

                           from public.Act_Hi_Taskinst art

                                    inner join public.act_hi_identitylink ari

                                               on art.id_ = ari.task_id_

                           where art.end_time_ is not null

                             and ari.type_ = 'candidate'

                             and art.proc_inst_id_ in (:PROCESSINSTANCEID)

                           group by art.proc_inst_id_) T1

                           INNER JOIN ynytgz_inst.PCC_PROJECT p1 ON T1.BPD_INSTANCE_ID = p1.PROCESSINSTANCEID

                  group by p1.id) T

                     left join ynytgz_inst.PCC_PROJECT p on T.BPD_INSTANCE_ID = P.PROCESSINSTANCEID

                     left join ynytgz_inst.BZ_CASEINSTRELATION cir on cir.pid = p.id

                     left join ynytgz_inst.BZ_PROJECTCASE c on c.ID = cir.CID

                     left join ynytgz_inst.PCC_PROJECTRELATION pr on pr.FK_PROJECT_ID = p.id

                     left join ynytgz_inst.zz_bzgzxx bg on bg.cid = c.id

                     left join ynytgz_inst.pcc_project pp on pp.id = pr.parentprojectid

                     left join ynytgz_inst.PCC_PROJECTRELATION pr1 on pr1.FK_PROJECT_ID = pp.id

                     left join ynytgz_inst.pcc_project pp1 on pp1.id = pr1.parentprojectid

                     left join ynytgz_inst.bz_jsdw_jbxx bjj on c.id = bjj.cid

                     LEFT JOIN ynytgz_inst.PCC_TASKLOG PTL ON PTL.TASKID = cast(t.TASKID as Integer)

                     left join ynytgz_inst.zz_xmjbqk qk on qk.cid = c.id

                     left join (select cid, max(id) as id

                                from ynytgz_inst.bz_yqsyfa fa

                                group by cid) maxfa on maxfa.cid = c.id

                     left join ynytgz_inst.bz_yqsyfa fa on fa.id = maxfa.id

                     left join ynytgz_inst.zz_pzzyxx pzzyxx on pzzyxx.faid = fa.faid and pzzyxx.cid = c.id

                     left join ynytgz_inst.zz_sqzymjqk sqzymjqk on sqzymjqk.faid = fa.faid and sqzymjqk.cid = c.id

                     left join ynytgz_inst.zz_fhgtkjghqk fhgtkjghqk on fhgtkjghqk.faid = fa.faid and fhgtkjghqk.cid = c.id

                     left join (select faid, string_agg(distinct cast(gdzldb as varchar), ',') gdzldb

                                from ynytgz_inst.zz_gdzlxq gdzlxq

                                group by faid) gdzlxq on gdzlxq.faid = fa.faid and fhgtkjghqk.cid = c.id

            where p.processinstanceid in (:PROCESSINSTANCEID)

        ]]></sql>

        <params>

            <param name="PROCESSINSTANCEID"/>

        </params>

        <properties mergeglobal="true"/>

    </config>

```