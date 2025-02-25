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

CharacterFilter
```java
public class CharacterFilter extends HttpFilter {
    @Override
    protected void doFilter(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws IOException, ServletException {
        req.setCharacterEncoding("UTF-8");
        res.setCharacterEncoding("UTF-8");
        chain.doFilter(req, res);
    }
}
```

AuthFilter
```java
public class AuthFilter extends HttpFilter {
    @Override
    protected void doFilter(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws IOException, ServletException {
        Object username = req.getSession().getAttribute("username");
        if (username != null) {
            chain.doFilter(req, res);
        } else {
            res.sendRedirect(req.getContextPath() + "/index.jsp");
        }
    }
}
```

LoginServlet
```java
public class LoginServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        if (password.equals(username)) {
            req.getSession().setAttribute("username", username);
            resp.sendRedirect(req.getContextPath() + "/user/profile");
        } else {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }
}
```

UserProfileServlet
```java
public class UserProfileServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html");
        PrintWriter writer = resp.getWriter();
        writer.println("hello, " + req.getSession().getAttribute("username"));}
}
```

web.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <filter>
        <filter-name>authFilter</filter-name>
        <filter-class>cc.yiueil.filter.AuthFilter</filter-class>
    </filter>

    <filter>
        <filter-name>characterFilter</filter-name>
        <filter-class>cc.yiueil.filter.CharacterFilter</filter-class>
    </filter>

    <servlet>
        <servlet-name>loginServlet</servlet-name>
        <servlet-class>cc.yiueil.servlet.LoginServlet</servlet-class>
    </servlet>

    <servlet>
        <servlet-name>userProfileServlet</servlet-name>
        <servlet-class>cc.yiueil.servlet.UserProfileServlet</servlet-class>
    </servlet>

    <servlet-mapping>
        <servlet-name>loginServlet</servlet-name>
        <url-pattern>/login</url-pattern>
    </servlet-mapping>

    <servlet-mapping>
        <servlet-name>userProfileServlet</servlet-name>
        <url-pattern>/user/profile</url-pattern>
    </servlet-mapping>

    <filter-mapping>
        <filter-name>authFilter</filter-name>
        <url-pattern>/user/*</url-pattern>
    </filter-mapping>

    <filter-mapping>
        <filter-name>characterFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
</web-app>
```

index.jsp
```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Login</title>
</head>
<body>
    <form action="${pageContext.request.contextPath}/login" method="post">
        username: <input name="username" /><br/>
        password: <input name="password" /><br/>
        <button type="submit">提交</button>
    </form>
</body>
</html>
```

> 尝试先访问`/user/profile`，会被AuthFilter过滤重定向到登录页。登录成功后再访问`/user/profile`则可以正常返回结果。

## 5 Listener的使用
`Listener`监听器的作用就是监听某些事件，常见的监听器有：
- ServletContextListener
- HttpSessionListener
- ServletRequestListener
- ServletRequestAttributeListener
- ServletContextAttributeListener
经常会使用到的监听器是`ServletContextListener`，Spring的容器创建就是基于这个监听器的。
```java
@Slf4j
@WebListener
public class AppListener implements ServletContextListener {
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        // 应用初始化的操作, 可以在这里执行容器创建, 连接池等资源创建等
        log.debug("msg: {}", "contextInitialized");
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        // 上下文销毁的监听, 可以用于资源释放
        log.debug("msg: {}", "contextDestroyed");
        try {
            Thread.sleep(3000L);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}

```

## 6 高级MVC开发模式
> 传统的开发方式下，一个 servlet 中只能够处理一个请求，大量的业务就需要大量的 servlet。这里通过定制一个`dispatcherServlet`实现统一的请求入口，然后获取控制器 Controller 中的方法来处理具体的业务逻辑。

项目结构：
```sh
07-MVC
\---src
    \---main
        +---java
        |   +---annotation
        |   |       Controller.java
        |   |       GetMapping.java
        |   |       PostMapping.java
        |   |
        |   +---controller
        |   |       LoginController.java
        |   |       UserController.java
        |   |
        |   +---engine
        |   |       ViewEngine.java
        |   |
        |   +---entity
        |   |       UserEntity.java
        |   |
        |   +---result
        |   |       ModelAndView.java
        |   |
        |   \---servlet
        |       |   DispatcherServlet.java
        |       |
        |       \---dispatcher
        |               GetDispatcher.java
        |               PostDispatcher.java
        |
        \---webapp
            \---WEB-INF
                |   web.xml
                |
                \---templates
                        base.html
                        error-msg.html
                        login.html
                        user-profile.html
```

pom.xml
```xml
<dependencies>
        <dependency>
            <groupId>cc.yiueil</groupId>
            <artifactId>00-javaweb-common</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>

        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>4.0.1</version>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>

        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>2.17.2</version>
        </dependency>

        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>2.17.2</version>
        </dependency>

        <dependency>
            <groupId>io.pebbletemplates</groupId>
            <artifactId>pebble</artifactId>
            <version>3.2.3</version>
        </dependency>
    </dependencies>
```

annotation：这个目录下创建控制器注解和请求注解
```java
package annotation;  
  
import java.lang.annotation.ElementType;  
import java.lang.annotation.Retention;  
import java.lang.annotation.RetentionPolicy;  
import java.lang.annotation.Target;  
  
@Retention(RetentionPolicy.RUNTIME)  
@Target(ElementType.TYPE)  
public @interface Controller {  
  
}
  
@Retention(RetentionPolicy.RUNTIME)  
@Target(ElementType.METHOD)  
public @interface GetMapping {  
    String value() default "";  
}

@Retention(RetentionPolicy.RUNTIME)  
@Target(ElementType.METHOD)  
public @interface PostMapping {  
    String value() default "";  
}
```

controller：这个目录下存放具体的控制器
```java
@Controller  
public class LoginController {  
    @GetMapping("/")  
    public ModelAndView index(HttpServletRequest request, HttpServletResponse response) {  
        HttpSession session = request.getSession();  
        if (session.getAttribute("user") != null) {  
            Map<String, Object> result = new HashMap<>();  
            Object attribute = session.getAttribute("user");  
            result.put("user", attribute);  
            return new ModelAndView(result, "user-profile.html");  
        }  
        // 未登录，跳转到登录页:  
        return new ModelAndView("login.html");  
    }  
  
    @PostMapping("/login")  
    public ModelAndView login(  
            UserEntity userEntity,  
            HttpServletRequest request,  
            HttpServletResponse response) {  
        Map<String, Object> result = new HashMap<>();  
        if (userEntity.getPassword().equals(userEntity.getName())) {  
            HttpSession session = request.getSession();  
            session.setAttribute("user", userEntity);  
            result.put("user", userEntity);  
            return new ModelAndView(result, "user-profile.html");  
        }  
        result.put("status", "fail");  
        result.put("errorMsg", "账号或密码错误");  
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);  
        return new ModelAndView(result, "error-msg.html");  
    }  
}

@Controller  
public class UserController {  
    @GetMapping("/user/profile")  
    public ModelAndView profile(HttpServletResponse response, HttpSession session) {  
        UserEntity userEntity = (UserEntity) session.getAttribute("user");  
        if (userEntity == null) {  
            // 未登录，跳转到登录页:  
            return new ModelAndView("redirect:/");  
        }  
        Map<String, Object> userMap = new HashMap<>();  
        userMap.put("user", userEntity);  
        return new ModelAndView(userMap, "user-profile.html");
    }  
}
```

entity和model下放实体对象：
```java
@Data  
public class UserEntity implements Serializable {  
    private int id;  
    private String name;  
    private String password;  
}

@Getter
@Setter
public class ModelAndView {
    private Map<String, Object> model;
    private String view;

    public ModelAndView(String view) {
        this.view = view;
    }

    public ModelAndView(Map<String, Object> model, String view) {
        this.model = model;
        this.view = view;
    }
}
```

servlet：这个包下放最关键的`dispatcherServlet`
```java
// 所有的请求都由这个Servlet接收
@WebServlet(urlPatterns = "/*")
public class DispatcherServlet extends HttpServlet {
    private final Map<String, GetDispatcher> getMappings = new HashMap<>();
    private final Map<String, PostDispatcher> postMappings = new HashMap<>();

    private ViewEngine viewEngine;

    @Override
    public void init() {
        try {
            // 扫描控制器中的 Dispatcher
            scanControllerDispatcher();
        } catch (InstantiationException | IllegalAccessException | InvocationTargetException | NoSuchMethodException |
                 ClassNotFoundException e) {
            e.printStackTrace();
        }
        this.viewEngine = new ViewEngine(getServletContext());
    }

    private void scanControllerDispatcher() throws NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException, ClassNotFoundException {
        String packageName = "controller";
        // 获取包下的所有类
        List<Class<?>> classes = getClassesInPackage(packageName);

        // 反射创建实例
        for (Class<?> clazz : classes) {
            if (!clazz.isAnnotationPresent(Controller.class)) {
                continue;
            }
            Object instance = clazz.getDeclaredConstructor().newInstance();
            Method[] declaredMethods = clazz.getDeclaredMethods();
            ObjectMapper objectMapper = new ObjectMapper();
            for (Method method : declaredMethods) {
                if (method.isAnnotationPresent(GetMapping.class)) {
                    GetDispatcher dispatcher = new GetDispatcher();
                    GetMapping getMapping = method.getAnnotation(GetMapping.class);
                    String path = getMapping.value();
                    dispatcher.setMethod(method);
                    dispatcher.setInstance(instance);
                    dispatcher.setParameterClasses(method.getParameterTypes());
                    dispatcher.setParameterNames(Arrays.stream(method.getParameters()).map(Parameter::getName).toArray(String[]::new));
                    this.getMappings.put(path, dispatcher);
                } else if (method.isAnnotationPresent(PostMapping.class)) {
                    PostDispatcher dispatcher = new PostDispatcher();
                    PostMapping postMapping = method.getAnnotation(PostMapping.class);
                    String path = postMapping.value();
                    dispatcher.setMethod(method);
                    dispatcher.setInstance(instance);
                    dispatcher.setParameterClasses(method.getParameterTypes());
                    dispatcher.setObjectMapper(objectMapper);
                    this.postMappings.put(path, dispatcher);
                }
            }
        }
    }

    private List<Class<?>> getClassesInPackage(String packageName) throws ClassNotFoundException {
        List<Class<?>> classes = new ArrayList<>();
        // 将包名转换为路径
        String path = packageName.replace('.', '/');
        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
        URL resource = classLoader.getResource(path);

        if (resource == null) {
            throw new IllegalArgumentException("Package not found: " + packageName);
        }

        File directory = new File(resource.getFile());
        if (directory.exists()) {
            // 扫描目录下的所有文件
            for (File file : directory.listFiles()) {
                if (file.isFile() && file.getName().endsWith(".class")) {
                    // 去掉文件后缀，获取类名
                    String className = packageName + '.' + file.getName().substring(0, file.getName().length() - 6);
                    // 加载类
                    Class<?> clazz = Class.forName(className);
                    classes.add(clazz);
                }
            }
        } else {
            throw new IllegalArgumentException("Directory not found: " + directory.getAbsolutePath());
        }

        return classes;
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html");
        resp.setCharacterEncoding("UTF-8");
        String path = req.getRequestURI().substring(req.getContextPath().length());
        // 根据路径查找GetDispatcher:
        GetDispatcher dispatcher = this.getMappings.get(path);
        if (dispatcher == null) {
            // 未找到返回404:
            resp.sendError(404);
            return;
        }
        // 调用Controller方法获得返回值:
        ModelAndView modelAndView;
        try {
            modelAndView = dispatcher.invoke(req, resp);
        } catch (InvocationTargetException | IllegalAccessException e) {
            throw new RuntimeException(e);
        }
        // 允许返回null:
        if (modelAndView == null) {
            return;
        }
        // 处理重定向
        String view = modelAndView.getView();
        if (view.startsWith("redirect:")) {
            resp.sendRedirect(req.getContextPath() + view.substring("redirect:".length()));
        } else {
            // 将模板引擎渲染的内容写入响应:
            PrintWriter pw = resp.getWriter();
            this.viewEngine.render(modelAndView, pw);
            pw.flush();
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html");
        resp.setCharacterEncoding("UTF-8");
        String path = req.getRequestURI().substring(req.getContextPath().length());
        PostDispatcher postDispatcher = this.postMappings.get(path);
        if (postDispatcher == null) {
            resp.sendError(404);
            return;
        }
        // 调用Controller方法获得返回值:
        ModelAndView modelAndView;
        try {
            modelAndView = postDispatcher.invoke(req, resp);
        } catch (InvocationTargetException | IllegalAccessException e) {
            throw new RuntimeException(e);
        }
        // 允许返回null:
        if (modelAndView == null) {
            return;
        }

        // 处理重定向
        String view = modelAndView.getView();
        if (view.startsWith("redirect:")) {
            resp.sendRedirect(req.getContextPath() + view.substring("redirect:".length()));
        } else {
            // 将模板引擎渲染的内容写入响应:
            PrintWriter pw = resp.getWriter();
            this.viewEngine.render(modelAndView, pw);
            pw.flush();
        }
    }
}
```

```java
@Getter
@Setter
public class GetDispatcher {
    // Controller实例
    private Object instance;
    // Controller方法
    private Method method;
    // 方法参数名称
    private String[] parameterNames;
    // 方法参数类型
    private Class<?>[] parameterClasses;

    public ModelAndView invoke(HttpServletRequest request, HttpServletResponse response) throws InvocationTargetException, IllegalAccessException {
        Object[] arguments = new Object[parameterClasses.length];
        for (int i = 0; i < parameterClasses.length; i++) {
            String parameterName = parameterNames[i];
            Class<?> parameterClass = parameterClasses[i];
            if (parameterClass == HttpServletRequest.class) {
                arguments[i] = request;
            } else if (parameterClass == HttpServletResponse.class) {
                arguments[i] = response;
            } else if (parameterClass == HttpSession.class) {
                arguments[i] = request.getSession();
            } else if (parameterClass == int.class) {
                arguments[i] = Integer.valueOf(getOrDefault(request, parameterName, "0"));
            } else if (parameterClass == long.class) {
                arguments[i] = Long.valueOf(getOrDefault(request, parameterName, "0"));
            } else if (parameterClass == boolean.class) {
                arguments[i] = Boolean.valueOf(getOrDefault(request, parameterName, "false"));
            } else if (parameterClass == String.class) {
                arguments[i] = getOrDefault(request, parameterName, "");
            } else {
                throw new RuntimeException("Missing handler for type: " + parameterClass);
            }
        }
        return (ModelAndView) this.method.invoke(this.instance, arguments);
    }

    private String getOrDefault(HttpServletRequest request, String name, String defaultValue) {
        String s = request.getParameter(name);
        return s == null ? defaultValue : s;
    }
}

@Getter
@Setter
public class PostDispatcher {
    // Controller实例
    private Object instance;
    // Controller方法
    private Method method;
    // 方法参数类型
    private Class<?>[] parameterClasses;
    // JSON映射
    private ObjectMapper objectMapper;

    public ModelAndView invoke(HttpServletRequest request, HttpServletResponse response) throws IOException, InvocationTargetException, IllegalAccessException {
        Object[] arguments = new Object[parameterClasses.length];
        for (int i = 0; i < parameterClasses.length; i++) {
            Class<?> parameterClass = parameterClasses[i];
            if (parameterClass == HttpServletRequest.class) {
                arguments[i] = request;
            } else if (parameterClass == HttpServletResponse.class) {
                arguments[i] = response;
            } else if (parameterClass == HttpSession.class) {
                arguments[i] = request.getSession();
            } else {
                // 读取JSON并解析为JavaBean:
                BufferedReader reader = request.getReader();
                arguments[i] = this.objectMapper.readValue(reader, parameterClass);
            }
        }
        return (ModelAndView) this.method.invoke(instance, arguments);
    }
}
```

templates：这个目录下放页面的模板文件，这里采用的`pebble`模板引擎，简单实现登录，登录成功，用户信息页面。

base.html
```html
<html>
<head>
    <title>{% block title %}My Website{% endblock %}</title>
</head>
<body>
<div id="content">
    {% block content %}{% endblock %}
</div>
<div id="footer">
    {% block footer %}
    Copyright 2018
    {% endblock %}
</div>
</body>
</html>
```

login.html
```html
{% extends "base.html" %}

{% block title %} Home {% endblock %}

{% block content %}
<h1> login </h1>

<form id="loginForm">
    username: <input name="name"/>
    password: <input name="password"/>
    <input type="submit" value="提交">
</form>
<div id="error-container"></div>
<script>
    // 拦截表单提交事件
    function handleSubmit(event) {
        event.preventDefault(); // 阻止表单默认提交行为

        // 获取表单数据
        const formData = {
            name: document.querySelector('input[name="name"]').value,
            password: document.querySelector('input[name="password"]').value
        };

        // 发送 JSON 数据
        fetch('login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // 设置请求头为 JSON
            },
            body: JSON.stringify(formData) // 将表单数据转换为 JSON 字符串
        })
            .then(response => {
                // 保存响应对象的状态
                const isResponseOk = response.ok;
                return response.text().then(data => {
                    return {isResponseOk, data};
                });
            })
            .then(({isResponseOk, data}) => {
                if (isResponseOk) {
                    console.log('Success:', data);
                    // 在这里处理响应数据
                    document.getElementsByTagName('body')[0].innerHTML = data;
                } else {
                    // 处理错误响应
                    console.error('Error:', data);
                    document.getElementById('error-container').innerHTML = data;
                }
            })
            .catch(error => {
                // 处理网络错误或其他异常
                console.error('Network Error:', error);
                document.getElementById('error-container').innerHTML = '网络错误，请稍后再试。';
            });
    }

    // 绑定表单提交事件
    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('loginForm').addEventListener('submit', handleSubmit);
    });
</script>

{% endblock %}
```

error-msg.html
```html
<h3 style="color: red"> {{ errorMsg }} </h3>
```

user-profile.html
```html
{% extends "base.html" %}

{% block title %} Home {% endblock %}

{% block content %}
<h1> UserProfile </h1>
<p> My name is {{ user.name }}.</p>
<p> My pwd is {{ user.password }}.</p>
{% endblock %}
```

项目后续的开发只需要在controller目录下创建控制器，使用注解标注即可实现新的业务逻辑。
**测试：**
1. 先访问`/user/profile`页面，没有登录，跳转到登录页面
2. 输出不相同的账号密码，页面渲染错误提示
3. 输出相同的账号密码，登录成功，页面跳转到`/user/profile`