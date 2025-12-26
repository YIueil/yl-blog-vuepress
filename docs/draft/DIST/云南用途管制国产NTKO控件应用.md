# 云南用途管制国产NTKO控件应用
> 项目架构: Dap4.3产品 + Vue2

下载地址：http://124.220.234.24/down.html
网盘：链接：https://pan.baidu.com/s/1NKpmdTJ2NOWw-26iOm4KZg 提取码：o3i7 解压密码：dist

## 1 前端部分改造
### 1.1 引入`ntkobackground.min.js`NTKO的核心方法依赖库。
![lBpndCJohbeHWUx.png](https://s2.loli.net/2024/10/15/lBpndCJohbeHWUx.png)

## 2 后端部分改造
### 2.1 Webapps下的WEB-INF中引入NTKO主体内容
![DaK7J1pQS8kTAcy.png](https://s2.loli.net/2024/10/15/DaK7J1pQS8kTAcy.png)
### 2.2 Windows控件插件下载地址
![TAfwYLpRgGvOnyH.png](https://s2.loli.net/2024/10/15/TAfwYLpRgGvOnyH.png)
## 3 安装（应用程序和浏览器插件）
### windows
直接安装exe安装程序，执行后重启再打开浏览器启用NTKO插件。

### 其他平台
参照应用平台文档进行安装（通过终端命令），插件会在命令执行后携带：
```sh
sudo dpkg -i ntko-office_1.1.4+arm64.deb
```
>不同的平台的命令可能有一些不同，执行命令需要输入账户密码。

## 4 代码编写
### 4.1  前端调用请求获取后端Word模板
``` js
selectNwTemplate (e, value) {  
    const ntkoBrowser = require('@/api/ntkobackground.min').ntkoBrowser  
    const ntkoed = ntkoBrowser.ExtensionInstalled() // 判断插件是否安装  
    const url = process.env.VUE_APP_BASE_URL + 'officialEditor/officeMaterialEditorForNewVersion.jsp?' +  
      'projectId=' + this.params.projectId +  
      '&materialId=' + value.materialId +  
      '&taskId=' + this.query.taskId +  
      '&userName=' + this.userInfo.loginName +  
      '&fileName=' + value.mbmc +  
      '&save=true&mark=true&marking=true'  
    // 安装了插件则打开预览地址
    if (ntkoed) {  
      ntkoBrowser.openWindow(encodeURI(url))  
    } else { // 否则打开插件下载页
      window.open(process.env.VUE_APP_BASE_URL + 'officialEditor/officecontrol/exeindex.html')  
    }  
}
```
### 4.2 后端获取Word模板，返回模板访问的URL

>逻辑是获取到模板文件，生成一个新文件，返回URL。如果已经存在则返回已有的文件。

获取报表URL接口
```java
	@ResponseBody  
    @ApiOperation(value = "预览：获取word报表预览路径", notes = "报表：获取word预览路径", response = Result.class)  
    @RequestMapping(value = "project/material/getWordReportUrlNtko", method = {RequestMethod.POST, RequestMethod.GET})  
    public String getWordReportUrl(  
            @ApiParam(value = "审批事项Id", required = true)  
            @RequestParam(value = "projectId", required = true) Integer projectId,  
            @ApiParam(value = "报表版本Id", required = true)  
            @RequestParam(value = "reportRevisionId", required = true) Integer reportRevisionId,  
            @ApiParam(value = "任务id", required = false)  
            @RequestParam(value = "taskId", required = false) Integer taskId,  
            HttpServletRequest request,  
            HttpServletResponse response) throws Exception {  
        UserDTO user = getUser(request);  
        String url = GlobalProperties.getProperty("sitehome.url");  
        Map<String, Object> rspMap = ynProjectMaterialService.getReportFile(projectId, reportRevisionId, user, true);  
        url += "/officialEditor/index.jsp";  
        url += "?projectId=" + projectId;  
        url += "&reportRevisionId=" + reportRevisionId;  
        url += "&isWordReport=" + true;  
        url += "&taskId=" + taskId;  
        url += "&fullPath=" + Parse.getString(rspMap.get("filePath"), "");  
//        url += "&fileName=" + Parse.getString(rspMap.get("fileName"), "");  
        return success(url);  
    }
```
获取报表文件具体实现：
```java
    @Transactional  
    @Override    public Map<String, Object> getReportFile(Integer projectId, Integer reportRevisionId, UserDTO userDTO, boolean isDeleted) throws Exception {  
        String fileName = projectId + "_" + reportRevisionId + ".doc";  
        String tempPath = servletContext.getRealPath("/");  
        tempPath = tempPath + File.separator + "officeFile_" + File.separator + userDTO.getId() + File.separator;  
//清空用户文件夹下的文件  
        if (userDTO.getId() != null && !userDTO.getId().equals("") && isDeleted) {  
            com.dist.bdf.util.file.FileUtil.delFolder(tempPath);  
        }  
        com.dist.bdf.util.file.FileUtil.mkDir(tempPath);  
        File file = new File(tempPath + fileName);  
        Boolean create = true;  
        String realPath = "/" + SubPath + "/" + fileName;  
        InputStream in = null;  
        FileOutputStream sos = null;  
        try {  
            sos = new FileOutputStream(file);  
            //如果存在则下载。不存在从模板生成  
            if (!fileStoreFacade.isExit(realPath, MaterialService.MaterialConfigName)) {  
                in = reportPubService.getReportRevisionLayoutStream(reportRevisionId);  
                printStream(in, sos);  
            } else {  
                this.fileStoreFacade.downLoadFile(realPath, sos, MaterialService.MaterialConfigName);  
                create = Boolean.valueOf(false);  
            }  
        } catch (Exception e) {  
            Loggers.error(this, e);  
        } finally {  
            IOUtils.closeQuietly(in);  
            IOUtils.closeQuietly(sos);  
        }  
        projectReportService.saveAsposeWord(tempPath + fileName, projectId, new HashMap<String, Object>(), false, false, true, null, userDTO, reportRevisionId, null, false);  
        String filePath = file.getPath();  
        if (GlobalProperties.getProperty("filePath.encode.enable", "false").equals("true")) {  
            try {  
                filePath = URLEncoder.encode(filePath, GlobalProperties.getProperty("ibm.bpm.basic.encoding", "UTF-8"));  
            } catch (UnsupportedEncodingException e) {  
                Loggers.error(e);  
            }  
        }  
        Map<String, Object> rspMap = new HashMap<String, Object>();  
        ReportDTO reportDTO = projectReportService.getReportDTOByByRevisionId(reportRevisionId);  
        rspMap.put("fileName", reportDTO.getReportname() + ".doc");  
        rspMap.put("filePath", filePath);  
        rspMap.put("realPath", realPath);  
        rspMap.put("fileSize", file.length());  
        return rspMap;  
    }
```
## 5 NTKO版本更新
### 5.1 拿到最新的更新授权文件ntkocfgfile.dat, 替换位于服务器的officialEditor/officecontrol下的文件。
![wULcSstqO79FkYy.png](https://s2.loli.net/2024/10/15/wULcSstqO79FkYy.png)


### 5.2 后端修改officialEditor根据授权ID或者pluginVersion判断当前的客户端控件是否是最新的。如果是老的则更新授权文件

![rxNSgD8FlJARmM9.png](https://s2.loli.net/2024/10/15/rxNSgD8FlJARmM9.png)
>更新常见常见问题：
>客户端因为服务端代码有问题，导致错误下载ntkocfgfile.dat授权文件，需要重新卸载后安装，或者将新版本的包解压出来，拿到内部的ntkocfgfile.dat并进行替换。
