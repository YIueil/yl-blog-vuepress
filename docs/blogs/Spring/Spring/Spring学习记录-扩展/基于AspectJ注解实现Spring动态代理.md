# 基于AspectJ注解实现Spring动态代理

基于AspectJ注解在Spring中实现动态代理，能够减少配置的同时支持使用注解来组织切面。

在pom.xml中加入依赖：
```xml
<dependency>  
    <groupId>org.aspectj</groupId>  
    <artifactId>aspectjweaver</artifactId>  
    <version>1.9.7</version>  
</dependency>
```

## 1 原始对象

```xml
<bean id="userService" class="cn.yiueil.service.impl.UserServiceImpl"/>
```
```java
public class UserServiceImpl implements UserService {  
    @Override  
    public User getUser(Long id) {  
        return null;  
    }  
  
    @Override  
    public void login() {  
        System.out.println("登录");  
    }  
  
    @Override  
    public void register() {  
        System.out.println("注册");  
    }  
  
    @Override  
    public void exception() {  
        System.out.println("执行");  
    }  
}
```

## 2 额外功能
```xml
<bean id="myAnnotationAdvice" class="cn.yiueil.annotation.MyAnnotationAdvice"/>
```
```java
@Aspect  
public class MyAnnotationAdvice {  
      /**  
     * 日志  
     * @param proceedingJoinPoint  
     * @return  
     * @throws Throwable  
     */    
    @Around("execution (* *(..))")//2、切入点  
    public Object aroundLog(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
	    //3、额外功能  
        System.out.println("aspectj log-------------");  
        return proceedingJoinPoint.proceed();  
    }  
  
    /**  
     * 事务  
     * @param proceedingJoinPoint  
     * @return  
     * @throws Throwable  
     */
    @Around("myPointCut()")//2、切入点  
    public Object aroundTx(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
	    //3、额外功能  
        Object proceed = null;  
        try {  
            System.out.println("start tx-------------");  
            proceed = proceedingJoinPoint.proceed();  
            System.out.println("commit tx------------");  
        } catch (Exception e) {  
            e.printStackTrace();  
            System.out.println("rollback tx----------");  
        }  
        return proceed;  
    }  
}
```

## 3 切入点表达式
```java
@Aspect  
public class MyAnnotationAdvice {  

    //扩展: 复用切入点表达式  
    @Pointcut("execution (* register(..))")  
    public void myPointCut(){}  
    
    /**  
     * 日志  
     * @param proceedingJoinPoint  
     * @return  
     * @throws Throwable  
     */    
    @Around("execution (* *(..))")//2、切入点  
    public Object aroundLog(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
	    //3、额外功能  
        System.out.println("aspectj log-------------");  
        return proceedingJoinPoint.proceed();  
    }  
  
    /**  
     * 事务  
     * @param proceedingJoinPoint  
     * @return  
     * @throws Throwable  
     */
    @Around("myPointCut()")//2、切入点  
    public Object aroundTx(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
	    //3、额外功能  
        Object proceed = null;  
        try {  
            System.out.println("start tx-------------");  
            proceed = proceedingJoinPoint.proceed();  
            System.out.println("commit tx------------");  
        } catch (Exception e) {  
            e.printStackTrace();  
            System.out.println("rollback tx----------");  
        }  
        return proceed;  
    }  
}
```

## 4 织入切面
spring配置文件中添加注解驱动：
```xml
<aop:aspectj-autoproxy/>
```

## 5 执行结果

测试类编写：
```java
public class AspectJTest {  
    /**  
     * 测试：  
     */  
    @Test  
    public void test1(){  
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("/spring.xml");  
        UserService userService = applicationContext.getBean(UserService.class);  
        userService.login();  
        userService.register();  
        userService.exception();  
    }  
}
```

执行结果：
```log
aspectj log-------------
登录
aspectj log-------------
start tx-------------
注册
commit tx------------
aspectj log-------------
执行
```