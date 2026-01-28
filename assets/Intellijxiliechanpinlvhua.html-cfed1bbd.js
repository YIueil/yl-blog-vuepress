import{_ as a,r as t,o as i,c as l,b as n,d as s,e as o,a as c}from"./app-be491351.js";const p={},r=n("h1",{id:"intellij系列产品绿化",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#intellij系列产品绿化","aria-hidden":"true"},"#"),s(" Intellij系列产品绿化")],-1),d={href:"https://gitee.com/ja-netfilter/ja-netfilter",target:"_blank",rel:"noopener noreferrer"},m=c(`<h2 id="_1-修改idea-properties" tabindex="-1"><a class="header-anchor" href="#_1-修改idea-properties" aria-hidden="true">#</a> 1 修改idea.properties</h2><blockquote><p>主要修改system和config所在的目录, 修改到上级的目录.</p></blockquote><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code><span class="token comment"># Use \${idea.home.path} macro to specify location relative to IDE installation home.</span>
<span class="token comment"># Use \${xxx} where xxx is any Java property (including defined in previous lines of this file) to refer to its value.</span>
<span class="token comment"># Note for Windows users: please make sure you&#39;re using forward slashes: C:/dir1/dir2.</span>

<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># Uncomment this option if you want to customize a path to the settings directory.</span>
<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token key attr-name">idea.config.path</span><span class="token punctuation">=</span><span class="token value attr-value">../.IntelliJIdea/config</span>

<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># Uncomment this option if you want to customize a path to the caches directory.</span>
<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token key attr-name">idea.system.path</span><span class="token punctuation">=</span><span class="token value attr-value">../.IntelliJIdea/system</span>

<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># Uncomment this option if you want to customize a path to the user-installed plugins directory.</span>
<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token key attr-name">idea.plugins.path</span><span class="token punctuation">=</span><span class="token value attr-value">\${idea.config.path}/plugins</span>

<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># Uncomment this option if you want to customize a path to the logs directory.</span>
<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token key attr-name">idea.log.path</span><span class="token punctuation">=</span><span class="token value attr-value">\${idea.system.path}/log</span>

<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># Maximum file size (in KiB) IDE should provide code assistance for.</span>
<span class="token comment"># The larger file is the slower its editor works and higher overall system memory requirements are</span>
<span class="token comment"># if code assistance is enabled. Remove this property or set to very large number if you need</span>
<span class="token comment"># code assistance for any files available regardless of their size.</span>
<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token key attr-name">idea.max.intellisense.filesize</span><span class="token punctuation">=</span><span class="token value attr-value">2500</span>

<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># Maximum file size (in KiB) the IDE is able to open.</span>
<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token key attr-name">idea.max.content.load.filesize</span><span class="token punctuation">=</span><span class="token value attr-value">20000</span>

<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># This option controls console cyclic buffer: keeps the console output size not higher than the specified buffer size (KiB).</span>
<span class="token comment"># Older lines are deleted. In order to disable cycle buffer use idea.cycle.buffer.size=disabled</span>
<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token key attr-name">idea.cycle.buffer.size</span><span class="token punctuation">=</span><span class="token value attr-value">1024</span>

<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># Configure if a special launcher should be used when running processes from within IDE.</span>
<span class="token comment"># Using Launcher enables &quot;soft exit&quot; and &quot;thread dump&quot; features</span>
<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token key attr-name">idea.no.launcher</span><span class="token punctuation">=</span><span class="token value attr-value">false</span>

<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># To avoid too long classpath</span>
<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token key attr-name">idea.dynamic.classpath</span><span class="token punctuation">=</span><span class="token value attr-value">false</span>

<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># There are two possible values of idea.popup.weight property: &quot;heavy&quot; and &quot;medium&quot;.</span>
<span class="token comment"># If you have WM configured as &quot;Focus follows mouse with Auto Raise&quot; then you have to</span>
<span class="token comment"># set this property to &quot;medium&quot;. It prevents problems with popup menus on some</span>
<span class="token comment"># configurations.</span>
<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token key attr-name">idea.popup.weight</span><span class="token punctuation">=</span><span class="token value attr-value">heavy</span>

<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># Removing this property may lead to editor performance degradation under Windows.</span>
<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token key attr-name">sun.java2d.d3d</span><span class="token punctuation">=</span><span class="token value attr-value">false</span>

<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># Removing this property may lead to editor performance degradation on Java 8+.</span>
<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token key attr-name">swing.bufferPerWindow</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>

<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># Removing this property may lead to editor performance degradation under X Window.</span>
<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token key attr-name">sun.java2d.pmoffscreen</span><span class="token punctuation">=</span><span class="token value attr-value">false</span>

<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># Enables HiDPI support in JBR</span>
<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token key attr-name">sun.java2d.uiScale.enabled</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>

<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># Applicable to the Swing text components displaying HTML (except JEditorPane).</span>
<span class="token comment"># Rebases CSS size map depending on the component&#39;s font size to let relative</span>
<span class="token comment"># font size values (smaller, larger) scale properly. JBR-only.</span>
<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token key attr-name">javax.swing.rebaseCssSizeMap</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>


<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># Workaround for accessing (in terms of a11y) long VCS logs on macOS. JBR-only.</span>
<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token key attr-name">sun.awt.mac.a11y.tableAccessibleRowCountThreshold</span><span class="token punctuation">=</span><span class="token value attr-value">1000</span>

<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># Enabling an optimization that excludes traversal of collapsed accessible nodes from the accessible tree. JBR-4167</span>
<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token key attr-name">javax.swing.JTree.excludeAccessibleChildrenFromClosedNodes</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>

<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># Workaround to avoid long hangs while accessing clipboard under Mac OS X.</span>
<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment">#ide.mac.useNativeClipboard=True</span>

<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># Maximum size (KiB) the IDE will use to show historical file contents -</span>
<span class="token comment"># in Show Diff or when calculating Digest Diff</span>
<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment">#idea.max.vcs.loaded.size.kb=20480</span>

<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># IDEA file chooser peeks inside directories to detect whether they contain a valid project</span>
<span class="token comment"># (to mark such directories with a corresponding icon).</span>
<span class="token comment"># Uncommenting the option prevents this behavior outside the user home directory.</span>
<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment">#idea.chooser.lookup.for.project.dirs=false</span>

<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># In LWCToolkit.invokeAndWait() listens to EDT state and disposes the invocation event</span>
<span class="token comment"># when EDT becomes free but the invocation event is not yet dispatched (considered lost).</span>
<span class="token comment"># This prevents a deadlock and makes the invocation return some default result.</span>
<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token key attr-name">sun.lwawt.macosx.LWCToolkit.invokeAndWait.disposeOnEDTFree</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>

<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># Experimental options that do a number of things to make truly smooth scrolling possible:</span>
<span class="token comment">#</span>
<span class="token comment"># * Enables hardware-accelerated scrolling.</span>
<span class="token comment">#     Blit-acceleration copies as much of the rendered area as possible and then repaints only newly exposed region.</span>
<span class="token comment">#     This helps to improve scrolling performance and to reduce CPU usage (especially if drawing is compute-intensive).</span>
<span class="token comment">#</span>
<span class="token comment"># * Enables &quot;true double buffering&quot;.</span>
<span class="token comment">#     True double buffering is needed to eliminate tearing on blit-accelerated scrolling and to restore</span>
<span class="token comment">#     frame buffer content without the usual repainting, even when the EDT is blocked.</span>
<span class="token comment">#</span>
<span class="token comment"># * Adds &quot;idea.true.smooth.scrolling.debug&quot; option.</span>
<span class="token comment">#     Checks whether blit-accelerated scrolling is feasible, and if so, checks whether true double buffering is available.</span>
<span class="token comment">#</span>
<span class="token comment"># * Enables handling of high-precision mouse wheel events.</span>
<span class="token comment">#     Although Java 7 introduced MouseWheelEven.getPreciseWheelRotation() method, JScrollPane doesn&#39;t use it so far.</span>
<span class="token comment">#     Depends on the Editor / General / Smooth Scrolling setting, remote desktop detection and power save mode state.</span>
<span class="token comment">#     Ideally, we need to patch the runtime (on Windows, Linux and macOS) to improve handling of the fine-grained input data.</span>
<span class="token comment">#     This feature can be toggled via &quot;idea.true.smooth.scrolling.high.precision&quot; option.</span>
<span class="token comment">#</span>
<span class="token comment"># * Enables handling of pixel-perfect scrolling events.</span>
<span class="token comment">#     Currently, this mode is available only under macOS with JetBrains Runtime.</span>
<span class="token comment">#     This feature can be toggled via &quot;idea.true.smooth.scrolling.pixel.perfect&quot; option.</span>
<span class="token comment">#</span>
<span class="token comment"># * Enables interpolation of scrolling input (scrollbar, mouse wheel, touchpad, keys, etc).</span>
<span class="token comment">#     Smooths input, which lacks both spatial and temporal resolution, performs the rendering asynchronously.</span>
<span class="token comment">#     Depends on the Editor / General / Smooth Scrolling setting, remote desktop detection and power save mode state.</span>
<span class="token comment">#     The feature can be tweaked using the following options:</span>
<span class="token comment">#       &quot;idea.true.smooth.scrolling.interpolation&quot; - the main switch</span>
<span class="token comment">#       &quot;idea.true.smooth.scrolling.interpolation.scrollbar&quot; - scrollbar interpolation</span>
<span class="token comment">#       &quot;idea.true.smooth.scrolling.interpolation.scrollbar.delay&quot; - initial delay for scrollbar interpolation (ms)</span>
<span class="token comment">#       &quot;idea.true.smooth.scrolling.interpolation.mouse.wheel&quot; - mouse wheel / touchpad interpolation</span>
<span class="token comment">#       &quot;idea.true.smooth.scrolling.interpolation.mouse.wheel.delay.min&quot; - minimum initial delay for mouse wheel interpolation (ms)</span>
<span class="token comment">#       &quot;idea.true.smooth.scrolling.interpolation.mouse.wheel.delay.max&quot; - maximum initial delay for mouse wheel interpolation (ms)</span>
<span class="token comment">#       &quot;idea.true.smooth.scrolling.interpolation.precision.touchpad&quot; - touchpad interpolation</span>
<span class="token comment">#       &quot;idea.true.smooth.scrolling.interpolation.precision.touchpad.delay&quot; - initial delay for touchpad interpolation (ms)</span>
<span class="token comment">#       &quot;idea.true.smooth.scrolling.interpolation.other&quot; - interpolation of other input sources</span>
<span class="token comment">#       &quot;idea.true.smooth.scrolling.interpolation.other.delay&quot; - initial delay for other input source interpolation (ms)</span>
<span class="token comment">#</span>
<span class="token comment"># * Adds on-demand horizontal scrollbar in editor.</span>
<span class="token comment">#     The horizontal scrollbar is shown only when it&#39;s actually needed for currently visible content.</span>
<span class="token comment">#     This helps to save editor space and to prevent occasional horizontal &quot;jitter&quot; on vertical touchpad scrolling.</span>
<span class="token comment">#     This feature can be toggled via &quot;idea.true.smooth.scrolling.dynamic.scrollbars&quot; option.</span>
<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment">#idea.true.smooth.scrolling=true</span>

<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># The VM option value to be used to start a JVM in debug mode.</span>
<span class="token comment"># Some JREs define it in a different way (-XXdebug in Oracle VM)</span>
<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token key attr-name">idea.xdebug.key</span><span class="token punctuation">=</span><span class="token value attr-value">-Xdebug</span>

<span class="token comment">#-----------------------------------------------------------------------</span>
<span class="token comment"># Change to &#39;enabled&#39; if you want to receive instant visual notifications</span>
<span class="token comment"># about fatal errors that happen to an IDE or plugins installed.</span>
<span class="token comment">#-----------------------------------------------------------------------</span>
<span class="token key attr-name">idea.fatal.error.notification</span><span class="token punctuation">=</span><span class="token value attr-value">disabled</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-修改64位vmoptions" tabindex="-1"><a class="header-anchor" href="#_2-修改64位vmoptions" aria-hidden="true">#</a> 2 修改64位vmoptions</h2><blockquote><p>增加插件目录配置</p></blockquote><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code>-Xms2048m
-Xmx4096m
<span class="token key attr-name">-XX</span><span class="token punctuation">:</span><span class="token value attr-value">ReservedCodeCacheSize=512m</span>
<span class="token key attr-name">-XX</span><span class="token punctuation">:</span><span class="token value attr-value">+UseG1GC</span>
<span class="token key attr-name">-XX</span><span class="token punctuation">:</span><span class="token value attr-value">SoftRefLRUPolicyMSPerMB=50</span>
<span class="token key attr-name">-XX</span><span class="token punctuation">:</span><span class="token value attr-value">CICompilerCount=2</span>
<span class="token key attr-name">-XX</span><span class="token punctuation">:</span><span class="token value attr-value">+HeapDumpOnOutOfMemoryError</span>
<span class="token key attr-name">-XX</span><span class="token punctuation">:</span><span class="token value attr-value">-OmitStackTraceInFastThrow</span>
<span class="token key attr-name">-XX</span><span class="token punctuation">:</span><span class="token value attr-value">+IgnoreUnrecognizedVMOptions</span>
<span class="token key attr-name">-XX</span><span class="token punctuation">:</span><span class="token value attr-value">CompileCommand=exclude,com/intellij/openapi/vfs/impl/FilePartNodeRoot,trieDescend</span>
-ea
<span class="token key attr-name">-Dsun.io.useCanonCaches</span><span class="token punctuation">=</span><span class="token value attr-value">false</span>
<span class="token key attr-name">-Dsun.java2d.metal</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>
<span class="token key attr-name">-Djbr.catch.SIGABRT</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>
<span class="token key attr-name">-Djdk.http.auth.tunneling.disabledSchemes</span><span class="token punctuation">=</span><span class="token value attr-value">&quot;&quot;</span>
<span class="token key attr-name">-Djdk.attach.allowAttachSelf</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>
<span class="token key attr-name">-Djdk.module.illegalAccess.silent</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>
<span class="token key attr-name">-Dkotlinx.coroutines.debug</span><span class="token punctuation">=</span><span class="token value attr-value">off</span>
<span class="token key attr-name">--add-opens</span><span class="token punctuation">=</span><span class="token value attr-value">java.base/jdk.internal.org.objectweb.asm=ALL-UNNAMED</span>
<span class="token key attr-name">--add-opens</span><span class="token punctuation">=</span><span class="token value attr-value">java.base/jdk.internal.org.objectweb.asm.tree=ALL-UNNAMED</span>
<span class="token key attr-name">-javaagent</span><span class="token punctuation">:</span><span class="token value attr-value">.\\jetbra\\ja-netfilter.jar=jetbrains</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-插件相关内容拷贝" tabindex="-1"><a class="header-anchor" href="#_3-插件相关内容拷贝" aria-hidden="true">#</a> 3 插件相关内容拷贝</h2><p>将jetbra文件夹放入到\\jbr\\bin目录之下.</p><h2 id="_4-启用" tabindex="-1"><a class="header-anchor" href="#_4-启用" aria-hidden="true">#</a> 4 启用</h2><ul><li>启动应用，准备激活</li><li>使用激活码激活 https://3.jetbra.in/, 从该网站获取激活码</li><li>使用许可服务器激活 服务器网址: https://jetbra.in</li></ul>`,10);function u(v,k){const e=t("ExternalLinkIcon");return i(),l("div",null,[r,n("blockquote",null,[n("p",null,[s("基于"),n("a",d,[s("ja-netfilter"),o(e)]),s("插件实现绿化.")])]),m])}const h=a(p,[["render",u],["__file","Intellijxiliechanpinlvhua.html.vue"]]);export{h as default};
