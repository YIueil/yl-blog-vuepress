---
date: 2025-01-03 16:45:16
pageClass: blue-archive
tags:
  - Java
  - 未完成
categories:
  - Java
---

# Slf4j应用
## 1 Slf4j规范

### 1.1 日志等级

## 2 各种实现的使用
### 2.1 LogBack
maven依赖：
```xml
<dependency>  
    <groupId>ch.qos.logback</groupId>  
    <artifactId>logback-classic</artifactId>  
    <version>1.2.13</version>  
</dependency>
```

配置文件：
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<configuration>
    <!-- 应用名称 -->
    <property name="appName" value="application" />

    <!-- 日志输出目录 -->
    <property name="logDir" value="${catalina.base:-./}/logs/" />

    <!-- d:时间,p:级别,c:类名,t:线程,F:源文件,L:行号,msg:信息,n:换行 -->
    <property name="consolePattern" value="%highlight(%-5p) %magenta(%d{yyyy-MM-dd HH:mm:ss.SSS}) %gray(%thread) %logger{36}:%boldMagenta(%L), %msg%n"/>
    <property name="filePattern" value="%p %d{yyyy-MM-dd HH:mm:ss.SSS} %thread %logger{36}:%L, %msg%n"/>

    <!-- 控制台 -->
    <appender name="consoleAppender" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>${consolePattern}</pattern>
            <charset>UTF-8</charset>
        </encoder>
    </appender>

    <!-- 文件输出 -->
    <appender name="fileAppender" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${logDir}/${appName}.log</file>
        <encoder>
            <pattern>${filePattern}</pattern>
            <charset>UTF-8</charset>
        </encoder>
        <!-- 归档策略 -->
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <fileNamePattern>${logDir}/${appName}.%d{yyyy-MM-dd}[%i].log</fileNamePattern>
            <!-- 最大日志大小 -->
            <maxFileSize>5MB</maxFileSize>
            <!-- 日志保留天数 -->
            <maxHistory>30</maxHistory>
            <!-- 可选 限制所有日志文件的总大小 超过时删除旧日志 -->
            <totalSizeCap>3GB</totalSizeCap>
        </rollingPolicy>
    </appender>

    <!-- 错误日志输出 未采用归档策略 -->
    <appender name="errorAppender" class="ch.qos.logback.core.FileAppender">
        <!-- 错误日志文件路径 -->
        <file>${logDir}/${appName}-error.log</file>
        <!-- 日志输出格式 -->
        <encoder>
            <pattern>${filePattern}</pattern>
            <charset>UTF-8</charset>
        </encoder>
        <!-- 过滤器，只记录ERROR级别的日志 -->
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>ERROR</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>

    <!-- hibernate SQL日志 -->
    <logger name="org.hibernate.SQL" level="DEBUG">
        <appender-ref ref="consoleAppender" />
        <appender-ref ref="fileAppender" />
        <appender-ref ref="errorAppender" />
    </logger>

    <!-- 特定包的日志等级 additivity: 默认为true 即将该包的 appender 向上传递到root; 为false时, 将仅使用该节点中的 appender  -->
    <logger name="cc.yiueil" level="DEBUG" additivity="false">
        <appender-ref ref="consoleAppender" />
        <appender-ref ref="errorAppender" />
    </logger>

    <!-- 设置根的日志级别 从高到低依次为: ERROR > WARN > INFO > DEBUG > TRACE -->
    <root level="DEBUG">
        <appender-ref ref="consoleAppender" />
        <appender-ref ref="fileAppender" />
    </root>
</configuration>
```

测试代码：
```java
package cc.yiueil;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CcTest {
    public static void main(String[] args) throws InterruptedException {
        while (true) {
            log.trace("test {}", CcTest.class.getName());
            log.debug("test {}", CcTest.class.getName());
            log.info("test {}", CcTest.class.getName());
            log.warn("test {}", CcTest.class.getName());
            log.error("test {}", CcTest.class.getName());
            Thread.sleep(10);
        }
    }
}
```
```java
package com.yiueil;  
  
import cc.yiueil.CcTest;  
import lombok.extern.slf4j.Slf4j;  
  
@Slf4j  
public class ComTest {  
    public static void main(String[] args) throws InterruptedException {  
        while (true) {  
            log.trace("test {}", CcTest.class.getName());  
            log.debug("test {}", CcTest.class.getName());  
            log.info("test {}", CcTest.class.getName());  
            log.warn("test {}", CcTest.class.getName());  
            log.error("test {}", CcTest.class.getName());  
            Thread.sleep(10);  
        }  
    }  
}
```
> 对于cc.yiueil.CcTest类来说，不会输出一般日志到application.log，只会输出错误日志。
> 对于com.yiueil.ComTest来说，则会输出完整的日志，包括控制台日志、普通文件日志、错误日志。