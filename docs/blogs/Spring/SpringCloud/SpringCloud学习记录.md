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
### 2.3 远程调用
>使用RestTemplate进行远程调用属于编程式的远程调用。可以使用OpenFeign实现声明式的远程调用。

#### 2.3.1 初步使用
##### 引入依赖
```xml
	<dependency>
		<groupId>org.springframework.cloud</groupId>
		<artifactId>spring-cloud-starter-openfeign</artifactId>
	</dependency>
```

##### 使用注解开启远程调用
```java
@Slf4j
@EnableDiscoveryClient
// 关键启用注解
@EnableFeignClients
@SpringBootApplication
@EnableConfigurationProperties({ JdbcProperties.class })
public class OrderApplication {
	// 主类其他内容省略
}
```

##### 创建远程调用feign客户端
```java
import cc.yiueil.entity.ProductEntity;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

// 指定目标微服务名称
@FeignClient(value = "service-product")
public interface ProductServiceRemote {

    @GetMapping(value = "getProduct")
    ProductEntity getProduct(@RequestParam(value = "id") Long id);
}

// 其他类中调用
@Slf4j  
@Service  
public class OrderServiceImpl implements OrderService {  
    @Autowired  
    DiscoveryClient discoveryClient;  
  
    @Autowired  
    LoadBalancerClient loadBalancerClient;  
  
    @Autowired  
    RestTemplate restTemplate;  
  
    // 使用OpenFeign客户端进行调用  
    @Autowired  
    ProductServiceRemote productServiceRemote;  
  
    @Override  
    public OrderEntity createOrder(Long productId, Long userId) {  
        OrderEntity orderEntity = new OrderEntity();  
        orderEntity.setId(1L);  
        orderEntity.setProductId(productId);  
        orderEntity.setUserId(userId);  
        orderEntity.setCreateTime(LocalDateTime.now());  
        // 计算总价 调用远程过程调用获取商品的价格  
        ProductEntity productEntity = getProductRemote2(productId);  
        orderEntity.setPrice(productEntity.getPrice());  
        return orderEntity; 
    }  

    private ProductEntity getProductRemote2(Long productId) {  
        return productServiceRemote.getProduct(productId);  
    }  
}
```

#### 2.3.2 调用第三方API
>OpenFeign还具备调用第三方API的能力。
```java
// 第三方API的value随意指定, url配置为目标服务器地址
@FeignClient(value = "weather", url = "https://devapi.qweather.com")
public interface WeatherClient {

    @GetMapping(value = "/v7/weather/now")
    String getCurrentWeather(@RequestParam(value = "key") String key, @RequestParam(value = "location") String location);
}

```

Controller：
```java
@GetMapping(value = "/getCurrentWeather")  
public String getCurrentWeather(@RequestParam(value = "key") String key, @RequestParam(value = "location") String location) {  
    return weatherClient.getCurrentWeather(key, location);  
}
```
#### 2.3.2 OpenFeign日志
- OpenFeign客户端对应的包下添加日志logging.level
```yml
logging:  
  level:  
    cc.yiueil: debug
```
- 添加一个Bean
```java
@Bean
Logger.Level feignLoggerLevel() {
 return Logger.Level.FULL;
}
```
- 具体的输出结果
```log
[WeatherClient#getCurrentWeather] ---> GET https://devapi.qweather.com/v7/weather/now?key=05a7f0bd73854f75b704e3731658d80a&location=101290101 HTTP/1.1
[WeatherClient#getCurrentWeather] ---> END HTTP (0-byte body)
[WeatherClient#getCurrentWeather] <--- HTTP/1.1 200 (370ms)
[WeatherClient#getCurrentWeather] access-control-allow-headers: *
[WeatherClient#getCurrentWeather] access-control-allow-methods: *
[WeatherClient#getCurrentWeather] access-control-allow-origin: *
[WeatherClient#getCurrentWeather] connection: keep-alive
[WeatherClient#getCurrentWeather] content-encoding: gzip
[WeatherClient#getCurrentWeather] content-length: 314
[WeatherClient#getCurrentWeather] content-type: application/json
[WeatherClient#getCurrentWeather] date: Sat, 14 Jun 2025 19:37:22 GMT
[WeatherClient#getCurrentWeather] 
[WeatherClient#getCurrentWeather] {"code":"200","updateTime":"2025-06-15T03:36+08:00","fxLink":"https://www.qweather.com/weather/kunming-101290101.html","now":{"obsTime":"2025-06-15T03:22+08:00","temp":"18","feelsLike":"19","icon":"104","text":"阴","wind360":"135","windDir":"东南风","windScale":"1","windSpeed":"5","humidity":"89","precip":"0.0","pressure":"808","vis":"11","cloud":"99","dew":"16"},"refer":{"sources":["QWeather"],"license":["QWeather Developers License"]}}
[WeatherClient#getCurrentWeather] <--- END HTTP (445-byte body)
```
#### 2.3.4 超时控制
>如果远程过程调用不设置超时，将一直卡住，导致慢响应。最简单的做法，可以通过超时控制解决。但是需要注意：通常这个远程调用的时间控制要到位，不然无法拿到返回的结果。

