---
date: 2025-10-14 11:57:54
pageClass: blue-archive
tags:
  - 实战
categories:
  - Linux
  - Ubuntu
---

# Ubuntu部署Webdav

## 1 使用第三方 Github 包部署

### 1.1 下载包
```sh
# 下载第三方包
wget https://github.com/hacdias/webdav/releases/download/v5.8.0/linux-amd64-webdav.tar.gz
```
> 下载完成后解压得到二进制文件。

### 1.2 当前目录下操作
```sh
# 创建 data 目录作为 webdav 的根目录
mkdir data

# 创建配置文件
touch config.yml
```

### 1.3 配置文件
```sh
vim config.yml
```

一个示例配置文件
```yml
address: 0.0.0.0
port: 6065

# TLS-related settings if you want to enable TLS directly.
tls: false
cert: cert.pem
key: key.pem

# Prefix to apply to the WebDAV path-ing. Default is '/'.
prefix: /

# Enable or disable debug logging. Default is 'false'.
debug: false

# Disable sniffing the files to detect their content type. Default is 'false'.
noSniff: false

# Whether the server runs behind a trusted proxy or not. When this is true,
# the header X-Forwarded-For will be used for logging the remote addresses
# of logging attempts (if available).
behindProxy: false

# The directory that will be able to be accessed by the users when connecting.
# This directory will be used by users unless they have their own 'directory' defined.
# Default is '.' (current directory).
directory: .

# The default permissions for users. This is a case insensitive option. Possible
# permissions: C (Create), R (Read), U (Update), D (Delete). You can combine multiple
# permissions. For example, to allow to read and create, set "RC". Default is "R".
permissions: R

# The default permissions rules for users. Default is none. Rules are applied
# from last to first, that is, the first rule that matches the request, starting
# from the end, will be applied to the request. Rule paths are always relative to
# the user's directory.
rules: []

# The behavior of redefining the rules for users. It can be:
# - overwrite: when a user has rules defined, these will overwrite any global
#   rules already defined. That is, the global rules are not applicable to the
#   user.
# - append: when a user has rules defined, these will be appended to the global
#   rules already defined. That is, for this user, their own specific rules will
#   be checked first, and then the global rules.
# Default is 'overwrite'.
rulesBehavior: overwrite

# Logging configuration
log:
  # Logging format ('console', 'json'). Default is 'console'.
  format: console
  # Enable or disable colors. Default is 'true'. Only applied if format is 'console'.
  colors: true
  # Logging outputs. You can have more than one output. Default is only 'stderr'.
  outputs:
  - stderr

# CORS configuration
cors:
  # Whether or not CORS configuration should be applied. Default is 'false'.
  enabled: true
  credentials: true
  allowed_headers:
    - Depth
  allowed_hosts:
    - http://localhost:8080
  allowed_methods:
    - GET
  exposed_headers:
    - Content-Length
    - Content-Range

# The list of users. If the list is empty, then there will be no authentication.
# Otherwise, basic authentication will automatically be configured.
#
# If you're delegating the authentication to a different service, you can proxy
# the username using basic authentication, and then disable webdav's password
# check using the option:
#
# noPassword: true
users:
  # Example 'admin' user with plaintext password.
  - username: admin
    password: admin
  # Example 'john' user with bcrypt encrypted password, with custom directory.
  # You can generate a bcrypt-encrypted password by using the 'webdav bcrypt'
  # command lint utility.
  - username: john
    password: "{bcrypt}$2y$10$zEP6oofmXFeHaeMfBNLnP.DO8m.H.Mwhd24/TOX2MWLxAExXi4qgi"
    directory: /another/path
  # Example user whose details will be picked up from the environment.
  - username: "{env}ENV_USERNAME"
    password: "{env}ENV_PASSWORD"
  - username: basic
    password: basic
    # Override default permissions.
    permissions: CRUD
    rules:
      # With this rule, the user CANNOT access {user directory}/some/files.
      - path: /some/file
        permissions: none
      # With this rule, the user CAN create, read, update and delete within
      # {user directory}/public/access.
      - path: /public/access/
        permissions: CRUD
      # With this rule, the user CAN read and update all files ending with .js.
      # It uses a regular expression.
      - regex: "^.+.js$"
        permissions: RU
```

### 1.4 启动 WebDAV 服务
```sh
# 直接运行
./webdav

# 后台运行
./webdav &
```

### 1.5 注册为系统服务*
```sh
# 创建 Service 文件
vim /etc/systemd/system/webdav.service
```

具体录入内容
```ini
[Unit]
Description=WebDAV
[Service]
ExecStart=/path/to/webdav
Restart=always
[Install]
WantedBy=multi-user.target
```

```sh
# 启动服务
sudo systemctl enable webdav.service

# 启动服务
sudo systemctl start webdav.service

# 查看服务状态
sudo systemctl status webdav.service
```

## 2 使用 Nginx 部署

## 3 使用 Apache 部署