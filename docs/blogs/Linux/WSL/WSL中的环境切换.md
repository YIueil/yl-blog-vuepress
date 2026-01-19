---
date: 2026-01-19 09:43:52
pageClass: blue-archive
tags:
  - WSL
categories:
  - Linux
---

# WSL中的环境切换
>在`WSL`中可能需要动态的切换，如`JDK`、`node`、`maven`等版本。

## 1 使用NVM管理Node版本
```bash
# 安装 NVM 版本
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# 重启终端后执行以下命令
# 查看可以安装的node版本
nvm ls-remote --lts

# 安装对应版本
nvm install <对应版本号>

# 查看已经安装的版本
nvm list

# 切换版本
nvm use <对应已安装的版本号>

# 删除版本
nvm uninstall <对应已安装的版本号>

```

## 2 使用SDKMAN管理JDK和Maven版本
> `sdk list`指令的执行需要开启代理

所有的管理配置完成后, 可以使用`sdk current`查看当前的版本
```bash

yiueil@YIUEIL-B760I:~/.m2/repository$ sdk current
Current versions in use:
java 17.0.12-oracle
maven 3.9.12
```
### 2.1 管理JDK
```bash
# 安装SDKMAN
curl -s "https://get.sdkman.io" | bash

# 重启终端后执行以下命令
# 查看所有的java版本 已安装的部分会标识出来
sdk list java

# 安装对应版本
sdk install java <对应版本标识>

# 查看已经安装的版本
sdk list java | grep installed

# 临时切换到对应版本 关闭终端后失效
sdk use java <对应版本标识>

# 永久切换到对应版本
sdk default java <对应版本标识>

# 查看当前启动的版本
sdk current java
```

### 2.2 管理Maven
```bash
# 查看可安装的Maven版本
sdk list maven

# 安装对应的Maven版本
sdk install maven <对应版本标识>

# 使用对应的Maven版本
sdk default maven <对应版本标识>

```

### 2.3 开启离线模式
>对于内网应用，可以使用离线模式，跳过网络检测这一步。
```
# 开启离线模式
sdk offline enable

# 关闭离线模式
sdk offline disable
```

