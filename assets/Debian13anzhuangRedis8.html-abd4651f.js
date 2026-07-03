import{_ as s,o as n,c as a,a as e}from"./app-18841cf9.js";const i={},t=e(`<h1 id="debain13安装redis8" tabindex="-1"><a class="header-anchor" href="#debain13安装redis8" aria-hidden="true">#</a> Debain13安装Redis8</h1><h3 id="_1-install-required-dependencies" tabindex="-1"><a class="header-anchor" href="#_1-install-required-dependencies" aria-hidden="true">#</a> 1 Install required dependencies</h3><p>Update your package lists and install the necessary development tools and libraries:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">apt-get</span> update
<span class="token function">apt-get</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token function">sudo</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> --no-install-recommends ca-certificates <span class="token function">wget</span> dpkg-dev gcc g++ libc6-dev libssl-dev <span class="token function">make</span> <span class="token function">git</span> cmake python3 python3-pip python3-venv python3-dev <span class="token function">unzip</span> <span class="token function">rsync</span> clang automake autoconf libtool
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-download-the-redis-source" tabindex="-1"><a class="header-anchor" href="#_2-download-the-redis-source" aria-hidden="true">#</a> 2 Download the Redis source</h3><p>Download a specific version of the Redis source code archive from GitHub. Replace <code>&lt;version&gt;</code> with the Redis version, for example: <code>8.0.0</code>.</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /usr/src
<span class="token function">wget</span> <span class="token parameter variable">-O</span> redis-<span class="token operator">&lt;</span>version<span class="token operator">&gt;</span>.tar.gz https://github.com/redis/redis/archive/refs/tags/<span class="token operator">&lt;</span>version<span class="token operator">&gt;</span>.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-extract-the-source-archive" tabindex="-1"><a class="header-anchor" href="#_3-extract-the-source-archive" aria-hidden="true">#</a> 3 Extract the source archive</h3><p>Create a directory for the source code and extract the contents into it:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /usr/src
<span class="token function">tar</span> xvf redis-<span class="token operator">&lt;</span>version<span class="token operator">&gt;</span>.tar.gz
<span class="token function">rm</span> redis-<span class="token operator">&lt;</span>version<span class="token operator">&gt;</span>.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-build-redis" tabindex="-1"><a class="header-anchor" href="#_4-build-redis" aria-hidden="true">#</a> 4 Build Redis</h3><p>Set the necessary environment variables and build Redis:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /usr/src/redis-<span class="token operator">&lt;</span>version<span class="token operator">&gt;</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">BUILD_TLS</span><span class="token operator">=</span>yes <span class="token assign-left variable">BUILD_WITH_MODULES</span><span class="token operator">=</span>yes <span class="token assign-left variable">INSTALL_RUST_TOOLCHAIN</span><span class="token operator">=</span>yes
<span class="token function">make</span> <span class="token parameter variable">-j</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span>nproc<span class="token variable">)</span></span>&quot;</span> all
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-run-redis" tabindex="-1"><a class="header-anchor" href="#_5-run-redis" aria-hidden="true">#</a> 5 Run Redis</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /usr/src/redis-<span class="token operator">&lt;</span>version<span class="token operator">&gt;</span>
./src/redis-server redis-full.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-注册账号" tabindex="-1"><a class="header-anchor" href="#_6-注册账号" aria-hidden="true">#</a> 6 注册账号</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建 redis 用户（不登录、无家目录）</span>
<span class="token function">sudo</span> <span class="token function">useradd</span> <span class="token parameter variable">-r</span> <span class="token parameter variable">-s</span> /usr/sbin/nologin redis

<span class="token comment"># 赋予源码目录执行权限（或移动到标准路径）</span>
<span class="token function">sudo</span> <span class="token function">chown</span> <span class="token parameter variable">-R</span> redis:redis /usr/src/redis-8.8.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-服务配置" tabindex="-1"><a class="header-anchor" href="#_7-服务配置" aria-hidden="true">#</a> 7 服务配置</h3><p>新增redis服务配置：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 编辑服务配置</span>
<span class="token function">sudo</span> <span class="token function">nano</span> /etc/systemd/system/redis.service

<span class="token comment"># 日志目录授权</span>
<span class="token function">sudo</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /var/lib/redis /var/log/redis
<span class="token function">sudo</span> <span class="token function">chown</span> redis:redis /var/lib/redis /var/log/redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>具体配置内容：</p><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Unit</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">Description</span><span class="token punctuation">=</span><span class="token value attr-value">Redis 8.8.0 with Modules</span>
<span class="token key attr-name">Documentation</span><span class="token punctuation">=</span><span class="token value attr-value">https://redis.io/docs</span>
<span class="token key attr-name">After</span><span class="token punctuation">=</span><span class="token value attr-value">network.target</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Service</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">Type</span><span class="token punctuation">=</span><span class="token value attr-value">simple</span>
<span class="token key attr-name">User</span><span class="token punctuation">=</span><span class="token value attr-value">redis</span>
<span class="token key attr-name">Group</span><span class="token punctuation">=</span><span class="token value attr-value">redis</span>
<span class="token key attr-name">WorkingDirectory</span><span class="token punctuation">=</span><span class="token value attr-value">/usr/src/redis-8.8.0</span>
<span class="token key attr-name">RuntimeDirectory</span><span class="token punctuation">=</span><span class="token value attr-value">redis</span>
<span class="token key attr-name">RuntimeDirectoryMode</span><span class="token punctuation">=</span><span class="token value attr-value">0755</span>

<span class="token comment"># 启动命令：使用绝对路径 + 绝对配置文件路径</span>
<span class="token key attr-name">ExecStart</span><span class="token punctuation">=</span><span class="token value attr-value">/usr/src/redis-8.8.0/src/redis-server /usr/src/redis-8.8.0/redis-full.conf</span>
<span class="token key attr-name">ExecReload</span><span class="token punctuation">=</span><span class="token value attr-value">/bin/kill -USR2 $MAINPID</span>

<span class="token comment"># 重启策略</span>
<span class="token key attr-name">Restart</span><span class="token punctuation">=</span><span class="token value attr-value">on-failure</span>
<span class="token key attr-name">RestartSec</span><span class="token punctuation">=</span><span class="token value attr-value">3s</span>

<span class="token comment"># 资源限制（生产环境关键）</span>
<span class="token key attr-name">LimitNOFILE</span><span class="token punctuation">=</span><span class="token value attr-value">65535</span>
<span class="token key attr-name">LimitNPROC</span><span class="token punctuation">=</span><span class="token value attr-value">4096</span>
<span class="token key attr-name">LimitCORE</span><span class="token punctuation">=</span><span class="token value attr-value">infinity</span>

<span class="token comment"># 安全加固</span>
<span class="token key attr-name">NoNewPrivileges</span><span class="token punctuation">=</span><span class="token value attr-value">yes</span>
<span class="token key attr-name">ProtectSystem</span><span class="token punctuation">=</span><span class="token value attr-value">strict</span>
<span class="token key attr-name">ProtectHome</span><span class="token punctuation">=</span><span class="token value attr-value">yes</span>
<span class="token key attr-name">ReadWritePaths</span><span class="token punctuation">=</span><span class="token value attr-value">/usr/src/redis-8.8.0 /var/log/redis /var/lib/redis</span>
<span class="token key attr-name">PrivateTmp</span><span class="token punctuation">=</span><span class="token value attr-value">yes</span>

<span class="token comment"># 日志输出（自动对接 journalctl）</span>
<span class="token key attr-name">StandardOutput</span><span class="token punctuation">=</span><span class="token value attr-value">journal</span>
<span class="token key attr-name">StandardError</span><span class="token punctuation">=</span><span class="token value attr-value">journal</span>
<span class="token key attr-name">SyslogIdentifier</span><span class="token punctuation">=</span><span class="token value attr-value">redis</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Install</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">WantedBy</span><span class="token punctuation">=</span><span class="token value attr-value">multi-user.target</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-redis配置" tabindex="-1"><a class="header-anchor" href="#_8-redis配置" aria-hidden="true">#</a> 8 Redis配置</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 支持远程访问 监听所有 IPv4 和 IPv6 接口（支持远程访问）</span>
<span class="token builtin class-name">bind</span> <span class="token number">0.0</span>.0.0 ::

<span class="token comment"># 修改端口</span>
port <span class="token number">16379</span>

<span class="token comment"># 保持保护模式开启（配合密码使用，未认证时拒绝非回环请求）</span>
protected-mode <span class="token function">yes</span>

<span class="token comment"># 设置强密码（务必替换为自定义密码，12位以上含大小写+数字+符号）</span>
requirepass YourStrongPassword2026<span class="token operator">!</span>

<span class="token comment"># 若原配置有 pidfile 且硬编码了旧端口，请更新或注释</span>
<span class="token comment"># pidfile /run/redis/redis.pid</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-服务管理" tabindex="-1"><a class="header-anchor" href="#_9-服务管理" aria-hidden="true">#</a> 9 服务管理</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 重载 systemd 配置</span>
<span class="token function">sudo</span> systemctl daemon-reload

<span class="token comment"># 2. 启动服务</span>
<span class="token function">sudo</span> systemctl start redis

<span class="token comment"># 3. 设置开机自启</span>
<span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> redis

<span class="token comment"># 4. 查看状态</span>
<span class="token function">sudo</span> systemctl status redis

<span class="token comment"># 5. 实时查看日志</span>
<span class="token function">sudo</span> journalctl <span class="token parameter variable">-u</span> redis <span class="token parameter variable">-f</span> --no-pager
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,26),l=[t];function c(r,p){return n(),a("div",null,l)}const o=s(i,[["render",c],["__file","Debian13anzhuangRedis8.html.vue"]]);export{o as default};
