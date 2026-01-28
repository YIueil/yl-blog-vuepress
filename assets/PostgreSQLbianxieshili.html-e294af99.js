import{_ as n,o as s,c as a,a as e}from"./app-be491351.js";const t={},i=e(`<h1 id="postgresql编写实例" tabindex="-1"><a class="header-anchor" href="#postgresql编写实例" aria-hidden="true">#</a> PostgreSQL编写实例</h1><h2 id="_1-递归查询" tabindex="-1"><a class="header-anchor" href="#_1-递归查询" aria-hidden="true">#</a> 1 递归查询</h2><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">WITH</span> RECURSIVE SubDirectories <span class="token keyword">AS</span> <span class="token punctuation">(</span>
    <span class="token comment">-- 非递归部分：选择根目录</span>
    <span class="token keyword">select</span> dv<span class="token punctuation">.</span>id<span class="token punctuation">,</span> dv<span class="token punctuation">.</span>name
    <span class="token keyword">from</span> ynytgz_dap<span class="token punctuation">.</span>dcc_dictionarytype dt
             <span class="token keyword">inner</span> <span class="token keyword">join</span> ynytgz_dap<span class="token punctuation">.</span>dcc_dictionaryvalue dv <span class="token keyword">on</span> dv<span class="token punctuation">.</span>fk_type_id <span class="token operator">=</span> dt<span class="token punctuation">.</span>id
    <span class="token keyword">where</span> dt<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;用地用海分类&#39;</span>
      <span class="token operator">and</span> dv<span class="token punctuation">.</span>name <span class="token operator">=</span> :一级目录
    <span class="token keyword">UNION</span> <span class="token keyword">ALL</span>
    <span class="token comment">-- 递归部分：选择子目录</span>
    <span class="token keyword">SELECT</span> child<span class="token punctuation">.</span>id<span class="token punctuation">,</span>
           child<span class="token punctuation">.</span>name
    <span class="token keyword">FROM</span> ynytgz_dap<span class="token punctuation">.</span>dcc_dictionaryvalue child
             <span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> SubDirectories parent <span class="token keyword">ON</span> child<span class="token punctuation">.</span>fk_dictionaryvalue_id <span class="token operator">=</span> parent<span class="token punctuation">.</span>id
<span class="token punctuation">)</span>
<span class="token comment">-- 最终查询：选择所有子目录</span>
<span class="token keyword">SELECT</span> name
<span class="token keyword">FROM</span> SubDirectories
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),o=[i];function c(p,l){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","PostgreSQLbianxieshili.html.vue"]]);export{r as default};
