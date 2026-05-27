---
date: 2026-05-27 09:14:44
pageClass: blue-archive
tags:
  - 未分类
categories:
  - CentOS
  - 流量监控
---

# CentOS7监控流量

```bash
### 安装vnstat
yum install -y vnstat

### 启动服务
sudo systemctl start vnstat

### 可选, 开机启动
sudo systemctl enable vnstat

### 测试流量, 需要外网
curl -o /dev/null http://speedtest.tele2.net/1GB.zip

```
### 常用命令

| 命令                | 功能说明               | 示例                  |
| ----------------- | ------------------ | ------------------- |
| `vnstat`          | 查看当前月份的总流量统计       | `vnstat`            |
| `vnstat -i <网卡名>` | 查看特定网卡的统计信息        | `vnstat -i ens33`   |
| `vnstat -l`       | 实时刷新查看当前网卡的传输速率    | `vnstat -l`         |
| `vnstat -h`       | 按**小时**查看过去24小时的流量 | `vnstat -h -i eth0` |
| `vnstat -d`       | 按**天**查看每日流量汇总     | `vnstat -d`         |
| `vnstat -w`       | 按**周**查看流量汇总       | `vnstat -w`         |
| `vnstat -m`       | 按**月**查看流量汇总       | `vnstat -m`         |