超时时间：
- 连接超时时间：类似打电话的时候，嘟嘟嘟的情况。默认10秒
- 读取超时时间：类似打电话的时候，你问对面问题，对面多少时间没回复表示对面掉线了。默认60秒

修改默认超时时间，修改application.yml中的OpenFeign的connectTimeout和readTimeout两个配置。
application-feign.yml
```yml
# 4.x版本后面的配置在spring.cloud.openfeign.client.config下面
feign:
  client:
    config:
      # 全局
      default:
        connectTimeout: 10000
        readTimeout: 10000
      # 特定服务
      service-product:
        # this(100L, TimeUnit.SECONDS.toMillis(1L), 5); 100 以渐进式时间间隔（100ms→1s）尝试最多5次操作。
        # 也可以添加 @Bean 返回一个Retryer对象也可以实现
        # retryer: feign.Retryer.Default
        connectTimeout: 2000
        readTimeout: 2000
```

#### 2.3.5 重试机制
>远程调用可能失败，可以引入重试机制，直到返回成功，默认不重试。

修改application.yml设置：
```yml
retryer: feign.retryer.Default
```

或者是自定义重试器：
```java
import java.util.concurrent.TimeUnit;

@Configuration
public class RetryerConfiguration {

    @Bean
    public Retryer retryer() {
        return new Retryer.Default(1000L, TimeUnit.SECONDS.toMillis(10L), 3);
    }
}

```

#### 2.3.6 拦截器
>支持定制请求拦截器和响应拦截器，实现类似传入token和解释响应结果的通用功能。
- 集成feign.RequestInterceptor定义拦截器
```java
import feign.RequestInterceptor;
import feign.RequestTemplate;

import java.util.UUID;

public class TokenInterceptor implements RequestInterceptor {
    @Override
    public void apply(RequestTemplate requestTemplate) {
        requestTemplate.header("yl-token", UUID.randomUUID().toString());
    }
}
```
- 使用自定义的拦截器
	- 通过配置添加Interceptor配置
```yml
feign:
  client:
    config:
      # 全局
      default:
        connectTimeout: 10000
        readTimeout: 10000
      # 特定服务
      service-product:
        # 通过配置使用拦截器
        request-interceptors:
         - cc.yiueil.interceptor.TokenInterceptor
        # this(100L, TimeUnit.SECONDS.toMillis(1L), 5); 100 以渐进式时间间隔（100ms→1s）尝试最多5次操作。
        # 也可以添加 @Bean 返回一个Retryer对象也可以实现
        # retryer: feign.Retryer.Default
        connectTimeout: 2000
        readTimeout: 2000
```
	- 通过给容器中添加Interceptor的Bean
```java
@Configuration
public class InterceptorConfiguration {

    @Bean
    public RequestInterceptor requestInterceptor() {
        return new TokenInterceptor();
    }
}
```
#### 2.3.7 Fallback机制
>当远程调用失败，请求结果无法获取时，给定保底结果。如获取最后的缓存结果，或者是默认数据。
- 在对应的远程调用接口下可以创建fallback目录。
- 目录下面添加fallback实现类，对feign接口进行实现，并加入到容器内。
```java
@Component
public class ProductServiceRemoteImpl implements ProductServiceRemote {
    @Override
    public ProductEntity getProduct(Long id) {
        return new ProductEntity();
    }
}
```
- @FeignClient指定兜底类
```java
// 指定目标微服务名称
@FeignClient(value = "service-product", fallback = ProductServiceRemoteFallback.class)
public interface ProductServiceRemote {

    @GetMapping(value = "getProduct")
    ProductEntity getProduct(@RequestParam(value = "id") Long id);
}
```
- 导入sentinel依赖，开启对应配置`feign.sentinel.enabled`为true即可。
### 2.4 服务保护
>服务保护，常用限流、熔断、降级等策略，防止服务器崩溃。这里使用Alibaba的Sentinel。
- 流量控制（FlowRule）：即限流。
- 熔断降级（DegradeRule）：兜底回调。
- 系统保护（SystemRule）：根据系统Cpu等硬件资源决定服务策略。
- 来源控制（AuthorityRule）：黑白名单。
- 热点参数（ParamFlowRule）：定义热点参数，使用缓存等。
工作原理：
- 用户访问资源
- 根据目标资源查看对应规则
	- 符合规则，进行放行。
	- 如果违反规则，抛出异常，执行兜底。
		- 有兜底回调，调用兜底处理逻辑。
		- 未编写兜底回调，进行默认错误返回。
