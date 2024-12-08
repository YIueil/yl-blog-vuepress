# Mybatis学习记录

## 1 快速入门
使用SqlSessionFactoryBuilder加载配置文件创建SqlSessionFactory。
并使用SqlSessionFactory获取到SqlSession后进行查询操作。
最终实现基本的mybatis框架的使用。
### 1.1 搭建环境  

#### 数据库环境
使用MySQL数据，DDL初始化表：
```sql  
create database mybatis;

use mybatis;

create table USER(
	`id` bigint not null primary key auto_increment,
	`username` varchar(16) not null default '',
	`password` varchar(16) not null default ''
)engine=innodb,default charset=`UTF8MB4`;

insert into user values(1,'alice','123456'),(2,'bob','123456'),(3,'carl','123456') ;
  
```  
  
#### pom.xml 
添加相应的 pom 依赖
```xml  
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>mybatis-study_code</artifactId>
        <groupId>cn.yiueil</groupId>
        <version>0.0.1-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>mybatis_01</artifactId>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
        </dependency>

        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>
    </dependencies>

    <build>
        <!--配置java source下的资源也打包-->
        <resources>
            <resource>
                <directory>src/main/java</directory>
                <includes>
                    <include>**/*.xml</include>
                </includes>
            </resource>
        </resources>
    </build>
</project>
```  
  
### 1.2 添加配置文件  
#### mybatis-config.xml  
编写mybatis的配置文件，基于该文件配置构建一个SqlSessionFactory。  
```xml  
<?xml version="1.0" encoding="UTF-8" ?>  
<!DOCTYPE configuration  
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"  
        "http://mybatis.org/dtd/mybatis-3-config.dtd">  
<configuration>
    <properties resource="jdbc.properties"/>  
    <settings>
		<setting name="logImpl" value="Slf4j"/>  
    </settings>  
    <environments default="development">  
        <environment id="development">  
            <transactionManager type="JDBC"/>  
            <dataSource type="POOLED">  
                <property name="driver" value="${jdbc.driver}"/>  
                <property name="url" value="${jdbc.url}"/>  
                <property name="username" value="${jdbc.username}"/>  
                <property name="password" value="${jdbc.password}"/>  
            </dataSource>        </environment>  
        <environment id="test">  
            <transactionManager type="JDBC"/>  
            <dataSource type="POOLED">  
                <property name="driver" value="${jdbc.driver}"/>  
                <property name="url" value="${jdbc.url}"/>  
                <property name="username" value="${jdbc.username}"/>  
                <property name="password" value="${jdbc.password}"/>  
            </dataSource>        </environment>    </environments>  
    <mappers>        
	    <mapper resource="cc/yiueil/mapper/UserMapper.xml"/>  
    </mappers>
</configuration>
```  
  
#### jdbc.properties  
编写jdbc配置文件，用于在mybatis配置文件中使用  
```properties
jdbc.driver=com.mysql.jdbc.Driver  
jdbc.url=jdbc:mysql://localhost:3306/mybatis?serverTimezone=UTC&useSSL=false&useUnicode=true&characterEncoding=utf8  
jdbc.username=root  
jdbc.password=root
```  

#### logback.xml
logback配置文件添加：
```xml
<configuration>
    <property name="logPattern"
              value="%cyan(LOGBACK)| %magenta(%d{yyyy-MM-dd HH:mm:ss.SSS}) | %highlight(%thread | %-5level | %logger{26}) - %msg%n"/>

    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>${logPattern}</pattern>
        </encoder>
    </appender>

    <logger name="cc.yiueil" level="trace"/>

    <root level="debug">
        <appender-ref ref="STDOUT"/>
    </root>
</configuration>
```
  
### 1.3 配置接口和xml文件映射 
#### User.java  
首先准备用户的实体类，用于映射查询结果 
```java  
package cc.yiueil.entity;

public class User {
    private Long id;
    private String username;
    private String password;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}

```  
#### UserMapper.java  
接口类  
```java  
public interface UserMapper {  
    User selectUser(Long id);
}  
```  
#### UserMapper.xml  
接口配置文件  
```xml  
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="cc.yiueil.mapper.UserMapper">
    <select id="selectUserById" resultType="cc.yiueil.entity.User">
        select * from t_user where id = #{id}
    </select>
    <select id="selectUserList" resultType="cc.yiueil.entity.User">
        select * from t_user
    </select>
</mapper>
```  
  
  
  
