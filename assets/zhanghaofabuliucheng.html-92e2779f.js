import{_ as e,o as a,c as i,d as l}from"./app-857e0191.js";const t={},o=l('<h1 id="发布流程" tabindex="-1"><a class="header-anchor" href="#发布流程" aria-hidden="true">#</a> 发布流程</h1><h2 id="_1-整体流程" tabindex="-1"><a class="header-anchor" href="#_1-整体流程" aria-hidden="true">#</a> 1 整体流程</h2><blockquote><p>一个账号的练级周期5天，日常周期3个月或者更长，估价35元，如果出限定角色可以增加抽限定角色流程升值。 工作量：2+10+2+5+1+10 = 30天</p></blockquote><ol><li><strong>手动</strong>建号，<strong>手动</strong>创建模拟器分身，<strong>手动</strong>创建50个分身，保存分身启动地址到一个文本文件。地址+--+密码+--+签到日常次数+--+练级次数（2天工作量）</li><li>初始建立脚本：（10天工作量） <ul><li>一系列的开局引导任务。需要细化处理和异常失败处理。</li></ul></li><li>练级脚本（2天工作量） <ul><li>点开角色。</li><li>按战斗力排序。</li><li>选择战斗力第四的人物。</li><li>点击升级，点击一键升级。</li><li>点击自动装备。</li><li>执行升级武器脚本。</li></ul></li><li>日常脚本程序执行（5天工作量） <ul><li>循环读取每一个模拟器分身。</li><li>启动游戏。</li><li>登录流程：疯狂点击-&gt;选择游客登陆-&gt;判定是否登录成功，直到登录成功。</li><li>根据设定的练级次数，小于练级周期则执行练级脚本。</li><li>日常流程，固定的一套点击流程。</li><li>打开邮箱。一键领取邮箱奖励。</li><li>关闭模拟器分身。</li></ul></li><li>游戏外脚本（1天工作量） <ul><li>检测最新的礼包码，循环读取已有的账号，进行自动领取。</li></ul></li><li><h2 id="贩卖程序编写-10天工作量" tabindex="-1"><a class="header-anchor" href="#贩卖程序编写-10天工作量" aria-hidden="true">#</a> 贩卖程序编写（10天工作量）</h2></li></ol><h2 id="_2-模拟器配置统一" tabindex="-1"><a class="header-anchor" href="#_2-模拟器配置统一" aria-hidden="true">#</a> 2 模拟器配置统一</h2><blockquote><p>记得关闭声音 <img src="https://s2.loli.net/2024/12/25/KX1zuf3tBxPlokL.png" alt="KX1zuf3tBxPlokL.png"></p></blockquote><h2 id="_3-流程" tabindex="-1"><a class="header-anchor" href="#_3-流程" aria-hidden="true">#</a> 3 流程</h2><blockquote><p>通用方法，找手，找skip，找x，找确认按钮，找球，找next，找返回，点击游戏继续。 每回合开始的摆烂打法：找攻击图标，如果有攻击图标，则点攻击图标，然后点确认。否则结束回合。 找对话框，找到对话框，连点。</p></blockquote><h3 id="第一章" tabindex="-1"><a class="header-anchor" href="#第一章" aria-hidden="true">#</a> 第一章</h3><p>遭遇战保护村民（挂机可过） ![[Pasted image 20241225193345.png]]</p><h3 id="第二章" tabindex="-1"><a class="header-anchor" href="#第二章" aria-hidden="true">#</a> 第二章</h3><blockquote><p>保护关，开局的时候把马修移动到最右边，然后一直挂机。 ![[Pasted image 20241225193512.png]] ![[Pasted image 20241225193550.png]]</p></blockquote><p><strong>跟着指引抽卡</strong></p><blockquote><p>有手点手，没手等待500ms，然后判断有没有球，有球滑动，否则循环。 进入大地图后找next，如果没找到，就去找第一部三个字，找到了就点击。然后循环。 ![[Pasted image 20241225194025.png]]</p></blockquote><p>遭遇战</p><blockquote><p>先找角色，然后按住角色的位置，向右上角拖动一定的距离。战斗流程挂机。 ![[Pasted image 20241225194445.png]]</p></blockquote><p>遭遇战</p><blockquote><p>摆烂挂机可过。 ![[Pasted image 20241225195217.png]]</p></blockquote><h3 id="第三章" tabindex="-1"><a class="header-anchor" href="#第三章" aria-hidden="true">#</a> 第三章</h3><blockquote><p>自动挂机能过 ![[Pasted image 20241225200628.png]]</p></blockquote><p><strong>遭遇战</strong></p><blockquote><p>摆烂流打法 ![[Pasted image 20241225201849.png]]</p></blockquote>',22),n=[o];function r(h,d){return a(),i("div",null,n)}const s=e(t,[["render",r],["__file","zhanghaofabuliucheng.html.vue"]]);export{s as default};