- 结束处理。
#### 2.4.1 安装Sentinel
##### 安装和启动Sentinel DashBoard
>下载地址：https://github.com/alibaba/Sentinel/releases

运行命令：
```sh
java -Dserver.port=8081 -Dcsp.sentinel.dashboard.server=localhost:8081 -Dproject.name=sentinel-dashboard -jar sentinel-dashboard-1.8.8.jar
```

##### 微服务项目接入Sentinel DashBoard
1、项目引入依赖
```xml
<!--sentinel熔断器-->  
<dependency>  
    <groupId>com.alibaba.cloud</groupId>  
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>  
</dependency>
```

2、application.yml中配置
```yml
spring:
  cloud:
    sentinel:
	  # 启动即注册到sentinel
      eager: true
      transport:
        dashboard: localhost:8081
```
##### 定义受保护的资源
1、使用@SentinelResource定义资源
```java
@Slf4j
@Service
public class OrderServiceImpl implements OrderService {
	// 使用SentinelResource注解定义, 并指定最终的名称
    @SentinelResource(value = "createOrder")
    @Override
    public OrderEntity createOrder(Long productId, Long userId) {
        OrderEntity orderEntity = new OrderEntity();
        orderEntity.setId(1L);
        orderEntity.setProductId(productId);
        orderEntity.setUserId(userId);
        orderEntity.setCreateTime(LocalDateTime.now());
        // 计算总价 调用远程过程调用获取商品的价格
        ProductEntity productEntity = getProductRemote2(productId);
        orderEntity.setPrice(productEntity.getPrice());
        return orderEntity;
    }
}
```

