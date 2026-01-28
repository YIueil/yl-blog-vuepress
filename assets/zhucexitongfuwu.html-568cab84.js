import{_ as n,o as s,c as a,a as e}from"./app-be491351.js";const t={},i=e(`<h1 id="注册系统服务" tabindex="-1"><a class="header-anchor" href="#注册系统服务" aria-hidden="true">#</a> 注册系统服务</h1><p>在 Linux 系统中，将一个 JAR 包作为系统服务来管理，最推荐、最现代的方式是使用 <code>systemd</code>。你使用的 Linux Mint 正是基于 <code>systemd</code> 的，所以这个方法非常适用。</p><p>好处：</p><ul><li>可以像管理其他系统服务（如 nginx, mysql）一样，用 <code>systemctl</code> 命令来启动、停止、重启和查看状态。</li><li>可以设置服务开机自启。</li><li>服务崩溃后可以自动重启。</li><li>日志会统一由 <code>journalctl</code> 管理，方便查看。</li></ul><h2 id="_1-service-基础结构" tabindex="-1"><a class="header-anchor" href="#_1-service-基础结构" aria-hidden="true">#</a> 1 Service 基础结构</h2><blockquote><p>Service 服务文件所在路径 <code>/etc/systemd/system/</code>。</p></blockquote><p>一个完整的 Service 的结构：</p><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Unit</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">Description</span><span class="token punctuation">=</span><span class="token value attr-value">My Java Application Service # 服务备注</span>
<span class="token key attr-name">After</span><span class="token punctuation">=</span><span class="token value attr-value">network.target # 如果刚需网络, 则执行应该在网络连接之后</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Service</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">Type</span><span class="token punctuation">=</span><span class="token value attr-value">simple</span>
<span class="token key attr-name">User</span><span class="token punctuation">=</span><span class="token value attr-value">your_username          # 运行该服务的用户，不要用root！</span>
<span class="token key attr-name">Group</span><span class="token punctuation">=</span><span class="token value attr-value">your_username         # 用户的组</span>
<span class="token key attr-name">WorkingDirectory</span><span class="token punctuation">=</span><span class="token value attr-value">/path/to/your/app  # 你的jar包所在的目录</span>
<span class="token key attr-name">ExecStart</span><span class="token punctuation">=</span><span class="token value attr-value">/usr/bin/java -jar /path/to/your/app/your-app.jar</span>
<span class="token key attr-name">Restart</span><span class="token punctuation">=</span><span class="token value attr-value">on-failure          # 如果服务失败，自动重启</span>
<span class="token key attr-name">RestartSec</span><span class="token punctuation">=</span><span class="token value attr-value">10               # 重启前等待10秒</span>
<span class="token key attr-name">SuccessExitStatus</span><span class="token punctuation">=</span><span class="token value attr-value">143       # 正常停止时的退出码</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Install</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">WantedBy</span><span class="token punctuation">=</span><span class="token value attr-value">multi-user.target</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个极简的 Service 的结构：</p><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Unit</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">Description</span><span class="token punctuation">=</span><span class="token value attr-value">My Java Application Service</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Service</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">User</span><span class="token punctuation">=</span><span class="token value attr-value">your_username</span>
<span class="token key attr-name">WorkingDirectory</span><span class="token punctuation">=</span><span class="token value attr-value">/path/to/your/app</span>
<span class="token key attr-name">ExecStart</span><span class="token punctuation">=</span><span class="token value attr-value">/usr/bin/java -jar /path/to/your/app/your-app.jar</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Install</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">WantedBy</span><span class="token punctuation">=</span><span class="token value attr-value">multi-user.target</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-设置开机启动和启停服务" tabindex="-1"><a class="header-anchor" href="#_2-设置开机启动和启停服务" aria-hidden="true">#</a> 2 设置开机启动和启停服务</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 设置开机启动</span>
<span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> myservice.service

<span class="token comment"># 启动服务</span>
<span class="token function">sudo</span> systemctl start myservice.service

<span class="token comment"># 重启服务</span>
<span class="token function">sudo</span> systemctl restart myservice.service

<span class="token comment"># 停止服务</span>
<span class="token function">sudo</span> systemctl stop myservice.service

<span class="token comment"># 查看服务状态</span>
<span class="token function">sudo</span> systemctl status myservice.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-查看服务的运行日志" tabindex="-1"><a class="header-anchor" href="#_3-查看服务的运行日志" aria-hidden="true">#</a> 3 查看服务的运行日志</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看实时日志</span>
<span class="token function">sudo</span> journalctl <span class="token parameter variable">-u</span> myservice <span class="token parameter variable">-f</span>

<span class="token comment"># 查看所有历史日志</span>
<span class="token function">sudo</span> journalctl <span class="token parameter variable">-u</span> myservice
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),l=[i];function c(p,o){return s(),a("div",null,l)}const u=n(t,[["render",c],["__file","zhucexitongfuwu.html.vue"]]);export{u as default};
