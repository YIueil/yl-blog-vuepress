import{_ as n,o as s,c as a,a as i}from"./app-be491351.js";const e={},l=i(`<h1 id="等保-linux服务器用户实现三权分立" tabindex="-1"><a class="header-anchor" href="#等保-linux服务器用户实现三权分立" aria-hidden="true">#</a> 等保：Linux服务器用户实现三权分立</h1><h2 id="_1-创建三权账号" tabindex="-1"><a class="header-anchor" href="#_1-创建三权账号" aria-hidden="true">#</a> 1 创建三权账号</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 新建系统管理员</span>
<span class="token function">useradd</span> sysadmin
<span class="token function">passwd</span> sysadmin
  
<span class="token comment"># 新建安全管理员  </span>
<span class="token function">useradd</span> secadmin 
<span class="token function">passwd</span> secadmin
  
<span class="token comment"># 新建审计管理员  </span>
<span class="token function">useradd</span> auditadmin
<span class="token function">passwd</span> auditadmin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-修改visudo配置" tabindex="-1"><a class="header-anchor" href="#_2-修改visudo配置" aria-hidden="true">#</a> 2 修改visudo配置</h2><p>visudo</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">### 系统管理员  </span>
Cmnd_Alias SOFTWARE <span class="token operator">=</span> /bin/rpm, /usr/bin/up2date, /usr/bin/yum  
Cmnd_Alias SERVICES <span class="token operator">=</span> /sbin/service, /sbin/chkconfig, /usr/bin/systemctl start, /usr/bin/systemctl stop, /usr/bin/systemctl reload, /usr/bin/systemctl restart, /usr/bin/systemctl status, /usr/bin/systemctl enable, /usr/bin/systemctl disable  
Cmnd_Alias STORAGE <span class="token operator">=</span> /sbin/fdisk, /sbin/sfdisk, /sbin/parted, /sbin/partprobe, /bin/mount, /bin/umount  
sysadmin <span class="token assign-left variable">ALL</span><span class="token operator">=</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span> SOFTWARE,SERVICES,STORAGE  
  
<span class="token comment">### 安全管理员  </span>
Cmnd_Alias DELEGATING <span class="token operator">=</span> /usr/sbin/visudo, /bin/chown, /bin/chmod, /bin/chgrp  
Cmnd_Alias PROCESSES <span class="token operator">=</span> /bin/nice, /bin/kill, /usr/bin/kill, /usr/bin/killall  
Cmnd_Alias NETWORKING <span class="token operator">=</span> /sbin/route, /sbin/ifconfig, /bin/ping, /sbin/dhclient, /usr/bin/net, /sbin/iptables, /usr/bin/rfcomm, /usr/bin/wvdial, /sbin/iwconfig, /sbin/mii-tool  
secadmin <span class="token assign-left variable">ALL</span><span class="token operator">=</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span> DELEGATING,PROCESSES,NETWORKING  
  
<span class="token comment">### 审计管理员的权限  </span>
auditadmin <span class="token assign-left variable">ALL</span><span class="token operator">=</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span> NOPASSWD:/usr/sbin/aureport,NOPASSWD:/usr/sbin/autrace,NOPASSWD:/usr/sbin/ausearch,NOPASSWD:/usr/sbin/audispd,NOPASSWD:/usr/sbin/auditctl  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3测试配置是否正确" tabindex="-1"><a class="header-anchor" href="#_3测试配置是否正确" aria-hidden="true">#</a> 3测试配置是否正确</h2><p>visudo -c</p>`,8),d=[l];function t(c,r){return s(),a("div",null,d)}const u=n(e,[["render",t],["__file","dengbao：chuangjianyonghushixiansanquanfenli.html.vue"]]);export{u as default};
