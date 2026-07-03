import{_ as t,o as n,c as e,a as s}from"./app-18841cf9.js";const a={},d=s(`<h1 id="centos7监控流量" tabindex="-1"><a class="header-anchor" href="#centos7监控流量" aria-hidden="true">#</a> CentOS7监控流量</h1><h2 id="_1-安装" tabindex="-1"><a class="header-anchor" href="#_1-安装" aria-hidden="true">#</a> 1 安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">### 安装vnstat</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> vnstat

<span class="token comment">### 启动服务</span>
<span class="token function">sudo</span> systemctl start vnstat

<span class="token comment">### 可选, 开机启动</span>
<span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> vnstat

<span class="token comment">### 测试流量, 需要外网</span>
<span class="token function">curl</span> <span class="token parameter variable">-o</span> /dev/null http://speedtest.tele2.net/1GB.zip

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-统计平均和峰值流量" tabindex="-1"><a class="header-anchor" href="#_2-统计平均和峰值流量" aria-hidden="true">#</a> 2 统计平均和峰值流量</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">### 统计平均流量</span>

<span class="token comment">### 统计峰值流量</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="附录-常用命令" tabindex="-1"><a class="header-anchor" href="#附录-常用命令" aria-hidden="true">#</a> 附录：常用命令</h2><table><thead><tr><th>命令</th><th>功能说明</th><th>示例</th></tr></thead><tbody><tr><td><code>vnstat</code></td><td>查看当前月份的总流量统计</td><td><code>vnstat</code></td></tr><tr><td><code>vnstat -i &lt;网卡名&gt;</code></td><td>查看特定网卡的统计信息</td><td><code>vnstat -i ens33</code></td></tr><tr><td><code>vnstat -l</code></td><td>实时刷新查看当前网卡的传输速率</td><td><code>vnstat -l</code></td></tr><tr><td><code>vnstat -h</code></td><td>按<strong>小时</strong>查看过去24小时的流量</td><td><code>vnstat -h -i eth0</code></td></tr><tr><td><code>vnstat -d</code></td><td>按<strong>天</strong>查看每日流量汇总</td><td><code>vnstat -d</code></td></tr><tr><td><code>vnstat -w</code></td><td>按<strong>周</strong>查看流量汇总</td><td><code>vnstat -w</code></td></tr><tr><td><code>vnstat -m</code></td><td>按<strong>月</strong>查看流量汇总</td><td><code>vnstat -m</code></td></tr></tbody></table>`,7),c=[d];function i(l,o){return n(),e("div",null,c)}const v=t(a,[["render",i],["__file","CentOS7jiankongliuliang.html.vue"]]);export{v as default};
