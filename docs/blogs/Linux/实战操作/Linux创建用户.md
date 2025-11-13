---
date: 2025-11-13 16:59:29
pageClass: blue-archive
tags:
  - 实战
categories:
  - Linux
---

# Linux创建用户

## 1 快速创建命令

```sh
# 使用adduser命令（交互式，推荐）
sudo adduser YIueil

# 或者使用useradd命令（非交互式）
sudo useradd -m -s /bin/bash YIueil
```

**参数说明：**
- `-m`: 自动创建家目录 `/home/YIueil`
- `-s /bin/bash`: 设置默认shell为bash
## 2 权限分配
``` sh
# 设置家目录所有者和组
sudo chown -R YIueil:YIueil /home/YIueil

# 设置家目录权限（推荐权限）
sudo chmod 700 /home/YIueil

# 或者使用更宽松的权限（如果需要）
sudo chmod 755 /home/YIueil

```

## 3 自定义选项

### 1. 自定义家目录位置

```sh
# 创建自定义家目录
sudo mkdir /custom/home/YIueil
sudo useradd -d /custom/home/YIueil -m YIueil
sudo chown -R YIueil:YIueil /custom/home/YIueil
```

### 2. 复制默认配置文件

```sh
# 如果家目录为空，复制默认配置文件
sudo cp -r /etc/skel/* /home/YIueil/
sudo chown -R YIueil:YIueil /home/YIueil
```

### 3. 添加用户到附加组

```sh
# 将用户添加到sudo组（管理员权限）
sudo usermod -aG sudo YIueil

# 添加到其他常用组
sudo usermod -aG adm,cdrom,plugdev,lpadmin,sambashare Y
```