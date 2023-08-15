import{_ as n,o as a,c as s,a as e}from"./app-eba064a2.js";const i={},l=e(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入adb shell</span>
adb shell

<span class="token comment"># 列举已安装应用</span>
pm list packages
<span class="token comment"># package:cn.nubia.browser</span>

<span class="token comment"># 删除应用</span>
pm uninstall <span class="token parameter variable">-k</span> <span class="token parameter variable">--user</span> <span class="token number">0</span> cn.nubia.browser
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),c=[l];function d(r,t){return a(),s("div",null,c)}const m=n(i,[["render",d],["__file","adbqudongshanchunazhiruanjian.html.vue"]]);export{m as default};
