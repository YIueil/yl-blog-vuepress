import{_ as n,o as s,c as a,a as e}from"./app-be491351.js";const i={},p=e(`<h1 id="增加应用节点步骤" tabindex="-1"><a class="header-anchor" href="#增加应用节点步骤" aria-hidden="true">#</a> 增加应用节点步骤</h1><h2 id="增加应用节点步骤-1" tabindex="-1"><a class="header-anchor" href="#增加应用节点步骤-1" aria-hidden="true">#</a> 增加应用节点步骤</h2><h3 id="_1-创建用户" tabindex="-1"><a class="header-anchor" href="#_1-创建用户" aria-hidden="true">#</a> 1 创建用户</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 修改主机名称</span>
hostnamectl set-hostname ytgz-27

<span class="token function">useradd</span> app
<span class="token comment"># 修改密码</span>
<span class="token function">passwd</span> app

<span class="token comment"># 添加目录 授权给app</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /opt/app/ytgz
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /opt/file
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /opt/archive

<span class="token function">chown</span> <span class="token parameter variable">-R</span> app:app /opt/app/ytgz
<span class="token function">chown</span> <span class="token parameter variable">-R</span> app:app /opt/file
<span class="token function">chown</span> <span class="token parameter variable">-R</span> app:app /opt/archive

<span class="token comment"># 系统应用时间校准</span>
<span class="token function">date</span> <span class="token parameter variable">-s</span> <span class="token string">&quot;2012-05-23 01:01:01&quot;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-安装jdk1-8" tabindex="-1"><a class="header-anchor" href="#_2-安装jdk1-8" aria-hidden="true">#</a> 2 安装JDK1.8</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 使用 RPM 命令安装</span>
<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> jdk-8u202-linux-x64.rpm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-安装字体" tabindex="-1"><a class="header-anchor" href="#_3-安装字体" aria-hidden="true">#</a> 3 安装字体</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装字体管理依赖</span>
yum <span class="token parameter variable">-y</span> localinstall *.rpm

<span class="token comment"># 复制字体</span>
<span class="token function">cp</span> <span class="token parameter variable">-r</span> winfonts /usr/share/fonts

<span class="token comment"># 刷新字体</span>
<span class="token function">sudo</span> fc-cache –fv

<span class="token comment"># 查看安装的字体</span>
fc-list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-挂载磁盘" tabindex="-1"><a class="header-anchor" href="#_4-挂载磁盘" aria-hidden="true">#</a> 4 挂载磁盘</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 挂载</span>
<span class="token function">mount</span> <span class="token parameter variable">-t</span> cifs <span class="token parameter variable">-o</span> <span class="token assign-left variable">iocharset</span><span class="token operator">=</span>utf8,username<span class="token operator">=</span>gt_ytgz,password<span class="token operator">=</span>yn_299792458,vers<span class="token operator">=</span><span class="token number">1.0</span>,rw,uid<span class="token operator">=</span>app,gid<span class="token operator">=</span>app //9.77.254.117/gt_ytgz /opt/file

<span class="token function">mount</span> <span class="token parameter variable">-t</span> cifs <span class="token parameter variable">-o</span> <span class="token assign-left variable">iocharset</span><span class="token operator">=</span>utf8,username<span class="token operator">=</span>gt_yndzzw,password<span class="token operator">=</span>yn_299792458,vers<span class="token operator">=</span><span class="token number">1.0</span>,rw,uid<span class="token operator">=</span>app,gid<span class="token operator">=</span>app //9.77.254.117/archive /opt/archive

<span class="token comment"># 查看磁盘信息</span>
<span class="token punctuation">[</span>root@ytgz-152 <span class="token number">2</span>.党政字体<span class="token punctuation">]</span><span class="token comment"># df -h</span>
Filesystem              Size  Used Avail Use% Mounted on
devtmpfs                <span class="token number">7</span>.8G     <span class="token number">0</span>  <span class="token number">7</span>.8G   <span class="token number">0</span>% /dev
tmpfs                   <span class="token number">7</span>.8G     <span class="token number">0</span>  <span class="token number">7</span>.8G   <span class="token number">0</span>% /dev/shm
tmpfs                   <span class="token number">7</span>.8G   17M  <span class="token number">7</span>.8G   <span class="token number">1</span>% /run
tmpfs                   <span class="token number">7</span>.8G     <span class="token number">0</span>  <span class="token number">7</span>.8G   <span class="token number">0</span>% /sys/fs/cgroup
/dev/vda1               100G  <span class="token number">2</span>.7G   98G   <span class="token number">3</span>% /
tmpfs                   <span class="token number">1</span>.6G     <span class="token number">0</span>  <span class="token number">1</span>.6G   <span class="token number">0</span>% /run/user/0
tmpfs                   <span class="token number">1</span>.6G     <span class="token number">0</span>  <span class="token number">1</span>.6G   <span class="token number">0</span>% /run/user/1001
//9.77.254.117/gt_ytgz  256T  145T  112T  <span class="token number">57</span>% /opt/file

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-启动应用" tabindex="-1"><a class="header-anchor" href="#_5-启动应用" aria-hidden="true">#</a> 5 启动应用</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /opt/app/ytgz/apache-tomcat-9.0.106-app-7150/bin

<span class="token comment"># 启动</span>
./startup.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12),l=[p];function r(t,c){return s(),a("div",null,l)}const o=n(i,[["render",r],["__file","zengjiayingyongjiedianbuzhou.html.vue"]]);export{o as default};
