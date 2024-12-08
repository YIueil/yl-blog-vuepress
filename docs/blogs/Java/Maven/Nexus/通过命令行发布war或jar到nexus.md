---
  date: 2023/8/15 21:41
  pageClass: blue-archive
  tags:
    - 未分类
  categories:
    - 未归档
---

# 通过命令行发布war或jar到nexus

- 示例中的换行符号使用了windows环境下的 ^，linux环境下需要使用 \
- 使用的认证用户需要具有相应接口的调用权限

## 1、使用UI上传接口

```sh
curl -v -F r=releases ^
 -F hasPom=false ^
 -F e=war ^
 -F g=cn.yiueil ^
 -F a=hellowrold ^
 -F v=0.0.1-releases ^
 -F p=war ^
 -F file=@helloworld.war ^
 -u admin:admin123 ^
 http://127.0.0.1:8081/nexus/service/local/artifact/maven/content
```

- UI上传接口只能上传RELEASE版本的包
- 不推荐，密码使用了明文传输

## 2、使用API上传

```sh
curl -v -u admin:admin123 -X PUT ^
-F file=@helloworld-0.0.1.RELEASE.war ^
http://127.0.0.1:8081/nexus/content/repositories/releases/cn/yiueil/helloworld/0.0.1.RELEASE/helloworld-0.0.1.RELEASE.war
```

删除已上传的包

```sh
curl -v -u admin:admin123 -X DELETE ^
http://127.0.0.1:8081/nexus/content/repositories/releases/cn/yiueil/helloworld/0.0.1.RELEASE/helloworld-0.0.1.RELEASE.war
```

- realease和snapshot版本需要上传到对应的仓库，否则上传返回400错误
- 不推荐，密码使用了明文传输

## 3、使用maven插件上传

- 需要maven运行环境
- 需要保证配置文件中的仓库id和发布目标DrepositoryId一致

```sh
mvn -s settings.xml文件路径 deploy:deploy-file -DgroupId=构件组名 -DartifactId=构件名 -Dversion=构件版本号 -Dpackaging=构件类型（后缀） -Dfile=构件本地路径 -Durl=http://127.0.0.1:8081/nexus/content/repositories/releases/ -DrepositoryId=YIueilNexusRelease

mvn -s settings.xml文件路径 deploy:deploy-file -DgroupId=构件组名 -DartifactId=构件名 -Dversion=构件版本号 -Dpackaging=构件类型（后缀） -Dfile=构件本地路径 -Durl=http://127.0.0.1:8081/nexus/content/repositories/snapshots/ -DrepositoryId=YIueilNexusSnapshot
```

## 4、使用Gradle插件上传

后续完善
