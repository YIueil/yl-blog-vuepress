import{_ as s,o as a,c as n,a as e}from"./app-be491351.js";const i={},l=e(`<h1 id="centos7配置密码策略" tabindex="-1"><a class="header-anchor" href="#centos7配置密码策略" aria-hidden="true">#</a> CentOS7配置密码策略</h1><h2 id="_1-密码安全策略" tabindex="-1"><a class="header-anchor" href="#_1-密码安全策略" aria-hidden="true">#</a> 1 密码安全策略</h2><h3 id="_1-1-密码复杂度配置" tabindex="-1"><a class="header-anchor" href="#_1-1-密码复杂度配置" aria-hidden="true">#</a> 1.1 密码复杂度配置</h3><p>如口令长度不得小于8位，且为字母、数字或特殊字符的混合组合，用户名和口令不得相同</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> /etc/pam.d/system-auth
password  requisite  pam_pwquality.so try_first_pass local_users_only <span class="token assign-left variable">retry</span><span class="token operator">=</span><span class="token number">3</span> <span class="token assign-left variable">authtok_type</span><span class="token operator">=</span> <span class="token assign-left variable">minlen</span><span class="token operator">=</span><span class="token number">8</span> <span class="token assign-left variable">lcredit</span><span class="token operator">=</span>-1 <span class="token assign-left variable">ucredit</span><span class="token operator">=</span>-1 <span class="token assign-left variable">dcredit</span><span class="token operator">=</span>-1 <span class="token assign-left variable">ocredit</span><span class="token operator">=</span>-1 <span class="token assign-left variable">difok</span><span class="token operator">=</span><span class="token number">5</span> enforce_for_root

<span class="token comment">#参数说明 负数：代表最少出现次数，正数：代表最多出现次数</span>
minlen <span class="token operator">=</span> <span class="token number">8</span>，密码长度至少8位；
<span class="token assign-left variable">lcredit</span><span class="token operator">=</span>-1，至少包含一个小写字母；
<span class="token assign-left variable">ucredit</span><span class="token operator">=</span>-1，至少包含一个大写字母；
<span class="token assign-left variable">dcredit</span><span class="token operator">=</span>-1，至少包含要给数字；
<span class="token assign-left variable">ocredit</span><span class="token operator">=</span>-1，至少包含一个特殊字符；
<span class="token assign-left variable">difok</span><span class="token operator">=</span><span class="token number">5</span>，新密码最多与旧密码重复5个字符；
enforce_for_root，对root强制执行密码复杂度策略。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-密码有效期" tabindex="-1"><a class="header-anchor" href="#_1-2-密码有效期" aria-hidden="true">#</a> 1.2 密码有效期</h3><p>新用户生效</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> /etc/login.defs

<span class="token comment">#密码的最大有效期</span>
PASS_MAX_DAYS <span class="token number">180</span>

<span class="token comment">#是否可修改密码，多少天后可修改</span>
PASS_MIN_DAYS <span class="token number">0</span>

<span class="token comment">#密码最小长度，pam_pwquality设置优先</span>
PASS_MIN_LEN <span class="token number">8</span>

<span class="token comment">#密码失效前多少天在用户登录时通知用户修改密码</span>
PASS_WARN_AGE <span class="token number">15</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>老用户生效</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>chage <span class="token parameter variable">-M</span> <span class="token number">180</span> 用户名 <span class="token comment">#老用户生效</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1-3-账户密码错误锁定" tabindex="-1"><a class="header-anchor" href="#_1-3-账户密码错误锁定" aria-hidden="true">#</a> 1.3 账户密码错误锁定</h3><p>控制如果多次登陆失败账号锁定，只对控制台生效</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 连续五次密码错误，账号将被锁定半小时</span>
<span class="token function">vim</span> /etc/pam.d/system-auth
auth required pam_tally2.so <span class="token assign-left variable">onerr</span><span class="token operator">=</span>fail <span class="token assign-left variable">deny</span><span class="token operator">=</span><span class="token number">5</span> <span class="token assign-left variable">unlock_time</span><span class="token operator">=</span><span class="token number">1800</span> <span class="token assign-left variable">root_unlock_time</span><span class="token operator">=</span><span class="token number">1800</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果需要对ssh远程有效，则需要修改 /etc/pam.d/sshd</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> /etc/pam.d/sshd
auth required pam_tally2.so <span class="token assign-left variable">onerr</span><span class="token operator">=</span>fail <span class="token assign-left variable">deny</span><span class="token operator">=</span><span class="token number">5</span> <span class="token assign-left variable">unlock_time</span><span class="token operator">=</span><span class="token number">600</span> <span class="token assign-left variable">root_unlock_time</span><span class="token operator">=</span><span class="token number">60</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-会话超时策略" tabindex="-1"><a class="header-anchor" href="#_2-会话超时策略" aria-hidden="true">#</a> 2 会话超时策略</h2><p>30分钟无操作，自动退出会话。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> /etc/profile
<span class="token assign-left variable">TMOUT</span><span class="token operator">=</span><span class="token number">1800</span> <span class="token comment">#1800秒超时</span>

<span class="token comment"># source 使上述内容生效</span>
<span class="token builtin class-name">source</span> /etc/profile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18),r=[l];function t(p,c){return a(),n("div",null,r)}const d=s(i,[["render",t],["__file","CentOS7peizhimimacelue.html.vue"]]);export{d as default};
