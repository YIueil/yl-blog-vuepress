---
  date: 2025-05-11 18:59:33
  pageClass: blue-archive
  tags:
    - 未分类
  categories:
    - 未归档
---

# OpenWRT的入门指南
>折腾最终目标：科学上网，广告拦截，内网穿透，NAS，轻网站服务，远程Wol设备唤醒。

## 1 什么是OpenWRT
OpenWrt 不是一个单一且不可更改的固件，而是提供了一个完全可写的文件系统及软件包管理。这使您可以不使用供应商提供的应用程序选择和配置，而是通过使用软件包来定制设备以适应任何应用程序。对于开发人员来说，OpenWrt 是一个构建应用程序的框架，无需在其周围构建完整的固件; 对于普通用户来说，这意味着拥有了完全定制的能力，能以意想不到的方式使用该设备。
- [OpenWrt](https://github.com/openwrt/openwrt)：权威的官方版本。
	- 如果您需要一个经过长期验证的稳定系统，且对全球社区资源有需求，OpenWRT 是首选。
- [immortalWrt](https://github.com/immortalwrt/immortalwrt)：ImmortalWRT 是由国内开发者基于 OpenWRT 和 LEDE 分叉而来，专注于满足国内用户的特殊需求。由于国内网络环境的特殊性，ImmortalWRT 集成了许多针对性的优化和功能，如去广告、科学上网等。
	- 如果您希望体验更快速的更新和更高的代码质量，LEDE 能满足您的需求。
- [LEDT]([coolsnowwolf/lede: Lean's LEDE source](https://github.com/coolsnowwolf/lede))：LEDE（Linux Embedded Development Environment）项目于 2016 年由部分 OpenWRT 开发者分叉创建，旨在解决当时 OpenWRT 项目管理和开发过程中的一些问题，如更新滞后、代码质量下降等。LEDE 强调透明的开发流程和高质量的代码。2018 年，LEDE 与 OpenWRT 项目重新合并，但 LEDE 的理念和改进被保留并融入了 OpenWRT。
	- 。如果不需要使用新的一些插件和新特性。或者老设备，可以使用。
>OpenWrt通常的默认网关是`192.168.1.1`。
## 2 适合折腾的路由器
自己手头可以折腾的路由器。
- PHICOMM K3 A1
- Cudy TR3000
## 3 路由器固件扩容
```sh
# 编辑扩容文件 如果要扩容
/home/yiueil-wsl/openwrt/target/linux/mediatek/dts/mt7981b-cudy-tr3000-v1.dtsi
```
## 4 基于源码编译固件
>官方地址：https://github.com/openwrt/openwrt
- 需要一个Linux环境，我这里使用的是基于Windows的WSL子系统的Ubuntu24.04 LTS。我这里以编译cudy tr3000的固件为例：
首次编译：
```sh
# 拉取源码
git clone https://github.com/openwrt/openwrt.git

# 进入源码主目录
cd openwrt

# 更新软件包
./scripts/feeds update -a

# 安装软件包
./scripts/feeds install -a

# 固件配置
make menuconfig

# 所需插件依赖下载
make download -j8

# 进行构建（第一次构建建议单线程）
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin make -j1
```

二次编译：
```sh
cd openwrt
git pull
./scripts/feeds update -a
./scripts/feeds install -a
make defconfig
make download -j8
make V=s -j$(nproc)
```

如需修改配置
```sh
rm -rf .config
make menuconfig
make V=s -j$(nproc)
```