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

## 2 SpringBoot 配置
### 2.1 配置引入
为了防止主yml过大，可以通过 `spring.config.import`引入，支持引入多个子配置文件。
```yml
spring:  
  config:  
    import:  
      - classpath:properties/redis.properties  
      - classpath:properties/mq.properties
```

### 2.2 多环境配置
>本配置方式适用于SpringBoot的2.4版本之后，其之前的版本的配置方式略有不同。

#### 非分组配置
- 通过`spring.profiles.active`配置当前生效的环境。
- 其他yml中使用`spring.config.activate.on-profile`配置的生效的环境。
```yml
spring:  
  profiles:  
    # 当前生效环境  
    active: local
# 以下是单独定义Profile的生效环境  
---  
spring:  
  config:  
    activate:  
      on-profile: local  
env: local  
  
---  
spring:  
  config:  
    activate:  
      on-profile: dev  
env: dev
```

#### 分组配置
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
### 2.3 属性注入方式
#### @Value
使用`@Value`能够将属性绑定到Bean的属性中。首先定义一个properties文件
```properties
redis.ip=127.0.0.1
redis.port=6379
redis.pwd=Fk12345.
```

对于的Bean中进行配置：
>需要注意必须是容器管理的Bean才能否进行属性注入。
```java
@Configuration  
public class RedisConfig {  
    @Value(value = "${redis.ip}")  
    private String ip;  
  
    @Value(value = "${redis.port}")  
    private int port;  
  
    @Value(value = "${redis.pwd}")  
    private String pwd;

	// 省略get/set方法
}
```
#### @ConfigurationProperties
除了使用`@Value`进行单个的属性注入，还可以使用`@ConfigurationProperties`一次性将所有的属性注入到Bean，首先还是定义一个properties文件：
```properties
redis.ip=127.0.0.1  
redis.port=6379  
redis.pwd=Fk12345.
```

然后在对应的Bean中配置：
>核心是@ConfigurationProperties注解来标识这个Bean需要注入配置属性，注解属性中`prefix`用于定义配置的前缀。
```java
@Configuration
@ConfigurationProperties(prefix = "redis")
public class RedisConfig {
    private String ip;

    private int port;

    private String pwd;

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    @Override
    public String toString() {
        return "RedisConfig{" +
                "ip='" + ip + '\'' +
                ", port=" + port +
                ", pwd='" + pwd + '\'' +
                '}';
    }
}
```

#### 复杂属性的绑定
>除了基础的字符串、布尔值、数值等的数据的绑定，还可能存在复杂对象的绑定。 如：List、Set、Map、Date，配置文件如下

```yml
app:  
  user:  
    username: zhangSan  
    password: 123456  
    birthday: 2025-05-17  
    linkList:  
      - baidu.com  
      - bing.com  
      - google.com  
    addressSet:  
      - 北京  
      - 上海  
      - 广州  
      - 北京  
    privileges:  
      - name:  
          新增  
        value:  
          true  
      - name:  
          删除  
        value:  
          false
```

指定前缀，属性名称对应配置的主体内容。
```java
@Configuration
@ConfigurationProperties(prefix = "app.user")
public class User {
    private String username;
    private String password;
    private Date birthday;
    private List<String> linkList;
    private Set<String> addressSet;
    private List<Map<String, Object>> privileges;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public List<String> getLinkList() {
        return linkList;
    }

    public void setLinkList(List<String> linkList) {
        this.linkList = linkList;
    }

    public Set<String> getAddressSet() {
        return addressSet;
    }

    public void setAddressSet(Set<String> addressSet) {
        this.addressSet = addressSet;
    }

    public List<Map<String, Object>> getPrivileges() {
        return privileges;
    }

    public void setPrivileges(List<Map<String, Object>> privileges) {
        this.privileges = privileges;
    }

    @Override
    public String toString() {
        return "User{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", birthday=" + birthday +
                ", linkList=" + linkList +
                ", addressSet=" + addressSet +
                ", privileges=" + privileges +
                '}';
    }
}
```

#### 配置属性注入到第三方Bean
对于第三方的bean，可以通过配置类@Bean结合`@ConfigurationPropertie`实现属性注入。
```java
@Configuration  
public class ApplicationConfiguration {  
    @Bean  
    @ConfigurationProperties(prefix = "app.user")  
    public UserEntity userEntity() {  
        return new UserEntity();  
    }  
}
```

