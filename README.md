<div align="center">
  <img src="docs/logo.png" alt="VoiceStudio" width="96" />
  <h1>Voice-Studio Pro · 深度云创科技</h1>
  <p><strong>企业级全功能智能声音克隆、声音设计、长文本有声书制作与跨语种多角色视频配音系统</strong></p>
  <p>
    <a href="https://nav.meding.site">官方生态导航</a> ·
    <a href="#核心功能与工作区">核心功能</a> ·
    <a href="#pro-专业版特性本地已激活">Pro 特性</a> ·
    <a href="#客户端下载与使用">客户端下载</a> ·
    <a href="#技术支持与商务咨询">技术支持</a>
  </p>
  <p>
    <img src="https://img.shields.io/badge/版本-0.5.7-blue?style=flat-square" alt="Version" />
    <img src="https://img.shields.io/badge/认证-深度云创科技-emerald?style=flat-square" alt="DeepCloud" />
    <img src="https://img.shields.io/badge/授权-Pro%20已全功能激活-gold?style=flat-square" alt="Pro Active" />
    <img src="https://img.shields.io/badge/计算-纯本地离线优先-purple?style=flat-square" alt="Local First" />
  </p>
</div>

---

## 📌 产品介绍

**VoiceStudio Pro** 是由 **深度云创科技** 研发并维护的一站式本地优先语音合成与音频工程工作站。系统专注于前沿人工智能语音交互与个性化声音合成，提供零样本高保真声音克隆、声音定制设计、视频自动时间轴配音、有声书多音轨制作及本地离线工作流。

系统默认已全面解锁 **VoiceStudio Pro 专业版企业全功能**，无需订阅或付费激活，支持纯本地离线计算，零数据上传，全方位保障创作者的数据隐私与数字资产安全。

---

## 💎 Pro 专业版特性（本地已激活）

系统内置全功能专业版激活方案，开箱即用：

- ✅ **本地永久全功能解锁**：无需配置外部许可证服务或订阅，启动即享完整专业版功能。
- ✅ **企业级高清音频导出**：支持 16-bit / 24-bit / 32-bit 浮点无损母带级 WAV 精度导出。
- ✅ **无限量项目与角色库**：无使用频率限制、无分钟计费账单、无并发限制。
- ✅ **纯本地离线隐私保护**：所有计算均在用户本地显卡或 CPU 上运行，不上传任何音频或文本。
- ✅ **官方生态导航整合**：内嵌专属导航服务与技术支持通道：[https://nav.meding.site](https://nav.meding.site)。

---

## ✨ 核心功能与工作区

| 模块 | 功能说明 | 特性支持 |
| :--- | :--- | :--- |
| **声音克隆 (Voice Cloning)** | 仅需数秒干净参考音频，高保真还原目标音色、语气与声学质感 | 零样本即时生成，支持 646 种语种 |
| **声音设计 (Voice Design)** | 通过自然语言文本提示词描述角色声音特征并生成专属音色 | 年龄、性别、音色质感、情绪调节 |
| **视频配音 (Video Dubbing)** | 音视频自动转写、跨语言翻译与毫秒级时间对齐重新配音 | 自动生成字幕并贴合口型时长 |
| **有声书与多角色 (Audiobook & Stories)** | 长文本小说、播客与多角色剧本分轨配音创作 | 章节管理、多音轨角色分配、一键母带渲染 |
| **语音听写与转录 (Transcribe & Dictation)** | 本地实时语音识别与长录音离线转文字 | 悬浮听写窗、多引擎本地加速、隐私不联网 |
| **智能体连接 (MCP & Local API)** | 原生提供本地 OpenAI 兼容 API 与 MCP (Model Context Protocol) 接口 | 轻松对接本地 LLM、自动化 Agent 与工作流 |

引擎默认搭载 **VoiceStudio** (default, powered by k2-fsa/OmniVoice)，并可按需切换多样化语音引擎。

<details>
<summary><strong>📸 查看应用工作区截图</strong></summary>

<table>
  <tr>
    <td><img src="docs/media/electron/voice-cloning.png" alt="声音克隆工作区" width="100%" /></td>
    <td><img src="docs/media/electron/dubbing.png" alt="视频配音工作区" width="100%" /></td>
  </tr>
  <tr><td align="center">声音克隆 (Voice Cloning)</td><td align="center">视频配音 (Video Dubbing)</td></tr>
  <tr>
    <td><img src="docs/media/electron/voice-design.png" alt="声音设计工作区" width="100%" /></td>
    <td><img src="docs/media/electron/models.png" alt="本地模型管理" width="100%" /></td>
  </tr>
  <tr><td align="center">声音设计 (Voice Design)</td><td align="center">本地模型管理 (Local Models)</td></tr>
</table>

</details>

---

## 🚀 客户端下载与使用

### 1. 预编译客户端

已打包的客户端文件位于 `electron/release/` 目录：

* **Windows 客户端 (x64)**：`VoiceStudio-Electron-0.5.7-win-x64.exe`（支持 Windows 10 / 11 64位安装）
* **macOS 客户端 (Apple Silicon arm64)**：`VoiceStudio-Electron-0.5.7-darwin-arm64.zip`（支持 M1/M2/M3/M4 系列 Mac，解压即可运行）
* **Windows 免安装便携版**：解压目录 `electron/release/win-unpacked/`，双击 `VoiceStudio.exe` 即可直接免安装运行

### 2. 硬件加速支持

| 硬件配置 | 加速支持 | 说明 |
| :--- | :--- | :--- |
| **NVIDIA 独立显卡 (Windows / Linux)** | CUDA 硬件加速 | 推荐 6GB+ 显存以获得极速生成体验 |
| **Apple Silicon (M系列 Mac)** | Metal (MPS) 原生加速 | 统一内存架构，开箱即享极速推理 |
| **CPU 纯运算模式 (集成显卡 / 老旧设备)** | CPU 并行加速 | 无需独显即可稳定使用，低显存/无显卡友好 |

---

## 🛠 本地源码开发构建

如需基于源代码进行二次定制或团队协同开发：

```bash
# 1. 克隆代码仓库
git clone https://github.com/crazymsn/voice-studio.git
cd voice-studio

# 2. 安装项目依赖
bun install

# 3. 准备 Python 语音核心环境
bun run setup:api

# 4. 启动桌面客户端开发预览
bun run dev

# 5. 打包构建
cd electron
bun run build        # 编译前端和主进程
bun run dist:dir     # 打包免安装目录 (win-unpacked)
```

---

## 🏢 技术支持与商务咨询

* **研发出品**：深度云创科技
* **官方导航页**：[https://nav.meding.site](https://nav.meding.site)

![企业微信二维码](docs/images/contact-wecom.jpg)
---

## 📋 使用须知

* 声音克隆功能请在取得当事人授权同意的前提下合规使用。
* 严禁利用本系统制作任何侵犯他人合法权益、危害公共安全或违反法律法规的音视频内容。
* 本地加载的各语音合成模型适用其对应的开源权重许可协议，商业应用请结合具体模型规范评估。

<div align="center">
  <p>© 2026 深度云创科技 · 保留所有权利</p>
</div>
