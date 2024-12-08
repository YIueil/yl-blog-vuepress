# CentOS下安装MySQL8

## 1 下载mysql包

选择最新版本的mysql8的压缩包进行下载: https://dev.mysql.com/downloads/mysql/

```sh
## 进入应用安装目录
cd /usr/local

wget https://cdn.mysql.com//Downloads/MySQL-8.0/mysql-8.0.32-linux-glibc2.12-x86_64.tar.xz
```

# 2 解压缩和重命名

```sh
# 解压缩
# 针对tar.xz -xvJf
# 针对tar.gz -xcvf
tar -xvJf mysql-8.0.32-linux-glibc2.12-x86_64.tar.xz
# 重命名
mv mysql-8.0.32-linux-glibc2.12-x86_64.tar.xz mysql8
# 删除压缩包
rm -rf mysql-8.0.32-linux-glibc2.12-x86_64.tar.xz
# 进入主目录
cd mysql8
```

# 3 创建数据目录、用户组

```sh
# 创建环境变量(临时)
export PATH=$PATH:/usr/local/mysql8/bin
# 创建数据目录
mkdir data
# 创建mysql用户和组
groupadd mysql
useradd -g mysql mysql
# 目录所有权分配
chown -R mysql.mysql /usr/local/mysql8
```

# 4、初始化数据库

```sh
# 进入bin目录
cd bin
# 在 /usr/local/etc/ 下创建 my.cnf 配置文件
vim /usr/local/etc/my.cnf

# 执行数据库初始化
mysqld --defaults-file=/usr/local/etc/my.cnf --basedir=/usr/local/mysql8 --datadir=/usr/local/mysql8/data/mysql --user=mysql --initialize-insecure
```

my.cnf

```ini
[mysql]
#默认字符集
default-character-set=utf8mb4
[client]
port=3306
socket=/tmp/mysql.sock
[mysqld]
port=3306
server-id=3306
user=mysql
socket=/tmp/mysql.sock
#安装目录
basedir=/usr/local/mysql8
#数据存放目录
datadir=/usr/local/mysql8/data/mysql
log-bin=/usr/local/mysql8/data/mysql/mysql-bin
innodb_data_home_dir=/usr/local/mysql8/data/mysql
innodb_log_group_home_dir=/usr/local/mysql8/data/mysql
#日志及进程数据的存放目录
log-error=/usr/local/mysql8/data/mysql/mysql.log
pid-file=/usr/local/mysql8/data/mysql/mysql.pid
#服务端字符集
character-set-server=utf8mb4
lower_case_table_names=1
autocommit=1
#####以上涉及文件夹名称，注意修改
skip-external-locking
key_buffer_size=256M
max_allowed_packet=1M
table_open_cache=1024
sort_buffer_size=4M
net_buffer_length=8K
read_buffer_size=4M
read_rnd_buffer_size=512K
myisam_sort_buffer_size=64M
thread_cache_size=128
#query_cache_size=128M
tmp_table_size=128M
explicit_defaults_for_timestamp=true
max_connections=500
max_connect_errors=100
open_files_limit=65535
binlog_format=mixed
binlog_expire_logs_seconds=864000
#创建表时使用的默认存储引擎
default_storage_engine=InnoDB
innodb_data_file_path=ibdata1:10M:autoextend
innodb_buffer_pool_size=1024M
innodb_log_file_size=256M
innodb_log_buffer_size=8M
innodb_flush_log_at_trx_commit=1
innodb_lock_wait_timeout=50
transaction-isolation=READ-COMMITTED
[mysqldump]
quick
max_allowed_packet=16M
[myisamchk]
key_buffer_size=256M
sort_buffer_size=4M
read_buffer=2M
write_buffer=2M
[mysqlhotcopy]
interactive-timeout
```

# 5 启动服务

```sh
mysql -u root --skip-password
```
