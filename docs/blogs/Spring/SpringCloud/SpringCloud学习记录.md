---
date: 2025-05-18 14:14:59
pageClass: blue-archive
tags:
  - SpringCloud
categories:
  - Spring
  - SpringBoot
  - SpringCloud
---

# SpringCloud学习记录
## 1 微服务概念
从单体到集群、从集群到分布式。
分布式组件：
	- 网关：Nacos
	- 注册中心：Nacos、Eureka
	- 远程调用：OpenFeign
	- 熔断器：Sentinel
	- 分布式事务：Seata
版本搭配：
https://github.com/alibaba/spring-cloud-alibaba/wiki/%E7%89%88%E6%9C%AC%E8%AF%B4%E6%98%8E

## 2 组件学习
### 2.1 注册中心
所有应用在上下线的时候，注册和通知到注册中心。这里使用Nacos。
>Nacos是阿里云提供的一个服务注册中心，兼具配置中心的功能。

通过docker安装nacos，我这里直接使用最新的3.x版本进行学习。
```bash
docker run --name nacos-standalone-derby -e MODE=standalone -e NACOS_AUTH_TOKEN=MTM1YTNhYTUtYjI1OS00YzJlLWEzYzYtM2Q0YzE2OTg3NDdh -e NACOS_AUTH_IDENTITY_KEY=nacos -e NACOS_AUTH_IDENTITY_VALUE=nacos -p 8080:8080 -p 8848:8848 -p 9848:9848 -d nacos/nacos-server:v3.0.1
```

示例应用，一个经典的订单和产品分布式示例。
项目完整代码地址：[YIueil/springcloud-study](https://gitee.com/yiueil/springcloud-study)
#### 项目结构
```bash
|   pom.xml
|
+---.idea
|       .gitignore
|       compiler.xml
|       encodings.xml
|       jarRepositories.xml
|       misc.xml
|       vcs.xml
|       workspace.xml
|
\---services
    |   pom.xml
    |
    +---service-order
    |   |   pom.xml
    |   |
    |   \---src
    |       +---main
    |       |   +---java
    |       |   |   \---cc
    |       |   |       \---yiueil
    |       |   |               OrderApplication.java
    |       |   |
    |       |   \---resources
    |       |           application.yml
    |       |
    |       \---test
    |           \---java
    \---service-product
        |   pom.xml
        |
        \---src
            +---main
            |   +---java
            |   |   \---cc
            |   |       \---yiueil
            |   |               ProductApplication.java
            |   |
            |   \---resources
            |           application.yml
            |
            \---test
                \---java
```
其中，services模块下面包含了两个服务，一个订单服务，一个商品服务。
servers的pom.xml相关配置内容：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>cc.yiueil</groupId>
        <artifactId>springcloud-study</artifactId>
        <version>1.0.0</version>
    </parent>

    <artifactId>services</artifactId>
    <packaging>pom</packaging>
    <modules>
        <module>service-order</module>
        <module>service-product</module>
    </modules>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
		<!-- nacos依赖 -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
            <version>2021.0.4.0</version>
        </dependency>
    </dependencies>
</project>
```
#### 订单模块代码
```yml
server:
  port: 8000
spring:
  application:
    name: service-order
  # nacos相关配置 指定nacos注册中心地址
  cloud:
    nacos:
      server-addr: 127.0.0.1:8848
```

#### 商品模块代码
```yml
server:
  port: 9000
spring:
  application:
    name: service-product
  cloud:
    nacos:
      server-addr: 127.0.0.1:8848
```

#### 复制配置模拟启动多个节点
idea中在services中，选中对应的配置节点，右键复制配置，然后在java下面的program args中添加参数`--server.port=9001`即可。
![9taazd.png](https://files.catbox.moe/9taazd.png)
![fe6mn1.png](https://files.catbox.moe/fe6mn1.png)
#### 代码获取可用的服务列表
代码中获取到所有的服务并打印，可以实现从nacos页面查看已注册服务相同的效果。
```java
@SpringBootTest
public class ProductApplicationTest {

    // Spring提供的微服务调用接口
    @Autowired
    DiscoveryClient discoveryClient;

    // Nacos提供的微服务调用结构
    @Autowired
    NacosServiceDiscovery nacosServiceDiscovery;

    @Test
    public void test1() {
        List<String> services = discoveryClient.getServices();
        for (String service : services) {
            System.out.println("service: " + service);
            List<ServiceInstance> instances = discoveryClient.getInstances(service);
            for (ServiceInstance instance : instances) {
                System.out.println("ip" + instance.getHost() + ", port" + instance.getPort());
            }
        }
    }

    @Test
    public void test2() throws NacosException {
        List<String> services = nacosServiceDiscovery.getServices();
        for (String service : services) {
            System.out.println("service: " + service);
            List<ServiceInstance> instances = nacosServiceDiscovery.getInstances(service);
            for (ServiceInstance instance : instances) {
                System.out.println("ip" + instance.getHost() + ", port" + instance.getPort());
            }
        }
    }
}
```
#### 调用流程
1. 消费方从注册中心获取可用服务方。
2. 返回可用的服务方访问地址和端口。
3. 消费方通过访问的地址和端口发起远程过程调用。
#### 负载均衡的方式来发起远程过程调用
##### 基于LoadbalancerClient选择
添加loadbalancer场景。
```xml
<!--loadbalancer负载均衡-->  
<dependency>  
    <groupId>org.springframework.cloud</groupId>  
    <artifactId>spring-cloud-starter-loadbalancer</artifactId>  
</dependency>
```

使用LoadbalancerClient客户端选择客户端：
```java
@SpringBootTest  
public class OrderApplicationTest {  
  
    @Autowired  
    LoadBalancerClient loadBalancerClient;  
  
    @Test  
    public void test1() {  
        for (int i = 0; i < 10; i++) {  
            ServiceInstance choose = loadBalancerClient.choose("service-product");  
            System.out.println("choose: " + choose.getUri());  
        }  
    }  
}
```
##### 基于负载均衡的RestTemplate组件
```java
@Configuration  
public class RestTemplateConfiguration {  
  
    @LoadBalanced  
    @Bean    public RestTemplate restTemplate() {  
        return new RestTemplate();  
    }  
}
```
```java
@SpringBootTest  
public class OrderApplicationTest {  
  
    @Autowired  
    LoadBalancerClient loadBalancerClient;  
  
    @Autowired  
    RestTemplate restTemplate;  
  
    @Test  
    public void test1() {  
        for (int i = 0; i < 10; i++) {  
            ServiceInstance choose = loadBalancerClient.choose("service-product");  
            System.out.println("choose: " + choose.getUri());  
        }  
    }  
  
    @Test  
    public void test2() {  
	    // 通过负载均衡注解标注的restTemplate通过服务名service-product实现负载均衡调用
        ProductEntity ProductEntity = restTemplate.getForObject("http://service-product/getProduct?id=1", ProductEntity.class);  
        System.out.println("ProductEntity: " + ProductEntity);  
    }  
}
```

#### 注册中心挂了，还能否进行微服务调用
- 如果是第一次调用，拿不到目标服务地址，则调用不通。
- 如果是第二次或者n次，直接通过缓存读取目标服务地址，可用调用通。
### 2.2 配置中心
配置中心实现了不下线的配置更新。
#### 初步使用配置中心
加入nacos作为配置中心的依赖：
```xml
<!--nacos作为配置中心-->  
<dependency>  
    <groupId>com.alibaba.cloud</groupId>  
    <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>  
</dependency>
```

nacos中完成对于配置的添加：
![jfxos5.png](https://files.catbox.moe/jfxos5.png)

编写代码使用相关配置：
>这里使用了@Value和@RefushScope两个注解，@Value不解释，@RefushScope用于自动刷新配置中心的配置, 以便于在不重启的情况下, 从配置中心更新数据。
```java
// 此注解 用于自动刷新配置中心的配置, 以便于在不重启的情况下, 从配置中心更新数据
@RefreshScope
@RestController
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @Value(value = "${order.timeout}")
    private String timeout;

    @Value(value = "${order.auto-confirm}")
    private String confirm;


    @GetMapping(value = "/createOrder")
    public OrderEntity createOrder(@RequestParam Long userId, @RequestParam Long productId) {
        return orderService.createOrder(productId, userId);
    }

    @GetMapping(value = "/getConfig")
    public String getConfig(){
        return String.format("%s, %s", confirm, timeout);
    }

}
```

#### @ConfigurationProperties无感刷新
>如果需要将配置绑定到Properties对象，可用@ConfigurationProperties，并且该方式可以实现无感刷新。即不需要额外使用@RefreshScope注解。
```java
@Data  
@ConfigurationProperties(prefix = "order")  
public class OrderProperties {  
    private String timeout;  
  
