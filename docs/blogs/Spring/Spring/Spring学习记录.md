---
date: 2024年12月8日
pageClass: blue-archive
tags:
  - Spring
  - 学习记录
categories:
  - Spring
---
# Spring学习记录

> 代码地址: https://gitee.com/yiueil/spring-study
## 1 前言  

### JAVA框架历史

为什么舍弃EJB 是重量级框架.什么是重量级框架?    
- 高容器依赖,可移植性差.依赖于EJB容器,收费且不开源,并且需要实现特定接口.  
  
spring属于轻量级框架:  
  
- 不需要实现额外的接口  
- 基于 servlet 容器  
  
主要运用的设计模式:  
  
- 工厂模式 (解耦思想：避免对实现类硬编码),重构思路流程 反射+配置文件:  
  - new UserServiceImpl()  
  - class.forName("cn.yiueil.UserServiceImpl")  
  - 读取额外properties文件定义:UserService=cn.yiueil.UserServiceImpl替换全限命名  
  
---  
  
## 2 Spring IOC 
### 2.1 创建一个Spring工厂

### 2.2 属性注入Injection

### 2.3 创建复杂对象

### 2.4 Bean的生命周期
#### 2.4.1 Bean的创建

调用构造方法，创建出对象。
#### 2.4.2 DI

调用set方法为properties设置值

#### 2.4.3 BeanPostProcessor的PostProcessBeforeInitialization()执行

```java
public class PokemonBeanPostProcessor implements BeanPostProcessor {  
    @Override  
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {  
        System.out.println("postProcessBeforeInitialization ----");  
        return bean;  
    }  
}
```
#### 2.4.4 initalizingBean的afterPropertiesSet()方法执行

如果实现了InitalizingBean，此时会执行afterPropertiesSet()方法。

```java
class Pokemon implements InitializingBean {
	@Override  
	public void afterPropertiesSet() throws Exception {  
	    System.out.println("afterPropertiesSet");  
	}
}
```
#### 2.4.5 自定义的init()方法执行

调用init-method方法
```xml
<bean id="pokemon" class="cn.yiueil.entity.Pokemon" init-method="myInit">
```


#### 2.4.6 DisposableBean的destroy()方法执行
如果实现了DisposableBean，此时会执行destroy()方法。
```java
public class Pokemon implements InitializingBean, DisposableBean {
	@Override  
	public void destroy() throws Exception {  
	    System.out.println("destroy");  
	}
}
```

#### 2.4.7 BeanPostProcessor的postProcessAfterInitialization()执行

```java
public class PokemonBeanPostProcessor implements BeanPostProcessor {  
    @Override  
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {  
        System.out.println("postProcessAfterInitialization ---");  
        if (bean instanceof Pokemon) {  
            ((Pokemon) bean).setName("蒜头王八");  
        }  
        return BeanPostProcessor.super.postProcessAfterInitialization(bean, beanName);  
    }  
}
```
#### 2.4.8 自定义的destory()方法执行

调用destory-method
```java
<bean id="pokemon" class="cn.yiueil.entity.Pokemon" destroy-method="myDestroy">
```
---  
  

---
## 3 Spring AOP   

### 3.1 面向切面编程概念

切面编程（Aspect-Oriented Programming，简称AOP）是一种编程范式，它允许程序员在不修改业务逻辑代码的情况下，对业务逻辑的不同部分进行横向切入，以实现一些跨越多个点的功能，比如日志记录、事务管理、权限检查、异常处理等。这些跨越多个点的功能通常被称为“横切关注点”（cross-cutting concerns）。

在传统的面向对象编程（OOP）中，这些横切关注点可能会散布在代码的各个角落，导致代码重复和难以维护。AOP通过将这些关注点模块化，使得代码更加清晰、易于理解和维护。

#### AOP的核心概念包括：
1. **切面（Aspect）**：切面是横切关注点的模块化，它包含了一组通知（Advice）和一个或多个切入点（Pointcut）。
2. **通知（Advice）**：通知定义了切面在何时何地被应用，以及应用的方式。常见的通知类型包括：
   - 前置通知（Before）：在切入点之前执行。
   - 后置通知（After）：在切入点之后执行。
   - 返回通知（After returning）：在切入点正常返回后执行。
   - 异常通知（After throwing）：在切入点抛出异常后执行。
   - 环绕通知（Around）：包围切入点的执行，可以在方法执行前后进行自定义操作。
