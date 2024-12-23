---
date: 2024-12-08 19:52:48
pageClass: blue-archive
tags:
  - Spring
  - SpringMVC
categories:
  - Spring
---

# SpringMVC学习记录

仓库地址: https://gitee.com/yiueil/springmvc-study

## 1 什么是SpringMVC
一个基于Spring的Servlet的框架，用于接受服务器请求。
- 解析客户端参数
- 调用业务服务
- 执行返回结果

**三种开发模式**
- 传统试图开发JSP、FreeMarker、Thymeleaf
- 前后端分离
- Spring WebFlux
## 2 入门程序
编写入门程序，并和原始的Servlet开发方式对比。

### 2.1 创建一个Maven项目

### 2.2 添加web.xml

### 2.3 创建Spring配置文件

### 2.4 创建两个测试用的JSP

### 2.5 编写控制器

## 3 常用注解
### 3.1 @RequestMapping
### 3.2 @RequestParam
> value：指定参数名称
> required：参数是否必填，默认true
> defaultValue：默认值
### 3.3 @RequestBody

### 3.4 @CookieValue

### 3.5 @RequestHeader
## 4 组件
### 4.1 视图解析器（ViewResolver）

### 4.2 类型转换器（FormattingConversionServiceFactoryBean）
>converters的properties参数注入自定义的converter
### 4.3 静态资源
**方式一：通过DefaultServlet专门处理静态资源**
> 存在的问题：配置繁琐，对于各种文件都需要进行配置

**方式二：通过default-servlet-handler配置**
```xml

```
### 4.4 拦截器
## 5 参数接收
1. 如何接收Date等复杂类型
2. 如何接收List\<User>和Interger\[] ids类型
3. 如何接收动态key命名的参数类型
4. 如何接收Cookie类型的参数
	- 基于servlet
	- 基于springmvc
5. 如何接收请求头中的参数
	- 基于servlet
	- 基于springmvc
### 5.1 八大基础类型和String

### 5.2 基于POJO类接收

## 6 核心原理