# 启动DMAP应用

> 进入`9.77.251.208`和`9.77.252.162`两个服务器的节点

```bash
# 进入DMAP应用目录
cd /opt/app/ytgz/apache-tomcat-9.0.65-dmap-7060/bin

# 启动应用
./startup.sh

# 查看启动日志 启动时长由当前应用压力决定
tail -fn 888 ../logs/catalina.out

```