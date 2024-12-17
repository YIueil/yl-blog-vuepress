# 启动DAP应用

> 进入`9.77.251.98`服务器，通过SSH连接服务器
> 
```bash
# 进入应用目录
cd /opt/app/ytgz/apache-tomcat-8.5.79-dap-7040/bin

# 启动应用
./startup.sh

# 查看启动日志 预计启动时长3分钟
tail -fn 888 /opt/app/ytgz/apache-tomcat-8.5.79-dap-7040/logs/catalina.out

```