3. **切入点（Pointcut）**：切入点定义了哪些方法或哪些方法的执行可以被切面拦截。它是一个匹配逻辑，用于确定哪些Joinpoint（连接点，通常是方法的调用）需要被切面所拦截。
4. **目标对象（Target）**：被一个或多个切面所通知的对象。
5. **织入（Weaving）**：织入是将切面应用到目标对象来创建新的代理对象的过程。这可以在编译时、加载时或运行时进行。
6. **代理（Proxy）**：AOP框架创建的代理对象（基于JDK或者CGlib字节码技术），它包装了目标对象，并在调用目标对象的方法时，根据切面的定义来插入额外的行为。

AOP使得开发者可以更专注于业务逻辑本身，而将那些重复的、与业务逻辑无关的功能分离出来，从而提高了代码的重用性和模块化。在Java中，AOP的实现通常依赖于像Spring AOP、AspectJ这样的框架。
### 3.2 Spring 动态代理实现

#### 原始对象
```xml
<bean id="userService" class="cn.yiueil.service.impl.UserServiceImpl"/>
```
```java
@Slf4j  
public class UserServiceImpl implements UserService {  
    @Override  
    public User getUser(Long id) {  
        return new User(1L, "张三");  
    }  
  
    @Override  
    public void login() {  
        log.info("user login");  
    }  
  
    @Override  
    public void register() {  
        log.info("user register");  
    }  
  
    @Override  
    public void exception() {  
        log.info("user exception");  
    }  
}
```
#### 额外功能
```xml
<bean id="interceptor" class="cn.yiueil.advice.Interceptor"/>
```
```java
public class Interceptor implements MethodInterceptor {  
    @Override  
    public Object invoke(MethodInvocation invocation) throws Throwable {  
        Object object = null;  
        System.out.println("Interceptor log "+ invocation.getMethod().getName() + " start------------");  
        try {  
            object = invocation.proceed();//执行原始方法  
        } catch (Exception e) {  
            System.out.println("Interceptor log "+ invocation.getMethod().getName() + " exception------------");  
            e.printStackTrace();  
        }  
        System.out.println("Interceptor log "+ invocation.getMethod().getName() + " end------------");  
        return object;  
    }  
}
```

#### 切入点表达式
```xml
<aop:config>  
    <aop:pointcut id="pc" expression="execution(* *(..))"/>
</aop:config>
```
#### 织入切面
```xml
<aop:config>  
    <aop:pointcut id="pc" expression="execution(* *(..))"/>
	<!--织入-->  
	<aop:advisor pointcut-ref="pc" advice-ref="before"/>  
	<aop:advisor pointcut-ref="pc" advice-ref="interceptor"/>
</aop:config>   
```

> 扩展：[基于AspectJ注解实现Spring动态代理。](基于AspectJ注解实现Spring动态代理.md)
### 3.3 Spring 事务  

##### 事务属于业务还是额外功能?  
> 属于额外功能。  
  
##### 什么是事务?  
> 事务是保证`业务操作`完整的`数据库`操作。  
  
##### 如何控制事务?  
> JDBC 中通过 Connect 接口来实现`事务创建、事务提交、事务回滚`等操作  
>  
> Mybatis 中通过操作 SqlSession 来实现`事务提交、事务回滚`等操作  
>  
> Spring 中通过 AOP 的方式实现事务开发  
  
#####  DataSourceTransactionManager 大致实现  
```java
    @Around("myPointCut()")
    public Object aroundTx(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        Object proceed = null;
        try {
            System.out.println("start tx-------------"); // Connection.setAutoCommit()
            proceed = proceedingJoinPoint.proceed();
            System.out.println("commit tx------------"); // Connection.commit()
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("rollback tx----------"); // Connection.rollback()
        }
        return proceed;
    }
```

这段代码中核心依赖的是 Connection 对象, 需要在使用事务操作时, 提前注入数据连接池。  
  
##### 事务切面的组织形式  

注解式事务管理 

  ```xml  
  <bean id="myAnnotationAdvice" class="cn.yiueil.annotation.MyAnnotationAdvice"/>  
  ```  

然后在对应的方法或者类中直接使用 `@Transactional` 组织切面。  
  
声明式事务管理  
```xml  
	<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
	  <property name="dataSource" ref="dataSource"/>
	</bean>
	
	<tx:advice id="txAdvice" transaction-manager="transactionManager">
	  <tx:attributes>
	    <tx:method name="add*" propagation="REQUIRED"/>
	  </tx:attributes>
	</tx:advice>
	
	<aop:config>
	  <aop:pointcut id="userServicePointcut" expression="execution(* com.example.UserService.addUser(..))"/>
	  <aop:advisor advice-ref="txAdvice" pointcut-ref="userServicePointcut"/>
	</aop:config>
```
  编程式事务  
  
