<template><div><h1 id="optional学习笔记" tabindex="-1"><a class="header-anchor" href="#optional学习笔记" aria-hidden="true">#</a> Optional学习笔记</h1>
<h2 id="optional-of-和optional-ofnullaable" tabindex="-1"><a class="header-anchor" href="#optional-of-和optional-ofnullaable" aria-hidden="true">#</a> Optional.of()和Optional.ofNullAable()</h2>
<h4 id="测试代码1" tabindex="-1"><a class="header-anchor" href="#测试代码1" aria-hidden="true">#</a> 测试代码1</h4>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 测试：Optional.of() 此方法相对来说不常用 更多的使用@Optional.of()
 * 当我们访问一个dao获取对象后，我们不知道该对象是否为空，此时可以使用Optional进行包装处理
 *
 * 当user为空，抛出npe
 * 否则返回user包装对象
 */</span>
<span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">User</span> user <span class="token operator">=</span> userDao<span class="token punctuation">.</span><span class="token function">getUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Optional</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span></span> userOptional <span class="token operator">=</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>userOptional<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="运行结果" tabindex="-1"><a class="header-anchor" href="#运行结果" aria-hidden="true">#</a> 运行结果</h4>
<p>对象为空</p>
<div class="language-logiql line-numbers-mode" data-ext="logiql"><pre v-pre class="language-logiql"><code>java.lang.NullPointerException
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>对象不为空</p>
<div class="language-log line-numbers-mode" data-ext="log"><pre v-pre class="language-log"><code>User<span class="token operator">(</span>username<span class="token operator">=</span>立轩<span class="token punctuation">.</span>张<span class="token punctuation">,</span> address<span class="token operator">=</span>Address<span class="token operator">(</span>id<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span> detail<span class="token operator">=</span>汪旁<span class="token number">98</span>号<span class="token punctuation">,</span> 安阳<span class="token punctuation">,</span> 川 <span class="token number">186101</span><span class="token operator">)</span><span class="token operator">)</span>

进程已结束，退出代码为 <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="测试代码2" tabindex="-1"><a class="header-anchor" href="#测试代码2" aria-hidden="true">#</a> 测试代码2</h4>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 测试：Optional.ofNullAble()
 * 当我们访问一个dao获取对象后，我们不知道是改对象是否为空，此时可以使用Optional进行包装处理
 *
 * 当user为空，返回一个空包装对象
 * 否则返回user包装对象
 */</span>
<span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">User</span> user <span class="token operator">=</span> userDao<span class="token punctuation">.</span><span class="token function">getUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Optional</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span></span> userOptional <span class="token operator">=</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">ofNullable</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//ofNullable时返回一个空盒子对象</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>userOptional<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="运行结果-1" tabindex="-1"><a class="header-anchor" href="#运行结果-1" aria-hidden="true">#</a> 运行结果</h4>
<p>对象为空</p>
<div class="language-logiql line-numbers-mode" data-ext="logiql"><pre v-pre class="language-logiql"><code>Optional.empty
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>对象不为空</p>
<div class="language-logiql line-numbers-mode" data-ext="logiql"><pre v-pre class="language-logiql"><code>Optional[User(username=浩.戴, address=Address(id=2, detail=廖巷30874号, 大同, 澳 597639))]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h4>
<ul>
<li>当通过某种方式获取对象后，需要进行对象的校验时，可以使用Optional.of()或者Optional.ofNullAble()进行包装</li>
<li>对象为空时不继续执行使用of()，否则使用ofNullAble()</li>
</ul>
<hr>
<h2 id="optional-orelse-、optional-orelseget-、optional-orelsethrow" tabindex="-1"><a class="header-anchor" href="#optional-orelse-、optional-orelseget-、optional-orelsethrow" aria-hidden="true">#</a> Optional.orElse()、Optional.orElseGet()、Optional.orElseThrow()</h2>
<h4 id="测试代码" tabindex="-1"><a class="header-anchor" href="#测试代码" aria-hidden="true">#</a> 测试代码</h4>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
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
 */</span>
