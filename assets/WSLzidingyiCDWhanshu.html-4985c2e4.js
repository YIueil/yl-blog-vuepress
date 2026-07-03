import{_ as s,o as n,c as a,a as e}from"./app-18841cf9.js";const l={},i=e(`<h1 id="wsl自定义cdw函数" tabindex="-1"><a class="header-anchor" href="#wsl自定义cdw函数" aria-hidden="true">#</a> WSL自定义CDW函数</h1><blockquote><p>实现直接<code>cd</code>功能，进入到一个windows的路径。</p></blockquote><ol><li>编辑<code>~/.bashrc</code> 文件</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function-name function">cdw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$#</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;Usage: cdw &lt;Windows-path&gt;&quot;</span>
        <span class="token builtin class-name">return</span> <span class="token number">1</span>
    <span class="token keyword">fi</span>

    <span class="token comment"># 使用 wslpath 将 Windows 路径转为 Linux 路径</span>
    <span class="token builtin class-name">local</span> linux_path
    <span class="token assign-left variable">linux_path</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>wslpath <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null<span class="token variable">)</span></span>

    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-ne</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;Error: Invalid Windows path: <span class="token variable">$1</span>&quot;</span>
        <span class="token builtin class-name">return</span> <span class="token number">1</span>
    <span class="token keyword">fi</span>

    <span class="token comment"># 检查路径是否存在</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-d</span> <span class="token string">&quot;<span class="token variable">$linux_path</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;Error: Directory does not exist: <span class="token variable">$linux_path</span>&quot;</span>
        <span class="token builtin class-name">return</span> <span class="token number">1</span>
    <span class="token keyword">fi</span>

    <span class="token comment"># 执行 cd</span>
    <span class="token builtin class-name">cd</span> <span class="token string">&quot;<span class="token variable">$linux_path</span>&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>更新<code>bashrc</code></li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">source</span> ~/.bashrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>✅使用示例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yiueil@YIUEIL-MATEBOOK:~$ cdw <span class="token string">&#39;D:\\YIueil\\Game&#39;</span>
yiueil@YIUEIL-MATEBOOK:/mnt/d/YIueil/Game$
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>🍒注意事项：</p><blockquote><p>如果使用<code>Zsh</code>，编辑<code>~/.zshrc</code></p></blockquote>`,10),t=[i];function c(p,o){return n(),a("div",null,t)}const r=s(l,[["render",c],["__file","WSLzidingyiCDWhanshu.html.vue"]]);export{r as default};
