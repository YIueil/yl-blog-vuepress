---
date: 2025-01-03 15:53:01
pageClass: blue-archive
tags:
  - JavaWeb
  - 未完成
categories:
  - Java
---

# Web基础

>什么是HTTP协议，什么是HTML？
>常见的HTTP状态码有哪些？
>如何编写一个HTTP Server服务器？

## 1 Web交互
对于Browser来说，请求页面的流程如下：
1. 与服务器建立TCP连接；
2. 发送HTTP请求；
3. 收取HTTP响应，然后把网页在浏览器中显示出来。

浏览器发送的HTTP请求如下：
```plain
GET / HTTP/1.1
Host: www.sina.com.cn
User-Agent: Mozilla/5.0 xxx
Accept: */*
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8
```

服务器的响应如下：
```plain
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 21932
Content-Encoding: gzip
Cache-Control: max-age=300

<html>...网页数据...
```
服务器响应的第一行总是版本号+空格+数字+空格+文本，数字表示响应代码，其中`2xx`表示成功，`3xx`表示重定向，`4xx`表示客户端引发的错误，`5xx`表示服务器端引发的错误。数字是给程序识别，文本则是给开发者调试使用的。常见的响应代码有：
- 200 OK：表示成功；
- 301 Moved Permanently：表示该URL已经永久重定向；
- 302 Found：表示该URL需要临时重定向；
- 304 Not Modified：表示该资源没有修改，客户端可以使用本地缓存的版本；
- 400 Bad Request：表示客户端发送了一个错误的请求，例如参数无效；
- 401 Unauthorized：表示客户端因为身份未验证而不允许访问该URL；
- 403 Forbidden：表示服务器因为权限问题拒绝了客户端的请求；
- 404 Not Found：表示客户端请求了一个不存在的资源；
- 500 Internal Server Error：表示服务器处理时内部出错，例如因为无法连接数据库；
- 503 Service Unavailable：表示服务器此刻暂时无法处理请求。
## 2 编写一个HttpServer
// TODO

## 3 Servlet开发
### 3.1 基于XML写法
```java
public class MyServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String name = req.getParameter("name");
        ServletOutputStream outputStream = resp.getOutputStream();
        outputStream.println("hello " + name);
        outputStream.flush();
    }
}
```
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <servlet>
        <servlet-name>default</servlet-name>
        <servlet-class>cc.yiueil.MyServlet</servlet-class>
    </servlet>

    <servlet-mapping>
        <servlet-name>default</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
