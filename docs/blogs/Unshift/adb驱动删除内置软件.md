---
  date: 2023/8/15 21:39
  pageClass: blue-archive
  tags:
    - 未分类
  categories:
    - 未归档
---

# 通过adb驱动删除内置软件.md
```sh
# 进入adb shell
adb shell

# 列举已安装应用
pm list packages
# package:cn.nubia.browser

# 删除应用
pm uninstall -k --user 0 cn.nubia.browser
```
