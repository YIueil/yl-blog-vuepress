import{_ as n,o as a,c as s,a as e}from"./app-be491351.js";const i={},l=e(`<h1 id="linux创建用户" tabindex="-1"><a class="header-anchor" href="#linux创建用户" aria-hidden="true">#</a> Linux创建用户</h1><h2 id="_1-快速创建命令" tabindex="-1"><a class="header-anchor" href="#_1-快速创建命令" aria-hidden="true">#</a> 1 快速创建命令</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 使用adduser命令（交互式，推荐）</span>
<span class="token function">sudo</span> adduser YIueil

<span class="token comment"># 或者使用useradd命令（非交互式）</span>
<span class="token function">sudo</span> <span class="token function">useradd</span> <span class="token parameter variable">-m</span> <span class="token parameter variable">-s</span> /bin/bash YIueil
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>参数说明：</strong></p><ul><li><code>-m</code>: 自动创建家目录 <code>/home/YIueil</code></li><li><code>-s /bin/bash</code>: 设置默认shell为bash</li></ul><h2 id="_2-权限分配" tabindex="-1"><a class="header-anchor" href="#_2-权限分配" aria-hidden="true">#</a> 2 权限分配</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 设置家目录所有者和组</span>
<span class="token function">sudo</span> <span class="token function">chown</span> <span class="token parameter variable">-R</span> YIueil:YIueil /home/YIueil

<span class="token comment"># 设置家目录权限（推荐权限）</span>
<span class="token function">sudo</span> <span class="token function">chmod</span> <span class="token number">700</span> /home/YIueil

<span class="token comment"># 或者使用更宽松的权限（如果需要）</span>
<span class="token function">sudo</span> <span class="token function">chmod</span> <span class="token number">755</span> /home/YIueil

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-自定义选项" tabindex="-1"><a class="header-anchor" href="#_3-自定义选项" aria-hidden="true">#</a> 3 自定义选项</h2><h3 id="_1-自定义家目录位置" tabindex="-1"><a class="header-anchor" href="#_1-自定义家目录位置" aria-hidden="true">#</a> 1. 自定义家目录位置</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建自定义家目录</span>
<span class="token function">sudo</span> <span class="token function">mkdir</span> /custom/home/YIueil
<span class="token function">sudo</span> <span class="token function">useradd</span> <span class="token parameter variable">-d</span> /custom/home/YIueil <span class="token parameter variable">-m</span> YIueil
<span class="token function">sudo</span> <span class="token function">chown</span> <span class="token parameter variable">-R</span> YIueil:YIueil /custom/home/YIueil
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-复制默认配置文件" tabindex="-1"><a class="header-anchor" href="#_2-复制默认配置文件" aria-hidden="true">#</a> 2. 复制默认配置文件</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 如果家目录为空，复制默认配置文件</span>
<span class="token function">sudo</span> <span class="token function">cp</span> <span class="token parameter variable">-r</span> /etc/skel/* /home/YIueil/
<span class="token function">sudo</span> <span class="token function">chown</span> <span class="token parameter variable">-R</span> YIueil:YIueil /home/YIueil
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-添加用户到附加组" tabindex="-1"><a class="header-anchor" href="#_3-添加用户到附加组" aria-hidden="true">#</a> 3. 添加用户到附加组</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 将用户添加到sudo组（管理员权限）</span>
<span class="token function">sudo</span> <span class="token function">usermod</span> <span class="token parameter variable">-aG</span> <span class="token function">sudo</span> YIueil

<span class="token comment"># 添加到其他常用组</span>
<span class="token function">sudo</span> <span class="token function">usermod</span> <span class="token parameter variable">-aG</span> adm,cdrom,plugdev,lpadmin,sambashare Y
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),d=[l];function c(o,r){return a(),s("div",null,d)}const t=n(i,[["render",c],["__file","Linuxchuangjianyonghu.html.vue"]]);export{t as default};
