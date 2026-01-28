import{_ as n,o as s,c as a,a as e}from"./app-be491351.js";const i={},c=e(`<h1 id="centos7安装redis7" tabindex="-1"><a class="header-anchor" href="#centos7安装redis7" aria-hidden="true">#</a> CentOS7安装Redis7</h1><h2 id="_1-下载安装包" tabindex="-1"><a class="header-anchor" href="#_1-下载安装包" aria-hidden="true">#</a> 1 下载安装包</h2><blockquote><p>https://redis.io/download/</p></blockquote><h2 id="_2-gcc编译环境安装" tabindex="-1"><a class="header-anchor" href="#_2-gcc编译环境安装" aria-hidden="true">#</a> 2 gcc编译环境安装</h2><blockquote><p>使用 <code>gcc --version</code>命令来查看是否具备环境否则需要自行安装!</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@iZ2vcf1lidtliymh8xfkzlZ bin<span class="token punctuation">]</span><span class="token comment"># gcc --version</span>
gcc <span class="token punctuation">(</span>GCC<span class="token punctuation">)</span> <span class="token number">4.8</span>.5 <span class="token number">20150623</span> <span class="token punctuation">(</span>Red Hat <span class="token number">4.8</span>.5-11<span class="token punctuation">)</span>
Copyright <span class="token punctuation">(</span>C<span class="token punctuation">)</span> <span class="token number">2015</span> Free Software Foundation, Inc.
This is <span class="token function">free</span> software<span class="token punctuation">;</span> see the <span class="token builtin class-name">source</span> <span class="token keyword">for</span> copying conditions.  There is NO
warranty<span class="token punctuation">;</span> not even <span class="token keyword">for</span> MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>使用<code>yum</code>快速安装gcc</p><p><code>yum -y install gcc</code></p><p><code>yum -y install gcc-c++</code></p></blockquote><h2 id="_3-make-make-install" tabindex="-1"><a class="header-anchor" href="#_3-make-make-install" aria-hidden="true">#</a> 3 make &amp;&amp; make install</h2><blockquote><p>安装完成后, 会在<code>/usr/local/bin</code>目录下生成redis相关的可执行文件</p></blockquote><p><img src="https://s2.loli.net/2024/03/08/8aYOUcQ5dF3ukfg.png" alt="8aYOUcQ5dF3ukfg.png"></p><h2 id="_4-前台启动" tabindex="-1"><a class="header-anchor" href="#_4-前台启动" aria-hidden="true">#</a> 4 前台启动</h2><blockquote><p>这种方式启动后会随着终端关闭而关闭, 不常用, 仅做安装是否成功的测试!</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /usr/local/bin
./redis-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://s2.loli.net/2024/03/08/PXEg9MutCGwzpSs.png" alt="PXEg9MutCGwzpSs.png"></p><h2 id="_5-修改配置-端口、远程、守护进程启动" tabindex="-1"><a class="header-anchor" href="#_5-修改配置-端口、远程、守护进程启动" aria-hidden="true">#</a> 5 修改配置(端口、远程、守护进程启动)</h2><blockquote><p>自带的配置在解压目录下, 建议不动. 使用<code>cp redis.conf /etc</code>拷贝修改后使用</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 允许任何主机连接、访问</span>
<span class="token builtin class-name">bind</span> <span class="token number">127.0</span>.0.1 改为 <span class="token builtin class-name">bind</span> <span class="token number">0.0</span>.0.0
 
<span class="token comment"># 关闭保护模式</span>
protected-mode <span class="token function">yes</span> 改为 protected-mode no
 
<span class="token comment"># 允许启动后在后台运行，即关闭命令行窗口后仍能运行</span>
daemonize no 改为 daemonize <span class="token function">yes</span>

<span class="token comment"># 端口修改</span>
port <span class="token number">6379</span> 改为 port <span class="token number">16379</span>

<span class="token comment"># 可选, 设置密码</span>
requirepass <span class="token string">&#39;youpassword&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 以守护进程启动</span>
<span class="token builtin class-name">cd</span> /usr/local/bin
./redis-server /etc/redis.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-工具连接测试" tabindex="-1"><a class="header-anchor" href="#_6-工具连接测试" aria-hidden="true">#</a> 6 工具连接测试</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># redis-cli连接测试</span>
<span class="token punctuation">[</span>root@iZ2vcf1lidtliymh8xfkzlZ bin<span class="token punctuation">]</span><span class="token comment"># redis-cli -p 65431 ping</span>
PONG
<span class="token comment"># redis-cli连接指定密码</span>
<span class="token punctuation">[</span>root@iZ2vcf1lidtliymh8xfkzlZ bin<span class="token punctuation">]</span><span class="token comment"># redis-cli -p 6856 -a &quot;Gtx@349jk7&quot; ping</span>
PONG

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="外部工具连接测试" tabindex="-1"><a class="header-anchor" href="#外部工具连接测试" aria-hidden="true">#</a> 外部工具连接测试</h3><p><img src="https://s2.loli.net/2024/03/08/eBFXNLiRuQVrbhT.png" alt="eBFXNLiRuQVrbhT.png"></p><h2 id="_7-redis-cli的常用命令" tabindex="-1"><a class="header-anchor" href="#_7-redis-cli的常用命令" aria-hidden="true">#</a> 7 redis-cli的常用命令</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 连接</span>
redis-cli <span class="token parameter variable">-p</span> <span class="token number">16379</span> <span class="token parameter variable">-a</span> password

<span class="token comment"># 停止服务</span>
redis-cli <span class="token parameter variable">-p</span> <span class="token number">16379</span> <span class="token function">shutdown</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,24),l=[c];function d(t,o){return s(),a("div",null,l)}const p=n(i,[["render",d],["__file","CentOS7anzhuangRedis7.html.vue"]]);export{p as default};