    private String autoConfirm;  
}
```
```java
@RestController  
@EnableConfigurationProperties(OrderProperties.class)  
public class OrderController {  
  
    private final OrderService orderService;  
  
    public OrderController(OrderService orderService) {  
        this.orderService = orderService;  
    }  
    
    @Autowired  
    private OrderProperties orderProperties;  
    
    @GetMapping(value = "/getConfigByProperties")  
    public String getConfigByProperties(){  
        return orderProperties.toString();  
    }  
  
}
```

#### @NacosConfigManager编程实现监听配置变化
>可以通过@NacosConfigManager对象来对配置变化进行响应操作。
```java
@EnableDiscoveryClient
@SpringBootApplication
public class OrderApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrderApplication.class, args);
    }

	// ApplicationRunner会随着SpringBoot启动而注册
    @Bean
    ApplicationRunner applicationRunner(NacosConfigManager nacosConfigManager) {
        return args -> {
            ConfigService configService = nacosConfigManager.getConfigService();
            configService.addListener("service-order.properties", "DEFAULT_GROUP", new Listener() {
                @Override
                public Executor getExecutor() {
		            // 返回一个线程池
                    return Executors.newFixedThreadPool(4);
                }

                @Override
                public void receiveConfigInfo(String configString) {
		            // 具体的消息变化的代码
                    System.out.println("邮件通知");
                    System.out.println(configString);
                }
            });
        };
    }
}
```
#### 题目：项目中的application.properties和配置中心的application.properties谁的优先级更高？
从设计角度来说，外部配置优先于内部配置，所以配置中心的application.properties优先级更高。然后合并两部分配置，存入环境变量Environment中。如果同时导入多个配置文件，先声明的配置为高优先级配置。
- 先导入优先
- 外部配置优先

#### Nacos中多环境配置
>如何在配置中心中，定义多个环境：开发、测试、生产？

图形定义：
- 通过项目中启动环境，来匹配对应的配置中心命名空间，最后决定要生效的配置组。
	- nacos名称空间->服务环境
	- nacos分组->微服务模块
	- nacos数据集->微服务配置
![5hp69p.png](https://files.catbox.moe/5hp69p.png)
