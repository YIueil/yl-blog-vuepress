---
date: 2024-12-08 20:10:37
pageClass: blue-archive
tags:
  - 软件安装
  - MySQL
categories:
  - MySQL
  - DataBase
---

# Windows下安装MySQL5.7

通过官网下载解压版MySQL5.7版本的数据库，进行安装。

## 1 下载包
下载地址: https://downloads.mysql.com/archives/community/

## 2 初始化MySQL
### 2.1 解压MySQL包

我这里的解压路径为: D:\YIueil\WorkSpace\Database\mysql\mysql-5.7.44-winx64
### 2.2 解压目录下创建 my.ini
```ini
[mysqld]
#端口号
port=3306
#mysql-5.7-winx64的路径
basedir=D:\YIueil\WorkSpace\Database\mysql\mysql-5.7.44-winx64
#mysql-5.7-winx64的路径+\data
datadir=D:\YIueil\WorkSpace\Database\mysql\mysql-5.7.44-winx64\data
#最大连接数
max_connections=200
#编码
character-set-server=utf8
default-storage-engine=INNODB
sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES
[mysql]
#编码
default-character-set=utf8
```
### 2.3 执行命令初始化
```bash
mysqld -install mysql5 # (可选)安装服务 mysql5为服务名

mysqld --initialize # 使用ini初始化数据库

net start mysql5 # (可选)启动服务
mysqld # 以非守护进程启动mysql服务, 关闭cmd就会终止服务。

mysql -u root -p # 连接localhost 密码在data中的.err文件中

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'; # 将root用户密码设置为root

GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root' WITH GRANT OPTION; # 设置root用户可远程连接访问

FLUSH PRIVILEGES; # 刷新权限
```