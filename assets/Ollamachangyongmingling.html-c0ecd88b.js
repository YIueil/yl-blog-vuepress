import{_ as a,o as n,c as s,a as e}from"./app-be491351.js";const l={},i=e(`<h1 id="ollama常用命令" tabindex="-1"><a class="header-anchor" href="#ollama常用命令" aria-hidden="true">#</a> Ollama常用命令</h1><h2 id="_1-模型下载" tabindex="-1"><a class="header-anchor" href="#_1-模型下载" aria-hidden="true">#</a> 1 模型下载</h2><h3 id="列举模型" tabindex="-1"><a class="header-anchor" href="#列举模型" aria-hidden="true">#</a> 列举模型</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 命令</span>
ollama <span class="token function">ls</span>

<span class="token comment"># 示例</span>
PS C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token operator">&gt;</span> ollama <span class="token function">ls</span>
NAME                   ID              SIZE      MODIFIED
qwen2.5-coder:7b       dae161e27b0e    <span class="token number">4.7</span> GB    <span class="token number">5</span> months ago
llama3.1:latest        46e0c10c039e    <span class="token number">4.9</span> GB    <span class="token number">9</span> months ago
deepseek-coder:6.7b    ce298d984115    <span class="token number">3.8</span> GB    <span class="token number">9</span> months ago
deepseek-r1:8b         28f8fd6cdc67    <span class="token number">4.9</span> GB    <span class="token number">9</span> months ago
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="下载模型" tabindex="-1"><a class="header-anchor" href="#下载模型" aria-hidden="true">#</a> 下载模型</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 命令</span>
ollama pull <span class="token operator">&lt;</span>模型标识<span class="token operator">&gt;</span>

<span class="token comment"># 示例</span>
PS C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token operator">&gt;</span> ollama pull translategemma
pulling manifest
pulling bdbf939b402e:   <span class="token number">0</span>% ▕                                   ▏  <span class="token number">16</span> MB/3.3 GB  <span class="token number">7.2</span> MB/s   7m37s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除模型" tabindex="-1"><a class="header-anchor" href="#删除模型" aria-hidden="true">#</a> 删除模型</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 命令</span>
ollama <span class="token function">rm</span> <span class="token operator">&lt;</span>模型标识<span class="token operator">&gt;</span>

<span class="token comment"># 示例</span>
PS C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token operator">&gt;</span> ollama <span class="token function">rm</span> lauchacarro/qwen2.5-translator:latest
deleted <span class="token string">&#39;lauchacarro/qwen2.5-translator:latest&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-部署本地模型" tabindex="-1"><a class="header-anchor" href="#_2-部署本地模型" aria-hidden="true">#</a> 2 部署本地模型</h2><blockquote><p>通过<code>Modelfile</code>进行创建。</p></blockquote><h2 id="_3-模型运行" tabindex="-1"><a class="header-anchor" href="#_3-模型运行" aria-hidden="true">#</a> 3 模型运行</h2><h3 id="运行模型" tabindex="-1"><a class="header-anchor" href="#运行模型" aria-hidden="true">#</a> 运行模型</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 命令</span>
ollama run <span class="token operator">&lt;</span>模型标识<span class="token operator">&gt;</span>

<span class="token comment"># 示例</span>
PS C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token operator">&gt;</span> ollama run translategemma
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="停止模型" tabindex="-1"><a class="header-anchor" href="#停止模型" aria-hidden="true">#</a> 停止模型</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 命令</span>
ollama stop <span class="token operator">&lt;</span>模型标识<span class="token operator">&gt;</span>

<span class="token comment"># 示例</span>
PS C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token punctuation">\\</span>Desktop<span class="token operator">&gt;</span> ollama stop translategemma:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15),t=[i];function r(o,d){return n(),s("div",null,t)}const p=a(l,[["render",r],["__file","Ollamachangyongmingling.html.vue"]]);export{p as default};
