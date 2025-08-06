---
date: 2025-08-06 10:44:37
pageClass: blue-archive
tags:
  - 密码安全
  - 三级等保
categories:
  - Linux
---

# CentOS7配置密码策略
## 1 密码安全策略
### 1.1 密码复杂度配置
如口令长度不得小于8位，且为字母、数字或特殊字符的混合组合，用户名和口令不得相同
```bash
vim /etc/pam.d/system-auth
password  requisite  pam_pwquality.so try_first_pass local_users_only retry=3 authtok_type= minlen=8 lcredit=-1 ucredit=-1 dcredit=-1 ocredit=-1 difok=5 enforce_for_root

#参数说明 负数：代表最少出现次数，正数：代表最多出现次数
minlen = 8，密码长度至少8位；
lcredit=-1，至少包含一个小写字母；
ucredit=-1，至少包含一个大写字母；
dcredit=-1，至少包含要给数字；
ocredit=-1，至少包含一个特殊字符；
difok=5，新密码最多与旧密码重复5个字符；
enforce_for_root，对root强制执行密码复杂度策略。
```
### 1.2 密码有效期
新用户生效
```bash
vim /etc/login.defs

#密码的最大有效期
PASS_MAX_DAYS 180

#是否可修改密码，多少天后可修改
PASS_MIN_DAYS 0

#密码最小长度，pam_pwquality设置优先
PASS_MIN_LEN 8

#密码失效前多少天在用户登录时通知用户修改密码
PASS_WARN_AGE 15
```

老用户生效
```bash
chage -M 180 用户名 #老用户生效
```

### 1.3 账户密码错误锁定
控制如果多次登陆失败账号锁定，只对控制台生效
```bash
# 连续五次密码错误，账号将被锁定半小时
vim /etc/pam.d/system-auth
auth required pam_tally2.so onerr=fail deny=5 unlock_time=1800 root_unlock_time=1800
```

如果需要对ssh远程有效，则需要修改 /etc/pam.d/sshd
```bash
vim /etc/pam.d/sshd
auth required pam_tally2.so onerr=fail deny=5 unlock_time=600 root_unlock_time=60
```
## 2 会话超时策略
30分钟无操作，自动退出会话。
```bash
vim /etc/profile
TMOUT=1800 #1800秒超时

# source 使上述内容生效
source /etc/profile
```


