import{_ as n,o as s,c as a,d as e}from"./app-4023f1b2.js";const p={},o=e(`<h1 id="启动中间件" tabindex="-1"><a class="header-anchor" href="#启动中间件" aria-hidden="true">#</a> 启动中间件</h1><h2 id="_1-启动zookeeper" tabindex="-1"><a class="header-anchor" href="#_1-启动zookeeper" aria-hidden="true">#</a> 1 启动Zookeeper</h2><blockquote><p>进入<code>9.77.251.98</code>服务器，通过SSH连接服务器</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入命令目录</span>
<span class="token builtin class-name">cd</span> /opt/app/zookeeper-3.4.12/bin

<span class="token comment"># 启动</span>
./zkServer.sh start

<span class="token comment"># 验证是否启动好,出现下面内容启动成功</span>
<span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> zookeeper

app       <span class="token number">8825</span>  <span class="token number">8191</span>  <span class="token number">0</span> <span class="token number">11</span>:30 pts/0    00:00:00 <span class="token function">grep</span> <span class="token parameter variable">--color</span><span class="token operator">=</span>auto zookeeper
app      <span class="token number">15835</span>     <span class="token number">1</span>  <span class="token number">0</span> Dec14 ?        00:09:03 <span class="token function">java</span> <span class="token parameter variable">-Dzookeeper.log.dir</span><span class="token operator">=</span>. <span class="token parameter variable">-Dzookeeper.root.logger</span><span class="token operator">=</span>INFO,CONSOLE <span class="token parameter variable">-cp</span> /opt/app/zookeeper-3.4.12/bin/<span class="token punctuation">..</span>/build/classes:/opt/app/zookeeper-3.4.12/bin/<span class="token punctuation">..</span>/build/lib/*.jar:/opt/app/zookeeper-3.4.12/bin/<span class="token punctuation">..</span>/lib/slf4j-log4j12-1.7.25.jar:/opt/app/zookeeper-3.4.12/bin/<span class="token punctuation">..</span>/lib/slf4j-api-1.7.25.jar:/opt/app/zookeeper-3.4.12/bin/<span class="token punctuation">..</span>/lib/netty-3.10.6.Final.jar:/opt/app/zookeeper-3.4.12/bin/<span class="token punctuation">..</span>/lib/log4j-1.2.17.jar:/opt/app/zookeeper-3.4.12/bin/<span class="token punctuation">..</span>/lib/jline-0.9.94.jar:/opt/app/zookeeper-3.4.12/bin/<span class="token punctuation">..</span>/lib/audience-annotations-0.5.0.jar:/opt/app/zookeeper-3.4.12/bin/<span class="token punctuation">..</span>/zookeeper-3.4.12.jar:/opt/app/zookeeper-3.4.12/bin/<span class="token punctuation">..</span>/src/java/lib/*.jar:/opt/app/zookeeper-3.4.12/bin/<span class="token punctuation">..</span>/conf: <span class="token parameter variable">-Dcom.sun.management.jmxremote</span> <span class="token parameter variable">-Dcom.sun.management.jmxremote.local.only</span><span class="token operator">=</span>false org.apache.zookeeper.server.quorum.QuorumPeerMain /opt/app/zookeeper-3.4.12/bin/<span class="token punctuation">..</span>/conf/zoo.cfg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-启动redis" tabindex="-1"><a class="header-anchor" href="#_2-启动redis" aria-hidden="true">#</a> 2 启动Redis</h2><blockquote><p>进入<code>9.77.251.98</code>服务器，通过SSH连接服务器</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入命令目录</span>
<span class="token builtin class-name">cd</span> /opt/app/redis-6.2.7/src

<span class="token comment"># 启动</span>
./redis-server <span class="token punctuation">..</span>/redis.conf

<span class="token comment"># 验证是否启动成功,出现下面内容启动成功</span>
<span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> redis
app      <span class="token number">9376</span>  <span class="token number">8191</span>  <span class="token number">0</span> <span class="token number">11</span>:34 pts/0    00:00:00 <span class="token function">grep</span> <span class="token parameter variable">--color</span><span class="token operator">=</span>auto redis
app      <span class="token number">16154</span>     <span class="token number">1</span>  <span class="token number">1</span> Dec14 ?        00:41:44 ./redis-server <span class="token number">127.0</span>.0.1:6856
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-启动应用nginx" tabindex="-1"><a class="header-anchor" href="#_3-启动应用nginx" aria-hidden="true">#</a> 3 启动应用Nginx</h2><blockquote><p>进入<code>9.77.252.170</code>服务器，通过SSH连接服务器</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入命令目录</span>
<span class="token builtin class-name">cd</span> /opt/app/nginx/sbin

<span class="token comment"># 切换到centos用户, 然后会提示输入密码, 此处输入密码在页面上不会显示已输入内容</span>
<span class="token function">su</span> centos

<span class="token comment"># 再切换到root用户</span>
<span class="token function">sudo</span> <span class="token function">su</span> root

<span class="token comment"># 启动</span>
./nginx

<span class="token comment"># 验证是否启动成功, 出现下面内容启动成功</span>
<span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> nginx
root     <span class="token number">14256</span> <span class="token number">13778</span>  <span class="token number">0</span> <span class="token number">14</span>:29 pts/0    00:00:00 <span class="token function">grep</span> <span class="token parameter variable">--color</span><span class="token operator">=</span>auto nginx
root     <span class="token number">16683</span>     <span class="token number">1</span>  <span class="token number">0</span> Dec14 ?        00:00:00 nginx: master process ./nginx
app      <span class="token number">16684</span> <span class="token number">16683</span>  <span class="token number">0</span> Dec14 ?        00:31:22 nginx: worker proces
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-启动移动nginx" tabindex="-1"><a class="header-anchor" href="#_4-启动移动nginx" aria-hidden="true">#</a> 4 启动移动Nginx</h2><blockquote><p>进入<code>9.77.251.214</code>服务器，通过SSH连接服务器</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入命令目录</span>
<span class="token builtin class-name">cd</span> /usr/local/nginx/sbin

<span class="token comment"># 切换到centos用户, 然后会提示输入密码, 此处输入密码在页面上不会显示已输入内容</span>
<span class="token function">su</span> centos

<span class="token comment"># 再切换到root用户</span>
<span class="token function">sudo</span> <span class="token function">su</span> root

<span class="token comment"># 启动</span>
./nginx

<span class="token comment"># 验证是否启动成功, 出现下面内容启动成功</span>
<span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> nginx
root      <span class="token number">9049</span>     <span class="token number">1</span>  <span class="token number">0</span> Dec16 ?        00:00:00 nginx: master process ./nginx <span class="token parameter variable">-c</span> /opt/app/mobile/nginx-7060/nginx-1.13.9/conf/nginx.conf
nobody    <span class="token number">9050</span>  <span class="token number">9049</span>  <span class="token number">0</span> Dec16 ?        00:00:00 nginx: worker process
root     <span class="token number">24223</span> <span class="token number">23901</span>  <span class="token number">0</span> <span class="token number">14</span>:32 pts/0    00:00:00 <span class="token function">grep</span> <span class="token parameter variable">--color</span><span class="token operator">=</span>auto nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),i=[o];function l(c,r){return s(),a("div",null,i)}const d=n(p,[["render",l],["__file","qidongzhongjianjian.html.vue"]]);export{d as default};