2、进行访问测试
![hwmMbqCs7dAZvRG.png](https://s2.loli.net/2025/06/15/hwmMbqCs7dAZvRG.png)

3、Dashborad中操作
- 簇点链路中找到对应的资源
- 点击流控
![m9DM4iKHRbreUNq.png](https://s2.loli.net/2025/06/15/m9DM4iKHRbreUNq.png)
- 对QPS进行限制： 单机阈值即每秒接口可以访问的次数，超过默认进行快速失败。
![ziVrhROX58YgZ21.png](https://s2.loli.net/2025/06/15/ziVrhROX58YgZ21.png)
#### 2.4.2 异常处理逻辑
>现阶段为前后端分离项目居多，默认的当规则不符合时，会返回默认报错，需要进行异常处理，统一返回结果。针对不同类型的资源，默认的异常处理逻辑有所不同。

![oEamBScfV9qwT6C.png](https://s2.loli.net/2025/06/15/oEamBScfV9qwT6C.png)
##### Web接口
源码：
```java

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
        throws Exception {
        try {
            String resourceName = getResourceName(request);

            if (StringUtil.isEmpty(resourceName)) {
                return true;
            }
            
            if (increaseReferece(request, this.baseWebMvcConfig.getRequestRefName(), 1) != 1) {
                return true;
            }
            
            // Parse the request origin using registered origin parser.
            String origin = parseOrigin(request);
            String contextName = getContextName(request);
            ContextUtil.enter(contextName, origin);
            Entry entry = SphU.entry(resourceName, ResourceTypeConstants.COMMON_WEB, EntryType.IN);
            request.setAttribute(baseWebMvcConfig.getRequestAttributeName(), entry);
            return true;
        } catch (BlockException e) {
            try {
	            // 重点是这里, 对block阻塞异常进行捕获处理
                handleBlockException(request, response, e);
            } finally {
                ContextUtil.exit();
            }
            return false;
        }
    }

    protected void handleBlockException(HttpServletRequest request, HttpServletResponse response, BlockException e)
        throws Exception {
        if (baseWebMvcConfig.getBlockExceptionHandler() != null) {
            // 这里端点了解到baseWebMvcConfig.getBlockExceptionHandler()默认的组件是DefaultBlockExceptionHandler
            baseWebMvcConfig.getBlockExceptionHandler().handle(request, response, e);
        } else {
            // Throw BlockException directly. Users need to handle it in Spring global exception handler.
            throw e;
        }
    }
```

DefaultBlockExceptionHandler
```java
public class DefaultBlockExceptionHandler implements BlockExceptionHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, BlockException e) throws Exception {
        // Return 429 (Too Many Requests) by default.
        response.setStatus(429);

        PrintWriter out = response.getWriter();
        out.print("Blocked by Sentinel (flow limiting)");
        out.flush();
        out.close();
    }

}
```

替换实现：
容器中添加BlockExceptionHandler的实现类即可。
```java
@Component  
public class CustomWebBlockInterceptor implements BlockExceptionHandler {  
  
    @Override  
    public void handle(HttpServletRequest request, HttpServletResponse response, BlockException e) throws Exception {  
        ObjectMapper objectMapper = new ObjectMapper();  
        response.setContentType("application/json;charset=utf-8");  
        PrintWriter out = response.getWriter();  
        ResultVo failResult = ResultVo.fail(500, "Blocked by Sentinel (flow limiting)");  
        out.print(objectMapper.writeValueAsString(failResult));  
        out.flush();  
        out.close();  
    }  
}
```
##### @SentinelResource标注类型
>对于这种类型的异常，大部分情况可以使用SpringBoot全局异常处理解决。对于一些特殊的内容，可以额外定义blockHandler来处理。
```java
    @SentinelResource(value = "createOrder", blockHandler = "createOrderBlockHandler")
    @Override
    public OrderEntity createOrder(Long productId, Long userId) {
        OrderEntity orderEntity = new OrderEntity();
        orderEntity.setId(1L);
        orderEntity.setProductId(productId);
        orderEntity.setUserId(userId);
        orderEntity.setCreateTime(LocalDateTime.now());
        // 计算总价 调用远程过程调用获取商品的价格
        ProductEntity productEntity = getProductRemote2(productId);
        orderEntity.setPrice(productEntity.getPrice());
        return orderEntity;
    }

	// 需要注意的点: 必须携带参数BlockException, 否则这个BlockHandler无法生效
    public OrderEntity createOrderBlockHandler(Long productId, Long userId, BlockException blockException) {
        blockException.printStackTrace();
        return new OrderEntity();
    }
```
##### OpenFeign调用
>即调用远程微服务的异常处理，具体实现类似前面远程调用章节最后提到的，为远程服务接口添加fallback兜底处理。

远程调用接口：
```java
// 指定目标微服务名称
@FeignClient(value = "service-product", fallback = ProductServiceRemoteFallback.class)
public interface ProductServiceRemote {

    @GetMapping(value = "getProduct")
    ProductEntity getProduct(@RequestParam(value = "id") Long id);
}
```

fallback具体实现：
```java
@Component
public class ProductServiceRemoteFallback implements ProductServiceRemote {
    @Override
    public ProductEntity getProduct(Long id) {
        return new ProductEntity();
    }
}
```

##### SphU硬编码方式
>即直接为部分代码进行规则校验，符合则进行返回，否则抛出异常。
```java
    @Override
    public OrderEntity testOrder() {
        OrderEntity orderEntity;
        try (Entry entry = SphU.entry("testRule")) {
            orderEntity = new OrderEntity();
            orderEntity.setId(1L);
            orderEntity.setProductId(1L);
            orderEntity.setUserId(1L);
            orderEntity.setCreateTime(LocalDateTime.now());
        } catch (BlockException e) {
	        // 进行异常的处理
            throw new RuntimeException(e);
        }
        return orderEntity;
    }
```

#### 2.4.3 规则详情
>前面使用了流控规则中的QBS进行限流规则的使用，这一节详细的学习规则。

##### 流控规则
- 阈值类型
- 流控模式
	- 直接：直接对当前资源进行流控。
	- 链路：对调用链上级进行控制，只对某一个目标调用方进行流控。需要启用需要配置sentinel的`web-context-unify`为false。
	- 关联：当某个关联资源访问量较大时，才会使得当前的资源流控规则生效。
- 流控效果：
	- 快速失败：直接失败。
	- Warm Up：预热/冷启动，系统逐步增加处理能力。设置QPS和Period，Period为预热时长，多少秒达到QPS。超过预设期的QPS的请求，进行失败处理。
	- 排队等待：匀速等待，不支持QPS>1000，需要设置QPS和timeout。如果超过timeout最大超时时间，则会失败。参考算法：漏桶算法。
##### 熔断规则
>熔断降级，即及时切断不稳定调用，如某个微服务忙，则快速返回不积压。请求不挤压，即可避免服务雪崩。熔断降级相关的配置在调用方。

断路器的工作原理：
- 慢调用比例
- 异常比例
- 异常数

##### 
