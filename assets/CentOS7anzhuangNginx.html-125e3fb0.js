import{_ as n,o as a,c as s,d as e}from"./app-4023f1b2.js";const i={},t=e(`<h1 id="centos7安装nginx" tabindex="-1"><a class="header-anchor" href="#centos7安装nginx" aria-hidden="true">#</a> CentOS7安装Nginx</h1><h2 id="使用root用户安装前置依赖" tabindex="-1"><a class="header-anchor" href="#使用root用户安装前置依赖" aria-hidden="true">#</a> 使用root用户安装前置依赖</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token parameter variable">-y</span> <span class="token function">install</span> gcc <span class="token function">wget</span> gcc-c++ automake autoconf libtool libxml2-devel libxslt-devel perl-devel perl-ExtUtils-Embed pcre-devel openssl-devel
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="下载解压包" tabindex="-1"><a class="header-anchor" href="#下载解压包" aria-hidden="true">#</a> 下载解压包</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> http://nginx.org/download/nginx-1.24.0.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="解压" tabindex="-1"><a class="header-anchor" href="#解压" aria-hidden="true">#</a> 解压</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> nginx-1.24.0.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="进入解压目录-执行配置命令" tabindex="-1"><a class="header-anchor" href="#进入解压目录-执行配置命令" aria-hidden="true">#</a> 进入解压目录， 执行配置命令</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 配置nginx配置 如果是sbin想要放到解压目录(如app用户没有/usr/local目录权限时), 配置 /home/app/nginx/nginx-1.24.0 目录</span>
<span class="token comment"># 否则可以不配置, 默认将使用 /usr/local/nginx 目录</span>
./configure <span class="token punctuation">\\</span>
<span class="token parameter variable">--prefix</span><span class="token operator">=</span>/home/app/nginx/nginx-1.24.0 <span class="token punctuation">\\</span>
--sbin-path<span class="token operator">=</span>/home/app/nginx/nginx-1.24.0/sbin/nginx <span class="token punctuation">\\</span>
--conf-path<span class="token operator">=</span>/home/app/nginx/nginx-1.24.0/nginx.conf <span class="token punctuation">\\</span>
--error-log-path<span class="token operator">=</span>/home/app/nginx/nginx-1.24.0/logs/error.log <span class="token punctuation">\\</span>
--http-log-path<span class="token operator">=</span>/home/app/nginx/nginx-1.24.0/logs/access.log <span class="token punctuation">\\</span>
--pid-path<span class="token operator">=</span>/home/app/nginx/nginx-1.24.0/run/nginx.pid <span class="token punctuation">\\</span>
--lock-path<span class="token operator">=</span>/home/app/nginx/nginx-1.24.0/run/nginx.lock <span class="token punctuation">\\</span>
--http-client-body-temp-path<span class="token operator">=</span>/home/app/nginx/nginx-1.24.0/tmp/nginx/client <span class="token punctuation">\\</span>
--http-proxy-temp-path<span class="token operator">=</span>/home/app/nginx/nginx-1.24.0/nginx/proxy <span class="token punctuation">\\</span>
--http-fastcgi-temp-path<span class="token operator">=</span>/home/app/nginx/nginx-1.24.0/nginx/fcgi <span class="token punctuation">\\</span>
--http-uwsgi-temp-path<span class="token operator">=</span>/home/app/nginx/nginx-1.24.0/nginx/uwsgi <span class="token punctuation">\\</span>
--http-scgi-temp-path<span class="token operator">=</span>/home/app/nginx/nginx-1.24.0/nginx/scgi <span class="token punctuation">\\</span>
<span class="token parameter variable">--user</span><span class="token operator">=</span>nginx <span class="token punctuation">\\</span>
<span class="token parameter variable">--group</span><span class="token operator">=</span>nginx <span class="token punctuation">\\</span>
--with-pcre <span class="token punctuation">\\</span>
--with-http_v2_module <span class="token punctuation">\\</span>
--with-http_ssl_module <span class="token punctuation">\\</span>
--with-http_realip_module <span class="token punctuation">\\</span>
--with-http_addition_module <span class="token punctuation">\\</span>
--with-http_sub_module <span class="token punctuation">\\</span>
--with-http_dav_module <span class="token punctuation">\\</span>
--with-http_flv_module <span class="token punctuation">\\</span>
--with-http_mp4_module <span class="token punctuation">\\</span>
--with-http_gunzip_module <span class="token punctuation">\\</span>
--with-http_gzip_static_module <span class="token punctuation">\\</span>
--with-http_random_index_module <span class="token punctuation">\\</span>
--with-http_secure_link_module <span class="token punctuation">\\</span>
--with-http_stub_status_module <span class="token punctuation">\\</span>
--with-http_auth_request_module <span class="token punctuation">\\</span>
--with-mail <span class="token punctuation">\\</span>
--with-mail_ssl_module <span class="token punctuation">\\</span>
--with-file-aio <span class="token punctuation">\\</span>
--with-http_v2_module <span class="token punctuation">\\</span>
--with-threads <span class="token punctuation">\\</span>
--with-stream <span class="token punctuation">\\</span>
--with-stream_ssl_module
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="执行安装命令" tabindex="-1"><a class="header-anchor" href="#执行安装命令" aria-hidden="true">#</a> 执行安装命令</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">make</span> <span class="token operator">&amp;</span> <span class="token function">make</span> <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>安装完成后, 进入sbin目录 <code>./nginx</code> 执行启动即可</p></blockquote>`,12),p=[t];function l(o,c){return a(),s("div",null,p)}const u=n(i,[["render",l],["__file","CentOS7anzhuangNginx.html.vue"]]);export{u as default};
