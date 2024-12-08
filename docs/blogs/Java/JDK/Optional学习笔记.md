# Optional.of()和Optional.ofNullAable()

## 测试代码1

```java
/**
 * 测试：Optional.of() 此方法相对来说不常用 更多的使用@Optional.of()
 * 当我们访问一个dao获取对象后，我们不知道该对象是否为空，此时可以使用Optional进行包装处理
 *
 * 当user为空，抛出npe
 * 否则返回user包装对象
 */
@Test
public void test1() {
    User user = userDao.getUser();
    Optional<User> userOptional = Optional.of(user);
    System.out.println(userOptional.get());
}
```

## 运行结果

对象为空

```logiql
java.lang.NullPointerException
```

对象不为空

```log
User(username=立轩.张, address=Address(id=0, detail=汪旁98号, 安阳, 川 186101))

进程已结束，退出代码为 0
```

## 测试代码2

```java
/**
 * 测试：Optional.ofNullAble()
 * 当我们访问一个dao获取对象后，我们不知道是改对象是否为空，此时可以使用Optional进行包装处理
 *
 * 当user为空，返回一个空包装对象
 * 否则返回user包装对象
 */
@Test
public void test2() {
    User user = userDao.getUser();
    Optional<User> userOptional = Optional.ofNullable(user);//ofNullable时返回一个空盒子对象
    System.out.println(userOptional);
}
```

## 运行结果

对象为空

```logiql
Optional.empty
```

对象不为空

```logiql
Optional[User(username=浩.戴, address=Address(id=2, detail=廖巷30874号, 大同, 澳 597639))]
```

## 小结

- 当通过某种方式获取对象后，需要进行对象的校验时，可以使用Optional.of()或者Optional.ofNullAble()进行包装
- 对象为空时不继续执行使用of()，否则使用ofNullAble()

---

# Optional.orElse()、Optional.orElseGet()、Optional.orElseThrow()

## 测试代码

```java
/**
 * 测试：Optional.orElse()、Optional.orElseGet()、orElseThrow()
 * 当我们需要使用包装内部的对象做一些事情时，我们在拿出来前可以使用orElse()的三个方法 源码 return value != null ? value : other;
 *
 * 当user为空：
 * orElse()返回传入的对象，注：如果传入的对象是一个方法，则改方法始终会执行
 * orElseGet()会通过传入的方法引用调用对应方法
 * orElseThrow()会抛出运行时异常
 *
 * 当user不为空：
 * orElse()返回user对象，解析传入的对象，如果是个方法则会调用改方法
 * orElseGet()和orElseThrow()返回User对象
 */
@Test
public void test3() {
    User user = userDao.getUser();
    System.out.println(Optional.ofNullable(user).orElse(defaultUser()));//不管内部是不是空都执行
    System.out.println(Optional.ofNullable(user).orElseGet(this::defaultUser));//内部为空执行
    System.out.println(Optional.ofNullable(user).orElseThrow(()-> new RuntimeException("对象为空啦")));//内部为空报运行时错误
}

User defaultUser() {
    System.out.println("INFO 添加默认用户方法已执行");
    return new User("默认用户", new Address(0, "默认地址"));
}
```

## 运行结果

对象为空

```logiql
INFO 添加默认用户方法已执行
User(username=默认用户, address=Address(id=0, detail=默认地址))
INFO 添加默认用户方法已执行
User(username=默认用户, address=Address(id=0, detail=默认地址))

java.lang.RuntimeException: 对象为空啦
```

对象不为空

```logiql
INFO 添加默认用户方法已执行
User(username=晓啸.杨, address=Address(id=0, detail=罗侬60632号, 临安, 宁 211368))
User(username=晓啸.杨, address=Address(id=0, detail=罗侬60632号, 临安, 宁 211368))
User(username=晓啸.杨, address=Address(id=0, detail=罗侬60632号, 临安, 宁 211368))
```

## 小结

- orElse()的三个方法的入参传入方式不同
- 对于orElse()来说，传入的方法将始终被执行

---

# Optional.map()、Optianal.flatMap()

## 测试代码

```java
    /**
     * 当我们需要对容器内部的对象进行操作的时候,就可以使用Optional.map()或者Optional.flatMap()方法,如获取用户住址的详细信息
     * 原始写法：
     * if (user != null) {
     *     if (user.getAddress() != null) {
     *         System.out.println(user.getAddress().getDetail());
     *     }
     * }
     * 
     * map()固定将方法的返回方法返回值的包装对象，flatMap() 相对于map()更加灵活,可以定制返回的包装对象
     */
    @Test
    public void test4() {
        User user = userDao.getUser();
        System.out.println(
                Optional.ofNullable(user)
                        .map(User::getAddress)
                        .map(Address::getDetail)
        );

        System.out.println(
                Optional.ofNullable(user)
                .flatMap(u -> Optional.ofNullable(u.getAddress()))
                .flatMap(address -> Optional.ofNullable(address.getDetail()))
        );
    }
```

## 运行结果

对象为空

```logiql
Optional.empty
Optional.empty
```

对象不为空

```logiql
Optional[Suite 715 蒋路40059号, 大连, 川 290252]
Optional[Suite 715 蒋路40059号, 大连, 川 290252]
```

## 小结

- 对于未知对象的内部属性进行操作时，使用map()和flatMap()方法进行操作

---

# Optional.ifPresent()

## 测试代码

```java
/**
 * ifPresent()
 * 如果对象存在，使用当前包装操作进行一些操作
 */
@Test
public void test5() {
    User user = userDao.getUser();
    Optional.ofNullable(user)
            .map(User::getAddress)
            .ifPresent(address -> {
                //使用 address 做一些事情
                System.out.println("送货到:" + address);
            });
}
```

## 运行结果

对象为空

```logiql

进程已结束，退出代码为 0
```

对象不为空

```logiql
送货到:Address(id=2, detail=Apt. 606 方栋3173号, 枣庄, 新 275192)

进程已结束，退出代码为 0
```

## 小结

- ifPresent()执行后的返回值为void，即在Optional使用中应该放在最后

---

# Optional.filter()

## 测试代码

```java
    /**
     * Optional.filter()
     * 对内部的对象进行过滤操作，当过过滤条件不满足时，将返回Optional.empty对象，适用于需要判断后进一步操作时使用
     */
    @Test
    public void test6() {
        System.out.println(Optional.of(new User("张三", new Address(0, "张三的详情住址")))
                .filter(user -> user.getAddress().getId() > 1));
        System.out.println(Optional.of(new User("李四", new Address(2, "李四的详情住址")))
                .filter(user -> user.getAddress().getId() > 1));
    }
```

## 运行结果

```logiql
Optional.empty
Optional[User(username=李四, address=Address(id=2, detail=李四的详情住址))]
```

## 小结

- 需要判断后进一步操作时使用Optional.filter()
