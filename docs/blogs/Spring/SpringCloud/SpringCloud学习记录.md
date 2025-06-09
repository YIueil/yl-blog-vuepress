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

| Spring Cloud Alibaba 版本 (主要)                      | 兼容的 Spring Boot 版本 (主要) | 备注                                          |
| ------------------------------------------------- | ----------------------- | ------------------------------------------- |
| **2022.0.x (对应 Spring Cloud 2022.0.x /2023.0.x)** | **3.0.x**               | 这是最新的主要版本系列，官方推荐搭配使用。                       |
| **2021.0.x (对应 Spring Cloud 2021.0.x)**           | **2.7.x**               | 这是之前的 LTS (长期支持) 版本系列，相对稳定。                 |
| **2021.0.x (对应 Spring Cloud 2021.0.x)**           | **2.6.x**               | 在 2.7.x 之前，2.6.x 也是一个较常用的版本，兼容性也较好。         |
| **2020.0.x (对应 Spring Cloud 2020.0.x)**           | **2.4.x**               | 这个版本系列相对较老，但仍是许多旧项目的选择。                     |
| **2.2.x (对应 Spring Cloud 2020.0.x)**              | **2.4.x**               | 与 2020.0.x 系列类似，但可能是早期发布的版本。                |
| **2.2.x (对应 Spring Cloud Hoxton)**                | **2.3.x**               | Hoxton 是一个广泛使用的版本，与 Spring Boot 2.3.x 配合较好。 |
| **2.2.x (对应 Spring Cloud Hoxton)**                | **2.2.x**               | 与 2.3.x 类似，但兼容性可能稍差。                        |
| **2.1.x (对应 Spring Cloud Greenwich / Finchley)**  | **2.1.x / 2.2.x**       | 这些是更早的版本，主要用于维护旧项目。                         |
| **2.0.x (对应 Spring Cloud Edgware / Dalston)**     | **2.0.x / 2.1.x**       | 非常早期的版本，已基本停止维护，不推荐在新项目中使用。                 |

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
// TODO
### 2.2 配置中心
配置中心实现了不下线的配置更新。
- @Value和@RefushScope
- @ConfigProperties
- @NacosConfigManager编程实现


