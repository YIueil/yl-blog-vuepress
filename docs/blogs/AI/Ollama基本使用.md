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

# Ollama基本使用

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

## 4 GPU部分
> 默认的`Ollama`现阶段不会跑到GPU上，可以使用命令`ollama ps`可以查看当前运行模型运行的资源。官方文档：[Hardware support - Ollama](https://docs.ollama.com/gpu)
```bash
# 从 PROCESSOR 列的输出可以看出来使用的是CPU进行的模型计算输出。
PS C:\Users\Administrator> ollama ps
NAME        ID              SIZE      PROCESSOR    CONTEXT    UNTIL
qwen3:4b    359d7dd4bcda    3.5 GB    100% CPU     4096       51 seconds from now
```
### 4.1 Ollama显卡支持列表
[Ollama 对GPU 支持信息]([CUDA GPU Compute Capability | NVIDIA Developer](https://developer.nvidia.com/cuda/gpus#))

### 4.2 使用GPU进行加速
#### 第一步：查看当前显卡信息
使用命令`nvidia-smi`，重点关注`CUDA Version`的版本。
```bash
PS C:\Users\Administrator> nvidia-smi
Thu Jan 22 10:02:28 2026
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 472.12       Driver Version: 472.12       CUDA Version: 11.4     |
|-------------------------------+----------------------+----------------------+
| GPU  Name            TCC/WDDM | Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|                               |                      |               MIG M. |
|===============================+======================+======================|
|   0  NVIDIA GeForce ... WDDM  | 00000000:01:00.0  On |                  N/A |
| 61%   24C    P8    16W / 170W |   2896MiB / 12288MiB |      6%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+

+-----------------------------------------------------------------------------+
| Processes:                                                                  |
|  GPU   GI   CI        PID   Type   Process name                  GPU Memory |
|        ID   ID                                                   Usage      |
|=============================================================================|
|    0   N/A  N/A      1208    C+G   ...updated_web\WXWorkWeb.exe    N/A      |
|    0   N/A  N/A      2388    C+G   ...8bbwe\WindowsTerminal.exe    N/A      |
|    0   N/A  N/A      2516    C+G   ...le\current\STranslate.exe    N/A      |
|    0   N/A  N/A      2684    C+G   C:\Windows\System32\dwm.exe     N/A      |
|    0   N/A  N/A      4596    C+G   ...t\runtime\WeChatAppEx.exe    N/A      |
|    0   N/A  N/A      5220    C+G   ...ge\Application\msedge.exe    N/A      |
|    0   N/A  N/A      9772    C+G   ...rograms\PixPin\PixPin.exe    N/A      |
|    0   N/A  N/A     11588    C+G   C:\Windows\explorer.exe         N/A      |
|    0   N/A  N/A     11596    C+G   ...ws\System32\ShellHost.exe    N/A      |
|    0   N/A  N/A     12592    C+G   ...n1h2txyewy\SearchHost.exe    N/A      |
|    0   N/A  N/A     12600    C+G   ...artMenuExperienceHost.exe    N/A      |
|    0   N/A  N/A     14900    C+G   ...e\root\Office16\EXCEL.EXE    N/A      |
|    0   N/A  N/A     15088    C+G   ...2txyewy\TextInputHost.exe    N/A      |
|    0   N/A  N/A     16876    C+G   ...n\jbr\bin\jcef_helper.exe    N/A      |
|    0   N/A  N/A     20492    C+G   ...lugins\FlutterPlugins.exe    N/A      |
|    0   N/A  N/A     20504    C+G   ...y\ShellExperienceHost.exe    N/A      |
|    0   N/A  N/A     22436    C+G   ...are\Obsidian\Obsidian.exe    N/A      |
|    0   N/A  N/A     24212    C+G   ...ueil\Software\QQNT\QQ.exe    N/A      |
+-----------------------------------------------------------------------------+
```
#### 第二步：安装CUDA支持工具CudaToolkit
>CudaToolkit版本 **不能大于** 上面的显卡Cuda版本，选择一致版本即可。下载地址：https://developer.nvidia.com/cuda-toolkit-archive。

验证安装，通过`nvcc --version`命令：
```bash
PS C:\Users\Administrator> nvcc --version
nvcc: NVIDIA (R) Cuda compiler driver
Copyright (c) 2005-2021 NVIDIA Corporation
Built on Wed_Jun__2_19:25:35_Pacific_Daylight_Time_2021
Cuda compilation tools, release 11.4, V11.4.48
Build cuda_11.4.r11.4/compiler.30033411_0
```

#### 第三步：配置环境变量
添加以下环境变量：

| 变量名                  | 变量值                                       | 备注                                             |
| -------------------- | ----------------------------------------- | ---------------------------------------------- |
| OLLAMA_GPU_LAYER     | cuda                                      | 指定GPU处理层                                       |
| CUDA_VISIBLE_DEVICES | GPU-4b663a08-f89c-8bb9-8f1f-c6cacb193ec0) | 指定特定ID的显卡工作，不指定则全部工作，通过命令`nvidia-smi -L`获取显卡ID |
#### 第四步：验证是否跑在GPU上
**在推理时**使用**Ollama ps** 即可查看负载情况：
```html
ollama ps


```