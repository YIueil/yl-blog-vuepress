---
  date: 2023/11/28 23:45
  pageClass: blue-archive
  tags:
    - 未分类
  categories:
    - 未归档
---

# CentOS7安装Nginx

## 使用root用户安装前置依赖

```shell
yum -y install gcc wget gcc-c++ automake autoconf libtool libxml2-devel libxslt-devel perl-devel perl-ExtUtils-Embed pcre-devel openssl-devel
```

## 下载解压包

```shell
wget http://nginx.org/download/nginx-1.24.0.tar.gz
```

## 解压

```shell
tar -zxvf nginx-1.24.0.tar.gz
```

## 进入解压目录， 执行配置命令

```shell
# 配置nginx配置 如果是sbin想要放到解压目录(如app用户没有/usr/local目录权限时), 配置 /home/app/nginx/nginx-1.24.0 目录
# 否则可以不配置, 默认将使用 /usr/local/nginx 目录
./configure \
--prefix=/home/app/nginx/nginx-1.24.0 \
--sbin-path=/home/app/nginx/nginx-1.24.0/sbin/nginx \
--conf-path=/home/app/nginx/nginx-1.24.0/nginx.conf \
--error-log-path=/home/app/nginx/nginx-1.24.0/logs/error.log \
--http-log-path=/home/app/nginx/nginx-1.24.0/logs/access.log \
--pid-path=/home/app/nginx/nginx-1.24.0/run/nginx.pid \
--lock-path=/home/app/nginx/nginx-1.24.0/run/nginx.lock \
--http-client-body-temp-path=/home/app/nginx/nginx-1.24.0/tmp/nginx/client \
--http-proxy-temp-path=/home/app/nginx/nginx-1.24.0/nginx/proxy \
--http-fastcgi-temp-path=/home/app/nginx/nginx-1.24.0/nginx/fcgi \
--http-uwsgi-temp-path=/home/app/nginx/nginx-1.24.0/nginx/uwsgi \
--http-scgi-temp-path=/home/app/nginx/nginx-1.24.0/nginx/scgi \
--user=nginx \
--group=nginx \
--with-pcre \
--with-http_v2_module \
--with-http_ssl_module \
--with-http_realip_module \
--with-http_addition_module \
--with-http_sub_module \
--with-http_dav_module \
--with-http_flv_module \
--with-http_mp4_module \
--with-http_gunzip_module \
--with-http_gzip_static_module \
--with-http_random_index_module \
--with-http_secure_link_module \
--with-http_stub_status_module \
--with-http_auth_request_module \
--with-mail \
--with-mail_ssl_module \
--with-file-aio \
--with-http_v2_module \
--with-threads \
--with-stream \
--with-stream_ssl_module
```

## 执行安装命令

```shell
make & make install
```

> 安装完成后, 进入sbin目录 ./nginx 执行启动即可