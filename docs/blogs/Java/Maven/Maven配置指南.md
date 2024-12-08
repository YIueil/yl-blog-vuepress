---
date: 2023/8/24 2:02
pageClass: blue-archive
tags:
  - Maven
categories:
  - 未归档
---
# Maven参考指南

## 1 Maven和IDEA的兼容性问题

| IntelliJ IDEA 版本 | 兼容的 Maven 版本        |
| ---------------- | ------------------- |
| IDEA 2024        | Maven 3.9.6 及之前所有版本 |
| IDEA 2023        | Maven 3.9.5 及之前所有版本 |
| IDEA 2022        | Maven 3.8.5 及之前所有版本 |
| IDEA 2021        | Maven 3.8.1 及之前所有版本 |
| IDEA 2020        | Maven 3.6.3 及之前所有版本 |
| IDEA 2018        | Maven 3.6.1 及之前所有版本 |

## 2 Setting配置

### 2.1 自带setting

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--
 | 这是Maven的配置文件。它可以在两个级别上指定:
 |
 |  1. 用户级别。这个settings.xml文件为单个用户提供配置,
 |                通常位于${user.home}/.m2/settings.xml。
 |
 |                注意:这个位置可以通过CLI选项覆盖:
 |
 |                -s /path/to/user/settings.xml
 |
 |  2. 全局级别。这个settings.xml文件为机器上所有Maven用户
 |                提供配置(假设他们都使用相同的Maven安装)。它通常位于
 |                ${maven.conf}/settings.xml。
 |
 |                注意:这个位置可以通过CLI选项覆盖:
 |
 |                -gs /path/to/global/settings.xml
 |
 | 本样本文件中的部分旨在让您快速开始使用Maven安装。在适当的地方,
 | 提供了默认值(当未指定设置时使用的值)。
 -->
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
  <!-- localRepository
   | Maven将用来存储构件的本地仓库的路径。
   |
   | 默认:${user.home}/.m2/repository
  <localRepository>/path/to/local/repo</localRepository>
  -->
  <!-- interactiveMode
   | 这将决定Maven在需要输入时是否提示您。如果设置为false,
   | Maven将使用一个合理的默认值,可能基于其他一些设置,用于
   | 问题中的参数。
   |
   | 默认:true
  <interactiveMode>true</interactiveMode>
  -->
  <!-- offline
   | 确定Maven在执行构建时是否应该尝试连接到网络。
   | 这将影响构件下载、构件部署等。
   |
   | 默认:false
  <offline>false</offline>
  -->

  <!-- pluginGroups
   | 这是一个额外的组标识符列表,当通过它们的前缀解析插件时会被搜索,即
   | 当调用像"mvn prefix:goal"这样的命令行时。Maven会自动添加组标识符
   | "org.apache.maven.plugins"和"org.codehaus.mojo",如果这些不在列表中。
   -->
  <pluginGroups>
    <!-- pluginGroup
     | 指定一个进一步的组标识符用于插件查找。
    <pluginGroup>com.your.plugins</pluginGroup>
    -->
  </pluginGroups>

  <!-- proxies
   | 这是一个代理列表,可以用来在这台机器上连接到网络。
   | 除非另有指定(通过系统属性或命令行开关),否则这个列表中第一个
   | 标记为活动的代理规范将被使用。
   -->
  <proxies>
    <!-- proxy
     | 一个代理的规范,用于连接到网络。
     |
    <proxy>
      <id>optional</id>
      <active>true</active>
      <protocol>http</protocol>
      <username>proxyuser</username>
      <password>proxypass</password>
      <host>proxy.host.net</host>
      <port>80</port>
      <nonProxyHosts>local.net|some.host.com</nonProxyHosts>
    </proxy>
    -->

  </proxies>
  <!-- servers
   | 这是一个认证配置文件列表,通过系统内使用的server-id来识别。
   | 认证配置文件可以在Maven必须连接到远程服务器时使用。
   -->
  <servers>
    <!-- server
     | 指定连接到特定服务器时使用的认证信息,由系统内的唯一名称识别,
     | 通过下面的'id'属性引用。
     |
     | 注意:您应该指定用户名/密码或私钥/密码短语,因为这些配对是
     |       一起使用的。
    <server>
      <id>deploymentRepo</id>
      <username>repouser</username>
      <password>repopwd</password>
    </server>
    -->
    <!-- Another sample, using keys to authenticate.
    <server>
      <id>siteServer</id>
      <privateKey>/path/to/private/key</privateKey>
      <passphrase>optional; leave empty if not used.</passphrase>
    </server>
    -->

  </servers>
  <!-- mirrors
   | 这是一个用于从远程仓库下载构件的镜像列表。
   |
   | 它的工作原理如下:POM可能声明一个仓库用于解析某些构件。
   | 然而,这个仓库有时可能因为高流量而出现问题,所以人们将其镜像
   | 到几个地方。
   |
   | 那个仓库定义将有一个唯一的ID,因此我们可以为那个仓库创建一个镜像引用,
   | 用作该仓库的替代下载站点。镜像站点将是那个仓库的首选服务器。
   |-->
  <mirrors>
    <!-- mirror
     | 指定一个仓库镜像站点,代替给定的仓库使用。这个镜像服务的仓库有一个ID,
     | 与这个镜像的mirrorOf元素匹配。ID用于继承和直接查找目的,并且必须在镜像集合中是唯一的。
    <mirror>
      <id>mirrorId</id>
      <mirrorOf>repositoryId</mirrorOf>
      <name>Human Readable Name for this Mirror.</name>
      <url>http://my.repository.com/repo/path</url>
    </mirror>
     -->

  </mirrors>

  <!-- profiles
   | 这是一个配置文件列表,可以在多种方式下激活,并可以修改构建过程。在settings.xml中提供的配置文件旨在提供本地机器特定的路径和仓库位置,
   | 允许构建在本地环境中工作。
   |
   | 例如,如果您有一个集成测试插件——像cactus——需要知道您的Tomcat实例安装在哪里,您可以在这里提供一个变量,以便在构建过程中解析该变量来配置cactus插件。
   |
   | 如上所述,配置文件可以通过多种方式激活。一种方式——本文档(settings.xml)中的activeProfiles部分——稍后将讨论。另一种方式基本上依赖于检测系统属性,无论是匹配属性的特定值,
   | 还是仅仅测试其存在。配置文件也可以通过JDK版本前缀激活,其中'1.4'的值可能在构建在'1.4.2_07'版本的JDK上执行时激活一个配置文件。
   | 最后,可以从命令行直接指定活动配置文件的列表。
   |
   | 注意:对于在settings.xml中定义的配置文件,您仅限于指定构件仓库、插件仓库和用作POM中插件配置变量的自由形式属性。
   |
   |-->

  <profiles>
    <!-- profile
     | 指定一组引入到构建过程中的介绍,使用上述描述的一种或多种机制激活。为了继承目的,并通过<activatedProfiles/>或命令行激活配置文件,
     | 配置文件必须有一个唯一的ID。
     |
     | 鼓励使用一致的命名约定来标识配置文件,例如'env-dev'、'env-test'、'env-production'、'user-jdcasey'、'user-brett'等。
     | 这将使理解引入的配置文件集合尝试实现什么更加直观,特别是当您只有一组配置文件ID进行调试时。
     |
     | 这个配置文件示例使用JDK版本来触发激活,并提供JDK特定的仓库。
    <profile>
      <id>jdk-1.4</id>
      <activation>
        <jdk>1.4</jdk>
      </activation>
      <repositories>
        <repository>
          <id>jdk14</id>
          <name>Repository for JDK 1.4 builds</name>
          <url>http://www.myhost.com/maven/jdk14</url>
          <layout>default</layout>
          <snapshotPolicy>always</snapshotPolicy>
        </repository>
      </repositories>
    </profile>
    -->

    <!--
     | 这里是另一个配置文件,通过系统属性'target-env'与值'dev'激活,
     | 提供Tomcat实例的特定路径。要使用这个,您的插件配置可能假设如下:
     |
     | ...
     | <plugin>
     |   <groupId>org.myco.myplugins</groupId>
     |   <artifactId>myplugin</artifactId>
     |
     |   <configuration>
     |     <tomcatLocation>${tomcatPath}</tomcatLocation>
     |   </configuration>
     | </plugin>
     | ...
     |
     | 注意:如果您只想在有人设置'target-env'为任何值时注入此配置,
     |      您可以在activation-property中只留下<name/>。
    <profile>
      <id>env-dev</id>
      <activation>
        <property>
          <name>target-env</name>
          <value>dev</value>
        </property>
      </activation>
      <properties>
        <tomcatPath>/path/to/tomcat/instance</tomcatPath>
      </properties>
    </profile>
    -->
  </profiles>
  <!-- activeProfiles
   | List of profiles that are active for all builds.
   |
  <activeProfiles>
    <activeProfile>alwaysActiveProfile</activeProfile>
    <activeProfile>anotherAlwaysActiveProfile</activeProfile>
  </activeProfiles>
  -->
