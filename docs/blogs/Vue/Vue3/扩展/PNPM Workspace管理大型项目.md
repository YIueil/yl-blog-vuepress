---
date: 2025-06-08 18:59:05
pageClass: blue-archive
tags:
  - 未分类
categories:
  - Vue
---

# PNPM Workspace管理大型项目
monorepo 仓库管理方式
其优势
- 便于多个项目互相依赖本地调试
- 便于共享知识库
- 减少管理成本

其劣势
- 难以进行权限管理
- 版本管理困难
- 代码质量难以控制

什么情况下使用？
- 子项目直接互相依赖
- 需要使用测试项目测试项目组件

最佳实践
- link对象设置为私有
- 依赖管理放到workspace-root中管理
- 禁止workspace独立新增依赖
- 根目录中添加eslint、prettier配置，子项目集成root配置
## 1 入门项目
### 1.1 创建出父项目
`pnpm create vue@latest`
### 1.2 创建pnpm-workspace.yaml
```yaml
packages:  
  - 'packages/*'  
  - 'project/*'
```
### 1.3 创建组件模块
```bash
cd packages
`pnpm create vue@latest`
# 项目名
yl-button-component
```

### 1.4 创建测试模块
```bash
cd project
`pnpm create vue@latest`
# 项目名
yl-test-vue
# 测试项目可以依赖yl-button-component
"dependencies": {  
  "yl-button-component": "workspace:*",  
}
# 安装依赖
pnpm i
```
测试模块中就可以调用`yl-button-component`模块的东西了。