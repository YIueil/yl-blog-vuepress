import{_ as n,o as s,c as a,a as e}from"./app-be491351.js";const i={},l=e(`<h1 id="wsl中的环境切换" tabindex="-1"><a class="header-anchor" href="#wsl中的环境切换" aria-hidden="true">#</a> WSL中的环境切换</h1><blockquote><p>在<code>WSL</code>中可能需要动态的切换，如<code>JDK</code>、<code>node</code>、<code>maven</code>等版本。</p></blockquote><h2 id="_1-使用nvm管理node版本" tabindex="-1"><a class="header-anchor" href="#_1-使用nvm管理node版本" aria-hidden="true">#</a> 1 使用NVM管理Node版本</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装 NVM 版本</span>
<span class="token function">curl</span> -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh <span class="token operator">|</span> <span class="token function">bash</span>

<span class="token comment"># 重启终端后执行以下命令</span>
<span class="token comment"># 查看可以安装的node版本</span>
nvm ls-remote <span class="token parameter variable">--lts</span>

<span class="token comment"># 安装对应版本</span>
nvm <span class="token function">install</span> <span class="token operator">&lt;</span>对应版本号<span class="token operator">&gt;</span>

<span class="token comment"># 查看已经安装的版本</span>
nvm list

<span class="token comment"># 切换版本</span>
nvm use <span class="token operator">&lt;</span>对应已安装的版本号<span class="token operator">&gt;</span>

<span class="token comment"># 删除版本</span>
nvm uninstall <span class="token operator">&lt;</span>对应已安装的版本号<span class="token operator">&gt;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-使用sdkman管理jdk和maven版本" tabindex="-1"><a class="header-anchor" href="#_2-使用sdkman管理jdk和maven版本" aria-hidden="true">#</a> 2 使用SDKMAN管理JDK和Maven版本</h2><blockquote><p><code>sdk list</code>指令的执行需要开启代理</p></blockquote><p>所有的管理配置完成后, 可以使用<code>sdk current</code>查看当前的版本</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
yiueil@YIUEIL-B760I:~/.m2/repository$ sdk current
Current versions <span class="token keyword">in</span> use:
<span class="token function">java</span> <span class="token number">17.0</span>.12-oracle
maven <span class="token number">3.9</span>.12
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-1-管理jdk" tabindex="-1"><a class="header-anchor" href="#_2-1-管理jdk" aria-hidden="true">#</a> 2.1 管理JDK</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装SDKMAN</span>
<span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token string">&quot;https://get.sdkman.io&quot;</span> <span class="token operator">|</span> <span class="token function">bash</span>

<span class="token comment"># 重启终端后执行以下命令</span>
<span class="token comment"># 查看所有的java版本 已安装的部分会标识出来</span>
sdk list <span class="token function">java</span>

<span class="token comment"># 安装对应版本</span>
sdk <span class="token function">install</span> <span class="token function">java</span> <span class="token operator">&lt;</span>对应版本标识<span class="token operator">&gt;</span>

<span class="token comment"># 查看已经安装的版本</span>
sdk list <span class="token function">java</span> <span class="token operator">|</span> <span class="token function">grep</span> installed

<span class="token comment"># 临时切换到对应版本 关闭终端后失效</span>
sdk use <span class="token function">java</span> <span class="token operator">&lt;</span>对应版本标识<span class="token operator">&gt;</span>

<span class="token comment"># 永久切换到对应版本</span>
sdk default <span class="token function">java</span> <span class="token operator">&lt;</span>对应版本标识<span class="token operator">&gt;</span>

<span class="token comment"># 查看当前启动的版本</span>
sdk current <span class="token function">java</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-管理maven" tabindex="-1"><a class="header-anchor" href="#_2-2-管理maven" aria-hidden="true">#</a> 2.2 管理Maven</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看可安装的Maven版本</span>
sdk list maven

<span class="token comment"># 安装对应的Maven版本</span>
sdk <span class="token function">install</span> maven <span class="token operator">&lt;</span>对应版本标识<span class="token operator">&gt;</span>

<span class="token comment"># 使用对应的Maven版本</span>
sdk default maven <span class="token operator">&lt;</span>对应版本标识<span class="token operator">&gt;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-开启离线模式" tabindex="-1"><a class="header-anchor" href="#_2-3-开启离线模式" aria-hidden="true">#</a> 2.3 开启离线模式</h3><blockquote><p>对于内网应用，可以使用离线模式，跳过网络检测这一步。</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 开启离线模式
sdk offline enable

# 关闭离线模式
sdk offline disable
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15),d=[l];function c(t,o){return s(),a("div",null,d)}const v=n(i,[["render",c],["__file","WSLzhongdehuanjingqiehuan.html.vue"]]);export{v as default};
