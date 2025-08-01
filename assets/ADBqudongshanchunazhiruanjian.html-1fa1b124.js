import{_ as n,o as a,c as e,d as s}from"./app-7377b0fe.js";const i={},d=s(`<h1 id="通过adb驱动删除内置软件-md" tabindex="-1"><a class="header-anchor" href="#通过adb驱动删除内置软件-md" aria-hidden="true">#</a> 通过adb驱动删除内置软件.md</h1><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入adb shell</span>
adb shell

<span class="token comment"># 列举已安装应用</span>
pm list packages
<span class="token comment"># package:cn.nubia.browser</span>

<span class="token comment"># 删除应用</span>
pm uninstall <span class="token parameter variable">-k</span> <span class="token parameter variable">--user</span> <span class="token number">0</span> cn.nubia.browser
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),l=[d];function c(r,t){return a(),e("div",null,l)}const m=n(i,[["render",c],["__file","ADBqudongshanchunazhiruanjian.html.vue"]]);export{m as default};
