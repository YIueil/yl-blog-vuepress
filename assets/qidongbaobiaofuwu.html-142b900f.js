import{_ as a,o as e,c as n,d as s}from"./app-64c3a6ce.js";const i={},c=s(`<h1 id="启动报表服务" tabindex="-1"><a class="header-anchor" href="#启动报表服务" aria-hidden="true">#</a> 启动报表服务</h1><blockquote><p>进入<code>9.77.251.208</code>服务器，通过SSH连接到服务器</p></blockquote><h2 id="按照顺序执行命令" tabindex="-1"><a class="header-anchor" href="#按照顺序执行命令" aria-hidden="true">#</a> 按照顺序执行命令</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入报表服务的bin目录</span>
<span class="token builtin class-name">cd</span> /opt/app/ytgz/apache-tomcat-8.5.79-report-7140/bin

<span class="token comment"># 启动应用</span>
./startup.sh

<span class="token comment"># 查看启动日志</span>
<span class="token function">tail</span> <span class="token parameter variable">-fn</span> <span class="token number">888</span> /opt/app/ytgz/apache-tomcat-8.5.79-report-7140/logs/catalina.out

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),t=[c];function o(d,l){return e(),n("div",null,t)}const p=a(i,[["render",o],["__file","qidongbaobiaofuwu.html.vue"]]);export{p as default};
