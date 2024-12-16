---
date: 2024-12-16 15:40:35
pageClass: blue-archive
tags:
  - Maven
categories:
  - Java
---
# Maven常用命令

## 基础命令

### 清理并打包
`mvn clean package`
> -U 强制更新快照
> -DskipTests 跳过测试阶段
> -Dmaven.test.skip 和测试类的编译和跳过测试阶段

## 高级命令

### 将 Jar 包发布到本地仓库
>-Dfile 指定文件
>-DgroupId 指定groupId
>-DartifactId 指定artifactId
>-Dversion 指定jar版本
>-Durl 指定本地仓库目录
>-DgeneratePom 生成相应的pom文件
```batch
mvn install:install-file ^
   -Dfile=./ojdbc6-11.1.0.7.0.jar ^
   -DgroupId=com.oracle ^
   -DartifactId=ojdbc6 ^
   -Dversion=11.1.0.7.0 ^
   -Dpackaging=jar ^
   -DgeneratePom=true ^
   -Durl=file:///D:\YIueil\Workspace\Runtime\Maven\repository
```