import{_ as s,o as n,c as e,a}from"./app-be491351.js";const i={},t=a(`<h1 id="ubuntu24的ssh配置" tabindex="-1"><a class="header-anchor" href="#ubuntu24的ssh配置" aria-hidden="true">#</a> Ubuntu24的SSH配置</h1><h2 id="_1-安装服务" tabindex="-1"><a class="header-anchor" href="#_1-安装服务" aria-hidden="true">#</a> 1 安装服务</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> openssh-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_2-修改配置文件-etc-ssh-sshd-config" tabindex="-1"><a class="header-anchor" href="#_2-修改配置文件-etc-ssh-sshd-config" aria-hidden="true">#</a> 2 修改配置文件/etc/ssh/sshd_config</h2><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code><span class="token comment"># 允许公钥访问</span>
<span class="token key attr-name">PubkeyAuthentication</span> <span class="token value attr-value">yes</span>
<span class="token comment"># 禁止密码访问</span>
<span class="token key attr-name">PasswordAuthentication</span> <span class="token value attr-value">no</span>
<span class="token comment"># 按需调整端口</span>
<span class="token key attr-name">Port</span> <span class="token value attr-value">63222</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>修改端口需要同时修改套接字文件中监听的端口，否则重启服务不生效，仍然监听22端口。</p></blockquote><h2 id="_3-重启服务" tabindex="-1"><a class="header-anchor" href="#_3-重启服务" aria-hidden="true">#</a> 3 重启服务</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> systemctl restart <span class="token function">ssh</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>可能遇到的问题：配置了禁止密码访问，但是还是可以通过密码访问，可以通过命令<code>sudo sshd -T | grep -i passwordauthentication</code>查询实际生效的值。期望输出是<code>no</code>。如果输出了<code>yes</code>，则重点检查是否是<code>sshd_config.d</code>目录下面有相关配置，需要进行注释。</p></blockquote><h2 id="_4-证书公钥部署" tabindex="-1"><a class="header-anchor" href="#_4-证书公钥部署" aria-hidden="true">#</a> 4 证书公钥部署</h2><blockquote><p>将客户端生成的SSH公钥添加到<code>authorized_keys</code>中。</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> ~/.ssh
<span class="token function">chmod</span> <span class="token number">700</span> ~/.ssh
<span class="token function">chmod</span> <span class="token number">600</span> ~/.ssh/authorized_keys
<span class="token function">vim</span> authorized_keys
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-连接测试" tabindex="-1"><a class="header-anchor" href="#_5-连接测试" aria-hidden="true">#</a> 5 连接测试</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>D:<span class="token punctuation">\\</span>YIueil<span class="token punctuation">\\</span>WorkSpace<span class="token punctuation">\\</span>Code<span class="token operator">&gt;</span>ssh yiueil@192.168.31.154 <span class="token parameter variable">-p63222</span>
Welcome to Ubuntu <span class="token number">24.04</span>.2 LTS <span class="token punctuation">(</span>GNU/Linux <span class="token number">6.11</span>.0-24-generic x86_64<span class="token punctuation">)</span>

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

扩展安全维护（ESM）Applications 未启用。

<span class="token number">0</span> 更新可以立即应用。

启用 ESM Apps 来获取未来的额外安全更新
请参见 https://ubuntu.com/esm 或者运行: <span class="token function">sudo</span> pro status

Last login: Sat Apr <span class="token number">19</span> 02:31:04 <span class="token number">2025</span> from <span class="token number">192.168</span>.31.77
yiueil@yiueil-X99:~$
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>至此，完成了服务器端SSH的配置。</p></blockquote>`,15),c=[t];function d(l,o){return n(),e("div",null,c)}const r=s(i,[["render",d],["__file","Ubuntu24deSSHpeizhi.html.vue"]]);export{r as default};
