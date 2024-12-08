# springmvc创建自定义类型转换器

## 1 创建自定义转换类

```java
package cn.yiueil.convert;

import org.springframework.core.convert.converter.Converter;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/*1、创建自定义类型转换器*/
public class DateConvert implements Converter<String, Date> {
    @Override
    public Date convert(String s) {
        try {
            return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(s);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }
}
```

## 2 注入自定义类型转换器注册器

```xml
    <!--2、创建Formatting实例,加入自定义类型转换器-->
    <bean id="conversionService" class="org.springframework.format.support.FormattingConversionServiceFactoryBean">
        <property name="converters">
            <set>
                <bean class="cn.yiueil.convert.DateConvert"/>
                <bean class="cn.yiueil.convert.LocalDateTimeConvert"/>
            </set>
        </property>
    </bean>
```

## 3 在mvc注解驱动中使用自定义的类型转换器注册器

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:mvc="http://www.springframework.org/schema/mvc"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/mvc https://www.springframework.org/schema/mvc/spring-mvc.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">
    <mvc:annotation-driven conversion-service="conversionService"/><!--3、使用自定义的类型转换器-->

    <context:component-scan base-package="cn.yiueil"/>

    <!--2、创建Formatting实例,加入自定义类型转换器-->
    <bean id="conversionService" class="org.springframework.format.support.FormattingConversionServiceFactoryBean">
        <property name="converters">
            <set>
                <bean class="cn.yiueil.convert.DateConvert"/>
                <bean class="cn.yiueil.convert.LocalDateTimeConvert"/>
            </set>
        </property>
    </bean>
</beans>
```
