---
date: 2025-05-19 01:53:25
pageClass: blue-archive
tags:
  - Springboot
categories:
  - SpringBoot
---

# SpringBoot扩展自定义媒体类型Yaml
## 1 添加媒体类型配置
```yml
spring:  
  mvc:  
    contentnegotiation:  
      media-types:  
        yml: application/yml
```
## 2 添加HttpMessageConverter实现
```java
@Component
public class YMLMessageConverter extends AbstractHttpMessageConverter {
    private ObjectMapper mapper = new ObjectMapper(new YAMLFactory());

    public YMLMessageConverter() {
        super(new MediaType("application", "yml", Charset.forName("UTF-8")));
    }

    @Override
    protected boolean supports(Class clazz) {
        return true;
    }

    @Override
    protected Object readInternal(Class clazz, HttpInputMessage inputMessage) throws IOException, HttpMessageNotReadableException {
        try (InputStream body = inputMessage.getBody()) {
            // 使用正确的目标类型进行反序列化
            return mapper.readValue(body, clazz);
        }
    }

    @Override
    protected void writeInternal(Object o, HttpOutputMessage outputMessage) throws IOException, HttpMessageNotWritableException {
        try (OutputStream body = outputMessage.getBody()) {
            body.write(mapper.writeValueAsBytes(o));
        }
    }
}
```
## 3 加入到Spring容器
```java
@Configuration
public class WebMvcConfiguration implements WebMvcConfigurer {

    @Autowired
    YMLMessageConverter ymlMessageConverter;

    @Override
    public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(ymlMessageConverter);
    }
}
```