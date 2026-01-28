import{_ as a,o as s,c as e,a as n}from"./app-be491351.js";const i={},l=n(`<h1 id="linux下进行目录的同步操作" tabindex="-1"><a class="header-anchor" href="#linux下进行目录的同步操作" aria-hidden="true">#</a> Linux下进行目录的同步操作</h1><h1 id="_1-scp" tabindex="-1"><a class="header-anchor" href="#_1-scp" aria-hidden="true">#</a> 1 scp</h1><blockquote><p>最简单的一种目录复制方式。支持从本地复制到服务器，也支持从服务器复制到本地。复制模式全量复制，采用覆盖的方式处理已有文件。</p></blockquote><ul><li>全量复制</li><li>覆盖处理</li><li>速度较快，但不适合增量场景</li></ul><p>语法：<code>scp [参数] [复制目录] [粘贴目录]</code>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 将本地当前目录的dir1 复制到 dir2</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_2-rsync" tabindex="-1"><a class="header-anchor" href="#_2-rsync" aria-hidden="true">#</a> 2 rsync</h1><blockquote><p>更加强大，采用同步的方式进行文件传输操作。</p></blockquote><ul><li>增量复制</li></ul><h2 id="_2-1-应用示例" tabindex="-1"><a class="header-anchor" href="#_2-1-应用示例" aria-hidden="true">#</a> 2.1 应用示例</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 将远程服务器9.77.254.9端口22162的目录/opt/file/Materials/ 同步到 /mnt/e/filetest/ytgzbackup/目录下, 并将日志写到当前目录的temp.log中</span>
<span class="token function">rsync</span> <span class="token parameter variable">-avz</span> <span class="token parameter variable">--delete</span> <span class="token parameter variable">--progress</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;ssh -p 22162&quot;</span> app@9.77.254.9:/opt/file/Materials /mnt/e/filetest/ytgzbackup/ <span class="token operator">&gt;&gt;</span> ./temp.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>参数列表：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>-v, <span class="token parameter variable">--verbose</span> 详细模式输出。
-q, <span class="token parameter variable">--quiet</span> 精简输出模式。
-c, <span class="token parameter variable">--checksum</span> 打开校验开关，强制对文件传输进行校验。
-a, <span class="token parameter variable">--archive</span> 归档模式，表示以递归方式传输文件，并保持所有文件属性，等于-rlptgoD。
-r, <span class="token parameter variable">--recursive</span> 对子目录以递归模式处理。
-R, <span class="token parameter variable">--relative</span> 使用相对路径信息。
-b, <span class="token parameter variable">--backup</span> 创建备份，也就是对于目的已经存在有同样的文件名时，将老的文件重新命名为~filename。可以使用--suffix选项来指定不同的备份文件前缀。
--backup-dir 将备份文件<span class="token punctuation">(</span>如~filename<span class="token punctuation">)</span>存放在在目录下。
<span class="token parameter variable">-suffix</span><span class="token operator">=</span>SUFFIX 定义备份文件前缀。
-u, <span class="token parameter variable">--update</span> 仅仅进行更新，也就是跳过所有已经存在于DST，并且文件时间晚于要备份的文件，不覆盖更新的文件。
-l, <span class="token parameter variable">--links</span> 保留软链结。
-L, --copy-links 想对待常规文件一样处理软链结。
--copy-unsafe-links 仅仅拷贝指向SRC路径目录树以外的链结。
--safe-links 忽略指向SRC路径目录树以外的链结。
-H, --hard-links 保留硬链结。
-p, <span class="token parameter variable">--perms</span> 保持文件权限。
-o, <span class="token parameter variable">--owner</span> 保持文件属主信息。
-g, <span class="token parameter variable">--group</span> 保持文件属组信息。
-D, <span class="token parameter variable">--devices</span> 保持设备文件信息。
-t, <span class="token parameter variable">--times</span> 保持文件时间信息。
-S, <span class="token parameter variable">--sparse</span> 对稀疏文件进行特殊处理以节省DST的空间。
-n, --dry-run现实哪些文件将被传输。
-w, --whole-file 拷贝文件，不进行增量检测。
-x, --one-file-system 不要跨越文件系统边界。
-B, --block-size<span class="token operator">=</span>SIZE 检验算法使用的块尺寸，默认是700字节。
-e, <span class="token parameter variable">--rsh</span><span class="token operator">=</span>command 指定使用rsh、ssh方式进行数据同步。
--rsync-path<span class="token operator">=</span><span class="token environment constant">PATH</span> 指定远程服务器上的rsync命令所在路径信息。
-C, --cvs-exclude 使用和CVS一样的方法自动忽略文件，用来排除那些不希望传输的文件。
<span class="token parameter variable">--existing</span> 仅仅更新那些已经存在于DST的文件，而不备份那些新创建的文件。
<span class="token parameter variable">--delete</span> 删除那些DIST中SRC没有的文件。
--delete-excluded 同样删除接收端那些被该选项指定排除的文件。
--delete-after 传输结束以后再删除。
--ignore-errors 及时出现IO错误也进行删除。
--max-delete<span class="token operator">=</span>NUM 最多删除NUM个文件。
<span class="token parameter variable">--partial</span> 保留那些因故没有完全传输的文件，以是加快随后的再次传输。
<span class="token parameter variable">--force</span> 强制删除目录，即使不为空。
--numeric-ids 不将数字的用户和组id匹配为用户名和组名。
<span class="token parameter variable">--timeout</span><span class="token operator">=</span>time ip超时时间，单位为秒。
-I, --ignore-times 不跳过那些有同样的时间和长度的文件。
--size-only 当决定是否要备份文件时，仅仅察看文件大小而不考虑文件时间。
--modify-window<span class="token operator">=</span>NUM 决定文件是否时间相同时使用的时间戳窗口，默认为0。
<span class="token parameter variable">-T</span> --temp-dir<span class="token operator">=</span>DIR 在DIR中创建临时文件。
--compare-dest<span class="token operator">=</span>DIR 同样比较DIR中的文件来决定是否需要备份。
<span class="token parameter variable">-P</span> 等同于 --partial。
<span class="token parameter variable">--progress</span> 显示备份过程。
-z, <span class="token parameter variable">--compress</span> 对备份的文件在传输时进行压缩处理。
<span class="token parameter variable">--exclude</span><span class="token operator">=</span>PATTERN 指定排除不需要传输的文件模式。
<span class="token parameter variable">--include</span><span class="token operator">=</span>PATTERN 指定不排除而需要传输的文件模式。
--exclude-from<span class="token operator">=</span>FILE 排除FILE中指定模式的文件。
--include-from<span class="token operator">=</span>FILE 不排除FILE指定模式匹配的文件。
<span class="token parameter variable">--version</span> 打印版本信息。
<span class="token parameter variable">--address</span> 绑定到特定的地址。
<span class="token parameter variable">--config</span><span class="token operator">=</span>FILE 指定其他的配置文件，不使用默认的rsyncd.conf文件。
<span class="token parameter variable">--port</span><span class="token operator">=</span>PORT 指定其他的rsync服务端口。
--blocking-io 对远程shell使用阻塞IO。
<span class="token parameter variable">-stats</span> 给出某些文件的传输状态。
<span class="token parameter variable">--progress</span> 在传输时显示传输过程。
--log-format<span class="token operator">=</span>formAT 指定日志文件格式。
--password-file<span class="token operator">=</span>FILE 从FILE中得到密码。
<span class="token parameter variable">--bwlimit</span><span class="token operator">=</span>KBPS 限制I/O带宽，KBytes per second。
-h, <span class="token parameter variable">--help</span> 显示帮助信息。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_3-sftp" tabindex="-1"><a class="header-anchor" href="#_3-sftp" aria-hidden="true">#</a> 3 sftp</h1>`,16),r=[l];function d(p,c){return s(),e("div",null,r)}const v=a(i,[["render",d],["__file","Linuxxiajinxingmulutongbucaozuo.html.vue"]]);export{v as default};
