---
date: 2026-09-22 16:01:30
pageClass: blue-archive
tags:
  - 未分类
categories:
  - 网络工程
---

# OpenSSL生成证书
使用`openssl`套件进行证书生成，可用于网站，sftp等领域。
## 1 证书配置

新建`yiueil-ca.cnf`
```ini
[req]
distinguished_name = req_distinguished_name
req_extensions = v3_req
prompt = no
[req_distinguished_name]
C = CN
ST = Yunnan
L = Kunming
O = YIueil
CN = YIueil Root CA
[v3_req]
basicConstraints = critical, CA:TRUE
keyUsage = critical, keyCertSign, cRLSign, digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth, clientAuth
subjectAltName = @alt_names
[alt_names]
DNS.1 = yiueil.cc
DNS.2 = *.yiueil.cc
IP.1 = 47.109.40.4
IP.2 = 192.168.193.8
```

## 2 生成命令
```sh
openssl req -x509 -newkey rsa:2048 -keyout yiueil-ca.key -out yiueil-ca.crt -days 3650 -nodes \
  -config yiueil-ca.cnf -extensions v3_req
```

## 3 验证
```bash
#!/bin/bash
CERT="yiueil-ca.crt"
KEY="yiueil-ca.key"

echo "========== 主题与颁发者 =========="
openssl x509 -in $CERT -noout -subject -issuer

echo ""
echo "========== 有效期 =========="
openssl x509 -in $CERT -noout -dates

echo ""
echo "========== CA 身份 =========="
openssl x509 -in $CERT -noout -text | grep -A1 "Basic Constraints"

echo ""
echo "========== Key Usage =========="
openssl x509 -in $CERT -noout -text | grep -A1 "Key Usage"

echo ""
echo "========== Extended Key Usage =========="
openssl x509 -in $CERT -noout -text | grep -A1 "Extended Key Usage"

echo ""
echo "========== SAN =========="
openssl x509 -in $CERT -noout -text | grep -A1 "Subject Alternative Name"

echo ""
echo "========== 证书与私钥匹配 =========="
CERT_MD5=$(openssl x509 -noout -modulus -in $CERT | openssl md5)
KEY_MD5=$(openssl rsa -noout -modulus -in $KEY | openssl md5)
echo "证书: $CERT_MD5"
echo "私钥: $KEY_MD5"
if [ "$CERT_MD5" = "$KEY_MD5" ]; then
    echo "✅ 匹配成功"
else
    echo "❌ 不匹配，请检查"
fi

echo ""
echo "========== 自签名验证 =========="
openssl verify -CAfile $CERT $CERT
```

## 4 转换给Tomcat使用
```bash
# 执行后会需要新增一个证书密码
openssl pkcs12 -export -in yiueil-ca.crt -inkey yiueil-ca.key -out yiueil-ca.p12 -name "yiueil"
```

修改`Tomcat`配置`server.xml`并重启：
```xml
<Connector port="8443" protocol="org.apache.coyote.http11.Http11NioProtocol"
           maxThreads="150" SSLEnabled="true" scheme="https" secure="true">
    <SSLHostConfig>
        <Certificate certificateKeystoreFile="/path/to/your/yiueil-ca.p12"
                     certificateKeystorePassword="你设置的导出密码"
                     certificateKeystoreType="PKCS12"
                     certificateKeyAlias="yiueil"
                     type="RSA" />
    </SSLHostConfig>
</Connector>
```