<span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">User</span> user <span class="token operator">=</span> userDao<span class="token punctuation">.</span><span class="token function">getUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">ofNullable</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span><span class="token function">defaultUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//不管内部是不是空都执行</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">ofNullable</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">orElseGet</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token operator">::</span><span class="token function">defaultUser</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//内部为空执行</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">ofNullable</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">orElseThrow</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"对象为空啦"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//内部为空报运行时错误</span>
<span class="token punctuation">}</span>

<span class="token class-name">User</span> <span class="token function">defaultUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"INFO 添加默认用户方法已执行"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">"默认用户"</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Address</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">"默认地址"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="运行结果-2" tabindex="-1"><a class="header-anchor" href="#运行结果-2" aria-hidden="true">#</a> 运行结果</h4>
<p>对象为空</p>
<div class="language-logiql line-numbers-mode" data-ext="logiql"><pre v-pre class="language-logiql"><code>INFO 添加默认用户方法已执行
User(username=默认用户, address=Address(id=0, detail=默认地址))
INFO 添加默认用户方法已执行
User(username=默认用户, address=Address(id=0, detail=默认地址))

java.lang.RuntimeException: 对象为空啦
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对象不为空</p>
<div class="language-logiql line-numbers-mode" data-ext="logiql"><pre v-pre class="language-logiql"><code>INFO 添加默认用户方法已执行
User(username=晓啸.杨, address=Address(id=0, detail=罗侬60632号, 临安, 宁 211368))
User(username=晓啸.杨, address=Address(id=0, detail=罗侬60632号, 临安, 宁 211368))
User(username=晓啸.杨, address=Address(id=0, detail=罗侬60632号, 临安, 宁 211368))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="小结-1" tabindex="-1"><a class="header-anchor" href="#小结-1" aria-hidden="true">#</a> 小结</h4>
<ul>
<li>orElse()的三个方法的入参传入方式不同</li>
<li>对于orElse()来说，传入的方法将始终被执行</li>
</ul>
<hr>
<h2 id="optional-map-、optianal-flatmap" tabindex="-1"><a class="header-anchor" href="#optional-map-、optianal-flatmap" aria-hidden="true">#</a> Optional.map()、Optianal.flatMap()</h2>
<h4 id="测试代码-1" tabindex="-1"><a class="header-anchor" href="#测试代码-1" aria-hidden="true">#</a> 测试代码</h4>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 当我们需要对容器内部的对象进行操作的时候,就可以使用Optional.map()或者Optional.flatMap()方法,如获取用户住址的详细信息
     * 原始写法：
     * if (user != null) <span class="token punctuation">{</span>
     *     if (user.getAddress() != null) <span class="token punctuation">{</span>
     *         System.out.println(user.getAddress().getDetail());
     *     <span class="token punctuation">}</span>
     * <span class="token punctuation">}</span>
     * 
     * map()固定将方法的返回方法返回值的包装对象，flatMap() 相对于map()更加灵活,可以定制返回的包装对象
     */</span>
    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test4</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">User</span> user <span class="token operator">=</span> userDao<span class="token punctuation">.</span><span class="token function">getUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>
                <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">ofNullable</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span>
                        <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">User</span><span class="token operator">::</span><span class="token function">getAddress</span><span class="token punctuation">)</span>
                        <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">Address</span><span class="token operator">::</span><span class="token function">getDetail</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>
                <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">ofNullable</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span>u <span class="token operator">-></span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">ofNullable</span><span class="token punctuation">(</span>u<span class="token punctuation">.</span><span class="token function">getAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span>address <span class="token operator">-></span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">ofNullable</span><span class="token punctuation">(</span>address<span class="token punctuation">.</span><span class="token function">getDetail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="运行结果-3" tabindex="-1"><a class="header-anchor" href="#运行结果-3" aria-hidden="true">#</a> 运行结果</h4>
<p>对象为空</p>
<div class="language-logiql line-numbers-mode" data-ext="logiql"><pre v-pre class="language-logiql"><code>Optional.empty
Optional.empty
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>对象不为空</p>
<div class="language-logiql line-numbers-mode" data-ext="logiql"><pre v-pre class="language-logiql"><code>Optional[Suite 715 蒋路40059号, 大连, 川 290252]
Optional[Suite 715 蒋路40059号, 大连, 川 290252]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="小结-2" tabindex="-1"><a class="header-anchor" href="#小结-2" aria-hidden="true">#</a> 小结</h4>
<ul>
<li>对于未知对象的内部属性进行操作时，使用map()和flatMap()方法进行操作</li>
</ul>
<hr>
<h2 id="optional-ifpresent" tabindex="-1"><a class="header-anchor" href="#optional-ifpresent" aria-hidden="true">#</a> Optional.ifPresent()</h2>
<h4 id="测试代码-2" tabindex="-1"><a class="header-anchor" href="#测试代码-2" aria-hidden="true">#</a> 测试代码</h4>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * ifPresent()
 * 如果对象存在，使用当前包装操作进行一些操作
 */</span>
<span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test5</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">User</span> user <span class="token operator">=</span> userDao<span class="token punctuation">.</span><span class="token function">getUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">ofNullable</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">User</span><span class="token operator">::</span><span class="token function">getAddress</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">ifPresent</span><span class="token punctuation">(</span>address <span class="token operator">-></span> <span class="token punctuation">{</span>
                <span class="token comment">//使用 address 做一些事情</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"送货到:"</span> <span class="token operator">+</span> address<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="运行结果-4" tabindex="-1"><a class="header-anchor" href="#运行结果-4" aria-hidden="true">#</a> 运行结果</h4>
<p>对象为空</p>
<div class="language-logiql line-numbers-mode" data-ext="logiql"><pre v-pre class="language-logiql"><code>
进程已结束，退出代码为 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>对象不为空</p>
<div class="language-logiql line-numbers-mode" data-ext="logiql"><pre v-pre class="language-logiql"><code>送货到:Address(id=2, detail=Apt. 606 方栋3173号, 枣庄, 新 275192)

进程已结束，退出代码为 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="小结-3" tabindex="-1"><a class="header-anchor" href="#小结-3" aria-hidden="true">#</a> 小结</h4>
<ul>
<li>ifPresent()执行后的返回值为void，即在Optional使用中应该放在最后</li>
</ul>
<hr>
<h2 id="optional-filter" tabindex="-1"><a class="header-anchor" href="#optional-filter" aria-hidden="true">#</a> Optional.filter()</h2>
<h4 id="测试代码-3" tabindex="-1"><a class="header-anchor" href="#测试代码-3" aria-hidden="true">#</a> 测试代码</h4>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * Optional.filter()
     * 对内部的对象进行过滤操作，当过过滤条件不满足时，将返回Optional.empty对象，适用于需要判断后进一步操作时使用
     */</span>
    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test6</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">"张三"</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Address</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">"张三的详情住址"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>user <span class="token operator">-></span> user<span class="token punctuation">.</span><span class="token function">getAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">"李四"</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Address</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">"李四的详情住址"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>user <span class="token operator">-></span> user<span class="token punctuation">.</span><span class="token function">getAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="运行结果-5" tabindex="-1"><a class="header-anchor" href="#运行结果-5" aria-hidden="true">#</a> 运行结果</h4>
<div class="language-logiql line-numbers-mode" data-ext="logiql"><pre v-pre class="language-logiql"><code>Optional.empty
Optional[User(username=李四, address=Address(id=2, detail=李四的详情住址))]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="小结-4" tabindex="-1"><a class="header-anchor" href="#小结-4" aria-hidden="true">#</a> 小结</h4>
<ul>
<li>需要判断后进一步操作时使用Optional.filter()</li>
</ul>
</div></template>


