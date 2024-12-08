# DAP4.3业务应用获取材料报表更新DAP表问题
### 问题分析
监控系统执行中的 SQL 时，发现存在业务系统更新模型表的数据。并发量高时，会因为模型表更新而导致材料和报表的查询遇到锁表锁行的情况，反应出来的情况就是材料加载缓慢。
![FcfgYRQpyZ2N96I.png](https://s2.loli.net/2024/11/27/FcfgYRQpyZ2N96I.png)

### 问题原因
跟踪产品接口`pcc/approve/v1/project/{projectId}/projectResourceList`中的一段代码：
```java
@Override  
public List<BusinessMaterial> listActivityBusinessMaterial(Integer businessActivityId) {  
    List<BusinessMaterial> res = new ArrayList<BusinessMaterial>();  
    List<BusinessActivityMaterial> bamList = listBusinessActivityMaterial(businessActivityId);  
    List<Integer> businessMaterialIdList = new ArrayList<Integer>();  
    Map<Integer, BusinessActivityMaterial> bamMap = new HashMap<Integer, BusinessActivityMaterial>();  
    if (bamList == null || bamList.size() == 0) {  
        return res;  
    }  
    for (BusinessActivityMaterial bam : bamList) {  
        businessMaterialIdList.add(bam.getBusinessMaterialId());  
        bamMap.put(bam.getBusinessMaterialId(), bam);  
    }  
    if (businessMaterialIdList.size() == 0) {  
        return new ArrayList<>();  
    }  
    List<BusinessMaterial> bmList = (List<BusinessMaterial>) baseDao.criteria(BusinessMaterialEntity.class,  
            Restrictions.in("id", businessMaterialIdList), Order.asc("sortNo"));  
    if (bmList == null || bmList.size() == 0) {  
        return res;  
    }  
    Map<Integer, BusinessMaterial> bmMap = Parse.getMap(Integer.class,  
            BusinessMaterial.class, bmList, "id");  
    for (Integer businessMaterialId : businessMaterialIdList) {  
        if (bmMap.containsKey(businessMaterialId)) {  
            // 用环节材料的顺序替换材料本身的排序  
            BusinessMaterial bm = bmMap.get(businessMaterialId);  
            // 问题代码
            bm.setSortNo(bamMap.get(businessMaterialId).getSortNo());  
            res.add(bm);  
        }  
    }  
    return res;  
}
```
这段代码是获取业务材料的代码，其中获取小业务材料的`entity`后，直接在entity上进行了sortno的修改，最后由hibernate检测到实体变更，于事务提交后进行了持久化。从代码中能够找到：
```sql
update ynytgz_dap.DAP_BUSINESSMATERIAL set ALIAS=$1, FK_BUSINESS_ID=$2, CATEGORYNAME=$3, CREATEDTIME=$4, CREATEDUSERID=$5, ENABLE=$6, FILTER=$7, INITIALIZE=$8, FK_MATERIALCATEGORY_ID=$9, PROJECTTYPE=$10, REMARK=$11, SIGN=$12, SORTNO=$13 where ID=$14
```
### 问题处理
要避免这个问题，就是要避免`entity`的持久化，比较简单的办法就是使用DTO对象，对DTO对象进行变更操作，而不是直接对`entity`的操作，从而避免`entity`的持久化。
```java
if (bmMap.containsKey(businessMaterialId)) {  
    //用环节材料的顺序替换材料本身的排序  
    BusinessMaterial bm = bmMap.get(businessMaterialId);  
    BusinessMaterialDTO businessMaterialDTO = BusinessDTOConverter.toDTO(bm);  
    // 使用数据传输对象, 避免持久化  
    businessMaterialDTO.setSortNo(bamMap.get(businessMaterialId).getSortNo());  
    res.add(businessMaterialDTO);  
}
```