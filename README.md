<p align="center">
  <img src="public/favicon.svg" width="72" alt="Elio Viewer" />
</p>

<h1 align="center">Elio Viewer</h1>

<p align="center">
  多类型代码文件查看与编辑器 · PWA 离线可用 · 25+ 语言支持
</p>

<p align="center">
  <img src="https://img.shields.io/badge/vue-3.5-4fc08d?logo=vuedotjs" />
  <img src="https://img.shields.io/badge/typescript-5.6-3178c6?logo=typescript" />
  <img src="https://img.shields.io/badge/vite-6-646cff?logo=vite" />
  <img src="https://img.shields.io/badge/pwa-ready-5a0fc8?logo=pwa" />
</p>

---

## 功能

- **📝 多类型文件** — 支持 25 种文件类型：Markdown、JS/TS/Vue/HTML/CSS、Python、Java、C/C++、Go、Rust、SQL、Shell 等
- **🎨 语法高亮** — 编辑时 CodeMirror 6 实时高亮 + 预览时 Shiki 主题高亮（自动跟随亮色/暗色模式）
- **⚡ 代码片段** — 输入 `for` / `if` / `try` 等关键字自动弹出模板补全，Tab 键在占位符间跳转
- **🔧 格式化** — 一键 Prettier 格式化 JS/TS/CSS/HTML/Vue/Markdown 等 Web 语言
- **📱 PWA 离线** — 可安装到桌面/主屏幕，离线访问已缓存的文档
- **🌗 亮暗主题** — 亮色 / 暗色 / 跟随系统 三种模式
- **🌐 双语界面** — 中文 / 英文切换
- **💾 自动保存** — 编辑后 1 秒内自动存入 IndexedDB
- **📥📤 导入导出** — 从本地文件导入（自动识别扩展名），导出为对应格式下载

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 技术栈

| 层 | 选型 |
|---|------|
| 框架 | Vue 3（Composition API + `<script setup>`） |
| 语言 | TypeScript（strict） |
| 构建 | Vite 6 |
| 路由 | vue-router 4（hash-free SPA） |
| 编辑器 | CodeMirror 6 + 语言扩展 |
| 预览高亮 | Shiki（21 种语法 + github-dark/light 主题） |
| 格式化 | Prettier standalone（浏览器端按需加载） |
| Markdown | markdown-it |
| 存储 | localforage（IndexedDB） |
| PWA | vite-plugin-pwa（Workbox） |
| 主题 | CSS 自定义属性 + `.dark` class 切换 |

## 项目结构

```
src/
├── main.ts                # 入口：createApp + router + 全局样式
├── App.vue                # 外壳：顶栏 + 路由视图 + 更新提示
├── router/index.ts        # 路由：/ → HomeView, /editor/:id → EditorView
│
├── views/
│   ├── HomeView.vue       # 首页：文档列表 + 新建 / 导入按钮
│   └── EditorView.vue     # 编辑器：根据文件类型切换 CodeEditor / MdEditor
│
├── components/
│   ├── DocList.vue         # 文档列表卡片
│   ├── FileTypeDialog.vue  # 文件类型选择弹窗（分类网格）
│   ├── AppToolbar.vue      # 编辑器工具栏
│   ├── MdEditor.vue        # Markdown 纯文本编辑器
│   ├── CodeEditor.vue      # CodeMirror 6 代码编辑器 + snippet 补全
│   ├── MdPreview.vue       # Markdown 渲染 / 代码高亮视图
│   └── UpdatePrompt.vue    # PWA 更新通知横幅
│
├── db/index.ts             # IndexedDB CRUD（localforage）
├── composables/
│   ├── useAutoSave.ts      # 防抖自动保存
│   └── useTheme.ts         # 亮暗主题切换
│
├── utils/
│   ├── markdown.ts         # markdown-it + Shiki 高亮器
│   ├── format.ts           # Prettier 格式化
│   ├── file.ts             # 文件导入 / 导出
│   ├── fileTypes.ts        # 文件类型注册表 + 映射
│   └── snippets.ts         # 代码片段库（9 组语言）
│
├── types/index.ts          # 类型定义
├── i18n/index.ts           # 国际化字典
└── styles/variables.css    # CSS 变量 + reset
```

## 支持的文件类型

| 分类 | 扩展名 | 编辑高亮 | 预览高亮 | 代码片段 |
|------|--------|:---:|:---:|:---:|
| Markdown | `.md` | ✅ | ✅ | — |
| Web | `.js` `.ts` `.jsx` `.tsx` `.vue` `.html` `.css` `.scss` | ✅ | ✅ | ✅ |
| 通用 | `.py` `.java` `.c` `.cpp` `.cs` `.go` `.rs` `.swift` `.kt` | ✅ | ✅ | ✅ |
| 配置 | `.json` `.yaml` `.xml` `.sql` `.sh` `.toml` | ✅ | ✅ | ✅ |
| 文本 | `.txt` | ✅ | — | — |

## PWA

项目构建后可作为 PWA 安装：

- **安装** — Chrome/Edge 地址栏右侧安装按钮，iOS Safari "添加到主屏幕"
- **离线** — Service Worker 预缓存所有静态资源 + 运行时缓存外部 CDN
- **更新** — 发布新版本后，用户打开 App 时底部弹出更新提示，一键更新
- **独立窗口** — `display: standalone`，无浏览器 UI，沉浸式体验

## License

MIT

---

<p align="center">Made with ❤️ by Yuxay</p>
