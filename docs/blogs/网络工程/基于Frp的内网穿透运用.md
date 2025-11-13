---
date: 2025-02-08 10:02:48
pageClass: blue-archive
tags:
  - 内网穿透
categories:
  - 未归档
---

# 基于Frp的内网穿透运用

## 1 服务器端配置
### 1.1 下载适用于当前服务器架构的frp软件包
软件下载地址：[Frp开源Github地址](https://github.com/fatedier/frp)
```sh
[root@iZ2vcf1lidtliymh8xfkzlZ frp_0.61.1_linux_amd64]# lscpu
Architecture:          x86_64
CPU op-mode(s):        32-bit, 64-bit
Byte Order:            Little Endian
CPU(s):                2
On-line CPU(s) list:   0,1
Thread(s) per core:    2
Core(s) per socket:    1
Socket(s):             1
NUMA node(s):          1
Vendor ID:             GenuineIntel
CPU family:            6
Model:                 85
Model name:            Intel(R) Xeon(R) Platinum
Stepping:              4
CPU MHz:               2500.002
BogoMIPS:              5000.00
Hypervisor vendor:     KVM
Virtualization type:   full
L1d cache:             32K
L1i cache:             32K
L2 cache:              1024K
L3 cache:              33792K
NUMA node0 CPU(s):     0,1
```

![HDIbP29AuWVvSjk.png](https://s2.loli.net/2025/02/08/HDIbP29AuWVvSjk.png)

> 下载完成后解压到目录。
### 1.2 启动服务器端服务
编辑frps.toml服务器端配置文件：
> 这里设置了frp应用监听的端口以及控制面板web端口
```ini
bindPort = 7000
webServer.addr = "0.0.0.0"
webServer.port = 7001
# dashboard's username and password are both optional
webServer.user = "admin"
webServer.password = "admin"
```

通过frps指定配置文件后台启动：
```sh
nohup ./frps -c frps.toml &
```

可以查看运行日志：
```sh
tail -f nohup.out
```
## 2 客户端配置
示例这边使用的客户端为Windows系统。

### 2.1 下载客户端软件包
![PvmbsLKVkM4WcHZ.png](https://s2.loli.net/2025/02/08/PvmbsLKVkM4WcHZ.png)

下载完成后解压。

### 2.2 修改客户端配置文件

编辑frpc.toml客户端配置文件：
> 这里的配置将服务器的7222端口映射到本地8080
```ini
serverAddr = "47.109.40.4"
serverPort = 7000

[[proxies]]
name = "web-test"
type = "tcp"
localIP = "127.0.0.1"
localPort = 8080
remotePort = 7222
```

### 2.3 启动客户端服务
```sh
frpc -c frpc.toml
```
![eSHYpf3tLJKGryU.png](https://s2.loli.net/2025/02/08/eSHYpf3tLJKGryU.png)
## 3 访问测试
> 这里本地启动一个 springboot 服务，服务端口设置到上述配置的8080端口上。
![IXhtBc9iRd1sbom.png](https://s2.loli.net/2025/02/08/IXhtBc9iRd1sbom.png)

### 3.1 本地访问测试
> 访问 http://localhost:8080/user/list
![NFfhYm9IDAEizKk.png](https://s2.loli.net/2025/02/08/NFfhYm9IDAEizKk.png)

### 3.2 远程访问测试
> 访问服务器的映射端口对应服务 http://47.109.40.4:7222/user/list
![R2E8ZrUSsyQMJXw.png](https://s2.loli.net/2025/02/08/R2E8ZrUSsyQMJXw.png)

可见通过服务器映射的端口也可以访问客户端本地的应用服务，到此实现了基本的内网穿透运用。