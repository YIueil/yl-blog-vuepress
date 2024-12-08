---
  date: 2024/3/8 0:09
  pageClass: blue-archive
  tags:
    - 未分类
  categories:
    - 未归档
---

# CentOS7安装Redis7

## 1 下载安装包

> https://redis.io/download/

## 2 gcc编译环境安装

> 使用 `gcc --version`命令来查看是否具备环境否则需要自行安装!
>

 ```shell
[root@iZ2vcf1lidtliymh8xfkzlZ bin]# gcc --version
gcc (GCC) 4.8.5 20150623 (Red Hat 4.8.5-11)
Copyright (C) 2015 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE
```

> 使用`yum`快速安装gcc
>
> `yum -y install gcc`
>
> `yum -y install gcc-c++`

## 3 make && make install

> 安装完成后, 会在`/usr/local/bin`目录下生成redis相关的可执行文件

![8aYOUcQ5dF3ukfg.png](https://s2.loli.net/2024/03/08/8aYOUcQ5dF3ukfg.png)

## 4 前台启动

> 这种方式启动后会随着终端关闭而关闭, 不常用, 仅做安装是否成功的测试!

```shell
cd /usr/local/bin
./redis-server
```

![PXEg9MutCGwzpSs.png](https://s2.loli.net/2024/03/08/PXEg9MutCGwzpSs.png)

## 5 修改配置(端口、远程、守护进程启动)

> 自带的配置在解压目录下, 建议不动. 使用`cp redis.conf /etc`拷贝修改后使用

```shell
# 允许任何主机连接、访问
bind 127.0.0.1 改为 bind 0.0.0.0
 
# 关闭保护模式
protected-mode yes 改为 protected-mode no
 
# 允许启动后在后台运行，即关闭命令行窗口后仍能运行
daemonize no 改为 daemonize yes

# 端口修改
port 6379 改为 port 16379
```

```shell
# 以守护进程启动
cd /usr/local/bin
./redis-server /etc/redis.conf
```

## 6 工具连接测试
```shell
# redis-cli连接测试
[root@iZ2vcf1lidtliymh8xfkzlZ bin]# redis-cli -p 65431 ping
PONG
```

### 外部工具连接测试

![eBFXNLiRuQVrbhT.png](https://s2.loli.net/2024/03/08/eBFXNLiRuQVrbhT.png)

## 7 redis-cli的常用命令
```shell
# 连接
redis-cli -p 16379 -a password

# 停止服务
redis-cli -p 16379 shutdown
```