# CrossUI多实例表单绑定实现
总体实现思路：
对于CrossUI来说，后端会返回一个json对象，将json对象解析，将绑定的字段渲染到表单中。对于project表，由于对象数组中只有一个对象，所以取值不会有问题。而对于fwgz表，有两个记录对象，则会用第一个数据渲染到表单上。在切换表单数据的时候，进行排序后重新setData()方法来实现表单的切换。
```json
{
    "project": [
        {
            "guid": "467854a0-91ec-25bd-d428-db3b275659dc",
            "name": "测试勘查类项目",
            "businessName": "临时用地审批",
            "version": "1.3.6",
            "spqx": "州级",
            "xmlxname": "勘查类",
            "zyyt": "矿产资源勘查"
        }
    ],
    "bz_fwgz": [
        {
            "guid": "26c55a49-ffab-fe1a-4a02-6c1b1d133f53",
            "projectGuid": "467854a0-91ec-25bd-d428-db3b275659dc",
            "name": "发文稿纸1",
            "content": "稿纸1内容"
        },
        {
            "guid": "3692408b-f416-4ce1-a7aa-abfaaa91b124",
            "projectGuid": "467854a0-91ec-25bd-d428-db3b275659dc",
            "name": "发文稿纸2",
            "content": "稿纸2内容"
        }
    ]
}
```
## 1 构建段配置
构建段配置表单与普通表单配置保持一致即可，正常配置表单即可。
> 特殊的：
> 对于表格需要进行特殊处理。增加一个隐藏的标识列，在代码中对标识进行处理。