---  
  
### 1.4 Junit测试 
#### UserMapperTest
```java  
public class UserMapperTest {
    private SqlSession sqlSession;
    private final Logger logger = LoggerFactory.getLogger(UserMapperTest.class);
    @Before
    public void before() {
        String resource = "mybatis-config.xml";
        InputStream inputStream = null;
        try {
            inputStream = Resources.getResourceAsStream(resource);
        } catch (IOException e) {
            logger.error("An error occurred", e);
        }
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        logger.info("工厂创建成功:" + sqlSessionFactory);
        sqlSession = sqlSessionFactory.openSession();
        logger.info("会话建立成功:" + sqlSession);

    }

    @After
    public void after() {
        logger.info("关闭SqlSession");
        sqlSession.close();
    }

    @Test
    public void selectUser() {
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        User user = mapper.selectUserById(1L);
        logger.info(user.toString());
    }


    @Test
    public void selectUserList() {
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        List<User> users = mapper.selectUserList();
        logger.info(users.toString());
    }
}
```  
#### 运行结果
```bash
LOGBACK| 2024-12-08 23:50:11.463 | main | DEBUG | o.a.i.logging.LogFactory - Logging initialized using 'class org.apache.ibatis.logging.slf4j.Slf4jImpl' adapter.
LOGBACK| 2024-12-08 23:50:11.466 | main | DEBUG | o.a.i.logging.LogFactory - Logging initialized using 'class org.apache.ibatis.logging.slf4j.Slf4jImpl' adapter.
LOGBACK| 2024-12-08 23:50:11.481 | main | DEBUG | o.a.i.d.p.PooledDataSource - PooledDataSource forcefully closed/removed all connections.
LOGBACK| 2024-12-08 23:50:11.481 | main | DEBUG | o.a.i.d.p.PooledDataSource - PooledDataSource forcefully closed/removed all connections.
LOGBACK| 2024-12-08 23:50:11.481 | main | DEBUG | o.a.i.d.p.PooledDataSource - PooledDataSource forcefully closed/removed all connections.
LOGBACK| 2024-12-08 23:50:11.481 | main | DEBUG | o.a.i.d.p.PooledDataSource - PooledDataSource forcefully closed/removed all connections.
LOGBACK| 2024-12-08 23:50:11.531 | main | INFO  | c.y.mapper.UserMapperTest - 工厂创建成功:org.apache.ibatis.session.defaults.DefaultSqlSessionFactory@20deea7f
LOGBACK| 2024-12-08 23:50:11.534 | main | INFO  | c.y.mapper.UserMapperTest - 会话建立成功:org.apache.ibatis.session.defaults.DefaultSqlSession@59fd97a8
LOGBACK| 2024-12-08 23:50:11.546 | main | DEBUG | o.a.i.t.j.JdbcTransaction - Opening JDBC Connection
LOGBACK| 2024-12-08 23:50:11.688 | main | DEBUG | o.a.i.d.p.PooledDataSource - Created connection 511707818.
LOGBACK| 2024-12-08 23:50:11.688 | main | DEBUG | o.a.i.t.j.JdbcTransaction - Setting autocommit to false on JDBC Connection [com.mysql.jdbc.JDBC4Connection@1e800aaa]
LOGBACK| 2024-12-08 23:50:11.690 | main | DEBUG | c.y.m.U.selectUserList - ==>  Preparing: select * from t_user
LOGBACK| 2024-12-08 23:50:11.709 | main | DEBUG | c.y.m.U.selectUserList - ==> Parameters: 
LOGBACK| 2024-12-08 23:50:11.716 | main | TRACE | c.y.m.U.selectUserList - <==    Columns: id, username, password
LOGBACK| 2024-12-08 23:50:11.716 | main | TRACE | c.y.m.U.selectUserList - <==        Row: 1, 张三, 123456
LOGBACK| 2024-12-08 23:50:11.717 | main | TRACE | c.y.m.U.selectUserList - <==        Row: 2, 李四, 222222
LOGBACK| 2024-12-08 23:50:11.717 | main | TRACE | c.y.m.U.selectUserList - <==        Row: 3, 王五, 333333
LOGBACK| 2024-12-08 23:50:11.717 | main | DEBUG | c.y.m.U.selectUserList - <==      Total: 3
LOGBACK| 2024-12-08 23:50:11.718 | main | INFO  | c.y.mapper.UserMapperTest - [User{id=1, username='张三', password='123456'}, User{id=2, username='李四', password='222222'}, User{id=3, username='王五', password='333333'}]
LOGBACK| 2024-12-08 23:50:11.718 | main | INFO  | c.y.mapper.UserMapperTest - 关闭SqlSession
LOGBACK| 2024-12-08 23:50:11.718 | main | DEBUG | o.a.i.t.j.JdbcTransaction - Resetting autocommit to true on JDBC Connection [com.mysql.jdbc.JDBC4Connection@1e800aaa]
LOGBACK| 2024-12-08 23:50:11.718 | main | DEBUG | o.a.i.t.j.JdbcTransaction - Closing JDBC Connection [com.mysql.jdbc.JDBC4Connection@1e800aaa]
LOGBACK| 2024-12-08 23:50:11.718 | main | DEBUG | o.a.i.d.p.PooledDataSource - Returned connection 511707818 to pool.
```



