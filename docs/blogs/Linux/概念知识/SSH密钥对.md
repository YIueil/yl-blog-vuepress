---
date: 2025-04-18 23:27:26
pageClass: blue-archive
tags:
  - 概念
categories:
  - Linux
---

# SSH密钥对
> SSH是广泛使用的一种通信认证协议，相比较于常规的账号密码登录的方式，通过密钥对进行认证的方式更加安全。

## 1 认证流程
1. 客户端生成密钥。
2. 服务器存储了信任的公钥，并且服务器自身也有一对密钥。
3. 客户端使用自己的私钥进行认证。
4. 服务器验证私钥和公钥匹配通过，则将自身的公钥给到客户端。
5. 客户端查询自己的known_hosts，清单中如果有这个服务器主机，则直接连接。否则触发警告。
	- 第一次连接的时候触发警告主要是为了防止中间人攻击。避免公钥泄露的时候，第三方用公钥来实现攻击。

## 2 密钥的生成
>现阶段推荐的算法是`ed25519`，如果是为了兼容性，可以选择生成常规的`RSA`算法。

```bash
# 使用ed25519算法生成密钥对
ssh-keygen -t ed25519 -C "这个是一个测试的ed25519密钥对"

# 使用RSA算法生成密钥对
ssh-keygen -t rsa -b 4096 -C "这个是一个测试的rsa密钥，长度为4096"

# 或者使用交互的方式生成密钥对
D:\YIueil\WorkSpace\Code>ssh-keygen
 
Generating public/private ed25519 key pair.
Enter file in which to save the key (C:\Users\Administrator/.ssh/id_ed25519):
C:\Users\Administrator/.ssh/id_ed25519 already exists.
Overwrite (y/n)? y
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in C:\Users\Administrator/.ssh/id_ed25519
Your public key has been saved in C:\Users\Administrator/.ssh/id_ed25519.pub
The key fingerprint is:
SHA256:SbMYyi/SjSUdckif8ZAu1tUmmKNO+JORA9kx2v9sc9Q administrator@YIUEIL-B660M
The key's randomart image is:
+--[ED25519 256]--+
|   o+.o+ .       |
|  o+.+==o o      |
|  .o+=*o+o       |
|  ..O*o= + .     |
|   =+== S . E    |
|   .=* o .       |
|  . +.o = .      |
|   . . . o       |
|                 |
+----[SHA256]-----+
```

## 3 服务器存储信任的密钥公钥
### 方法1：客户端直接通过命令上传到服务端
>把本地的ssh公钥文件安装到远程主机对应的账户下

```sh
# ssh-copy-id [-i [identity_file]] [user@]machine
ssh-copy-id -i ~/.ssh/id_rsa.pub user@server
```

### 方法2：进入服务端，直接修改服务端的公钥内容
>修改~/.ssh/authorized_keys文件，将公钥加入到这个文件中。每行一个以适配多个设备的公钥。

```bash
ssh-rsa AAAAB3NzaC1yc2E... user1@laptop
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5... user1@phone
```

>需要注意的服务器的私钥和`authorized_keys`的权限必须是600，`.ssh`目录的权限是700
## 4 客户端使用密钥私钥进行认证
>使用`-i`参数来指定对应的密钥。

```bash
ssh -i "C:\Users\Administrator\.ssh\id_ed25519" yiueil@192.168.31.154
```