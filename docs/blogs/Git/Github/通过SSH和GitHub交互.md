---
  date: 2024-12-08 16:02:24
  pageClass: blue-archive
  tags:
    - git
    - github
  categories:
    - git
---
# H1

# 通过SSH和GitHub交互

通过Https和Github交互虽然比较方便，只需要用户密码或者ghp-key即可完成交互。但是通过SSH能够更快的完成交互，并且每次都不需要提供用户密码。

> 一次密钥创建，方便后续的所有交互。
> 
> 系统重装后，需要重新生成。

## 1 创建密钥
使用命令`ssh-keygen -t rsa -C "your_email@example.com"`生成一个新的SSH密钥对。
```bash
`ssh-keygen -t rsa -C "yiueil@163.com"
```

## 2 获取SSH公钥
进入`~/.ssh`目录，查看生成的`id_rsa`和`id_rsa.pub`文件，其中`id_rsa`是私钥，`id_rsa.pub`是公钥。
使用命令`cat id_rsa.pub`查看并复制公钥内容:
```pub
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCdHFwOyLhp9bZkxAAFLN3Yn0uKzBfm+EYS/ybp+Hyc/WJ7wIw23AvI7o2ooIosxnr7/tf0Ys5biTo4Nv+moqVQnIURjgFoIsD/QISde+GQuSGL0Bn3U9VONUwZqRa8kw+pvuoHPVIUOURH9nEhnkeJcSUAuGcg14uRrGg6LYrFfjMLimrQ2thWk2P+/YOsOiLKVS6EcrnD1qay43VTN7bRSSW8uVEc6uiGRg4DLXihq0VGTSdodQxADj2YJ1xEz1XXF8cPp0R+k2U7Zmd8v9LBx4guS+k6CocAfdj5MnJ3JCWkvuyQdh9UZ2s1L6PvYcViK3tk7LDXo8aBYYcqXX1qmoHMmSKE5C6omME5nIxW/avM7/HHs/TGK+pLEbx/S2s5Ocv00gShjgRtqLyicHHaapjtbmao/b+RP03PVKY9j8aQI3XnHOdReIStsBbeN8iW0UjzZrV2ddBOuZ0gPHGcFgeFdt9Wm9xXYI0cPHAbNH0Gbdpn0S8PudEr+HjTDQM= yiueil@163.com

```
## 3 将SSH公钥添加到GitHub账户：
登录到你的GitHub账户，点击右上角的头像，选择“Settings”。
在页面左侧的菜单中选择“SSH and GPG keys”。
点击“New SSH key”，并给你的公钥一个描述，然后将`id_rsa.pub`文件的内容粘贴到“Key”文本框中，点击“Add SSH key”完成添加。
![m7EuZBtS6YiTXMF.png](https://s2.loli.net/2024/12/08/m7EuZBtS6YiTXMF.png)
## 4 测试SSH连接：
在命令行中，使用`ssh -T git@github.com`测试SSH连接是否成功。如果一切正常，你会看到一条欢迎信息，表示SSH连接成功。
```cmd
C:\Users\Administrator>ssh -T git@github.com
The authenticity of host 'github.com (20.205.243.166)' can't be established.
ED25519 key fingerprint is SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added 'github.com' (ED25519) to the list of known hosts.
Hi YIueil! You've successfully authenticated, but GitHub does not provide shell access.
```

> 后续的仓库推送拉取，都可以使用SSH进行交互了。