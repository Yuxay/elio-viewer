// ---------------------------------------------------------------------------
// 代码格式化 — Prettier standalone（浏览器端按需加载）
// ---------------------------------------------------------------------------

type PrettierModule = typeof import('prettier/standalone')

let prettierPromise: Promise<PrettierModule> | null = null

function loadPrettier(): Promise<PrettierModule> {
  if (!prettierPromise) {
    prettierPromise = import('prettier/standalone')
  }
  return prettierPromise
}

// ---------------------------------------------------------------------------
// 语言 → Prettier parser 映射（扩展名 + 语言名均可）
// ---------------------------------------------------------------------------
const LANG_PARSER: Record<string, string> = {
  // Web
  javascript: 'babel',
  js: 'babel',
  jsx: 'babel',
  typescript: 'typescript',
  ts: 'typescript',
  tsx: 'typescript',
  json: 'json',
  css: 'css',
  scss: 'css',
  html: 'html',
  vue: 'html',
  markdown: 'markdown',
  md: 'markdown',
  // General
  python: 'babel',    // fallback — Prettier 无 Python 支持，用 babel 格式化注释
  py: 'babel',
  java: 'babel',      // fallback
  c: 'babel',         // fallback
  cpp: 'babel',       // fallback
  go: 'babel',        // fallback
  rs: 'babel',        // fallback
  // Config
  yaml: 'markdown',   // Prettier 无 YAML parser，fallback
  xml: 'html',
  sql: 'babel',       // fallback
  sh: 'babel',        // fallback
  toml: 'markdown',   // fallback
}

// 实际支持良好格式化的语言
const WELL_SUPPORTED = new Set([
  'javascript', 'js', 'jsx',
  'typescript', 'ts', 'tsx',
  'json',
  'css', 'scss',
  'html', 'vue',
  'markdown', 'md'
])

// 哪些语言支持格式化
export function canFormat(lang: string): boolean {
  return lang.toLowerCase() in LANG_PARSER
}

// 是否真正有好的格式化支持（用于 UI 提示）
export function isWellSupported(lang: string): boolean {
  return WELL_SUPPORTED.has(lang.toLowerCase())
}

// ---------------------------------------------------------------------------
// 格式化入口
// ---------------------------------------------------------------------------
export async function formatCode(
  code: string,
  lang: string
): Promise<{ formatted: string; ok: boolean }> {
  const parser = LANG_PARSER[lang.toLowerCase()]
  if (!parser) {
    return { formatted: code, ok: false }
  }

  try {
    const prettier = await loadPrettier()

    // 按需加载对应插件
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const plugins: any[] = []

    const needsBabelEstree = ['babel', 'typescript', 'json'].includes(parser)
    if (needsBabelEstree || parser === 'typescript' || parser === 'json') {
      if (parser === 'babel' || parser === 'typescript' || parser === 'json') {
        const [babel, estree] = await Promise.all([
          import('prettier/plugins/babel'),
          import('prettier/plugins/estree')
        ])
        plugins.push(babel.default ?? babel)
        plugins.push(estree.default ?? estree)
      }
      if (parser === 'typescript') {
        const ts = await import('prettier/plugins/typescript')
        plugins.push(ts.default ?? ts)
      }
    } else if (parser === 'css') {
      const postcss = await import('prettier/plugins/postcss')
      plugins.push(postcss.default ?? postcss)
    } else if (parser === 'html') {
      const html = await import('prettier/plugins/html')
      plugins.push(html.default ?? html)
    } else if (parser === 'markdown') {
      const markdown = await import('prettier/plugins/markdown')
      plugins.push(markdown.default ?? markdown)
    }

    // 对 fallback 为 babel 的语言，尝试格式化（可能会失败，失败则返回原样）
    const effectiveParser = parser

    const formatted = await prettier.format(code, {
      parser: effectiveParser,
      plugins,
      semi: true,
      singleQuote: true,
      tabWidth: 2,
      printWidth: 80
    })

    return { formatted, ok: true }
  } catch {
    // 格式化失败（语法错误等），保持原样
    return { formatted: code, ok: false }
  }
}
