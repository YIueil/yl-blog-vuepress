# Git代理设置

`在拉取诸如github上的代码资源时, 出现网络相关问题, 这里通过设置git代理解决。`

## 清除现有的代理设置

```sh
git config --global --unset https.proxy
git config --global --unset http.proxy
```

## 全局添加代理设置

```sh
# http和https
git config --global http.proxy http://127.0.0.1:10808
git config --global https.proxy https://127.0.0.1:10808

# socks5
git config --global http.proxy socks5://127.0.0.1:10808
git config --global https.proxy socks5://127.0.0.1:10808
```

## 为指定的域名配置代理

```sh
git config --global http.https://github.com.proxy socks5://127.0.0.1:10808
```
