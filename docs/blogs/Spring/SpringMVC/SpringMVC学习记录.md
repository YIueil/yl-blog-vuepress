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
> 不使用模板创建一个Maven项目
### 2.2 添加web.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">

    <servlet>
        <servlet-name>dispatcherServlet</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>

        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:springmvc.xml</param-value>
        </init-param>

		<!--在tomcat容器启动时就加载,而不是使用到才加载-->
        <load-on-startup>1</load-on-startup>
    </servlet>

    <servlet-mapping>
        <servlet-name>dispatcherServlet</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
</web-app>
```

### 2.3 创建Spring配置文件
```xml
<?xml version="1.0" encoding="UTF-8"?>  
<beans xmlns="http://www.springframework.org/schema/beans"  
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:mvc="http://www.springframework.org/schema/mvc"  
       xmlns:context="http://www.springframework.org/schema/context"  
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/mvc https://www.springframework.org/schema/mvc/spring-mvc.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">  
    <!--mvc核心注解驱动, 让RequestMapping, 默认的参数解析器等注解起作用-->  
    <mvc:annotation-driven/>  
  
    <context:component-scan base-package="cc.yiueil.controller"/>  
  
    <!--视图解析器-->  
    <bean id="view" class="org.springframework.web.servlet.view.InternalResourceViewResolver">  
        <property name="prefix" value="/WEB-INF/views/"/>  
        <property name="suffix" value=".jsp"/>  
    </bean></beans>
```

### 2.4 创建两个测试用的JSP
正常界面
```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>  
<html>  
<head>  
    <title>result</title>  
</head>  
<body>  
    <h1>这是跳转结果</h1>  
</body>  
</html>
```

错误界面
```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>  
<html>  
<head>  
    <title>error</title>  
</head>  
<body>  
    <h1>这是错误页面</h1>  
</body>  
</html>
```

### 2.5 编写控制器
```java
package cc.yiueil;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping(value = "/view")
public class ViewController {
    @RequestMapping(value = "to/result")
    public String toResult() {
        return "result";
    }

    @RequestMapping(value = "to/error")
    public String toError(@RequestParam(value = "msg") String msg,
					     @RequestParam(value = "isOk", defaultValue = "false") String isOk) {
        System.out.println("isOk = " + isOk);
        System.out.println("msg = " + msg);
        return "error";
    }
}

```

## 3 常用注解
### 3.1 @RequestMapping
> value：指定请求的路径，可以用在类或者方法上
> method：指定可以通过的请求方法，POST、GET或者其他
### 3.2 @RequestParam
> value：指定参数名称
> required：参数是否必填，默认true
> defaultValue：默认值
### 3.3 @RequestBody
> 将请求体的内容转换到

### 3.4 @CookieValue
> 同RequestParam的API，将请求中的Cookie传入参数中

### 3.5 @RequestHeader
> 同RequestParam的API，将请求中的Header传入参数中
## 4 组件
### 4.1 视图解析器（ViewResolver）
> 主要的作用是用于视图解析，在传统的一体式项目中使用较多，在访问受保护的`JSP`的时候能够减少在Java代码中的编码量。

配置前的写法：
```java
@RequestMapping(value = "to/result")  
public String toResult() {  
    return "/WEB-INF/result.jsp";  
}
```

配置后：
```xml
<bean id="view" class="org.springframework.web.servlet.view.InternalResourceViewResolver">  
    <property name="prefix" value="/WEB-INF/views/"/>  
    <property name="suffix" value=".jsp"/>  
</bean>
```

```java
@RequestMapping(value = "to/result")  
public String toResult() {  
    return "result";
}
```
### 4.2 类型转换器（FormattingConversionServiceFactoryBean）
>converters的properties参数注入自定义的converter

[[SpringMVC创建自定义类型转换器]]
### 4.3 静态资源处理器
> 在不进行额外的配置下，所有的请求都将由`DispatchServlet`进行处理，而这个Servlet不具备处理静态资源的能力，故访问静态资源返回404报错。

**方式一：通过Tomcat提供的DefaultServlet专门处理静态资源**
> 不推荐，存在的问题：配置繁琐，对于各种文件都需要进行配置

**方式二：通过default-servlet-handler配置**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/mvc https://www.springframework.org/schema/mvc/spring-mvc.xsd">
    <context:component-scan base-package="cc.yiueil.controller, cc.yiueil.mvcConfig" />
    <mvc:annotation-driven />
    <mvc:default-servlet-handler />
</beans>
```
> 从根目录进行扫描，自动注册一个资源处理器来处理 `/static/**`、`/public/**`、`/resources/**`、`/META-INF/resources/**` 等路径下的资源。而不是从classpath路径下进行扫描，即不能处理到classpath下面的静态资源。

**方式三：通过mvc:resources注解标签添加可访问的资源**
```xml
<!--静态资源访问方式一-->  
<mvc:resources mapping="/static/**" location="classpath:/static/"/>
```
> 推荐使用，配置不复杂，通用。

**方式四：继承WebMvcConfigurationSupport，注册配置类**
若使用<mvc:annotation-driven />自动注解，通过继承`WebMvcConfigurationSupport`能够实现的静态资源处理器的添加。
> 注意：当使用<mvc:annotation-driven />注解驱动时，继承`WebMvcConfigurer`类来实现静态处理器将不会起作用。因为`<mvc:annotation-driven />`注解驱动使用的是基于老版本`WebMvcConfigurationSupport`来实现的。若一定要用`WebMvcConfigurer`，需要自行取得MVC相关的控制权，添加`@EnableWebMvc`。

```java
@Configuration
public class MvcConfig extends WebMvcConfigurationSupport {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/")
                .setCacheControl(CacheControl.maxAge(30, TimeUnit.DAYS).cachePublic());
    }
}
```
### 4.4 拦截器

### 4.5 过滤器
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