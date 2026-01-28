import{_ as n,o as s,c as a,a as e}from"./app-be491351.js";const t={},i=e(`<h1 id="ubuntu部署webdav" tabindex="-1"><a class="header-anchor" href="#ubuntu部署webdav" aria-hidden="true">#</a> Ubuntu部署Webdav</h1><h2 id="_1-使用第三方-github-包部署" tabindex="-1"><a class="header-anchor" href="#_1-使用第三方-github-包部署" aria-hidden="true">#</a> 1 使用第三方 Github 包部署</h2><h3 id="_1-1-下载包" tabindex="-1"><a class="header-anchor" href="#_1-1-下载包" aria-hidden="true">#</a> 1.1 下载包</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 下载第三方包</span>
<span class="token function">wget</span> https://github.com/hacdias/webdav/releases/download/v5.8.0/linux-amd64-webdav.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>下载完成后解压得到二进制文件。</p></blockquote><h3 id="_1-2-当前目录下操作" tabindex="-1"><a class="header-anchor" href="#_1-2-当前目录下操作" aria-hidden="true">#</a> 1.2 当前目录下操作</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建 data 目录作为 webdav 的根目录</span>
<span class="token function">mkdir</span> data

<span class="token comment"># 创建配置文件</span>
<span class="token function">touch</span> config.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-配置文件" tabindex="-1"><a class="header-anchor" href="#_1-3-配置文件" aria-hidden="true">#</a> 1.3 配置文件</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> config.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一个示例配置文件</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">address</span><span class="token punctuation">:</span> 0.0.0.0
<span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">6065</span>

<span class="token comment"># TLS-related settings if you want to enable TLS directly.</span>
<span class="token key atrule">tls</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
<span class="token key atrule">cert</span><span class="token punctuation">:</span> cert.pem
<span class="token key atrule">key</span><span class="token punctuation">:</span> key.pem

<span class="token comment"># Prefix to apply to the WebDAV path-ing. Default is &#39;/&#39;.</span>
<span class="token key atrule">prefix</span><span class="token punctuation">:</span> /

<span class="token comment"># Enable or disable debug logging. Default is &#39;false&#39;.</span>
<span class="token key atrule">debug</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>

<span class="token comment"># Disable sniffing the files to detect their content type. Default is &#39;false&#39;.</span>
<span class="token key atrule">noSniff</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>

<span class="token comment"># Whether the server runs behind a trusted proxy or not. When this is true,</span>
<span class="token comment"># the header X-Forwarded-For will be used for logging the remote addresses</span>
<span class="token comment"># of logging attempts (if available).</span>
<span class="token key atrule">behindProxy</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>

<span class="token comment"># The directory that will be able to be accessed by the users when connecting.</span>
<span class="token comment"># This directory will be used by users unless they have their own &#39;directory&#39; defined.</span>
<span class="token comment"># Default is &#39;.&#39; (current directory).</span>
<span class="token key atrule">directory</span><span class="token punctuation">:</span> .

<span class="token comment"># The default permissions for users. This is a case insensitive option. Possible</span>
<span class="token comment"># permissions: C (Create), R (Read), U (Update), D (Delete). You can combine multiple</span>
<span class="token comment"># permissions. For example, to allow to read and create, set &quot;RC&quot;. Default is &quot;R&quot;.</span>
<span class="token key atrule">permissions</span><span class="token punctuation">:</span> R

<span class="token comment"># The default permissions rules for users. Default is none. Rules are applied</span>
<span class="token comment"># from last to first, that is, the first rule that matches the request, starting</span>
<span class="token comment"># from the end, will be applied to the request. Rule paths are always relative to</span>
<span class="token comment"># the user&#39;s directory.</span>
<span class="token key atrule">rules</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token comment"># The behavior of redefining the rules for users. It can be:</span>
<span class="token comment"># - overwrite: when a user has rules defined, these will overwrite any global</span>
<span class="token comment">#   rules already defined. That is, the global rules are not applicable to the</span>
<span class="token comment">#   user.</span>
<span class="token comment"># - append: when a user has rules defined, these will be appended to the global</span>
<span class="token comment">#   rules already defined. That is, for this user, their own specific rules will</span>
<span class="token comment">#   be checked first, and then the global rules.</span>
<span class="token comment"># Default is &#39;overwrite&#39;.</span>
<span class="token key atrule">rulesBehavior</span><span class="token punctuation">:</span> overwrite

<span class="token comment"># Logging configuration</span>
<span class="token key atrule">log</span><span class="token punctuation">:</span>
  <span class="token comment"># Logging format (&#39;console&#39;, &#39;json&#39;). Default is &#39;console&#39;.</span>
  <span class="token key atrule">format</span><span class="token punctuation">:</span> console
  <span class="token comment"># Enable or disable colors. Default is &#39;true&#39;. Only applied if format is &#39;console&#39;.</span>
  <span class="token key atrule">colors</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token comment"># Logging outputs. You can have more than one output. Default is only &#39;stderr&#39;.</span>
  <span class="token key atrule">outputs</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> stderr

<span class="token comment"># CORS configuration</span>
<span class="token key atrule">cors</span><span class="token punctuation">:</span>
  <span class="token comment"># Whether or not CORS configuration should be applied. Default is &#39;false&#39;.</span>
  <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">credentials</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">allowed_headers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Depth
  <span class="token key atrule">allowed_hosts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span><span class="token number">8080</span>
  <span class="token key atrule">allowed_methods</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> GET
  <span class="token key atrule">exposed_headers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Content<span class="token punctuation">-</span>Length
    <span class="token punctuation">-</span> Content<span class="token punctuation">-</span>Range

<span class="token comment"># The list of users. If the list is empty, then there will be no authentication.</span>
<span class="token comment"># Otherwise, basic authentication will automatically be configured.</span>
<span class="token comment">#</span>
<span class="token comment"># If you&#39;re delegating the authentication to a different service, you can proxy</span>
<span class="token comment"># the username using basic authentication, and then disable webdav&#39;s password</span>
<span class="token comment"># check using the option:</span>
<span class="token comment">#</span>
<span class="token comment"># noPassword: true</span>
<span class="token key atrule">users</span><span class="token punctuation">:</span>
  <span class="token comment"># Example &#39;admin&#39; user with plaintext password.</span>
  <span class="token punctuation">-</span> <span class="token key atrule">username</span><span class="token punctuation">:</span> admin
    <span class="token key atrule">password</span><span class="token punctuation">:</span> admin
  <span class="token comment"># Example &#39;john&#39; user with bcrypt encrypted password, with custom directory.</span>
  <span class="token comment"># You can generate a bcrypt-encrypted password by using the &#39;webdav bcrypt&#39;</span>
  <span class="token comment"># command lint utility.</span>
  <span class="token punctuation">-</span> <span class="token key atrule">username</span><span class="token punctuation">:</span> john
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token string">&quot;{bcrypt}$2y$10$zEP6oofmXFeHaeMfBNLnP.DO8m.H.Mwhd24/TOX2MWLxAExXi4qgi&quot;</span>
    <span class="token key atrule">directory</span><span class="token punctuation">:</span> /another/path
  <span class="token comment"># Example user whose details will be picked up from the environment.</span>
  <span class="token punctuation">-</span> <span class="token key atrule">username</span><span class="token punctuation">:</span> <span class="token string">&quot;{env}ENV_USERNAME&quot;</span>
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token string">&quot;{env}ENV_PASSWORD&quot;</span>
  <span class="token punctuation">-</span> <span class="token key atrule">username</span><span class="token punctuation">:</span> basic
    <span class="token key atrule">password</span><span class="token punctuation">:</span> basic
    <span class="token comment"># Override default permissions.</span>
    <span class="token key atrule">permissions</span><span class="token punctuation">:</span> CRUD
    <span class="token key atrule">rules</span><span class="token punctuation">:</span>
      <span class="token comment"># With this rule, the user CANNOT access {user directory}/some/files.</span>
      <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /some/file
        <span class="token key atrule">permissions</span><span class="token punctuation">:</span> none
      <span class="token comment"># With this rule, the user CAN create, read, update and delete within</span>
      <span class="token comment"># {user directory}/public/access.</span>
      <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /public/access/
        <span class="token key atrule">permissions</span><span class="token punctuation">:</span> CRUD
      <span class="token comment"># With this rule, the user CAN read and update all files ending with .js.</span>
      <span class="token comment"># It uses a regular expression.</span>
      <span class="token punctuation">-</span> <span class="token key atrule">regex</span><span class="token punctuation">:</span> <span class="token string">&quot;^.+.js$&quot;</span>
        <span class="token key atrule">permissions</span><span class="token punctuation">:</span> RU
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-4-启动-webdav-服务" tabindex="-1"><a class="header-anchor" href="#_1-4-启动-webdav-服务" aria-hidden="true">#</a> 1.4 启动 WebDAV 服务</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 直接运行</span>
./webdav

<span class="token comment"># 后台运行</span>
./webdav <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-5-注册为系统服务" tabindex="-1"><a class="header-anchor" href="#_1-5-注册为系统服务" aria-hidden="true">#</a> 1.5 注册为系统服务*</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建 Service 文件</span>
<span class="token function">vim</span> /etc/systemd/system/webdav.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>具体录入内容</p><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Unit</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">Description</span><span class="token punctuation">=</span><span class="token value attr-value">WebDAV</span>
<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Service</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">ExecStart</span><span class="token punctuation">=</span><span class="token value attr-value">/path/to/webdav</span>
<span class="token key attr-name">Restart</span><span class="token punctuation">=</span><span class="token value attr-value">always</span>
<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Install</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">WantedBy</span><span class="token punctuation">=</span><span class="token value attr-value">multi-user.target</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 启动服务</span>
<span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> webdav.service

<span class="token comment"># 启动服务</span>
<span class="token function">sudo</span> systemctl start webdav.service

<span class="token comment"># 查看服务状态</span>
<span class="token function">sudo</span> systemctl status webdav.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-使用-nginx-部署" tabindex="-1"><a class="header-anchor" href="#_2-使用-nginx-部署" aria-hidden="true">#</a> 2 使用 Nginx 部署</h2><h2 id="_3-使用-apache-部署" tabindex="-1"><a class="header-anchor" href="#_3-使用-apache-部署" aria-hidden="true">#</a> 3 使用 Apache 部署</h2>`,20),l=[i];function c(o,p){return s(),a("div",null,l)}const u=n(t,[["render",c],["__file","UbuntubushuWebdav.html.vue"]]);export{u as default};
