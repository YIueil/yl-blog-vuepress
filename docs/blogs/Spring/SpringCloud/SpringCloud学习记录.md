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
	- 注册中心：Nacos、E
	- 远程调用：OpenFeign
	- 熔断器：Sentinel
	- 分布式事务：Seata
## 2 组件学习
### 2.1 注册中心
所有应用在上下线的时候，注册和通知到注册中心。这里使用Nacos。
>Nacos是阿里云提供的一个服务注册中心，兼具配置中心的功能。

示例应用，一个经典的订单和产品分布式示例。

## 2.2 配置中心
配置中心实现了不下线的配置更新。
- @Value和@RefushScope
- @ConfigProperties
- @NacosConfigManager编程实现


