---
date: 2026-01-26 21:01:49
pageClass: blue-archive
tags:
  - WSL
categories:
  - Linux
---

# WSL自定义CDW函数
>实现直接`cd`功能，进入到一个windows的路径。

1. 编辑`~/.bashrc` 文件
```bash
cdw() {
    if [ $# -eq 0 ]; then
        echo "Usage: cdw <Windows-path>"
        return 1
    fi

    # 使用 wslpath 将 Windows 路径转为 Linux 路径
    local linux_path
    linux_path=$(wslpath "$1" 2>/dev/null)

    if [ $? -ne 0 ]; then
        echo "Error: Invalid Windows path: $1"
        return 1
    fi

    # 检查路径是否存在
    if [ ! -d "$linux_path" ]; then
        echo "Error: Directory does not exist: $linux_path"
        return 1
    fi

    # 执行 cd
    cd "$linux_path"
}
```
2. 更新`bashrc`
```bash
source ~/.bashrc
```

✅使用示例：
```bash
yiueil@YIUEIL-MATEBOOK:~$ cdw 'D:\YIueil\Game'
yiueil@YIUEIL-MATEBOOK:/mnt/d/YIueil/Game$
```

🍒注意事项：
>如果使用`Zsh`，编辑`~/.zshrc`