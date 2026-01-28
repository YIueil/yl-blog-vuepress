import{_ as n,o as s,c as a,a as e}from"./app-be491351.js";const t={},p=e(`<h1 id="抽象工厂" tabindex="-1"><a class="header-anchor" href="#抽象工厂" aria-hidden="true">#</a> 抽象工厂</h1><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h2><blockquote><p>假设我们正在设计一个 UI 控件库，其中包含了多种不同的 UI 控件，比如按钮（Button）、文本框（TextBox）、标签（Label）等。 现在，我们需要支持多种不同的操作系统平台，比如 Windows、Mac 和 Linux，并且每个平台下的控件都有所不同。这时候就可以使用抽象工厂模式来设计我们的控件库。</p></blockquote><p>我们创建一个抽象工厂，它负责各种类型组件的创建:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">WidgetFactory</span> <span class="token punctuation">{</span>
    <span class="token class-name">Button</span> <span class="token function">createButton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">TextBox</span> <span class="token function">createTextBox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Label</span> <span class="token function">createLabel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后创建 Windows 和 Mac 两个操作系统下的对应工厂和对应的组件:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * MacWidgetFactory mac下的组件工厂
 *
 * <span class="token keyword">@author</span> 弋孓 YIueil@163.com
 * <span class="token keyword">@version</span> 1.0
 * <span class="token keyword">@date</span> 2023/9/13 21:35
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MacWidgetFactory</span> <span class="token keyword">implements</span> <span class="token class-name">WidgetFactory</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Button</span> <span class="token function">createButton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">MacButton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">TextBox</span> <span class="token function">createTextBox</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Label</span> <span class="token function">createLabel</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">MacLabel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * WindowsWidgetFactory windows下的组件工厂
 *
 * <span class="token keyword">@author</span> 弋孓 YIueil@163.com
 * <span class="token keyword">@version</span> 1.0
 * <span class="token keyword">@date</span> 2023/9/13 21:34
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WindowsWidgetFactory</span> <span class="token keyword">implements</span> <span class="token class-name">WidgetFactory</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Button</span> <span class="token function">createButton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">WindowsButton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">TextBox</span> <span class="token function">createTextBox</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">WindowsTextBox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Label</span> <span class="token function">createLabel</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">WindowsLabel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后进行使用, 对于调用方, 只需要关注自己的实际平台, 生成对应的工厂的实例即可完成各类UI组件的创建。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * Main02
 *
 * <span class="token keyword">@author</span> 弋孓 YIueil@163.com
 * <span class="token keyword">@version</span> 1.0
 * <span class="token keyword">@date</span> 2023/9/13 21:27
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main02</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">WidgetFactory</span> windowsFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WindowsWidgetFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        windowsFactory<span class="token punctuation">.</span><span class="token function">createButton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">onClick</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>windowsFactory<span class="token punctuation">.</span><span class="token function">createLabel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>windowsFactory<span class="token punctuation">.</span><span class="token function">createTextBox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="设计思想" tabindex="-1"><a class="header-anchor" href="#设计思想" aria-hidden="true">#</a> 设计思想</h2><blockquote><p>为某一类具有同一类特征的实例创建公共的方法。然后具体某类的实例由对应的工厂实例完成。</p></blockquote><h2 id="在jdk和spring中的应用案例" tabindex="-1"><a class="header-anchor" href="#在jdk和spring中的应用案例" aria-hidden="true">#</a> 在JDK和Spring中的应用案例</h2><blockquote><p>Spring中的ApplicationContext中的具体实现</p></blockquote><h2 id="使用总结" tabindex="-1"><a class="header-anchor" href="#使用总结" aria-hidden="true">#</a> 使用总结</h2><ol><li>隐藏对象实例的创建细节</li><li>易于扩展实例工厂</li><li>各类产品不会产生混淆</li><li>易于替换产品类型(直接替换实例工厂)</li></ol><h2 id="uml图" tabindex="-1"><a class="header-anchor" href="#uml图" aria-hidden="true">#</a> UML图</h2><p><img src="https://s2.loli.net/2023/09/13/SH6yN5lZADUgT7u.png" alt="SH6yN5lZADUgT7u.png"></p>`,18),c=[p];function o(i,l){return s(),a("div",null,c)}const d=n(t,[["render",o],["__file","chouxianggongchang.html.vue"]]);export{d as default};