</web-app>
```
### 3.2 基于注解
```java
@WebServlet("/ygh")  
public class MyServlet2 extends HttpServlet {  
    @Override  
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {  
        String parameter = req.getParameter("name");  
        resp.setContentType("text/html");  
        ServletOutputStream outputStream = resp.getOutputStream();  
        outputStream.println("YO GO OH! " + parameter);
        outputStream.flush();
    }  
}
```

### 3.3 API学习
#### HttpServletRequest

`HttpServletRequest`封装了一个HTTP请求，它实际上是从`ServletRequest`继承而来。最早设计Servlet时，设计者希望Servlet不仅能处理HTTP，也能处理类似SMTP等其他协议，因此，单独抽出了`ServletRequest`接口，但实际上除了HTTP外，并没有其他协议会用Servlet处理，所以这是一个过度设计。

我们通过`HttpServletRequest`提供的接口方法可以拿到HTTP请求的几乎全部信息，常用的方法有：

- getMethod()：返回请求方法，例如，`"GET"`，`"POST"`；
- getRequestURI()：返回请求路径，但不包括请求参数，例如，`"/hello"`；
- getQueryString()：返回请求参数，例如，`"name=Bob&a=1&b=2"`；
- getParameter(name)：返回请求参数，GET请求从URL读取参数，POST请求从Body中读取参数；
- getContentType()：获取请求Body的类型，例如，`"application/x-www-form-urlencoded"`；
- getContextPath()：获取当前Webapp挂载的路径，对于ROOT来说，总是返回空字符串`""`；
- getCookies()：返回请求携带的所有Cookie；
- getHeader(name)：获取指定的Header，对Header名称不区分大小写；
- getHeaderNames()：返回所有Header名称；
- getInputStream()：如果该请求带有HTTP Body，该方法将打开一个输入流用于读取Body；
- getReader()：和getInputStream()类似，但打开的是Reader；
- getRemoteAddr()：返回客户端的IP地址；
- getScheme()：返回协议类型，例如，`"http"`，`"https"`；

此外，`HttpServletRequest`还有两个方法：`setAttribute()`和`getAttribute()`，可以给当前`HttpServletRequest`对象附加多个Key-Value，相当于把`HttpServletRequest`当作一个`Map<String, Object>`使用。

调用`HttpServletRequest`的方法时，注意务必阅读接口方法的文档说明，因为有的方法会返回`null`，例如`getQueryString()`的文档就写了：

```plain
... This method returns null if the URL does not have a query string...
```

#### HttpServletResponse

`HttpServletResponse`封装了一个HTTP响应。由于HTTP响应必须先发送Header，再发送Body，所以，操作`HttpServletResponse`对象时，必须先调用设置Header的方法，最后调用发送Body的方法。

常用的设置Header的方法有：

- setStatus(sc)：设置响应代码，默认是`200`；
- setContentType(type)：设置Body的类型，例如，`"text/html"`；
- setCharacterEncoding(charset)：设置字符编码，例如，`"UTF-8"`；
- setHeader(name, value)：设置一个Header的值；
- addCookie(cookie)：给响应添加一个Cookie；
- addHeader(name, value)：给响应添加一个Header，因为HTTP协议允许有多个相同的Header；

写入响应时，需要通过`getOutputStream()`获取写入流，或者通过`getWriter()`获取字符流，二者只能获取其中一个。

写入响应前，无需设置`setContentLength()`，因为底层服务器会根据写入的字节数自动设置，如果写入的数据量很小，实际上会先写入缓冲区，如果写入的数据量很大，服务器会自动采用Chunked编码让浏览器能识别数据结束符而不需要设置Content-Length头。

但是，写入完毕后调用`flush()`却是必须的，因为大部分Web服务器都基于HTTP/1.1协议，会复用TCP连接。如果没有调用`flush()`，将导致缓冲区的内容无法及时发送到客户端。此外，写入完毕后千万不要调用`close()`，原因同样是因为会复用TCP连接，如果关闭写入流，将关闭TCP连接，使得Web服务器无法复用此TCP连接。

```java
@WebServlet(urlPatterns = "/api-test")  
public class ApiTestServlet extends HttpServlet {  
    /**  
     * 请求: http://localhost:8080/02-servlet/api-test?name=zhangsan&pass=123456  
     */  
    @Override  
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {  
        System.out.println("req.getScheme() = " + req.getScheme());  
        System.out.println("req.getMethod() = " + req.getMethod());  
        System.out.println("req.getRequestURI() = " + req.getRequestURI());  
        System.out.println("req.getQueryString() = " + req.getQueryString());  
        System.out.println("req.getParameterMap() = " + req.getParameterMap());  
        System.out.println("req.getParameterNames() = " + req.getParameterNames());  
        System.out.println("req.getContentType() = " + req.getContentType());  
        System.out.println("req.getContextPath() = " + req.getContextPath());  
        System.out.println("req.getCookies() = " + Arrays.toString(req.getCookies()));  
        System.out.println("req.getHeaderNames() = " + req.getHeaderNames());  
    }  
}
```
```bash
req.getScheme() = http
req.getMethod() = GET
req.getRequestURI() = /02-servlet/api-test
req.getQueryString() = name=zhangsan&pass=123456
req.getParameterMap() = org.apache.catalina.util.ParameterMap@42f68554
req.getParameterNames() = java.util.Collections$3@7c317e02
req.getContentType() = null
req.getContextPath() = /02-servlet
req.getCookies() = null
req.getHeaderNames() = org.apache.tomcat.util.http.NamesEnumerator@72f68ff4
```

### 3.4 重定向和转发
#### 重定向
> 直接进行url的重定向，会直接变更浏览器的地址。

```java
@WebServlet(urlPatterns = "/redirect")
public class RedirectServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.sendRedirect(req.getContextPath() + "/ygh" + "?" + req.getQueryString());
    }
}
```

#### 转发
> 通过服务器内部调用另外的servlet实现功能，客户端无法得知内部是转发工作的。

```java
@WebServlet(urlPatterns = "/forward")
public class ForwardServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("/ygh").forward(req, resp);
    }
}
```

### 3.5 Session和Cookie的应用
#### Session的应用
- Session保存在服务器端
- 默认使用一个名为JSESSIONID的Cookie来定位Session

> 示例: 模拟登陆功能，登陆成功页面显示当前登录的用户，并提供登出功能。

loginServlet
```java
@WebServlet(urlPatterns = "/login")
public class SessionServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        if (username.equals(password)) {
            req.getSession().setAttribute("username", username);
            resp.sendRedirect(req.getContextPath() + "/main.jsp");
        }
    }
}
```

logoutServlet
```java
@WebServlet(urlPatterns = "/logout")  
public class LogoutServlet extends HttpServlet {  
    @Override  
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {  
        req.getSession().invalidate();  
        req.getRequestDispatcher("/").forward(req, resp);  
    }  
}
```

index.jsp
```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <title>Index Login</title>
  </head>
  <body>
    <form action="${pageContext.request.contextPath}/login" method="post">
      username: <input name="username" />
      password: <input name="password" />
      <button type="submit">提交</button>
    </form>
  </body>
