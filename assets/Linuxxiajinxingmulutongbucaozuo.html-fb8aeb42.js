import{_ as n,o as e,c as s,d as i}from"./app-e52793aa.js";const a={},d=i(`<h1 id="linux下进行目录的同步操作" tabindex="-1"><a class="header-anchor" href="#linux下进行目录的同步操作" aria-hidden="true">#</a> Linux下进行目录的同步操作</h1><h1 id="_1-scp" tabindex="-1"><a class="header-anchor" href="#_1-scp" aria-hidden="true">#</a> 1 scp</h1><blockquote><p>最简单的一种目录复制方式。支持从本地复制到服务器，也支持从服务器复制到本地。复制模式全量复制，采用覆盖的方式处理已有文件。</p></blockquote><ul><li>全量复制</li><li>覆盖处理</li><li>速度较快，但不适合增量场景</li></ul><p>语法：<code>scp [参数] [复制目录] [粘贴目录]</code>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 将本地当前目录的dir1 复制到 dir2</span>
<span class="token function">scp</span> <span class="token parameter variable">-r</span> ./dir1 ./dir2

<span class="token comment"># 将本地当前目录的dir1目录 复制到 目标服务器的用户目录的dir2目录下 -P参数指定服务器的SSH端口</span>
<span class="token function">scp</span> <span class="token parameter variable">-r</span> <span class="token parameter variable">-P63222</span> ./dir1 yiueil@192.168.31.154:~/dir2

<span class="token comment"># 将远程服务器用户目录的dir2 复制到 本地的当前目录的dir3下</span>
<span class="token function">scp</span> <span class="token parameter variable">-r</span> <span class="token parameter variable">-P63222</span> yiueil@192.168.31.154:~/dir2 ./dir3

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参数列表：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>-1：使用ssh协议版本1；
-2：使用ssh协议版本2；
-4：使用ipv4；
-6：使用ipv6；
-B：以批处理模式运行；
-C：使用压缩；
-F：指定ssh配置文件；
-i：identity_file 从指定文件中读取传输时使用的密钥文件（例如亚马逊云pem），此参数直接传递给ssh；
-l：指定宽带限制；
-o：指定使用的ssh选项；
-P：指定远程主机的端口号；
-p：保留文件的最后修改时间，最后访问时间和权限模式；
-q：不显示复制进度；
-r：以递归方式复制。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_2-rsync" tabindex="-1"><a class="header-anchor" href="#_2-rsync" aria-hidden="true">#</a> 2 rsync</h1><h1 id="_3-sftp" tabindex="-1"><a class="header-anchor" href="#_3-sftp" aria-hidden="true">#</a> 3 sftp</h1>`,10),l=[d];function r(c,t){return e(),s("div",null,l)}const v=n(a,[["render",r],["__file","Linuxxiajinxingmulutongbucaozuo.html.vue"]]);export{v as default};
