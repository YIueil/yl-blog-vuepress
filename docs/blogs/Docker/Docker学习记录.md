---
date: 2026-10-21 20:45:02
pageClass: blue-archive
tags:
  - Docker
  - 待完成
categories:
  - Docker
---

# Docker学习记录
Docker是一种容器化虚拟技术，通过共用操作系统内核，虚拟出容器，相比较于虚拟机，单个容器耗费的资源更少。

## 1 镜像相关
### 1.1 拉取镜像
镜像是用于创建容器的模板，类似光碟。

>如果遇到网络问题，可以使用阿里云的自带镜像加速。[容器镜像服务控制台](https://cr.console.aliyun.com/cn-chengdu/instances/mirrors)

**常用命令**
```bash
# 拉取一个名为 nginx 的镜像
docker pull nginx

# 查看已有镜像
root@iZ2vcf1lidtliymh8xfkzlZ:~# docker images                                                                                              
IMAGE          ID             DISK USAGE   CONTENT SIZE   EXTRA                                                                           
nginx:latest   0d17b565c37b        213MB         56.7MB

# 删除已有的镜像
root@iZ2vcf1lidtliymh8xfkzlZ:~# docker rmi nginx                                                                          
Untagged: nginx:latest                                                                                                    
Deleted: sha256:0d17b565c37bcbd895e9d92315a05c1c3c9a29f762b011a10c54a66cd53c9b31
```
## 1.2 发布镜像

## 2 容器相关
容器是镜像运行的实例，如基于光碟安装的操作系统。

### 2.1 运行容器
**常用命令**
```bash
# 场景一: 运行Nginx容器
docker run \
	-d \ # 后台运行
	--name nginx-test \ # 给容器命名
	-p 8080:80 \ # 端口映射将宿主8080映射到容器80
	-p 8443:443 \ # 端口映射将宿主8443映射到容器443
	-v /data/nginx/html:/usr/share/nginx/html \ # 挂载卷将宿主的/data/nginx/html挂载到容器内部/usr/share/nginx/html
	-v /data/nginx/conf.d:/etc/nginx/conf.d \ # 挂载卷将宿主的/data/nginx/conf.d挂载到容器内部/etc/nginx/conf.d
	nginx:latest

# 场景二: 交互式终端运行容器, 退出后删除容器
docker run -it --rm alpine:latest sh

# 场景三: 运行一个数据库, 涉及挂载卷和设置环境变量
docker run -d \
	--name postgres-test \
	-e POSTGRES_PASSWORD=mypassword \
	-e POSTGRES_DB=mydb \
	-p 65432:5432 \
	-v /data/pgdata:/var/lib/postgresql/data \
	postgres:17 
	
# 查看一个运行中容器的日志
docker logs -f <CONTAINER ID>

# 删除容器通过ID
docker rm -f <CONTAINER ID>
root@iZ2vcf1lidtliymh8xfkzlZ:~# docker ps                                                                                 
CONTAINER ID   IMAGE           COMMAND   CREATED          STATUS          PORTS     NAMES                                 
d651432c36de   alpine:latest   "sh"      18 seconds ago   Up 17 seconds             vibrant_bassi                         
root@iZ2vcf1lidtliymh8xfkzlZ:~# docker rm -f d65                                                                          
d65

# 删除容器通过名字
root@iZ2vcf1lidtliymh8xfkzlZ:~# docker ps                                                                                 
CONTAINER ID   IMAGE     COMMAND   CREATED         STATUS         PORTS     NAMES                                         
f30bc3b4044b   alpine    "sh"      2 seconds ago   Up 2 seconds             linux-test                                    
root@iZ2vcf1lidtliymh8xfkzlZ:~# docker rm -f linux-test                                                                   
linux-test
```

docker run参数速查

| 参数             | 全称/含义             | 作用说明                 | 实际应用场景                                 | 可选值 / 格式                                                                  |
| :------------- | :---------------- | :------------------- | :------------------------------------- | :------------------------------------------------------------------------ |
| `-d`           | detach            | **后台运行**容器，并返回容器 ID  | 运行服务端程序（如 Nginx, Redis）                | **无**（布尔开关，不需要跟值）                                                         |
| `-it`          | interactive + tty | **交互式**运行，分配伪终端      | 临时进入容器调试、运行临时脚本                        | **无**（布尔开关，通常 `-i` 和 `-t` 连用）                                             |
| `--name`       | name              | 为容器指定一个**唯一名称**      | 避免每次都要查随机生成的 ID                        | **`<自定义名称>`**<br>*(如：`my-nginx`，需全局唯一，字母数字下划线)*                           |
| `--rm`         | remove            | 容器退出后**自动删除**        | 用完即弃的临时测试容器                            | **无**（布尔开关）                                                               |
| `-p`           | publish           | **端口映射**（宿主机端口:容器端口） | 对外提供 Web 服务，如 `-p 80:80`               | **`<宿主机端口>:<容器端口>`**<br>*(支持：`IP:宿主机端口:容器端口` 或加 `/udp`)*                  |
| `-v`           | volume            | **目录/数据卷挂载**（宿主机:容器） | 持久化数据库数据，或挂载配置文件                       | **`<宿主机绝对路径>:<容器路径>`**<br>*(或：`<数据卷名>:<容器路径>[:ro]`，`:ro` 为只读)*            |
| `-e`           | env               | 设置**环境变量**           | 传入数据库密码，如 `-e MYSQL_ROOT_PASSWORD=123` | **`<变量名>=<变量值>`**<br>*(可多次使用；也可用 `--env-file` 指定文件)*                      |
| `--network`    | network           | 指定容器所在的**网络**        | 让多个容器在同一虚拟网络内互通                        | **`bridge`** (默认)、**`host`**、**`none`** 或 **`<自定义网络名>`**                  |
| `--restart`    | restart           | 设置容器的**重启策略**        | 配合 `-d` 使用，如 `--restart=always`（开机自启）  | **`no`** (默认)、**`always`**、**`on-failure[:最大重试次数]`**、**`unless-stopped`** |
| `-w`           | workdir           | 指定容器内的**工作目录**       | 容器启动后直接进入某个目录执行命令                      | **`<容器内绝对路径>`** *(如：`-w /app`)*                                           |
| `--entrypoint` | entrypoint        | 覆盖镜像默认的**入口点**       | 想改变容器默认行为，比如强制进 Shell 而不跑默认程序          | **`<命令>`** *(如：`--entrypoint /bin/bash`)*                                 |
| `--privileged` | privileged        | 赋予容器**真正的 root 权限**  | 需要操作宿主机硬件或内核的极少数场景                     | **无**（布尔开关，⚠️ 生产环境慎用）                                                     |
### 2.2 创建卷（volume）
```bash
# 创建卷
docker volume create my-volume

# 使用卷
docker run -it --rm -v my-volume:/data alpine # 如果my-volume未创建则会被隐式创建

# 查看卷详细
docker volume inspect my-volume

# 删除指定卷
docker volume rm my-volume

# 删除未被挂载使用的卷（危险操作！！！）
docker volume prune
```

## 3  