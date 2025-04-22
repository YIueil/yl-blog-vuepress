---
date: 2025-04-19 02:20:29
pageClass: blue-archive
tags:
  - 实战
categories:
  - Linux
  - Ubuntu
---

# Ubuntu24的SSH配置

## 1 安装服务
```bash
sudo apt install openssh-server
```

## 2 修改配置文件/etc/ssh/sshd_config

```properties
# 允许公钥访问
PubkeyAuthentication yes
# 禁止密码访问
PasswordAuthentication no
# 按需调整端口
Port 63222
```
>修改端口需要同时修改套接字文件中监听的端口，否则重启服务不生效，仍然监听22端口。

## 3 重启服务
```bash
sudo systemctl restart ssh
```

>可能遇到的问题：配置了禁止密码访问，但是还是可以通过密码访问，可以通过命令`sudo sshd -T | grep -i passwordauthentication`查询实际生效的值。期望输出是`no`。如果输出了`yes`，则重点检查是否是`sshd_config.d`目录下面有相关配置，需要进行注释。

## 4 证书公钥部署
>将客户端生成的SSH公钥添加到`authorized_keys`中。
```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
vim authorized_keys
```

## 5 连接测试
```bash
D:\YIueil\WorkSpace\Code>ssh yiueil@192.168.31.154 -p63222
Welcome to Ubuntu 24.04.2 LTS (GNU/Linux 6.11.0-24-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

扩展安全维护（ESM）Applications 未启用。

0 更新可以立即应用。

启用 ESM Apps 来获取未来的额外安全更新
请参见 https://ubuntu.com/esm 或者运行: sudo pro status

Last login: Sat Apr 19 02:31:04 2025 from 192.168.31.77
yiueil@yiueil-X99:~$
```

> 至此，完成了服务器端SSH的配置。