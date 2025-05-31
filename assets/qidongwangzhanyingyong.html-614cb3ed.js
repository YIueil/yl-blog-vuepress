import{_ as n,o as a,c as e,d as s}from"./app-e07ee649.js";const c={},i=s(`<h1 id="启动网站应用" tabindex="-1"><a class="header-anchor" href="#启动网站应用" aria-hidden="true">#</a> 启动网站应用</h1><blockquote><p>两个节点的服务都需要启动，<code>9.77.251.208</code>和<code>9.77.252.219</code>。</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入应用服务目录</span>
<span class="token builtin class-name">cd</span> /opt/app/ytgz/apache-tomcat-8.5.79-app-7150/bin

<span class="token comment"># 启动应用</span>
./startup.sh

<span class="token comment"># 查看启动日志</span>
<span class="token function">tail</span> <span class="token parameter variable">-fn</span> <span class="token number">888</span> <span class="token punctuation">..</span>/logs/catalina.out
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),t=[i];function l(o,d){return a(),e("div",null,t)}const p=n(c,[["render",l],["__file","qidongwangzhanyingyong.html.vue"]]);export{p as default};
