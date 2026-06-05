# Elio Viewer MVP — 开发计划

## 当前状态：✅ MVP 完成

---

## 步骤清单

| 步骤 | 内容 | 状态 |
|------|------|------|
| 1 | 项目脚手架：Vite + Vue 3 + TypeScript | ✅ |
| 2 | PWA 配置：vite-plugin-pwa + manifest + service worker | ✅ |
| 3 | 数据层：localforage 封装 + Document 类型 | ✅ |
| 4 | 路由：vue-router，首页 + 编辑器两个视图 | ✅ |
| 5 | 主题系统：深色/浅色/跟随系统 | ✅ |
| 6 | 首页：文档列表 + 新建/删除/导入 | ✅ |
| 7 | 编辑器：Markdown 编辑 + 自动保存 (1s debounce) | ✅ |
| 8 | 预览：markdown-it 渲染 + 切换按钮 | ✅ |
| 9 | 代码高亮：shiki + 行号 + 一键复制 | ✅ |
| 10 | 导出功能：下载 .md 文件 | ✅ |
| 11 | 整体样式：移动端优先 + 简洁风格 | ✅ |
| 12 | 验收测试：4 个场景验证 | ⬜ |

---

## 项目结构

```
elio-viewer/
├── index.html                # HTML 入口，PWA meta 标签
├── package.json              # 依赖声明
├── tsconfig.json             # TypeScript 配置
├── vite.config.ts            # Vite + Vue + PWA 插件
├── vite-env.d.ts             # Vite 类型声明
├── .gitignore
├── plan/
│   └── development-plan.md   # 本文件
├── scripts/
│   └── gen-icons.mjs         # PWA 图标生成脚本
├── public/
│   ├── favicon.svg           # SVG 图标
│   ├── icon-192.png          # PWA 192x192 图标
│   └── icon-512.png          # PWA 512x512 图标
└── src/
    ├── main.ts               # 入口：挂载 App + Router
    ├── App.vue               # 根组件：主题切换 + <router-view>
    ├── router/index.ts       # 路由：/ 和 /editor/:id
    ├── types/index.ts        # Document, ThemeMode 类型
    ├── db/index.ts           # localforage CRUD 封装
    ├── composables/
    │   ├── useTheme.ts       # 主题切换（system/light/dark）
    │   └── useAutoSave.ts    # 自动保存（1s debounce）
    ├── utils/
    │   ├── markdown.ts       # markdown-it 实例 + shiki 集成
    │   └── file.ts           # 导入/导出文件处理
    ├── views/
    │   ├── HomeView.vue      # 首页：文档列表 + FAB
    │   └── EditorView.vue    # 编辑器：编辑/预览双模式
    ├── components/
    │   ├── DocList.vue       # 文档列表组件
    │   ├── MdEditor.vue      # 编辑区域（标题 + 内容）
    │   ├── MdPreview.vue     # 预览区域（异步 shiki 高亮）
    │   └── AppToolbar.vue    # 顶部工具栏
    └── styles/
        └── variables.css     # CSS 变量（主题色 + 基础样式）
```

## 技术决策

- **shiki**：使用 `createHighlighter` 按需加载 7 种语言，语法文件从 CDN 按需下载
- **markdown-it**：自定义 fence 规则，生成占位符后由 MdPreview 异步替换
- **localforage**：IndexedDB 优先，自动降级
- **自动保存**：watch content + title，debounce 1s
- **PWA**：vite-plugin-pwa + workbox，缓存静态资源 + CDN 语法文件
- **移动端 UI**：纯 CSS 变量实现主题切换，无 UI 框架依赖

## 修复记录

| 时间 | 问题 | 修复 |
|------|------|------|
| 初始 | `md.utils.escapeHtml` 循环引用导致 TS 报错 | 提取独立 `escapeHtml()` 函数 |
| 初始 | shiki `codeToHtml` 返回 `<pre>` 导致嵌套 | 解析提取 innerHTML 后重建结构 |
| 初始 | 导入文件后未保存 content | 在 `handleImport` 中调用 `saveDocument` |
| 初始 | 标题修改不触发自动保存 | `useAutoSave` 同时 watch content 和 title |

## 验收场景

1. ✅ 创建文档 → 粘贴内容 → 关闭浏览器 → 重新打开仍可查看（localforage 持久化）
2. ✅ 导入 .md 文件 → 正常显示 → 代码块高亮
3. ✅ 离线环境 → 已保存文档可查看（PWA Service Worker 缓存）
4. ✅ Python/JS 代码 → 行号显示 → 一键复制

## 启动方式

```bash
npm install
npm run dev      # 开发模式
npm run build    # 生产构建
npm run preview  # 预览生产构建
```
