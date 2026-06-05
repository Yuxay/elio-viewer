import type { FileTypeInfo } from '@/types'

// ---------------------------------------------------------------------------
// 支持的文件类型注册表
// ---------------------------------------------------------------------------
export const FILE_TYPES: FileTypeInfo[] = [
  // Web 前端
  { ext: 'md', label: 'Markdown', category: 'web' },
  { ext: 'js', label: 'JavaScript', category: 'web' },
  { ext: 'ts', label: 'TypeScript', category: 'web' },
  { ext: 'jsx', label: 'React JSX', category: 'web' },
  { ext: 'tsx', label: 'React TSX', category: 'web' },
  { ext: 'vue', label: 'Vue SFC', category: 'web' },
  { ext: 'html', label: 'HTML', category: 'web' },
  { ext: 'css', label: 'CSS', category: 'web' },
  { ext: 'scss', label: 'SCSS', category: 'web' },

  // 通用编程语言
  { ext: 'py', label: 'Python', category: 'general' },
  { ext: 'java', label: 'Java', category: 'general' },
  { ext: 'c', label: 'C', category: 'general' },
  { ext: 'cpp', label: 'C++', category: 'general' },
  { ext: 'cs', label: 'C#', category: 'general' },
  { ext: 'go', label: 'Go', category: 'general' },
  { ext: 'rs', label: 'Rust', category: 'general' },
  { ext: 'swift', label: 'Swift', category: 'general' },
  { ext: 'kt', label: 'Kotlin', category: 'general' },

  // 配置 / 数据
  { ext: 'json', label: 'JSON', category: 'config' },
  { ext: 'yaml', label: 'YAML', category: 'config' },
  { ext: 'xml', label: 'XML', category: 'config' },
  { ext: 'sql', label: 'SQL', category: 'config' },
  { ext: 'sh', label: 'Shell', category: 'config' },
  { ext: 'toml', label: 'TOML', category: 'config' },

  // 其他
  { ext: 'txt', label: 'Plain Text', category: 'other' }
]

export function getFileType(ext: string): FileTypeInfo | undefined {
  return FILE_TYPES.find(f => f.ext === ext)
}

// 将扩展名映射到 CodeMirror 语言标识符
export const EXT_TO_CM_LANG: Record<string, string> = {
  md: 'markdown',
  js: 'javascript',
  ts: 'typescript',
  jsx: 'jsx',
  tsx: 'tsx',
  vue: 'html',       // Vue 用 HTML 模式近似
  html: 'html',
  css: 'css',
  scss: 'css',       // SCSS 用 CSS 模式近似
  py: 'python',
  java: 'java',
  c: 'cpp',
  cpp: 'cpp',
  cs: 'text',
  go: 'text',
  rs: 'text',
  swift: 'text',
  kt: 'text',
  json: 'json',
  yaml: 'yaml',
  xml: 'xml',
  sql: 'sql',
  sh: 'text',
  toml: 'text',
  txt: 'text'
}

// 扩展名 → Shiki 语言标识
export const EXT_TO_SHIKI_LANG: Record<string, string> = {
  md: 'markdown',
  js: 'javascript',
  ts: 'typescript',
  jsx: 'jsx',
  tsx: 'tsx',
  vue: 'html',
  html: 'html',
  css: 'css',
  scss: 'scss',
  py: 'python',
  java: 'java',
  c: 'c',
  cpp: 'cpp',
  cs: 'csharp',
  go: 'go',
  rs: 'rust',
  swift: 'swift',
  kt: 'kotlin',
  json: 'json',
  yaml: 'yaml',
  xml: 'xml',
  sql: 'sql',
  sh: 'bash',
  toml: 'toml',
  txt: 'text'
}

// 哪些类型需要完整文档格式化（非 markdown 的代码类型）
export function isCodeFile(ext: string): boolean {
  return ext !== 'md' && ext !== 'txt'
}

// 获取语言特定的占位提示
export function getPlaceholder(ext: string, fallback: string): string {
  const tips: Record<string, string> = {
    js: '// Start typing JavaScript...',
    ts: '// Start typing TypeScript...',
    jsx: '// Start typing JSX...',
    tsx: '// Start typing TSX...',
    vue: '<!-- Start typing Vue template... -->',
    html: '<!-- Start typing HTML... -->',
    css: '/* Start typing CSS... */',
    scss: '/* Start typing SCSS... */',
    py: '# Start typing Python...',
    java: '// Start typing Java...',
    c: '// Start typing C...',
    cpp: '// Start typing C++...',
    go: '// Start typing Go...',
    rs: '// Start typing Rust...',
    sql: '-- Start typing SQL...',
    sh: '# Start typing Shell script...',
    json: '// Start typing JSON...',
    yaml: '# Start typing YAML...',
    xml: '<!-- Start typing XML... -->'
  }
  return tips[ext] || fallback
}
