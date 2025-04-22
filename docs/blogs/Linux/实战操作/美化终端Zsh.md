---
date: 2025-04-22 17:36:30
pageClass: blue-archive
tags:
  - 美化
categories:
  - Linux
---

# 美化终端Zsh
>终端切换的命令
```bash
# 查询可用的shell列表
cat /etc/shells

# 切换当前用户默认的shell
chsh -s /bin/zsh
```

## 1 安装Zsh
```sh
yum install -y zsh
```

## 2 安装git
```bash
yum install -y git
```

## 3 安装`oh my zsh`
```sh
# 通过curl
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# 通过wget
sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## 4 换肤
```bash
# 内置皮肤
➜  ~ $(git_prompt_info)ls ~/.oh-my-zsh/themes 
3den.zsh-theme           candy.zsh-theme       edvardm.zsh-theme    garyblessington.zsh-theme  josh.zsh-theme           maran.zsh-theme           norm.zsh-theme                  robbyrussell.zsh-theme  takashiyoshida.zsh-theme
adben.zsh-theme          clean.zsh-theme       emotty.zsh-theme     gentoo.zsh-theme           jreese.zsh-theme         mgutz.zsh-theme           obraun.zsh-theme                sammy.zsh-theme         terminalparty.zsh-theme
af-magic.zsh-theme       cloud.zsh-theme       essembeh.zsh-theme   geoffgarside.zsh-theme     jtriley.zsh-theme        mh.zsh-theme              oldgallois.zsh-theme            simonoff.zsh-theme      theunraveler.zsh-theme
afowler.zsh-theme        crcandy.zsh-theme     evan.zsh-theme       gianu.zsh-theme            juanghurtado.zsh-theme   michelebologna.zsh-theme  peepcode.zsh-theme              simple.zsh-theme        tjkirch_mod.zsh-theme
agnoster.zsh-theme       crunch.zsh-theme      fino-time.zsh-theme  gnzh.zsh-theme             junkfood.zsh-theme       mikeh.zsh-theme           philips.zsh-theme               skaro.zsh-theme         tjkirch.zsh-theme
alanpeabody.zsh-theme    cypher.zsh-theme      fino.zsh-theme       gozilla.zsh-theme          kafeitu.zsh-theme        miloshadzic.zsh-theme     pmcgee.zsh-theme                smt.zsh-theme           tonotdo.zsh-theme
amuse.zsh-theme          dallas.zsh-theme      fishy.zsh-theme      half-life.zsh-theme        kardan.zsh-theme         minimal.zsh-theme         pygmalion-virtualenv.zsh-theme  Soliah.zsh-theme        trapd00r.zsh-theme
apple.zsh-theme          darkblood.zsh-theme   flazz.zsh-theme      humza.zsh-theme            kennethreitz.zsh-theme   mira.zsh-theme            pygmalion.zsh-theme             sonicradish.zsh-theme   wedisagree.zsh-theme
arrow.zsh-theme          daveverwer.zsh-theme  fletcherm.zsh-theme  imajes.zsh-theme           kiwi.zsh-theme           mlh.zsh-theme             random.zsh-theme                sorin.zsh-theme         wezm.zsh-theme
aussiegeek.zsh-theme     dieter.zsh-theme      fox.zsh-theme        intheloop.zsh-theme        kolo.zsh-theme           mortalscumbag.zsh-theme   re5et.zsh-theme                 sporty_256.zsh-theme    wezm+.zsh-theme
avit.zsh-theme           dogenpunk.zsh-theme   frisk.zsh-theme      itchy.zsh-theme            kphoen.zsh-theme         mrtazz.zsh-theme          refined.zsh-theme               steeef.zsh-theme        wuffers.zsh-theme
awesomepanda.zsh-theme   dpoggi.zsh-theme      frontcube.zsh-theme  jaischeema.zsh-theme       lambda.zsh-theme         murilasso.zsh-theme       rgm.zsh-theme                   strug.zsh-theme         xiong-chiamiov-plus.zsh-theme
bira.zsh-theme           dstufft.zsh-theme     funky.zsh-theme      jbergantine.zsh-theme      linuxonly.zsh-theme      muse.zsh-theme            risto.zsh-theme                 sunaku.zsh-theme        xiong-chiamiov.zsh-theme
blinks.zsh-theme         dst.zsh-theme         fwalch.zsh-theme     jispwoso.zsh-theme         lukerandall.zsh-theme    nanotech.zsh-theme        rixius.zsh-theme                sunrise.zsh-theme       ys.zsh-theme
bureau.zsh-theme         duellj.zsh-theme      gallifrey.zsh-theme  jnrowe.zsh-theme           macovsky-ruby.zsh-theme  nebirhos.zsh-theme        rkj-repos.zsh-theme             superjarin.zsh-theme    zhann.zsh-theme
candy-kingdom.zsh-theme  eastwood.zsh-theme    gallois.zsh-theme    jonathan.zsh-theme         macovsky.zsh-theme       nicoulaj.zsh-theme        rkj.zsh-theme                   suvash.zsh-theme
```

>排行榜：[What's the best theme for Oh My Zsh? - Slant](https://www.slant.co/topics/7553/~theme-for-oh-my-zsh)

使用排名第一的皮肤：
```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k

# 中国用户可以使用 gitee.com 上的官方镜像加速下载
git clone --depth=1 https://gitee.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```
>在 `~/.zshrc` 设置 `ZSH_THEME="powerlevel10k/powerlevel10k"`。接下来，执行`source ~/.zshrc`，终端会自动引导你配置 `powerlevel10k`。


## 5 插件
查看已经启用的插件
```bash
# 我这里默认只启动了git插件
Which plugins would you like to load?
Standard plugins can be found in $ZSH/plugins/
Custom plugins may be added to $ZSH_CUSTOM/plugins/
Example format: plugins=(rails git textmate ruby lighthouse)
Add wisely, as too many plugins slow down shell startup.
# 修改括号内的内容
plugins=(git zsh-syntax-highlighting)
```

更新配置
```bash
source ~/.zshrc
```

插件目录
```sh
ls ~/.oh-my-zsh/custom/plugins
example
```

>更多插件：[unixorn/awesome-zsh-plugins: A collection of ZSH frameworks, plugins, themes and tutorials.](https://github.com/unixorn/awesome-zsh-plugins)
### 5.1 命令提示插件`zsh-autosuggestions`
```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# 中国用户可以使用下面任意一个加速下载
# 加速1
git clone https://github.moeyy.xyz/https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
# 加速2
git clone https://gh.xmly.dev/https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
# 加速3
git clone https://gh.api.99988866.xyz/https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

### 5.2 命令高亮插件`zsh-syntax-highlighting`
```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# 国内可用
# 加速1
git clone https://github.moeyy.xyz/https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
# 加速2
git clone https://gh.xmly.dev/https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
# 加速3
git clone https://gh.api.99988866.xyz/https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

### 5.3 最近的目录插件`z`
// TODO 完善更多插件

## 6 更新和卸载
```bash
# 更新
upgrade_oh_my_zsh

# 卸载
uninstall_oh_my_zsh
```