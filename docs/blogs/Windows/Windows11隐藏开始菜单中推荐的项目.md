---
date: 2024-12-24 15:26:59
pageClass: blue-archive
tags:
  - Windows
categories:
  - Windows
---

# Windows11隐藏开始菜单中推荐的项目

使用`Windows + R`快捷键打开「运行」对话框，执行`regedit`打开注册表编辑器。

导航到以下路径：

```
HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\
```

新建`Explorer`项，并在其下创建一个名为`HideRecommendedSection`的 **DWORD (32-位) 值** ，将其十六进制值设置为：
- `0`显示「推荐」区域
- `1`隐藏「推荐」区域