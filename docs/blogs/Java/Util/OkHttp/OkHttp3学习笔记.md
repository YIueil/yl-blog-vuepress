---
  date: 2024/1/22 16:17
  pageClass: blue-archive
  tags:
    - 未分类
  categories:
    - 未归档
---
# OkHttp3学习笔记

>  OkHttp3是一个网络框架工具包, OkHttp3 提供了简洁、高效、可靠的 API, 可以用来发送 HTTP/HTTPS 请求, 并支持 WebSockets 协议。它采用了连接池技术, 可以复用 TCP 连接从而减少网络延迟。同时还内置了 Gzip 压缩、数据缓存、Cookie 管理等功能，方便开发者进行网络请求操作。

## 1 常用API

### 1.1 OkHttpClient

> 客户端对象，用于创建 `Request` 对象, 使用的时候尽量保证单例或者使用对象池, 节约系统资源。

```java
// 通过new关键字创建对象后, 获取到builder对象后初始化连接超时配置
OkHttpClient client = new OkHttpClient().newBuilder()
                            // 连接超时时间 60秒
                            .connectTimeout(60, TimeUnit.SECONDS)
                            // 读取超时时间 5分钟
                            .readTimeout(5 * 60, TimeUnit.SECONDS)
                            // 读取超时时间 5分钟
                            .writeTimeout(5 * 60, TimeUnit.SECONDS)
                            .build();
```

### 1.2 RequestRequest

> 请求对象, 线程不安全, 不可复用。

```java
        Request.Builder builder = new Request.Builder();
        Request request = builder.url("www.baidu.com")
                .method("get", null)
                .build();
```

### 1.3 RequestBody

> 对于post请求, 可能需要携带二进制文件, json字符串等数据, 需要构造requestbody。

```java
        Request.Builder builder = new Request.Builder();
        // 携带非文件类型的RequestBody构造
        RequestBody requestBody = RequestBody.create("{\"id\":1,\"name\":\"张三\"}", MediaType.parse(MediaTypeEnum.APPLICATION_JSON.getValue()));
        Request request = builder.url("www.baidu.com")
                .method("post", requestBody)
                .build();
```

```java
        Request.Builder builder = new Request.Builder();
        // 表单类型的MultipartBody构造 MultipartBody继承至RequestBody
        MultipartBody multipartBody = new MultipartBody.Builder().setType(MultipartBody.FORM)
                .addFormDataPart("file", "testfile1.png", RequestBody.create(new File("C://testfile1.png"), MediaType.parse(MediaTypeEnum.IMAGE_PNG.getValue())))
                .addFormDataPart("name", "testfile1")
                .build();
        Request request = builder.url("www.baidu.com")
                .method("post", multipartBody)
                .build();
```

### 1.4 HttpUrl

> URL构造对象, 用于构造url参数。

```java
        String url = "www.baidu.com";
        HttpUrl httpUrl = Optional.ofNullable(HttpUrl.parse(url)).orElseThrow(() -> new RuntimeException("url解析异常"));
        httpUrl = httpUrl
                .newBuilder()
                .addQueryParameter("pageSize", "1")
                .build();
        Request.Builder builder = new Request.Builder();
        Request request = builder.url(httpUrl)
                .method("get", null)
                .build();
```

### 1.5 Response

> 响应对象, 包含响应内容

```java
        System.out.println(ObjectUtils.defaultIfNull(request.body(), ""));
```

## 2 使用步骤

### 2.1 构建client客户连接对象

```java
        OkHttpClient okHttpClient = new OkHttpClient().newBuilder()
                .connectTimeout(1, TimeUnit.MINUTES)
                .build();
```

### 2.2 构建URL参数、请求头、请求体(POST)

```java
        // 构造url参数
        HttpUrl httpUrl = Optional.ofNullable(HttpUrl.parse(url))
                .orElseThrow(() -> new RuntimeException(""))
                .newBuilder()
                .addQueryParameter("username", "zhangsan")
                .addQueryParameter("password", "123456")
                .build();
        // 构造header
        Headers headers = new Headers.Builder()
                .add("token", "yl-token")
                .build();
        // 构造body
        RequestBody requestBody = RequestBody.create("{\"id\":1,\"name\":\"张三\"}", MediaType.parse(MediaTypeEnum.APPLICATION_JSON.getValue()));
```

### 2.3 构建Request请求对象

```java
        // 创建request对象
        Request request = new Request.Builder()
                .url(httpUrl)
                .headers(headers)
                .method("post", requestBody)
                .build();
```

### 2.4 发送请求(IO操作)

```java
        // 同步执行
        Response response = okHttpClient.newCall(request).execute();
        // 异步执行
        okHttpClient.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(@NotNull Call call, @NotNull IOException e) {
                e.printStackTrace();
            }

            @Override
            public void onResponse(@NotNull Call call, @NotNull Response response) throws IOException {
                System.out.println(ObjectUtils.defaultIfNull(request.body(), ""));
            }
        });
```

### 2.5 解析结果

```java
        if (response.isSuccessful()) {
            System.out.println(ObjectUtils.defaultIfNull(request.body(), ""));
        } else {
            System.out.println(response.code());
            System.out.println(response.message());
        }
```

### 2.6 请求实例

```java
    @Test
    void testDoPost() throws IOException {
        String url = "www.baidu.com";
        // 构造url参数
        HttpUrl httpUrl = Optional.ofNullable(HttpUrl.parse(url))
                .orElseThrow(() -> new RuntimeException(""))
                .newBuilder()
                .addQueryParameter("username", "zhangsan")
                .addQueryParameter("password", "123456")
                .build();
        // 构造header
        Headers headers = new Headers.Builder()
                .add("token", "yl-token")
                .build();
        // 构造body
        RequestBody requestBody = RequestBody.create("{\"id\":1,\"name\":\"张三\"}", MediaType.parse(MediaTypeEnum.APPLICATION_JSON.getValue()));
        // 创建request对象
        Request request = new Request.Builder()
                .url(httpUrl)
                .headers(headers)
                .method("post", requestBody)
                .build();
        // 同步执行
        Response response = okHttpClient.newCall(request).execute();
        if (response.isSuccessful()) {
            System.out.println(ObjectUtils.defaultIfNull(request.body(), ""));
        } else {
            System.out.println(response.code());
            System.out.println(response.message());
        }
    }
```

## 3 使用总结

- 对于OkHttpClient, Request, HttpUrl, MultipartBody等都使用了建造者模式, 类中还有子类Builder来实现对于对象属性的构造。