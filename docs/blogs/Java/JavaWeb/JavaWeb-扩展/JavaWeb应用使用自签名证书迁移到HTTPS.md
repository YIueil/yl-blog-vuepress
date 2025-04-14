---
date: 2025-04-14 10:11:00
pageClass: blue-archive
tags:
  - HTTPS
  - JavaWeb
categories:
  - Java
  - JavaWeb
---

# JavaWeb应用使用自签名证书迁移到HTTPS
>项目使用的技术栈为Spring JavaWeb + Nginx + tomcat。

## 1 证书生成
> 使用Java环境下的`keytool`生成密钥。
## 1.1 生成密钥文件
```bash
# 交互式的生成密钥文件
keytool -genkeypair -alias localhost -keyalg RSA -keysize 2048 -validity 365 -keystore keystore.jks

输入密钥库口令:

再次输入新口令:

您的名字与姓氏是什么?
  [Unknown]:  yiueil.cc
您的组织单位名称是什么?
  [Unknown]:
您的组织名称是什么?
  [Unknown]:
您所在的城市或区域名称是什么?
  [Unknown]:
您所在的省/市/自治区名称是什么?
  [Unknown]:  CN
该单位的双字母国家/地区代码是什么?
  [Unknown]:  CN
CN=yiueil.cc, OU=Unknown, O=Unknown, L=Unknown, ST=CN, C=CN是否正确?
  [否]:  y

输入 <localhost> 的密钥口令
        (如果和密钥库口令相同, 按回车):

# 可以使用建议的命令将密钥算法格式迁移到行业标准，以被广泛支持（如 OpenSSL、Windows、浏览器
Warning:
JKS 密钥库使用专用格式。建议使用 "keytool -importkeystore -srckeystore keystore.jks -destkeystore keystore.jks -deststoretype pkcs12" 迁移到行业标准格式 PKCS12。
```

## 1.2 导出证书
```bash
# 查看所有生成的证书 需要输入密钥库的密码
keytool -list -v -keystore keystore.jks

# 导出证书
keytool -exportcert -alias localhost -keystore keystore.jks -file certificate.crt
```

## 1.3 客户端安装证书

## 2 Web容器配置
### 2.1 Tomcat配置
>Tomcat 中开放SSL的监听，配置证书所在的路径以及证书`Key`的密钥。配置完成后重启进入通过该端口即可看到效果。
```xml
    <Connector port="18443"
               protocol="org.apache.coyote.http11.Http11NioProtocol"
               maxThreads="150"
               SSLEnabled="true"
               scheme="https"
               secure="true"
               maxParameterCount="1000"
     >
        <SSLHostConfig>
            <Certificate certificateKeystoreFile="conf/keystore.jks"
                         certificateKeystorePassword="Fkey13579."
                         certificateKeystoreType="JKS"
                         type="RSA" />
        </SSLHostConfig>
    </Connector>
```
