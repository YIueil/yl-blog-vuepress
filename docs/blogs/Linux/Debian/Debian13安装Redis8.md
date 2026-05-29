---
date: 2026-05-29 09:57:23
pageClass: blue-archive
tags:
  - 未分类
categories:
  - Debian
---

# Debain13安装Redis8

### 1 Install required dependencies
Update your package lists and install the necessary development tools and libraries:
```shell
apt-get update
apt-get install -y sudo
sudo apt-get install -y --no-install-recommends ca-certificates wget dpkg-dev gcc g++ libc6-dev libssl-dev make git cmake python3 python3-pip python3-venv python3-dev unzip rsync clang automake autoconf libtool
```

### 2 Download the Redis source
Download a specific version of the Redis source code archive from GitHub.
Replace `<version>` with the Redis version, for example: `8.0.0`.
```shell
cd /usr/src
wget -O redis-<version>.tar.gz https://github.com/redis/redis/archive/refs/tags/<version>.tar.gz
```
### 3 Extract the source archive
Create a directory for the source code and extract the contents into it:
```shell
cd /usr/src
tar xvf redis-<version>.tar.gz
rm redis-<version>.tar.gz
```

### 4 Build Redis
Set the necessary environment variables and build Redis:
```shell
cd /usr/src/redis-<version>
export BUILD_TLS=yes BUILD_WITH_MODULES=yes INSTALL_RUST_TOOLCHAIN=yes
make -j "$(nproc)" all
```

### 5 Run Redis
```shell
cd /usr/src/redis-<version>
./src/redis-server redis-full.conf
```

### 6 注册账号
```bash
# 创建 redis 用户（不登录、无家目录）
sudo useradd -r -s /usr/sbin/nologin redis

# 赋予源码目录执行权限（或移动到标准路径）
sudo chown -R redis:redis /usr/src/redis-8.8.0
```

### 7 服务配置
新增redis服务配置：
```bash
# 编辑服务配置
sudo nano /etc/systemd/system/redis.service

# 日志目录授权
sudo mkdir -p /var/lib/redis /var/log/redis
sudo chown redis:redis /var/lib/redis /var/log/redis
```

具体配置内容：
```ini
[Unit]
Description=Redis 8.8.0 with Modules
Documentation=https://redis.io/docs
After=network.target

[Service]
Type=simple
User=redis
Group=redis
WorkingDirectory=/usr/src/redis-8.8.0

# 启动命令：使用绝对路径 + 绝对配置文件路径
ExecStart=/usr/src/redis-8.8.0/src/redis-server /usr/src/redis-8.8.0/redis-full.conf
ExecReload=/bin/kill -USR2 $MAINPID

# 重启策略
Restart=on-failure
RestartSec=3s

# 资源限制（生产环境关键）
LimitNOFILE=65535
LimitNPROC=4096
LimitCORE=infinity

# 安全加固
NoNewPrivileges=yes
ProtectSystem=strict
ProtectHome=yes
ReadWritePaths=/usr/src/redis-8.8.0 /var/log/redis /var/lib/redis
PrivateTmp=yes

# 日志输出（自动对接 journalctl）
StandardOutput=journal
StandardError=journal
SyslogIdentifier=redis

[Install]
WantedBy=multi-user.target
```

### 8 服务管理
```bash
# 1. 重载 systemd 配置
sudo systemctl daemon-reload

# 2. 启动服务
sudo systemctl start redis

# 3. 设置开机自启
sudo systemctl enable redis

# 4. 查看状态
sudo systemctl status redis

# 5. 实时查看日志
sudo journalctl -u redis -f --no-pager
```
