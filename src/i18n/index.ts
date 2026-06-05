import { ref, computed } from 'vue'

// ---------------------------------------------------------------------------
// 类型
// ---------------------------------------------------------------------------
export type Locale = 'zh' | 'en'

interface Dict {
  app: {
    title: string
    back: string
  }
  home: {
    emptyTitle: string
    emptyHint: string
    newDoc: string
    importDoc: string
  }
  editor: {
    loading: string
    titlePlaceholder: string
    contentPlaceholder: string
    untitled: string
  }
  toolbar: {
    preview: string
    edit: string
    saving: string
    export: string
    delete: string
    format: string
    formatted: string
  }
  docList: {
    untitled: string
    justNow: string
    minsAgo: (m: number) => string
    hoursAgo: (h: number) => string
    daysAgo: (d: number) => string
    delete: string
  }
  preview: {
    copy: string
    copied: string
    format: string
    codeView: string
  }
  fileType: {
    title: string
    cancel: string
  }
}

// ---------------------------------------------------------------------------
// 字典
// ---------------------------------------------------------------------------
const zh: Dict = {
  app: {
    title: 'Elio Viewer',
    back: '← 返回'
  },
  home: {
    emptyTitle: '暂无文档',
    emptyHint: '新建文件或导入代码文件',
    newDoc: '新建文档',
    importDoc: '导入文件',
  },
  editor: {
    loading: '加载中...',
    titlePlaceholder: '文档标题',
    contentPlaceholder: '开始写 Markdown...',
    untitled: '未命名'
  },
  toolbar: {
    preview: '👁 预览',
    edit: '✏️ 编辑',
    saving: '保存中...',
    export: '导出',
    delete: '删除',
    format: '🔧 格式化',
    formatted: '✅ 已格式化'
  },
  docList: {
    untitled: '未命名',
    justNow: '刚刚',
    minsAgo: (m: number) => `${m} 分钟前`,
    hoursAgo: (h: number) => `${h} 小时前`,
    daysAgo: (d: number) => `${d} 天前`,
    delete: '删除'
  },
  preview: {
    copy: '📋 复制',
    copied: '✅ 已复制！',
    format: '🔧 格式化',
    codeView: '📄 代码视图'
  },
  fileType: {
    title: '选择文件类型',
    cancel: '取消'
  }
}

const en: Dict = {
  app: {
    title: 'Elio Viewer',
    back: '← Back'
  },
  home: {
    emptyTitle: 'No documents yet.',
    emptyHint: 'Create a new file or import one.',
    newDoc: 'New document',
    importDoc: 'Import file',
  },
  editor: {
    loading: 'Loading...',
    titlePlaceholder: 'Document title',
    contentPlaceholder: 'Start writing Markdown...',
    untitled: 'Untitled'
  },
  toolbar: {
    preview: '👁 Preview',
    edit: '✏️ Edit',
    saving: 'Saving...',
    export: 'Export',
    delete: 'Delete',
    format: '🔧 Format',
    formatted: '✅ Formatted'
  },
  docList: {
    untitled: 'Untitled',
    justNow: 'just now',
    minsAgo: (m: number) => `${m}m ago`,
    hoursAgo: (h: number) => `${h}h ago`,
    daysAgo: (d: number) => `${d}d ago`,
    delete: 'Delete'
  },
  preview: {
    copy: '📋 Copy',
    copied: '✅ Copied!',
    format: '🔧 Format',
    codeView: '📄 Code View'
  },
  fileType: {
    title: 'Choose file type',
    cancel: 'Cancel'
  }
}

const dictionaries: Record<Locale, Dict> = { zh, en }

// ---------------------------------------------------------------------------
// 响应式状态
// ---------------------------------------------------------------------------
const LOCALE_KEY = 'elio-locale'
const stored = localStorage.getItem(LOCALE_KEY) as Locale | null
const locale = ref<Locale>(stored === 'zh' || stored === 'en' ? stored : 'zh')

// 跟随系统语言？如果需要可以在这里加逻辑，但用户说默认中文即可

const dict = computed<Dict>(() => dictionaries[locale.value])

// ---------------------------------------------------------------------------
// 导出
// ---------------------------------------------------------------------------
export function useI18n() {
  function setLocale(next: Locale) {
    locale.value = next
    localStorage.setItem(LOCALE_KEY, next)
  }

  function toggleLocale() {
    setLocale(locale.value === 'zh' ? 'en' : 'zh')
  }

  // Vue 模板中 ComputedRef 自动解包，直接 `$t.toolbar.preview` 即可
  return { locale, $t: dict, setLocale, toggleLocale }
}
