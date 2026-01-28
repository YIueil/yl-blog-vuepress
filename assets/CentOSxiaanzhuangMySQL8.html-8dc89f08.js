import{_ as a,o as n,c as s,a as e}from"./app-be491351.js";const t={},l=e(`<h1 id="centos下安装mysql8" tabindex="-1"><a class="header-anchor" href="#centos下安装mysql8" aria-hidden="true">#</a> CentOS下安装MySQL8</h1><h2 id="_1-下载mysql包" tabindex="-1"><a class="header-anchor" href="#_1-下载mysql包" aria-hidden="true">#</a> 1 下载mysql包</h2><p>选择最新版本的mysql8的压缩包进行下载: https://dev.mysql.com/downloads/mysql/</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 进入应用安装目录</span>
<span class="token builtin class-name">cd</span> /usr/local

<span class="token function">wget</span> https://cdn.mysql.com//Downloads/MySQL-8.0/mysql-8.0.32-linux-glibc2.12-x86_64.tar.xz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_2-解压缩和重命名" tabindex="-1"><a class="header-anchor" href="#_2-解压缩和重命名" aria-hidden="true">#</a> 2 解压缩和重命名</h1><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 解压缩</span>
<span class="token comment"># 针对tar.xz -xvJf</span>
<span class="token comment"># 针对tar.gz -xcvf</span>
<span class="token function">tar</span> <span class="token parameter variable">-xvJf</span> mysql-8.0.32-linux-glibc2.12-x86_64.tar.xz
<span class="token comment"># 重命名</span>
<span class="token function">mv</span> mysql-8.0.32-linux-glibc2.12-x86_64.tar.xz mysql8
<span class="token comment"># 删除压缩包</span>
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> mysql-8.0.32-linux-glibc2.12-x86_64.tar.xz
<span class="token comment"># 进入主目录</span>
<span class="token builtin class-name">cd</span> mysql8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_3-创建数据目录、用户组" tabindex="-1"><a class="header-anchor" href="#_3-创建数据目录、用户组" aria-hidden="true">#</a> 3 创建数据目录、用户组</h1><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建环境变量(临时)</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span>:/usr/local/mysql8/bin
<span class="token comment"># 创建数据目录</span>
<span class="token function">mkdir</span> data
<span class="token comment"># 创建mysql用户和组</span>
<span class="token function">groupadd</span> mysql
<span class="token function">useradd</span> <span class="token parameter variable">-g</span> mysql mysql
<span class="token comment"># 目录所有权分配</span>
<span class="token function">chown</span> <span class="token parameter variable">-R</span> mysql.mysql /usr/local/mysql8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_4、初始化数据库" tabindex="-1"><a class="header-anchor" href="#_4、初始化数据库" aria-hidden="true">#</a> 4、初始化数据库</h1><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入bin目录</span>
<span class="token builtin class-name">cd</span> bin
<span class="token comment"># 在 /usr/local/etc/ 下创建 my.cnf 配置文件</span>
<span class="token function">vim</span> /usr/local/etc/my.cnf

<span class="token comment"># 执行数据库初始化</span>
mysqld --defaults-file<span class="token operator">=</span>/usr/local/etc/my.cnf <span class="token parameter variable">--basedir</span><span class="token operator">=</span>/usr/local/mysql8 <span class="token parameter variable">--datadir</span><span class="token operator">=</span>/usr/local/mysql8/data/mysql <span class="token parameter variable">--user</span><span class="token operator">=</span>mysql --initialize-insecure
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>my.cnf</p><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">mysql</span><span class="token punctuation">]</span></span>
<span class="token comment">#默认字符集</span>
<span class="token key attr-name">default-character-set</span><span class="token punctuation">=</span><span class="token value attr-value">utf8mb4</span>
<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">client</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">port</span><span class="token punctuation">=</span><span class="token value attr-value">3306</span>
<span class="token key attr-name">socket</span><span class="token punctuation">=</span><span class="token value attr-value">/tmp/mysql.sock</span>
<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">mysqld</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">port</span><span class="token punctuation">=</span><span class="token value attr-value">3306</span>
<span class="token key attr-name">server-id</span><span class="token punctuation">=</span><span class="token value attr-value">3306</span>
<span class="token key attr-name">user</span><span class="token punctuation">=</span><span class="token value attr-value">mysql</span>
<span class="token key attr-name">socket</span><span class="token punctuation">=</span><span class="token value attr-value">/tmp/mysql.sock</span>
<span class="token comment">#安装目录</span>
<span class="token key attr-name">basedir</span><span class="token punctuation">=</span><span class="token value attr-value">/usr/local/mysql8</span>
<span class="token comment">#数据存放目录</span>
<span class="token key attr-name">datadir</span><span class="token punctuation">=</span><span class="token value attr-value">/usr/local/mysql8/data/mysql</span>
<span class="token key attr-name">log-bin</span><span class="token punctuation">=</span><span class="token value attr-value">/usr/local/mysql8/data/mysql/mysql-bin</span>
<span class="token key attr-name">innodb_data_home_dir</span><span class="token punctuation">=</span><span class="token value attr-value">/usr/local/mysql8/data/mysql</span>
<span class="token key attr-name">innodb_log_group_home_dir</span><span class="token punctuation">=</span><span class="token value attr-value">/usr/local/mysql8/data/mysql</span>
<span class="token comment">#日志及进程数据的存放目录</span>
<span class="token key attr-name">log-error</span><span class="token punctuation">=</span><span class="token value attr-value">/usr/local/mysql8/data/mysql/mysql.log</span>
<span class="token key attr-name">pid-file</span><span class="token punctuation">=</span><span class="token value attr-value">/usr/local/mysql8/data/mysql/mysql.pid</span>
<span class="token comment">#服务端字符集</span>
<span class="token key attr-name">character-set-server</span><span class="token punctuation">=</span><span class="token value attr-value">utf8mb4</span>
<span class="token key attr-name">lower_case_table_names</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token key attr-name">autocommit</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token comment">#####以上涉及文件夹名称，注意修改</span>
skip-external-locking
<span class="token key attr-name">key_buffer_size</span><span class="token punctuation">=</span><span class="token value attr-value">256M</span>
<span class="token key attr-name">max_allowed_packet</span><span class="token punctuation">=</span><span class="token value attr-value">1M</span>
<span class="token key attr-name">table_open_cache</span><span class="token punctuation">=</span><span class="token value attr-value">1024</span>
<span class="token key attr-name">sort_buffer_size</span><span class="token punctuation">=</span><span class="token value attr-value">4M</span>
<span class="token key attr-name">net_buffer_length</span><span class="token punctuation">=</span><span class="token value attr-value">8K</span>
<span class="token key attr-name">read_buffer_size</span><span class="token punctuation">=</span><span class="token value attr-value">4M</span>
<span class="token key attr-name">read_rnd_buffer_size</span><span class="token punctuation">=</span><span class="token value attr-value">512K</span>
<span class="token key attr-name">myisam_sort_buffer_size</span><span class="token punctuation">=</span><span class="token value attr-value">64M</span>
<span class="token key attr-name">thread_cache_size</span><span class="token punctuation">=</span><span class="token value attr-value">128</span>
<span class="token comment">#query_cache_size=128M</span>
<span class="token key attr-name">tmp_table_size</span><span class="token punctuation">=</span><span class="token value attr-value">128M</span>
<span class="token key attr-name">explicit_defaults_for_timestamp</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>
<span class="token key attr-name">max_connections</span><span class="token punctuation">=</span><span class="token value attr-value">500</span>
<span class="token key attr-name">max_connect_errors</span><span class="token punctuation">=</span><span class="token value attr-value">100</span>
<span class="token key attr-name">open_files_limit</span><span class="token punctuation">=</span><span class="token value attr-value">65535</span>
<span class="token key attr-name">binlog_format</span><span class="token punctuation">=</span><span class="token value attr-value">mixed</span>
<span class="token key attr-name">binlog_expire_logs_seconds</span><span class="token punctuation">=</span><span class="token value attr-value">864000</span>
<span class="token comment">#创建表时使用的默认存储引擎</span>
<span class="token key attr-name">default_storage_engine</span><span class="token punctuation">=</span><span class="token value attr-value">InnoDB</span>
<span class="token key attr-name">innodb_data_file_path</span><span class="token punctuation">=</span><span class="token value attr-value">ibdata1:10M:autoextend</span>
<span class="token key attr-name">innodb_buffer_pool_size</span><span class="token punctuation">=</span><span class="token value attr-value">1024M</span>
<span class="token key attr-name">innodb_log_file_size</span><span class="token punctuation">=</span><span class="token value attr-value">256M</span>
<span class="token key attr-name">innodb_log_buffer_size</span><span class="token punctuation">=</span><span class="token value attr-value">8M</span>
<span class="token key attr-name">innodb_flush_log_at_trx_commit</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token key attr-name">innodb_lock_wait_timeout</span><span class="token punctuation">=</span><span class="token value attr-value">50</span>
<span class="token key attr-name">transaction-isolation</span><span class="token punctuation">=</span><span class="token value attr-value">READ-COMMITTED</span>
<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">mysqldump</span><span class="token punctuation">]</span></span>
quick
<span class="token key attr-name">max_allowed_packet</span><span class="token punctuation">=</span><span class="token value attr-value">16M</span>
<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">myisamchk</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">key_buffer_size</span><span class="token punctuation">=</span><span class="token value attr-value">256M</span>
<span class="token key attr-name">sort_buffer_size</span><span class="token punctuation">=</span><span class="token value attr-value">4M</span>
<span class="token key attr-name">read_buffer</span><span class="token punctuation">=</span><span class="token value attr-value">2M</span>
<span class="token key attr-name">write_buffer</span><span class="token punctuation">=</span><span class="token value attr-value">2M</span>
<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">mysqlhotcopy</span><span class="token punctuation">]</span></span>
interactive-timeout
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_5-启动服务" tabindex="-1"><a class="header-anchor" href="#_5-启动服务" aria-hidden="true">#</a> 5 启动服务</h1><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mysql <span class="token parameter variable">-u</span> root --skip-password
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,14),i=[l];function c(p,o){return n(),s("div",null,i)}const r=a(t,[["render",c],["__file","CentOSxiaanzhuangMySQL8.html.vue"]]);export{r as default};