### 1.5 入门案例总结  
#### Mybatis核心类  
#### SqlSessionFactoryBuilder  
> 这个类可以被实例化、使用和丢弃，一旦创建了 SqlSessionFactory，就不再需要它了。 因此 SqlSessionFactoryBuilder 实例的最佳作用域是方法作用域（也就是局部方法变量）。 你可以重用 SqlSessionFactoryBuilder 来创建多个 SqlSessionFactory 实例，但最好还是不要一直保留着它，以保证所有的 XML 解析资源可以被释放给更重要的事情。  
#### SqlSessionFactory 
> SqlSessionFactory 一旦被创建就应该在应用的运行期间一直存在，没有任何理由丢弃它或重新创建另一个实例。 使用 SqlSessionFactory 的最佳实践是在应用运行期间不要重复创建多次，多次重建 SqlSessionFactory 被视为一种代码“坏习惯”。因此 SqlSessionFactory 的最佳作用域是应用作用域。 有很多方法可以做到，最简单的就是使用单例模式或者静态单例模式。  
#### SqlSession  
> 每个线程都应该有它自己的 SqlSession 实例。SqlSession 的实例不是线程安全的，因此是不能被共享的，所以它的最佳的作用域是请求或方法作用域。 绝对不能将 SqlSession 实例的引用放在一个类的静态域，甚至一个类的实例变量也不行。 也绝不能将 SqlSession 实例的引用放在任何类型的托管作用域中，比如 Servlet 框架中的 HttpSession。 如果你现在正在使用一种 Web 框架，考虑将 SqlSession 放在一个和 HTTP 请求相似的作用域中。 换句话说，每次收到 HTTP 请求，就可以打开一个 SqlSession，返回一个响应后，就关闭它。 这个关闭操作很重要，为了确保每次都能执行关闭操作，你应该把这个关闭操作放到 finally 块中。  
#### Mybatis编码流程 
1. 新建Maven项目，引入mybatis和对应的数据库驱动依赖。
2. 编写mybatis-config.xml。
3. 编写查询接口和xml(新增功能时需要修改) 。
4. 编写启动类或者测试类。
  
#### 小结  
1. Mybatis使用了一个工厂模式来实现SqlSession的创建  
2. SqlSession线程不安全，不能多线程共享，故作用域应为方法作用域
3. mybatis使用mybatis-config进行全局配置(包括jdbc配置创建DataSource，xml文件扫描加载)  
4. mybatis确实减少了jdbc代码(抽象为为编写实体DAO接口和XML的配置文件)  

## 2  