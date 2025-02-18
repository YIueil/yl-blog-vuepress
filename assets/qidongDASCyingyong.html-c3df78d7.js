import{_ as n,o as a,c as s,d as e}from"./app-64c3a6ce.js";const c={},i=e(`<h1 id="启动dasc应用" tabindex="-1"><a class="header-anchor" href="#启动dasc应用" aria-hidden="true">#</a> 启动DASC应用</h1><blockquote><p>进入<code>9.77.251.98</code>服务器，通过SSH连接服务器</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入应用目录</span>
<span class="token builtin class-name">cd</span> /opt/app/ytgz/apache-tomcat-8.5.79-dasc-7030/bin

<span class="token comment"># 启动应用</span>
./startup.sh

<span class="token comment"># 查看启动日志 预计启动时长10分钟左右</span>
<span class="token function">tail</span> <span class="token parameter variable">-fn</span> <span class="token number">888</span> /opt/app/ytgz/apache-tomcat-8.5.79-dasc-7030/logs/catalina.out

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),t=[i];function d(l,o){return a(),s("div",null,t)}const p=n(c,[["render",d],["__file","qidongDASCyingyong.html.vue"]]);export{p as default};
