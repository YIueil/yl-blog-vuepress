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

## 2 SpringSecurity过滤链
### 2.1 查看所有的过滤链

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