#### 手动指定配置来源
通过@PropertySource可以指定配置属性来源，实现从非application.yml或application.properties中获取属性：
>已发现的问题，这种方式指定的时候，不支持指定yml类型的配置文件。
```java
@Configuration  
// 指定数据来源  
@PropertySource(value = "classpath:properties/user.properties", encoding = "UTF-8")  
@ConfigurationProperties(prefix = "app.user")  
public class User {  
    private String username;  
    private String password;  
    private Date birthday;  
    private List<String> linkList;  
    private Set<String> addressSet;  
    private List<Map<String, Object>> privileges;  
  
    public String getUsername() {  
        return username;  
    }  
  
    public void setUsername(String username) {  
        this.username = username;  
    }  
  
    public String getPassword() {  
        return password;  
    }  
  
    public void setPassword(String password) {  
        this.password = password;  
    }  
  
    public Date getBirthday() {  
        return birthday;  
    }  
  
    public void setBirthday(Date birthday) {  
        this.birthday = birthday;  
    }  
  
    public List<String> getLinkList() {  
        return linkList;  
    }  
  
    public void setLinkList(List<String> linkList) {  
        this.linkList = linkList;  
    }  
  
    public Set<String> getAddressSet() {  
        return addressSet;  
    }  
  
    public void setAddressSet(Set<String> addressSet) {  
        this.addressSet = addressSet;  
    }  
  
    public List<Map<String, Object>> getPrivileges() {  
        return privileges;  
    }  
  
    public void setPrivileges(List<Map<String, Object>> privileges) {  
        this.privileges = privileges;  
    }  
  
    @Override  
    public String toString() {  
        return "User{" +  
                "username='" + username + '\'' +  
                ", password='" + password + '\'' +  
                ", birthday=" + birthday +  
                ", linkList=" + linkList +  
                ", addressSet=" + addressSet +  
                ", privileges=" + privileges +  
                '}';  
    }  
}
```
#### 其他细节
使用这个注解可以批量的扫描`@ConfigurationPropertiesScan`配置类，避免每个配置类都单独的添加`@Component`等标识本类为配置类。也可以直接在主类中通过`@EnableConfigurationProperties`声明需要开启配置的类。
```java
@SpringBootApplication  
// 以下两个注解选其一  
@ConfigurationPropertiesScan(basePackages = "cc.yiueil.config")  
@EnableConfigurationProperties({RedisConfig.class})  
public class No02Application {  
    public static void main(String[] args) {  
        SpringApplication.run(No02Application.class, args);  
    }  
}
```

### 2.4 Environment获取环境属性
Spring提供了`Environment`对象来获取当前应用的环境信息：
```java
@Autowired  
Environment environment;  
  
@Test  
public void test2() {  
    // 获取生效配置信息  
    System.out.println(Arrays.toString(environment.getActiveProfiles()));  
    // 获取环境变量  
    System.out.println(environment.getProperty("JAVA_HOME"));  
    // 获取配置属性  
    System.out.println(environment.getProperty("spring.application.name"));  
}
```

### 2.5 兼容Spring项目
如果需要兼容老的Spring项目，使用`@ImportResource`注解导入老项目的配置文件。

applicationContext.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>  
<beans xmlns="http://www.springframework.org/schema/beans"  
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">  
    <bean id="user2" class="cc.yiueil.entity.UserEntity">  
        <property name="username" value="lisi"/>  
        <property name="password" value="222222"/>  
    </bean></beans>
```

```java
// SpringBoot主类
@ImportResource(locations = "classpath:applicationContext.xml")  
@SpringBootApplication  
public class ApplicationBoot10 {  
    public static void main(String[] args) {  
        SpringApplication.run(ApplicationBoot10.class, args);  
    }  
}

// 测试
@SpringBootTest  
class ApplicationBoot10Test {  
    @Autowired  
    @Qualifier("user2")  
    UserEntity userEntity2;  
  
    @Test  
    public void test() {  
        System.out.println(userEntity2.toString());  
    }  
}
```
## 3 SpringBoot 核心功能
### 3.1 自动配置实现原理
1. Main使用主类作为参数执行SpringApplication.run()。 
2. 获取主类的@SpringBootAutoConfiguration注解，其中包含了@EnableAutoConfig注解。
3. @EnableAutoConfiguration注解通过@Import了AutoConfigurationImportSelector这个Bean到容器中。
4. AutoConfigurationImportSelector执行process方法
	- 从MATA-INF下的`org.springframework.boot.autoconfigure.AutoConfiguration.imports`加载到所有候选自动配置类。
	- 过滤需要排除的配置类。
	- 根据`@Conditional**`注解过滤实际生效的配置类。
	- 拿到最终的配置类，如`DispatherServletAutoConfiguration`。
5. 最终的配置类中又包含子配置类，通过`@EnableConfigurationProperties`注解加载对应的属性配置类`**Properties`到容器中，这些属性类都带有`@ConfigurationProperties`注解，通过从application.yml获取配置，结合一系列的默认值进行属性类的赋值。
6. 使用属性配置类，创建最终的Bean。
### 3.2 自定义Starter开发
## 4 SpringBoot 数据访问
在原来的Spring中，我们需要手动的添加事务管理器对数据源进行事务的管理。在SpringBoot中，提供了默认的事务管理器，会根据当前
### 4.1 事务管理
### 4.2 集成Mybatis
### 4.3 集成JPA

### 4.4 NoSQL
#### Redis

#### Elasticsearch集成

#### MongoDB集成
## 5 SpringBoot Web开发
### 5.1 Web的自动配置流程
#### 相关的自动配置类

#### 

### 5.2 替换为手动配置
#### 完全使用默认配置

#### 完全接管配置

#### 默认配置上额外定制
编写配置类，实现`WebMvcConfigurer`。

### 5.3 异常处理
#### 局部异常处理

#### 全局异常处理

#### SpringBoot异常处理流程
### 5.4 国际化

### 5.5 定制web容器
## 6 SpringBoot 高级特性