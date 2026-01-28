import{_ as n,o as s,c as e,a}from"./app-be491351.js";const i={},o=a(`<h1 id="linux修改yum源" tabindex="-1"><a class="header-anchor" href="#linux修改yum源" aria-hidden="true">#</a> Linux修改yum源</h1><blockquote><p>使用docker安装centos后，使用yum安装软件包时，报错</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Could not retrieve mirrorlist http://mirrorlist.centos.org/?release<span class="token operator">=</span><span class="token number">7</span><span class="token operator">&amp;</span><span class="token assign-left variable">arch</span><span class="token operator">=</span>x86_64<span class="token operator">&amp;</span><span class="token assign-left variable">repo</span><span class="token operator">=</span>os<span class="token operator">&amp;</span><span class="token assign-left variable">infra</span><span class="token operator">=</span>container error was
<span class="token number">14</span>: <span class="token function">curl</span><span class="token comment">#6 - &quot;Could not resolve host: mirrorlist.centos.org; Unknown error&quot;</span>


 One of the configured repositories failed <span class="token punctuation">(</span>Unknown<span class="token punctuation">)</span>,
 and yum doesn<span class="token string">&#39;t have enough cached data to continue. At this point the only
 safe thing yum can do is fail. There are a few ways to work &quot;fix&quot; this:

     1. Contact the upstream for the repository and get them to fix the problem.

     2. Reconfigure the baseurl/etc. for the repository, to point to a working
        upstream. This is most often useful if you are using a newer
        distribution release than is supported by the repository (and the
        packages for the previous distribution release still work).

     3. Run the command with the repository temporarily disabled
            yum --disablerepo=&lt;repoid&gt; ...

     4. Disable the repository permanently, so yum won&#39;</span>t use it by default. Yum
        will <span class="token keyword">then</span> just ignore the repository <span class="token keyword">until</span> you permanently <span class="token builtin class-name">enable</span> it
        again or use <span class="token parameter variable">--enablerepo</span> <span class="token keyword">for</span> temporary usage:

            yum-config-manager <span class="token parameter variable">--disable</span> <span class="token operator">&lt;</span>repoid<span class="token operator">&gt;</span>
        or
            subscription-manager repos <span class="token parameter variable">--disable</span><span class="token operator">=</span><span class="token operator">&lt;</span>repoid<span class="token operator">&gt;</span>

     <span class="token number">5</span>. Configure the failing repository to be skipped, <span class="token keyword">if</span> it is unavailable.
        Note that yum will try to contact the repo. when it runs <span class="token function">most</span> commands,
        so will have to try and fail each <span class="token function">time</span> <span class="token punctuation">(</span>and thus. yum will be be much
        slower<span class="token punctuation">)</span>. If it is a very temporary problem though, this is often a <span class="token function">nice</span>
        compromise:
            yum-config-manager <span class="token parameter variable">--save</span> <span class="token parameter variable">--setopt</span><span class="token operator">=</span><span class="token operator">&lt;</span>repoid<span class="token operator">&gt;</span>.skip_if_unavailable<span class="token operator">=</span>true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>究其原因是mirrorlist.centos.org在国内网络无法访问。</p></blockquote><h2 id="替换为国内源" tabindex="-1"><a class="header-anchor" href="#替换为国内源" aria-hidden="true">#</a> 替换为国内源</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 下载阿里源</span>
<span class="token function">curl</span> <span class="token parameter variable">-o</span> /etc/yum.repos.d/Centos-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo

<span class="token comment"># 清除缓存重新安装软件</span>
yum clean all
yum makecache
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> openssh-server openssh-clients
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),t=[o];function r(l,p){return s(),e("div",null,t)}const d=n(i,[["render",r],["__file","Linuxxiugaiyumyuan.html.vue"]]);export{d as default};