![qmtAiIPMxkjyUeE.png](https://s2.loli.net/2024/11/04/qmtAiIPMxkjyUeE.png)
## 2 代码实现
首先增加一个切换表单的地方。可以是按钮，也可以是下拉框。通过点击对应的按钮，将渲染表单数据的data的数据进行重新排序后，将需要渲染的数据排序移动到最前面，然后重新调用CrossUI的setData()方法。
```javascript
// Form.vue 变更方案时, 拿到formData进行重新粗合理排序
async changeYqsyfa (fa) {  
  if (this.gisFull) {  
    this.showGisFull()  
  }  
  console.log('切换方案', fa.faid)  
  const formData = this.$refs.tabs1.beforeSetGroup()  
  this.curLeft = ''  
  this.currentFa = fa  
  await this.getCommonFormDataByFa()  
  setTimeout(() => {  
    this.curLeft = 'plan'  
    this.$refs.tabs1.setGroup('一请示一方案', formData)  
    this.Event.$emit('CHANGE_FA', fa)  
  })  
}
```

```js
// CrossUI.vue 监听全局的方案变更方法, 对需要重新渲染的表单进行数据渲染
this.Event.$on('CHANGE_FA', (fa) => {  
  if (this.formParams.formDTO.remark.indexOf('一请示一方案') > -1 || this.formParams.formDTO.remark.indexOf('ZZ_PZZYXX') > -1) {  
    this.formatFaFormData(this.fa?.faid || fa.faid)  
  }  
})

// 该方法实现了重新排序
formatFaFormData (faid) {  
  if (this.formParams.formDTO.remark.indexOf('一请示一方案') > -1 || this.formParams.formDTO.remark.indexOf('ZZ_PZZYXX') > -1) {  
    const tables = getInitTables()  
    for (const table of tables) {  
      if (this.formData[table] && this.formData[table].length > 0) {  
        const objList = []  
        this.formData[table].forEach((item, index) => {  
          if (item.faid === faid) {  
            objList.push(item)  
            this.formData[table].splice(index, 1)  
          }  
        })  
        this.formData[table].unshift(...objList)  
      }  
    }  
    console.log('方案排序结果', this.formData)  
    // 重新渲染赋值
    this.updateFormData()  
  }  
}

// 调用CrossUI的API实现重新setData
updateFormData () {  
  if (this.iframeCtrl.formMgr) {  
    this.iframeCtrl.formMgr.setData(this.formData, this.fa ? this.fa.faid : null)  
    if (this.fa && this.fa.faid && this.formParams.formDTO.remark.indexOf('一请示一方案') > -1) {  
	  // 设置当前选中的方案id
      this.iframeCtrl.formMgr.setZfaid(this.fa.faid)  
    }  
  }  
}
```
run.js中需要进行的改造
- 表格插入的时候，需要对faid进行赋值。
- 数据切换的时候，需要过滤出faid为当前选中的方案的记录。
```js
// 设置当前选中的faid
this.setZfaid = function(setFaid) {  
  if (!setFaid) return  
  zfaid = setFaid  
}

// 表格插入、删除、新增的回调改造
var callback = function (prf, i, src) {  
  if (i.id == 'newrow') {  
    var id = 'temp_' + (new Date()).getTime()  
    var tagVar = grid.getTagVar()  
    var cells = []  
    for(const i in grid.n0.colMap) { // 根据列设置初始值 为faid设置当前的方案id值  
      var temTag = ''  
      if (grid.n0.colMap[i].tag) {  
        var tagObj =  JSON.parse(grid.n0.colMap[i].tag);  
        console.log(tagObj)  
        temTag = tagObj.get || ''  
      }  
  
      if (grid.n0.colMap[i].id == 'faid') {  
        cells.push(zfaid)  
      } else if(temTag){  
        var temData = window.formMgr.getData();  
        console.log(temData[temTag[0]][0][temTag[1]]);  
        cells.push(temData[temTag[0]][0][temTag[1]]);  
      } else {  
        cells.push(null)  
      }  
    }  
    console.log('新增表格数据行', cells)  
    if (tagVar && tagVar.DefaultValue && tagVar.DefaultValue.cells)// 设置默认值  
    { cells = tagVar.DefaultValue.cells }  
    grid.insertRows([{ id: id, unsave: true, cells: cells }])  
    formMgr._autoCreteTab(ctl)  
  } else if (i.id == 'insertrow') {  
    var id = 'temp_' + (new Date()).getTime()  
    var tagVar = grid.getTagVar()  
    var cells = []  
    for(const i in grid.n0.colMap) { // 根据列设置初始值 为faid设置当前的方案id值  
      if (grid.n0.colMap[i].id !== 'faid') {  
        cells.push(null)  
      } else {  
        cells.push(zfaid)  
      }  
    }  
    console.log('新增表格数据行', cells)  
    if (tagVar && tagVar.DefaultValue && tagVar.DefaultValue.cells) // 设置默认值  
    { cells = tagVar.DefaultValue.cells }  
  
    grid.insertRows([{ id: id, unsave: true, cells: cells }], null, item.id, true)  
    formMgr._autoCreteTab(ctl)  
  } else if (i.id == 'deleterow') {  
    var num = item._autoNumber  
    grid.removeRows([item.id]);  
    formMgr._autoRemoveTab(ctl,num - 1)  
  }  
}

// setData改造
this._setData2Grid = function (ctl, data, faid) {  
  var formMgr = this  
  var binder = formMgr.getDataBinder(ctl)  
  if (!binder) return  
  var obj = data[binder]  
  
  if (_util.typev(obj) != 'array') {  
    obj = obj ? [obj] : []  
  }  
  
  var headerMap = this._getHeaderMap(ctl)  
  var headers = ctl.getHeader('min')  
  var rows = []  
  
  console.log({  
    zgdfarid, znydzyfarid, zbcgdfarid, zzstdfarid, zcbsmsid  
  })  
  for (var j = 0; j < obj.length; j++) {  
    var oj = obj[j] || {}  
    var id = oj.id || ('temp_' + (new Date()).getTime())  
    var row = { id: id, cells: [], odata: oj }  
    for (var c = 0; c < headers.length; c++) {  
      var coln = headers[c]  
      var cold = headerMap[coln]  
      var v = oj[coln]  
      if (cold.type == 'date' || cold.type == 'datetime' || cold.type == 'time') {  
        v = this.parseDate(v)  
      }  
      row.cells.push(v)  
    }  
    // 如果存在方案id 行也存在方案id, 则根据 faid 进行过滤操作
    if (faid && row.odata.faid) {
      if (faid === row.odata.faid) {  
        rows.push(row)  
      } else {  
        row.hidden = true  
        rows.push(row)  
      }  
    } else if (zdetailnum && row.odata.seniordetailnum) {  
      if (zdetailnum === row.odata.seniordetailnum) {  
        rows.push(row)  
      } else {  
        row.hidden = true  
        rows.push(row)  
      }  
    } else if (dBjtzsDetailnum && row.odata.seniordetailnum) {  
      if (dBjtzsDetailnum === row.odata.seniordetailnum) {  
        rows.push(row)  
      } else {  
        row.hidden = true  
        rows.push(row)  
      }  
    } else if (zcbsmsid && row.odata.cbsmsid) {  
      if (zcbsmsid === row.odata.cbsmsid) {  
        rows.push(row)  
      } else {  
        row.hidden = true  
        rows.push(row)  
      }  
    } else if (znydzyfarid && row.odata.nydzyfarid) {  
      if (znydzyfarid === row.odata.nydzyfarid) {  
        rows.push(row)  
      } else {  
        row.hidden = true  
        rows.push(row)  
      }  
    } else if (zzstdfarid && row.odata.zstdfarid) {  
      if (zzstdfarid === row.odata.zstdfarid) {  
        rows.push(row)  
      } else {  
        row.hidden = true  
        rows.push(row)  
      }  
    } else if (zbcgdfarid && row.odata.bcgdfarid) {  
      if (zbcgdfarid === row.odata.bcgdfarid) {  
        rows.push(row)  
      } else {  
        row.hidden = true  
        rows.push(row)  
      }  
    } else if (zgdfarid && row.odata.gdfarid) {  
      if (zgdfarid === row.odata.gdfarid) {  
        rows.push(row)  
      } else {  
        row.hidden = true  
        rows.push(row)  
      }  
    } else {  
      rows.push(row)  
    }  
  }  
  ctl.setRows(rows)  
}
```
