import{_ as n,o as a,c as e,d as s}from"./app-37936905.js";const i={},c=s(`<h1 id="启动dmap应用" tabindex="-1"><a class="header-anchor" href="#启动dmap应用" aria-hidden="true">#</a> 启动DMAP应用</h1><blockquote><p>进入<code>9.77.251.208</code>和<code>9.77.252.162</code>两个服务器的节点</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入DMAP应用目录</span>
<span class="token builtin class-name">cd</span> /opt/app/ytgz/apache-tomcat-9.0.65-dmap-7060/bin

<span class="token comment"># 启动应用</span>
./startup.sh

<span class="token comment"># 查看启动日志 启动时长由当前应用压力决定</span>
<span class="token function">tail</span> <span class="token parameter variable">-fn</span> <span class="token number">888</span> <span class="token punctuation">..</span>/logs/catalina.out

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),t=[c];function d(l,o){return a(),e("div",null,t)}const p=n(i,[["render",d],["__file","qidongDMAPyingyong.html.vue"]]);export{p as default};
