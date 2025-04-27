---
date: 2025-04-26 22:51:08
pageClass: blue-archive
tags:
  - 学习记录
  - SpringSecurity
categories:
  - SpringBoot
---

# SpringSecurity学习记录

## 1 入门程序

## 2 SpringSecurityFilterChain过滤链
>Security的过滤器链，是一组Filter组成，在不同版本中有15或16个过滤器，开发者可以自定义过滤器和禁用过滤器。
>1、过滤器随着容器启动创建。
>2、过滤器的执行有先后顺序。
### 2.1 查看所有的过滤链
通过配置`security`日志等级`logging.level.org.springframework.security: trace `即可在项目启动的日志中找到启用的Filter。代码位置位于`SecurityFilterChain`类的默认实现中。
```sh
DisableEncodeUrlFilter,
WebAsyncManagerIntegrationFilter,
SecurityContextHolderFilter,
HeaderWriterFilter,
CsrfFilter,
LogoutFilter,
UsernamePasswordAuthenticationFilter,
DefaultResourcesFilter,
DefaultLoginPageGeneratingFilter,
DefaultLogoutPageGeneratingFilter,
BasicAuthenticationFilter,
RequestCacheAwareFilter,
SecurityContextHolderAwareRequestFilter,
AnonymousAuthenticationFilter,
ExceptionTranslationFilter,
AuthorizationFilter
```
![17457392345501745739234513.png](https://gitee.com/bee-eater/bee-eater/raw/master/pic/17457392345501745739234513.png)

#### 过滤器解读
>以下过滤器将按照顺序执行，带有\*的过滤器为重要内容，进行源码解读。
##### DisableEncodeUrlFilter
禁用URL编码来防止URL编码的一些问题。
##### WebAsyncManagerIntegrationFilter
该过滤器的主要目的是在异步请求中集成 Spring Security 的安全上下文和 Web 异步管理器。
##### SecurityContextHolderFilter*
该过滤器的主要作用是读取安全上下文，供后续过滤器从SecurityContextHolder中获取。
```java
	private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {
		// 判断是否已经执行过该过滤器，执行过则直接放行
		if (request.getAttribute(FILTER_APPLIED) != null) {
			chain.doFilter(request, response);
			return;
		}
		request.setAttribute(FILTER_APPLIED, Boolean.TRUE);
		// 获取上下文，如果读取到已存在的安全上下文，则设置到上下文信息中。后续过滤器可以访问。
		Supplier<SecurityContext> deferredContext = this.securityContextRepository.loadDeferredContext(request);
		try {
			this.securityContextHolderStrategy.setDeferredContext(deferredContext);
			chain.doFilter(request, response);
		}
		finally {
			// 无论是否抛出异常，最后都会清除整个的安全上下文，并且重置过滤器状态
			this.securityContextHolderStrategy.clearContext();
			request.removeAttribute(FILTER_APPLIED);
		}
	}
```
##### HeaderWriterFilter
该过滤器的主要目的是向HTTP响应添加特定的安全性头信息，帮助浏览器增强对网络攻击的防御能力。
##### CsrfFilter
该过滤器的作用是方式csrf攻击。
>前后端的分离时，禁用此过滤器以便于测试。
##### LogoutFilter*
该过滤器判断当前地址是否是登出地址，是登出地址则获取到授权上下文，调用一系列的LogoutHandler来进行授权的清除，最后重定向到登出后的重定向地址。
```java
	private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		// 判断是否是需要登出的地址
		if (requiresLogout(request, response)) {
			Authentication auth = this.securityContextHolderStrategy.getContext().getAuthentication();
			if (this.logger.isDebugEnabled()) {
				this.logger.debug(LogMessage.format("Logging out [%s]", auth));
			}
			// 这里的Handler是一个聚合的Handler，实际上调用了一系列的handler来进行登出的操作
			this.handler.logout(request, response, auth);
			// 重定向到登出地址
			this.logoutSuccessHandler.onLogoutSuccess(request, response, auth);
			return;
		}
		chain.doFilter(request, response);
	}
```

### 2.2 禁用过滤器
>禁用 csrf 过滤器
### 2.3 跳过过滤器

### 2.3 添加过滤器

## 3 用户认证流程
### 3.1 默认的用户认证流程

### 3.2 改造为数据库查询的用户认证流程

### 3.3 改造JWT的认证流程
>前后端分离模式，不需要使用session，可以禁用。`http.sessionManagement(session -> session.disable())`
### 3.4 登出处理

## 4 Security授权
### 4.1 仅角色的权限校验

### 4.2 基于RBAC的权限校验

## 5 Security的OAuth2支持
### 5.1 OAuth2的介绍

### 5.2 通过OAuth2协议接入GitHub平台

## 6 SpringAuthorizationServer（SAS认证服务中心）
### 6.1 极简实现

### 6.2 自定义授权确定页

### 6.3 第三方客户端应用信息保存到数据库

### 6.4 OIDC客户端获取用户信息

### 6.5 取消第三方客户端授权

### 6.6 基于SAS和OAuth2实现单点登录
