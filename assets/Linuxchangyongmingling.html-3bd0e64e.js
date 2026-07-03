import{_ as s,o as a,c as n,a as e}from"./app-18841cf9.js";const t={},i=e(`<h1 id="linux常用命令" tabindex="-1"><a class="header-anchor" href="#linux常用命令" aria-hidden="true">#</a> Linux常用命令</h1><h2 id="服务相关" tabindex="-1"><a class="header-anchor" href="#服务相关" aria-hidden="true">#</a> 服务相关</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 服务模糊搜索</span>
systemctl list-units <span class="token parameter variable">--type</span><span class="token operator">=</span>service <span class="token operator">|</span> <span class="token function">grep</span> <span class="token operator">&lt;</span>服务名称<span class="token operator">&gt;</span>

<span class="token comment"># 例如</span>
systemctl list-units <span class="token parameter variable">--type</span><span class="token operator">=</span>service <span class="token operator">|</span> <span class="token function">grep</span> zerotier

<span class="token comment"># 查询用户启动项</span>
systemctl <span class="token parameter variable">--user</span> list-unit-files <span class="token parameter variable">--state</span><span class="token operator">=</span>enabled
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),r=[i];function l(c,o){return a(),n("div",null,r)}const d=s(t,[["render",l],["__file","Linuxchangyongmingling.html.vue"]]);export{d as default};
