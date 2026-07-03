import{_ as n,o as s,c as a,a as e}from"./app-18841cf9.js";const i={},t=e(`<h1 id="使用-plantuml-绘制-uml-模型图" tabindex="-1"><a class="header-anchor" href="#使用-plantuml-绘制-uml-模型图" aria-hidden="true">#</a> 使用 PlantUML 绘制 UML 模型图</h1><blockquote><p>Obsidian 可以通过下载 PlantUML 插件实现 UML 图形的创建和预览，结合AI工具可以快速编辑软件工程中的文档图片。</p></blockquote><h3 id="时序图" tabindex="-1"><a class="header-anchor" href="#时序图" aria-hidden="true">#</a> 时序图</h3><div class="language-plantuml line-numbers-mode" data-ext="plantuml"><pre class="language-plantuml"><code><span class="token delimiter punctuation">@startuml</span>
<span class="token keyword">title</span> 登录时序图

<span class="token keyword">actor</span> 用户
<span class="token keyword">participant</span> <span class="token string">&quot;前端系统&quot;</span> <span class="token keyword">as</span> Frontend
<span class="token keyword">participant</span> <span class="token string">&quot;后端系统&quot;</span> <span class="token keyword">as</span> Backend
<span class="token keyword">database</span> <span class="token string">&quot;数据库&quot;</span> <span class="token keyword">as</span> DB

用户 <span class="token arrow operator">-&gt;</span> Frontend<span class="token punctuation">:</span> 输入用户名密码
Frontend <span class="token arrow operator">-&gt;</span> Backend<span class="token punctuation">:</span> POST /api/login
Backend <span class="token arrow operator">-&gt;</span> DB<span class="token punctuation">:</span> 查询用户信息
DB <span class="token arrow operator">--&gt;</span> Backend<span class="token punctuation">:</span> 返回用户数据
Backend <span class="token arrow operator">--&gt;</span> Frontend<span class="token punctuation">:</span> 返回登录令牌
Frontend <span class="token arrow operator">--&gt;</span> 用户<span class="token punctuation">:</span> 登录成功

<span class="token delimiter punctuation">@enduml</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="用例图" tabindex="-1"><a class="header-anchor" href="#用例图" aria-hidden="true">#</a> 用例图</h3><div class="language-plantuml line-numbers-mode" data-ext="plantuml"><pre class="language-plantuml"><code><span class="token delimiter punctuation">@startuml</span>
<span class="token keyword">title</span> 在线购物系统用例图

left to right direction
<span class="token keyword">actor</span> 用户
<span class="token keyword">actor</span> 管理员

<span class="token keyword">rectangle</span> 在线购物系统 <span class="token punctuation">{</span>
  用户 -- <span class="token punctuation">(</span>浏览商品<span class="token punctuation">)</span>
  用户 -- <span class="token punctuation">(</span>搜索商品<span class="token punctuation">)</span>
  用户 -- <span class="token punctuation">(</span>加入购物车<span class="token punctuation">)</span>
  用户 -- <span class="token punctuation">(</span>下单购买<span class="token punctuation">)</span>
  用户 -- <span class="token punctuation">(</span>查看订单<span class="token punctuation">)</span>
  
  管理员 -- <span class="token punctuation">(</span>管理商品<span class="token punctuation">)</span>
  管理员 -- <span class="token punctuation">(</span>管理订单<span class="token punctuation">)</span>
  管理员 -- <span class="token punctuation">(</span>查看报表<span class="token punctuation">)</span>
  
  <span class="token punctuation">(</span>下单购买<span class="token punctuation">)</span> <span class="token arrow operator">.&gt;</span> <span class="token punctuation">(</span>加入购物车<span class="token punctuation">)</span> <span class="token punctuation">:</span> include
  <span class="token punctuation">(</span>管理订单<span class="token punctuation">)</span> <span class="token arrow operator">.&gt;</span> <span class="token punctuation">(</span>查看订单<span class="token punctuation">)</span> <span class="token punctuation">:</span> include
<span class="token punctuation">}</span>

<span class="token delimiter punctuation">@enduml</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="类图" tabindex="-1"><a class="header-anchor" href="#类图" aria-hidden="true">#</a> 类图</h3><div class="language-plantuml line-numbers-mode" data-ext="plantuml"><pre class="language-plantuml"><code><span class="token delimiter punctuation">@startuml</span>
<span class="token keyword">title</span> 动物类图

<span class="token keyword">abstract class</span> 动物 <span class="token punctuation">{</span>
  #String 名称
  <span class="token color symbol">#int</span> 年龄
  +吃<span class="token punctuation">(</span><span class="token punctuation">)</span>
  +睡觉<span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>abstract<span class="token punctuation">}</span> +发声<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> 狗 <span class="token punctuation">{</span>
  +String 品种
  +发声<span class="token punctuation">(</span><span class="token punctuation">)</span>
  +看家<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> 猫 <span class="token punctuation">{</span>
  +String 毛色
  +发声<span class="token punctuation">(</span><span class="token punctuation">)</span>
  +抓老鼠<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

动物 <span class="token arrow operator">&lt;|--</span> 狗
动物 <span class="token arrow operator">&lt;|--</span> 猫

<span class="token delimiter punctuation">@enduml</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="活动图" tabindex="-1"><a class="header-anchor" href="#活动图" aria-hidden="true">#</a> 活动图</h3><div class="language-plantuml line-numbers-mode" data-ext="plantuml"><pre class="language-plantuml"><code><span class="token delimiter punctuation">@startuml</span>
<span class="token keyword">title</span> 用户注册流程

<span class="token keyword">start</span>

<span class="token punctuation">:</span>用户访问注册页面<span class="token punctuation">;</span>
<span class="token punctuation">:</span>填写注册信息<span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>信息格式是否正确?<span class="token punctuation">)</span> <span class="token keyword">then</span> <span class="token punctuation">(</span>是<span class="token punctuation">)</span>
  <span class="token punctuation">:</span>提交注册信息<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>用户名是否已存在?<span class="token punctuation">)</span> <span class="token keyword">then</span> <span class="token punctuation">(</span>否<span class="token punctuation">)</span>
    <span class="token punctuation">:</span>创建用户账号<span class="token punctuation">;</span>
    <span class="token punctuation">:</span>发送验证邮件<span class="token punctuation">;</span>
    <span class="token punctuation">:</span>显示注册成功<span class="token punctuation">;</span>
    <span class="token keyword">stop</span>
  <span class="token keyword">else</span> <span class="token punctuation">(</span>是<span class="token punctuation">)</span>
    <span class="token punctuation">:</span>显示用户名已存在<span class="token punctuation">;</span>
  <span class="token keyword">endif</span>
<span class="token keyword">else</span> <span class="token punctuation">(</span>否<span class="token punctuation">)</span>
  <span class="token punctuation">:</span>显示格式错误提示<span class="token punctuation">;</span>
<span class="token keyword">endif</span>

<span class="token punctuation">:</span>返回注册页面<span class="token punctuation">;</span>
<span class="token keyword">stop</span>

<span class="token delimiter punctuation">@enduml</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="组件图" tabindex="-1"><a class="header-anchor" href="#组件图" aria-hidden="true">#</a> 组件图</h3><div class="language-plantuml line-numbers-mode" data-ext="plantuml"><pre class="language-plantuml"><code><span class="token delimiter punctuation">@startuml</span>
<span class="token keyword">title</span> Web应用系统架构

<span class="token keyword">package</span> <span class="token string">&quot;前端层&quot;</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>Web界面<span class="token punctuation">]</span>
  <span class="token punctuation">[</span>移动端应用<span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token keyword">package</span> <span class="token string">&quot;应用层&quot;</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>API网关<span class="token punctuation">]</span>
  <span class="token punctuation">[</span>用户服务<span class="token punctuation">]</span>
  <span class="token punctuation">[</span>订单服务<span class="token punctuation">]</span>
  <span class="token punctuation">[</span>支付服务<span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token keyword">package</span> <span class="token string">&quot;数据层&quot;</span> <span class="token punctuation">{</span>
  <span class="token keyword">database</span> <span class="token string">&quot;MySQL&quot;</span> <span class="token keyword">as</span> DB
  <span class="token keyword">database</span> <span class="token string">&quot;Redis&quot;</span> <span class="token keyword">as</span> Cache
<span class="token punctuation">}</span>

<span class="token punctuation">[</span>Web界面<span class="token punctuation">]</span> <span class="token arrow operator">--&gt;</span> <span class="token punctuation">[</span>API网关<span class="token punctuation">]</span>
<span class="token punctuation">[</span>移动端应用<span class="token punctuation">]</span> <span class="token arrow operator">--&gt;</span> <span class="token punctuation">[</span>API网关<span class="token punctuation">]</span>

<span class="token punctuation">[</span>API网关<span class="token punctuation">]</span> <span class="token arrow operator">--&gt;</span> <span class="token punctuation">[</span>用户服务<span class="token punctuation">]</span>
<span class="token punctuation">[</span>API网关<span class="token punctuation">]</span> <span class="token arrow operator">--&gt;</span> <span class="token punctuation">[</span>订单服务<span class="token punctuation">]</span>
<span class="token punctuation">[</span>API网关<span class="token punctuation">]</span> <span class="token arrow operator">--&gt;</span> <span class="token punctuation">[</span>支付服务<span class="token punctuation">]</span>

<span class="token punctuation">[</span>用户服务<span class="token punctuation">]</span> <span class="token arrow operator">--&gt;</span> DB
<span class="token punctuation">[</span>订单服务<span class="token punctuation">]</span> <span class="token arrow operator">--&gt;</span> DB
<span class="token punctuation">[</span>支付服务<span class="token punctuation">]</span> <span class="token arrow operator">--&gt;</span> DB

<span class="token punctuation">[</span>用户服务<span class="token punctuation">]</span> <span class="token arrow operator">--&gt;</span> Cache
<span class="token punctuation">[</span>订单服务<span class="token punctuation">]</span> <span class="token arrow operator">--&gt;</span> Cache

<span class="token delimiter punctuation">@enduml</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="状态图" tabindex="-1"><a class="header-anchor" href="#状态图" aria-hidden="true">#</a> 状态图</h3><div class="language-plantuml line-numbers-mode" data-ext="plantuml"><pre class="language-plantuml"><code><span class="token delimiter punctuation">@startuml</span>
<span class="token keyword">title</span> 订单状态图

<span class="token punctuation">[</span>*<span class="token punctuation">]</span> <span class="token arrow operator">--&gt;</span> 待付款 <span class="token punctuation">:</span> 创建订单

待付款 <span class="token arrow operator">--&gt;</span> 待发货 <span class="token punctuation">:</span> 支付成功
待付款 <span class="token arrow operator">--&gt;</span> 已取消 <span class="token punctuation">:</span> 超时/取消

待发货 <span class="token arrow operator">--&gt;</span> 待收货 <span class="token punctuation">:</span> 商家发货
待发货 <span class="token arrow operator">--&gt;</span> 已取消 <span class="token punctuation">:</span> 申请取消

待收货 <span class="token arrow operator">--&gt;</span> 待评价 <span class="token punctuation">:</span> 确认收货
待收货 <span class="token arrow operator">--&gt;</span> 退款中 <span class="token punctuation">:</span> 申请退款

待评价 <span class="token arrow operator">--&gt;</span> 已完成 <span class="token punctuation">:</span> 评价完成
待评价 <span class="token arrow operator">--&gt;</span> 已完成 <span class="token punctuation">:</span> 7天后自动完成

退款中 <span class="token arrow operator">--&gt;</span> 已退款 <span class="token punctuation">:</span> 退款成功
退款中 <span class="token arrow operator">--&gt;</span> 待收货 <span class="token punctuation">:</span> 退款失败

已取消 <span class="token arrow operator">--&gt;</span> <span class="token punctuation">[</span>*<span class="token punctuation">]</span>
已退款 <span class="token arrow operator">--&gt;</span> <span class="token punctuation">[</span>*<span class="token punctuation">]</span>
已完成 <span class="token arrow operator">--&gt;</span> <span class="token punctuation">[</span>*<span class="token punctuation">]</span>

<span class="token delimiter punctuation">@enduml</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="甘特图" tabindex="-1"><a class="header-anchor" href="#甘特图" aria-hidden="true">#</a> 甘特图</h3><div class="language-plantuml line-numbers-mode" data-ext="plantuml"><pre class="language-plantuml"><code>@startgantt
<span class="token keyword">title</span> 项目开发计划

project starts 2024-01-01

<span class="token punctuation">[</span>需求分析<span class="token punctuation">]</span> starts 2024-01-01 and lasts 7 days
<span class="token punctuation">[</span>需求评审<span class="token punctuation">]</span> starts 2024-01-08 and lasts 3 days

<span class="token punctuation">[</span>前端开发<span class="token punctuation">]</span> starts 2024-01-11 and lasts 14 days
<span class="token punctuation">[</span>后端开发<span class="token punctuation">]</span> starts 2024-01-11 and lasts 14 days

<span class="token punctuation">[</span>接口联调<span class="token punctuation">]</span> starts 2024-01-25 and lasts 3 days
<span class="token punctuation">[</span>功能测试<span class="token punctuation">]</span> starts 2024-01-28 and lasts 5 days
<span class="token punctuation">[</span>上线准备<span class="token punctuation">]</span> starts 2024-02-02 and lasts 2 days

@endgantt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="思维导图" tabindex="-1"><a class="header-anchor" href="#思维导图" aria-hidden="true">#</a> 思维导图</h3><div class="language-plantuml line-numbers-mode" data-ext="plantuml"><pre class="language-plantuml"><code>@startmindmap
<span class="token keyword">title</span> 学习编程技能

* 编程学习
** 编程语言
*** Python
*** JavaScript
*** Java
*** Go
** 数据结构与算法
*** 数组和链表
*** 树和图
*** 排序和搜索
** Web开发
*** 前端
**** HTML/CSS
**** React/Vue
*** 后端
**** Node.js
**** Spring Boot
** 数据库
*** SQL
**** MySQL
**** PostgreSQL
*** NoSQL
**** MongoDB
**** Redis

@endmindmap
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18),l=[t];function p(c,o){return s(),a("div",null,l)}const d=n(i,[["render",p],["__file","shiyongPlantUMLhuizhiUMLmoxingtu.html.vue"]]);export{d as default};
