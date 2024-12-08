# CentOS7安装PostgreSQL(含离线安装)

## 1 安装包下载、解压缩
[官方下载地址: https://www.postgresql.org/ftp/source/](https://www.postgresql.org/ftp/source/)
```shell
tar -xvzf postgresql-xxx.tar.gz
```

## 2 前置依赖安装
### 在线环境
```shell
# gcc readline zlib
yum install yum-mlocate-downloadonly
yum install -y ncurses-devel-5.9-14.20130511.el7_4.x86_64.rpm
yum install -y readline-devel-6.2-11.el7.x86_64.rpm
yum install -y zlib-1.2.7-19.el7_9.x86_64.rpm
yum install -y zlib-devel-1.2.7-19.el7_9.x86_64.rpm
```

### 离线环境
[离线rpm依赖包下载地址](https://wwzm.lanzouj.com/ien2x1iwtrkd)
> 通过rpm命令安装相关依赖

## 3 编译和安装

### configure目录
```shell
./configure --prefix=/usr/local/pgsql
```

### make && make install
```shell
make
make install
```

## 4 目录配置和授权

### 创建用户
```shell
useradd postgres
passwd postgres
```

### 创建配置目录并授权
```shell
cd /usr/local/pgsql/
mkdir data
chown -R postgres:postgres /usr/local/pgsql/
```

## 5 修改相关配置
```shell
# 开放远程连接
# 添加 listen_addresses = '*'
vi /usr/local/pgsql/data/postgresql.conf
# 添加 host    all    all       0.0.0.0/0     password
vi /usr/local/pgsql/data/pg_hba.conf
```

## 6 初始化数据库和启动数据库服务
```shell
# 切换用户
su postgres
# 进入bin目录
cd /usr/local/pgsql/bin
# 初始化数据库
./initdb -D /usr/local/pgsql/data
# 启动数据库服务
./pg_ctl -D /usr/local/pgsql/data -l logfile start
```
## 7 登入修改postgres用户密码
```sql
# 登陆
./psql -d postgres
# 修改密码
ALTER USER postgres WITH PASSWORD 'postgres';
# 退出
\q
```