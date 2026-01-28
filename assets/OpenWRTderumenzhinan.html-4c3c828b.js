import{_ as l,r as i,o as t,c as o,b as n,d as s,e,a as c}from"./app-be491351.js";const p={},r=n("h1",{id:"openwrt的入门指南",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#openwrt的入门指南","aria-hidden":"true"},"#"),s(" OpenWRT的入门指南")],-1),d=n("blockquote",null,[n("p",null,"折腾最终目标：科学上网，广告拦截，内网穿透，NAS，轻网站服务，远程Wol设备唤醒，网络控制。 可以考虑的功能：多线多播，家长控制。")],-1),u=n("h2",{id:"_1-什么是openwrt",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-什么是openwrt","aria-hidden":"true"},"#"),s(" 1 什么是OpenWRT")],-1),v=n("p",null,"OpenWrt 不是一个单一且不可更改的固件，而是提供了一个完全可写的文件系统及软件包管理。这使您可以不使用供应商提供的应用程序选择和配置，而是通过使用软件包来定制设备以适应任何应用程序。对于开发人员来说，OpenWrt 是一个构建应用程序的框架，无需在其周围构建完整的固件; 对于普通用户来说，这意味着拥有了完全定制的能力，能以意想不到的方式使用该设备。",-1),m={href:"https://github.com/openwrt/openwrt",target:"_blank",rel:"noopener noreferrer"},b=n("ul",null,[n("li",null,"如果您需要一个经过长期验证的稳定系统，且对全球社区资源有需求，OpenWRT 是首选。")],-1),k={href:"https://github.com/immortalwrt/immortalwrt",target:"_blank",rel:"noopener noreferrer"},h=n("ul",null,[n("li",null,"如果您希望体验更快速的更新和更高的代码质量，LEDE 能满足您的需求。")],-1),f={href:"https://github.com/coolsnowwolf/lede",target:"_blank",rel:"noopener noreferrer"},g=n("ul",null,[n("li",null,"。如果不需要使用新的一些插件和新特性。或者老设备，可以使用。")],-1),_=c(`<blockquote><p>OpenWrt通常的默认网关是<code>192.168.1.1</code>。</p></blockquote><h2 id="_2-适合折腾的路由器" tabindex="-1"><a class="header-anchor" href="#_2-适合折腾的路由器" aria-hidden="true">#</a> 2 适合折腾的路由器</h2><p>自己手头可以折腾的路由器。</p><ul><li>PHICOMM K3 A1</li><li>Cudy TR3000</li></ul><h2 id="_3-路由器固件扩容" tabindex="-1"><a class="header-anchor" href="#_3-路由器固件扩容" aria-hidden="true">#</a> 3 路由器固件扩容</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 编辑扩容文件 如果要扩容</span>
/home/yiueil-wsl/openwrt/target/linux/mediatek/dts/mt7981b-cudy-tr3000-v1.dtsi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-基于源码编译固件" tabindex="-1"><a class="header-anchor" href="#_4-基于源码编译固件" aria-hidden="true">#</a> 4 基于源码编译固件</h2><h3 id="_4-1-基于openwrt编译" tabindex="-1"><a class="header-anchor" href="#_4-1-基于openwrt编译" aria-hidden="true">#</a> 4.1 基于openwrt编译</h3><blockquote><p>官方地址：https://github.com/openwrt/openwrt</p></blockquote><ul><li>需要一个Linux环境，我这里使用的是基于Windows的WSL子系统的Ubuntu24.04 LTS。我这里以编译cudy tr3000的固件为例： 首次编译：</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 拉取源码</span>
<span class="token function">git</span> clone https://github.com/openwrt/openwrt.git

<span class="token comment"># 进入源码主目录</span>
<span class="token builtin class-name">cd</span> openwrt

<span class="token comment"># 更新软件包</span>
./scripts/feeds update <span class="token parameter variable">-a</span>

<span class="token comment"># 安装软件包</span>
./scripts/feeds <span class="token function">install</span> <span class="token parameter variable">-a</span>

<span class="token comment"># 固件配置</span>
<span class="token function">make</span> menuconfig

<span class="token comment"># 所需插件依赖下载</span>
<span class="token function">make</span> download <span class="token parameter variable">-j8</span>

<span class="token comment"># 进行构建（第一次构建建议单线程）</span>
<span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span>/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin <span class="token function">make</span> <span class="token assign-left variable">V</span><span class="token operator">=</span>s <span class="token parameter variable">-j1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>二次编译：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> openwrt
<span class="token function">git</span> pull
./scripts/feeds update <span class="token parameter variable">-a</span>
./scripts/feeds <span class="token function">install</span> <span class="token parameter variable">-a</span>
<span class="token function">make</span> defconfig
<span class="token function">make</span> download <span class="token parameter variable">-j8</span>
<span class="token function">make</span> <span class="token assign-left variable">V</span><span class="token operator">=</span>s -j<span class="token variable"><span class="token variable">$(</span>nproc<span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如需修改配置</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">rm</span> <span class="token parameter variable">-rf</span> .config
<span class="token function">make</span> menuconfig
<span class="token function">make</span> <span class="token assign-left variable">V</span><span class="token operator">=</span>s -j<span class="token variable"><span class="token variable">$(</span>nproc<span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-基于lede编译" tabindex="-1"><a class="header-anchor" href="#_4-2-基于lede编译" aria-hidden="true">#</a> 4.2 基于LEDE编译</h3><blockquote><p>仓库地址：https://github.com/coolsnowwolf/lede</p></blockquote><ul><li>给Phicomm K3 编译一个固件。 首次编译：</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1 安装依赖</span>
<span class="token function">sudo</span> <span class="token function">apt</span> update <span class="token parameter variable">-y</span>
<span class="token function">sudo</span> <span class="token function">apt</span> full-upgrade <span class="token parameter variable">-y</span>
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> ack antlr3 asciidoc autoconf automake autopoint binutils bison build-essential <span class="token punctuation">\\</span>
<span class="token function">bzip2</span> ccache clang cmake cpio <span class="token function">curl</span> device-tree-compiler flex <span class="token function">gawk</span> gcc-multilib g++-multilib gettext <span class="token punctuation">\\</span>
genisoimage <span class="token function">git</span> gperf haveged help2man intltool libc6-dev-i386 libelf-dev libfuse-dev libglib2.0-dev <span class="token punctuation">\\</span>
libgmp3-dev libltdl-dev libmpc-dev libmpfr-dev libncurses5-dev libncursesw5-dev libpython3-dev <span class="token punctuation">\\</span>
libreadline-dev libssl-dev libtool llvm lrzsz msmtp ninja-build p7zip p7zip-full patch pkgconf <span class="token punctuation">\\</span>
python3 python3-pyelftools python3-setuptools qemu-utils <span class="token function">rsync</span> scons squashfs-tools subversion <span class="token punctuation">\\</span>
swig texinfo uglifyjs upx-ucl <span class="token function">unzip</span> <span class="token function">vim</span> <span class="token function">wget</span> xmlto xxd zlib1g-dev

<span class="token comment"># 2 拉取代码更新下载和配置</span>
<span class="token function">git</span> clone https://github.com/coolsnowwolf/lede
<span class="token builtin class-name">cd</span> lede
./scripts/feeds update <span class="token parameter variable">-a</span>
./scripts/feeds <span class="token function">install</span> <span class="token parameter variable">-a</span>
<span class="token function">make</span> menuconfig

<span class="token comment"># 3 下载 dl 库，编译固件 （-j 后面是线程数，第一次编译推荐用单线程）</span>
<span class="token function">make</span> download <span class="token parameter variable">-j8</span>
<span class="token function">make</span> <span class="token assign-left variable">V</span><span class="token operator">=</span>s <span class="token parameter variable">-j1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Phicomm K3的核心配置：</p><ul><li><strong>Target System</strong>: <code>Broadcom BCM47xx/53xx (ARMv7)</code></li><li><strong>Target Profile</strong>: <code>PHICOMM K3</code></li><li><strong>基础功能</strong>：勾选<code>LuCI → Collections → luci</code>（Web管理界面）。</li><li>可选功能：SSH (<code>openssh-server</code>)、广告过滤 (<code>adblock</code>)、文件共享 (<code>samba4-server</code>)。</li></ul><p>二次编译：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> lede
<span class="token function">git</span> pull
./scripts/feeds update <span class="token parameter variable">-a</span>
./scripts/feeds <span class="token function">install</span> <span class="token parameter variable">-a</span>
<span class="token function">make</span> defconfig
<span class="token function">make</span> download <span class="token parameter variable">-j8</span>
<span class="token function">make</span> <span class="token assign-left variable">V</span><span class="token operator">=</span>s -j<span class="token variable"><span class="token variable">$(</span>nproc<span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重新配置：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">rm</span> <span class="token parameter variable">-rf</span> .config
<span class="token function">make</span> menuconfig
<span class="token function">make</span> <span class="token assign-left variable">V</span><span class="token operator">=</span>s -j<span class="token variable"><span class="token variable">$(</span>nproc<span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,25);function w(x,E){const a=i("ExternalLinkIcon");return t(),o("div",null,[r,d,u,v,n("ul",null,[n("li",null,[n("a",m,[s("OpenWrt"),e(a)]),s("：权威的官方版本。 "),b]),n("li",null,[n("a",k,[s("immortalWrt"),e(a)]),s("：ImmortalWRT 是由国内开发者基于 OpenWRT 和 LEDE 分叉而来，专注于满足国内用户的特殊需求。由于国内网络环境的特殊性，ImmortalWRT 集成了许多针对性的优化和功能，如去广告、科学上网等。 "),h]),n("li",null,[s("[LEDT]("),n("a",f,[s("coolsnowwolf/lede: Lean's LEDE source"),e(a)]),s(")：LEDE（Linux Embedded Development Environment）项目于 2016 年由部分 OpenWRT 开发者分叉创建，旨在解决当时 OpenWRT 项目管理和开发过程中的一些问题，如更新滞后、代码质量下降等。LEDE 强调透明的开发流程和高质量的代码。2018 年，LEDE 与 OpenWRT 项目重新合并，但 LEDE 的理念和改进被保留并融入了 OpenWRT。 "),g])]),_])}const T=l(p,[["render",w],["__file","OpenWRTderumenzhinan.html.vue"]]);export{T as default};
