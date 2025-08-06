import{_ as n,o as s,c as e,d as a}from"./app-7fcc157f.js";const i={},c=a(`<h1 id="启动移动应用" tabindex="-1"><a class="header-anchor" href="#启动移动应用" aria-hidden="true">#</a> 启动移动应用</h1><blockquote><p>通过SSH连接<code>9.77.251.214</code>这台服务器</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入应用服务目录</span>
<span class="token builtin class-name">cd</span> /opt/app/mobile/apache-tomcat-7061-admin/bin

<span class="token comment"># 切换到centos用户, 然后会提示输入密码, 此处输入密码在页面上不会显示已输入内容</span>
<span class="token function">su</span> centos

<span class="token comment"># 再切换到root用户</span>
<span class="token function">sudo</span> <span class="token function">su</span> root

<span class="token comment"># 启动服务</span>
./startup.sh

<span class="token comment"># 进入到另外一个节点</span>
<span class="token builtin class-name">cd</span> /opt/app/mobile/apache-tomcat-7062-admin/bin

<span class="token comment"># 启动服务</span>
./startup.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),l=[c];function d(o,t){return s(),e("div",null,l)}const r=n(i,[["render",d],["__file","qidongyidongyingyong.html.vue"]]);export{r as default};