</html>
```

main.jsp
```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>  
<html>  
<head>  
    <title>Main</title>  
</head>  
<body>  
  已完成登录, hello <%=session.getAttribute("username")%>  
  <a href="${pageContext.request.contextPath}/logout">登出</a>  
</body>  
</html>
```

#### Cookie的应用
- Cookie 存储在客户端，避免存储敏感信息
- Cookie 中的常用API
	- `Cookie.setDomain()`设置生效的域名
	- `Cookie.setPath()`设置生效的路径
	- `Cookie.setSecure()`若HTTPS网站请求，需要设置为true，否则不进行该 Cookie 携带请求
	- `Cookie.setMaxAge()`设置超时时间，单位秒

> 示例：使用 `Cookie` 保存客户端语言偏好。

cookieServlet
```java
@WebServlet(urlPatterns = "/")
public class CookieServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String lang = req.getParameter("lang");
        if (lang != null) {
            Cookie cookie = new Cookie("lang", lang);
            // 指定Cookie的生效范围 / 代表当前域名的所有请求
            cookie.setDomain(req.getServerName());
            cookie.setPath("/");
            cookie.setSecure(false);
            cookie.setMaxAge(3600);
            // 把cookie添加到响应
            resp.addCookie(cookie);
        }
        resp.sendRedirect(req.getContextPath() + "/main.jsp");
    }
}
```

mian.jsp
```jsp
<%
    Cookie[] cookies = request.getCookies();
    String lang = "CN";
    if (cookies != null) {
        for (Cookie cookie : cookies) {
            String name = cookie.getName();
            String value = cookie.getValue();

            // 检查是否是我们想要的 cookie
            if ("lang".equals(name)) {
                // 找到了，可以获取 cookie 的值
                lang = value;
            }
        }
    }
%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
    <%="CN".equals(lang) ? "应用已启动!" : "application starting!"%> <br/>

    <a href="${pageContext.request.contextPath}/?lang=CN">中文</a> <br/>
    <a href="${pageContext.request.contextPath}/?lang=EN">English</a>
</body>
</html>

```

## 4 Filter的使用
- Filter需要指定生效的URL。
- 所有的Filter将串联执行。
- 执行后必须调用`chain.doFilter(request, response);`，否则请求将停止。
> 示例：创建多个Servlet，其中User相关的Servlet需要进行已登录认证，然后所有的Servlet的请求和响应都使用UTF8进行编码统一。

