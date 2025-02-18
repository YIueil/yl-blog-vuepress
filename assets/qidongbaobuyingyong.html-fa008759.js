import{_ as n,o as a,c as e,d as s}from"./app-64c3a6ce.js";const i={},c=s(`<h1 id="启动报部应用" tabindex="-1"><a class="header-anchor" href="#启动报部应用" aria-hidden="true">#</a> 启动报部应用</h1><blockquote><p>进入<code>9.77.252.219</code>目录，通过SSH方式连接到服务器</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入报部应用服务目录</span>
<span class="token builtin class-name">cd</span> /opt/app/ytgz/apache-tomcat-8.5.79-Docking-7250/bin

<span class="token comment"># 启动应用</span>
./startup.sh

<span class="token comment"># 查看启动日志</span>
<span class="token function">tail</span> <span class="token parameter variable">-fn</span> <span class="token number">888</span> /opt/app/ytgz/apache-tomcat-8.5.79-Docking-7250/logs/catalina.out
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),t=[c];function o(l,d){return a(),e("div",null,t)}const p=n(i,[["render",o],["__file","qidongbaobuyingyong.html.vue"]]);export{p as default};
