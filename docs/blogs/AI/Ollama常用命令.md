---
date: 2026-01-21 17:26:24
pageClass: blue-archive
tags:
  - Ollama
  - 未完成
categories:
  - AI
  - Ollama
---

# Ollama常用命令

## 1 模型下载
### 列举模型
```bash
# 命令
ollama ls

# 示例
PS C:\Users\Administrator> ollama ls
NAME                   ID              SIZE      MODIFIED
qwen2.5-coder:7b       dae161e27b0e    4.7 GB    5 months ago
llama3.1:latest        46e0c10c039e    4.9 GB    9 months ago
deepseek-coder:6.7b    ce298d984115    3.8 GB    9 months ago
deepseek-r1:8b         28f8fd6cdc67    4.9 GB    9 months ago
```

### 下载模型
```bash
# 命令
ollama pull <模型标识>

# 示例
PS C:\Users\Administrator> ollama pull translategemma
pulling manifest
pulling bdbf939b402e:   0% ▕                                   ▏  16 MB/3.3 GB  7.2 MB/s   7m37s
```

### 删除模型
```bash
# 命令
ollama rm <模型标识>

# 示例
PS C:\Users\Administrator> ollama rm lauchacarro/qwen2.5-translator:latest
deleted 'lauchacarro/qwen2.5-translator:latest'
```

## 2 部署本地模型
>通过`Modelfile`进行创建。

## 3 模型运行

### 运行模型
```bash
# 命令
ollama run <模型标识>

# 示例
PS C:\Users\Administrator> ollama run translategemma
>>>
```

### 停止模型
```bash
# 命令
ollama stop <模型标识>

# 示例
PS C:\Users\Administrator\Desktop> ollama stop translategemma:latest
```