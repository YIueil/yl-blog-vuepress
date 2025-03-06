---
date: 2025-03-06 09:57:10
pageClass: blue-archive
tags:
  - 学习记录
  - SpringBoot
categories:
  - Spring
  - SpringBoot
---

# SpringBoot 学习记录

## 1 Hello World 应用
基于一个普通的`Maven`项目创建第一个`SpringBoot`应用的步骤：
1. 创建一个普通maven项目
2. pom.xml文件中添加对于`spring-boot-starter-parent`父项目的继承 **或者** pom.xml 中添加对于`spring-boot-dependencies`的依赖
3. pom.xml文件的dependencies中添加`spring-boot-starter-web`的依赖
4. pom.xml文件的plugin中添加`spring-boot-maven-plugin`插件(如果使用了父项目继承的方式则不必要) 
5. 添加启动类, 启动类注解添加@SpringBootApplication, 最后完善main方法

### 1.1 创建一个普通 maven 项目
项目结构
```sh
no-01
|   pom.xml
|
\---src
    \---main
        \---java
            \---cc
                \---yiueil
                        No01Application.java
```

### 1.2 使用 SpringBoot  进行依赖统一管理
使用父项目继承
```xml
<parent>  
    <groupId>org.springframework.boot</groupId>  
    <artifactId>spring-boot-starter-parent</artifactId>  
    <version>2.7.9</version>  
</parent>
```
或添加pom类型的依赖
```xml
<dependency>  
    <groupId>org.springframework.boot</groupId>  
    <artifactId>spring-boot-dependencies</artifactId>  
    <version>${springboot.version}</version>  
    <scope>import</scope>  
    <type>pom</type>  
</dependency>
```

两种方式的优劣:

| 特性         | `spring-boot-starter-parent` | `spring-boot-dependencies`   |
| ---------- | ---------------------------- | ---------------------------- |
| **依赖管理**   | 通过父 POM 继承                   | 通过 `dependencyManagement` 引入 |
| **插件管理**   | 自动配置常用插件                     | 需要手动配置插件                     |
| **默认构建配置** | 提供默认配置（如编码、资源过滤等）            | 需要手动配置                       |
| **灵活性**    | 较低，必须作为父 POM                 | 较高，可以与现有父 POM 共存             |
| **适用场景**   | 新项目，无自定义父 POM                | 已有父 POM 的项目，或需要高度定制的项目       |

### 1.3 添加 starter 的相关依赖
```xml
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
        </dependency>
    </dependencies>
```

### 1.4 添加 plugin 打包插件

```xml
	<plugins>
		<plugin>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-maven-plugin</artifactId>
			<version>2.7.9</version>
		</plugin>
	</plugins>
```

### 1.5 添加启动类
启动类本质也是一个配置类, 并且也会被扫描, 可以作为controller使用, 用于测试
```java
@RestController
@SpringBootApplication
public class No01Application {
    @GetMapping(value = "/")
    public String index() {
        return "springboot application running!";
    }
    
    public static void main(String[] args) {
        SpringApplication.run(No01Application.class, args);
    }

    @PostMapping(value = "/hello")
    public String hello() {
        return "hello world";
    }
}
```

最后页面访问`/`和`/hello`即可看到效果。

## 2 SpringBoot 多环境配置
项目开发的过程中存在多种环境, SpringBoot能够支持这种多环境配置的情况。
- spring.profiles.active: 配置当前启用的环境
- spring.profiles.group: 分组配置
项目结构:
```sh
|   pom.xml
|
\---src
    \---main
        +---java
        |   \---cc
        |       \---yiueil
        |               No02Application.java
        |
        \---resources
            |   application.yml
            |
            \---config
                    application-dev-db.yml
                    application-dev.yml
                    application-local-db.yml
                    application-local.yml

```

示例配置, 支持`local`和`dev`配置的切换:
```yaml
spring:
  application:
    name: ${spring.profiles.active}-no-02
  profiles:
    active: dev
    group:
      local: local, local-db
      dev: dev, dev-db
server:
  port: 9000
```

## 3 