</settings>
```
### 2.2 设置本地仓库

### 2.3 配置代理

### 2.4 配置镜像服务


##  3 收藏的仓库中心

```xml
<mirrors>
     <mirror>
        <id>alimaven</id>
        <name>aliyun maven</name>
        <url>http://maven.aliyun.com/mvn/view</url>
        <mirrorOf>central</mirrorOf>
    </mirror>
    <mirror>
        <id>jboss-public-repository-group</id>
        <mirrorOf>central</mirrorOf>
        <name>JBoss Public Repository Group</name>
        <url>http://repository.jboss.org/nexus/content/groups/public</url>
    </mirror>
    <mirror>
        <id>ibiblio</id>
        <mirrorOf>central</mirrorOf>
        <name>Human Readable Name for this Mirror.</name>
        <url>https://maven.aliyun.com/mvn/view</url>
    </mirror>
    <mirror>
        <id>central</id>
        <name>Maven Repository Switchboard</name>
        <url>http://repo1.maven.org/maven2/</url>
        <mirrorOf>central</mirrorOf>
    </mirror>
    <mirror>
        <id>repo2</id>
        <mirrorOf>central</mirrorOf>
        <name>Human Readable Name for this Mirror.</name>
        <url>http://repo2.maven.org/maven2/</url>
    </mirror>
</mirrors>
```