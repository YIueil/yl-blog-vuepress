import{_ as n,o as a,c as s,a as e}from"./app-be491351.js";const t={},l=e(`<h1 id="windows下安装mysql5-7" tabindex="-1"><a class="header-anchor" href="#windows下安装mysql5-7" aria-hidden="true">#</a> Windows下安装MySQL5.7</h1><p>通过官网下载解压版MySQL5.7版本的数据库，进行安装。</p><h2 id="_1-下载包" tabindex="-1"><a class="header-anchor" href="#_1-下载包" aria-hidden="true">#</a> 1 下载包</h2><p>下载地址: https://downloads.mysql.com/archives/community/</p><h2 id="_2-初始化mysql" tabindex="-1"><a class="header-anchor" href="#_2-初始化mysql" aria-hidden="true">#</a> 2 初始化MySQL</h2><h3 id="_2-1-解压mysql包" tabindex="-1"><a class="header-anchor" href="#_2-1-解压mysql包" aria-hidden="true">#</a> 2.1 解压MySQL包</h3><p>我这里的解压路径为: D:\\YIueil\\WorkSpace\\Database\\mysql\\mysql-5.7.44-winx64</p><h3 id="_2-2-解压目录下创建-my-ini" tabindex="-1"><a class="header-anchor" href="#_2-2-解压目录下创建-my-ini" aria-hidden="true">#</a> 2.2 解压目录下创建 my.ini</h3><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">mysqld</span><span class="token punctuation">]</span></span>
<span class="token comment">#端口号</span>
<span class="token key attr-name">port</span><span class="token punctuation">=</span><span class="token value attr-value">3306</span>
<span class="token comment">#mysql-5.7-winx64的路径</span>
<span class="token key attr-name">basedir</span><span class="token punctuation">=</span><span class="token value attr-value">D:\\YIueil\\WorkSpace\\Database\\mysql\\mysql-5.7.44-winx64</span>
<span class="token comment">#mysql-5.7-winx64的路径+\\data</span>
<span class="token key attr-name">datadir</span><span class="token punctuation">=</span><span class="token value attr-value">D:\\YIueil\\WorkSpace\\Database\\mysql\\mysql-5.7.44-winx64\\data</span>
<span class="token comment">#最大连接数</span>
<span class="token key attr-name">max_connections</span><span class="token punctuation">=</span><span class="token value attr-value">200</span>
<span class="token comment">#编码</span>
<span class="token key attr-name">character-set-server</span><span class="token punctuation">=</span><span class="token value attr-value">utf8</span>
<span class="token key attr-name">default-storage-engine</span><span class="token punctuation">=</span><span class="token value attr-value">INNODB</span>
<span class="token key attr-name">sql_mode</span><span class="token punctuation">=</span><span class="token value attr-value">NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES</span>
<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">mysql</span><span class="token punctuation">]</span></span>
<span class="token comment">#编码</span>
<span class="token key attr-name">default-character-set</span><span class="token punctuation">=</span><span class="token value attr-value">utf8</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-执行命令初始化" tabindex="-1"><a class="header-anchor" href="#_2-3-执行命令初始化" aria-hidden="true">#</a> 2.3 执行命令初始化</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mysqld <span class="token parameter variable">-install</span> mysql5 <span class="token comment"># (可选)安装服务 mysql5为服务名</span>

mysqld <span class="token parameter variable">--initialize</span> <span class="token comment"># 使用ini初始化数据库</span>

net start mysql5 <span class="token comment"># (可选)启动服务</span>
mysqld <span class="token comment"># 以非守护进程启动mysql服务, 关闭cmd就会终止服务。</span>

mysql <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span> <span class="token comment"># 连接localhost 密码在data中的.err文件中</span>

ALTER <span class="token environment constant">USER</span> <span class="token string">&#39;root&#39;</span>@<span class="token string">&#39;localhost&#39;</span> IDENTIFIED WITH mysql_native_password BY <span class="token string">&#39;root&#39;</span><span class="token punctuation">;</span> <span class="token comment"># 将root用户密码设置为root</span>

GRANT ALL PRIVILEGES ON *.* TO <span class="token string">&#39;root&#39;</span>@<span class="token string">&#39;%&#39;</span> IDENTIFIED BY <span class="token string">&#39;root&#39;</span> WITH GRANT OPTION<span class="token punctuation">;</span> <span class="token comment"># 设置root用户可远程连接访问</span>

FLUSH PRIVILEGES<span class="token punctuation">;</span> <span class="token comment"># 刷新权限</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),i=[l];function c(o,p){return a(),s("div",null,i)}const d=n(t,[["render",c],["__file","WindowsxiaanzhuangMySQL5.7.html.vue"]]);export{d as default};