```java  
@Service
public class UserService {
    @Autowired
    private DataSource dataSource;

    public void addUser(User user) {
        Connection conn = null;
        try {
            // 获取数据库连接
            conn = dataSource.getConnection();
            // 开始事务
            conn.setAutoCommit(false);
            // 执行插入操作
            // ...
            // 提交事务
            conn.commit();
        } catch (SQLException e) {
            // 发生异常时回滚事务
            if (conn != null) {
                try {
                    conn.rollback();
                } catch (SQLException ex) {
                    // do nothing
                }
            }
        } finally {
            // 关闭连接
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException e) {
                    // do nothing
                }
            }
        }
    }
}
```  
  
> 小结: 编程式强耦合, 已不推荐使用。对于大型项目, 应当使用声明式事务; 对于小型快速开发的项目, 可以选用注解式。  
  
##### 事务属性  
```java  
@Transactional(
	isolation=Isolation.class,
	propagation=Propagation.class,
	readOnly=ReadOnly.class,
	timeout=-1,
	rollbackFor=RuntimeException.class
)  
```  
###### 隔离属性 (isolation)  
描述事务解决并发问题(同一时间访问同一资源)的特征。隔离属性通过`加锁`对`脏读、不可重复读、幻读`进行解决。  
  
| 隔离属性                  | 存在问题                | 是否加锁 |
| --------------------- | ------------------- | ---- |
| 读未提交 READ_UNCOMMITTED | 脏读、不可不可重复读、幻读重复读、幻读 | 无    |
| 读已提交 READ_COMMITTED   | 不可重复读、幻读            | 快照机制 |
| 可重复读 REPEATABLE_READ  | 幻读                  | 行锁   |
| 序列化 SERIALIZABLE      | 无                   | 表锁   |
|                       |                     |      |
  
###### 传播属性  
在Service调用Service时, 会存在`事务嵌套`，为了避免事务嵌套, 引入了传播属性的特征。  
  
| 传播属性           | 外部不存在事务 | 外部存在事务         | 备注          |
| -------------- | ------- | -------------- | ----------- |
| REQUIRED (默认值) | 开启事务    | 融合到外部事务        | 主要用于增删改操作中  |
| SUPPORTS       | 不开启新的事务 | 融合到外部事务        | 主要用于查询方法中   |
| REQUIRED_NEW   | 开启新的事务  | 挂起外部事务, 开启新的事务 | 使用于日志等事务操作中 |
| NOT_SUPPORTED  | 不开启新的事务 | 挂起外部事务         | 不常用         |
| NEVER          | 不开启新的事务 | 抛出异常           | 不常用         |
| MANDATORY      | 抛出异常    | 融合到外部事务中       | 不常用         |
  
###### 只读属性  
对于仅查询的服务, 通过添加只读属性, 提高执行效率。  
  
###### 超时属性  
为了避免事务对数据库的表进行行锁和表锁长时间锁定造成锁库锁表的问题。可以通过超时时间控制事务超时的最长时间, 默认为-1, 单位为秒。  
  
###### 异常属性  
定义触发事务回滚的异常, 默认是`RuntimeException`运行时异常及其子类进行事务回滚。

---
## 4 Spring整合篇

---
## 5 Spring注解版

Spring4.x之后以及后面的SpringBoot推荐的开发方式都是使用注解进行开发，后续的Spring开发主流将会是注解，如果实在遇到需要修改注解的时候，可以使用xml配置的方式进行覆盖。

### 5.1 常用注解

**组件相关**
- @ComponentScan: 设计基础扫描包，将该包及其子包进行注解扫描
- @Component: 指定该类为一个组件
- @Bean: 指定该方法的返回值为一个Bean
- @Configuration: 指定当前类为一个配置类
- @Controller: 指定该类为一个Controller组件，实际同@Component
- @Service: 指定该类为一个Service组件，实际同@Component
- @Repository: 指定该类为一个Repository组件，实际同@Component
- @Scope: 指定类的scope属性, 默认单例singleton
- @Lazy: 配置后延迟创建单实例对象
- @Import: 引入另外一组Configuration中的生成的Bean
- @ImportResource: 引入传统的XML中定义的Bean
> 组件覆盖优先级: @Component及其衍生注解 < @Bean < XML配置文件Bean

**生命周期相关**
- @PostConstruct: 指定组件创建初始化的方法，来源于JSR标准规范注解
- @PreDestory: 指定组件销毁前执行的方法，来源于JSR标准规范注解

**注入相关**
- @Autowired: 基于对象类型，注入依赖组件
- @Qualifier: 搭配@Autowired，实现基于对象ID，注入依赖组件
- @Resource: 基于对象ID，注入依赖组件，如果名字没有指定，则按照类型注入依赖组件。来源于JSR标准规范注解
- @Value: 使用${}语法，为非静态属性进行注入
- @PropertySource: 指定properties配置文件的路径
### 5.2 
