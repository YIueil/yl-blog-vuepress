import{_ as s,o as n,c as a,a as e}from"./app-18841cf9.js";const c={},i=e(`<h1 id="centos7监控cpu、内存占用" tabindex="-1"><a class="header-anchor" href="#centos7监控cpu、内存占用" aria-hidden="true">#</a> CentOS7监控CPU、内存占用</h1><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装 sysstat</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> sysstat
<span class="token comment"># 启动服务</span>
systemctl <span class="token builtin class-name">enable</span> <span class="token parameter variable">--now</span> sysstat
<span class="token comment"># 修改配置</span>
<span class="token function">vi</span> /etc/sysconfig/sysstat
<span class="token comment"># 默认10分钟统计一次</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 增加CPU压力</span>
<span class="token comment">### 查看CPU核数</span>
<span class="token function">cat</span> /proc/cpuinfo <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&quot;processor&quot;</span> <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span>
<span class="token comment">## 跑满两核心 ROOT账号执行</span>
<span class="token function">sh</span> cpu_usage.sh consume <span class="token number">2</span>
<span class="token comment">### 释放 ROOT账号执行</span>
<span class="token function">sh</span> cpu_usage.sh release

<span class="token comment"># 增加内存压力 ROOT账号执行</span>
<span class="token comment">### 施加1G内存占用</span>
<span class="token function">sh</span> memory_usage.sh consume 1G
<span class="token comment">### 释放 ROOT账号执行</span>
<span class="token function">sh</span> memory_usage.sh release

<span class="token comment"># 搜集报告</span>
<span class="token comment">### 搜集某一天的CPU使用情况</span>
sar <span class="token parameter variable">-u</span> <span class="token parameter variable">-f</span> /var/log/sa/sa29
<span class="token comment">### 搜集某一天的内存使用情况</span>
sar <span class="token parameter variable">-r</span> <span class="token parameter variable">-f</span> /var/log/sa/sa29
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),l=[i];function t(o,p){return n(),a("div",null,l)}const d=s(c,[["render",t],["__file","CentOS7jiankongCPU、nacunzhanyong.html.vue"]]);export{d as default};
