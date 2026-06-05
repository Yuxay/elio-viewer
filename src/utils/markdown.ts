import MarkdownIt from 'markdown-it'
import { createHighlighter, type Highlighter } from 'shiki'

let highlighter: Highlighter | null = null

async function getHighlighter(): Promise<Highlighter> {
  if (highlighter) return highlighter
  highlighter = await createHighlighter({
    themes: ['github-dark', 'github-light'],
    langs: [
      'javascript', 'typescript', 'jsx', 'tsx',
      'python', 'java', 'c', 'cpp', 'csharp',
      'html', 'css', 'scss',
      'json', 'yaml', 'xml', 'sql',
      'bash', 'markdown', 'go', 'rust',
      'kotlin', 'swift', 'toml'
    ]
  })
  return highlighter
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const md = new MarkdownIt({
  html: false,
  linkify: true,
  breaks: true,
  highlight: (str: string, lang: string): string => {
    const encoded = encodeURIComponent(str)
    const langAttr = escapeHtml(lang || '')
    return `<pre class="shiki-placeholder" data-code="${encoded}" data-lang="${langAttr}"><code>${escapeHtml(str)}</code></pre>`
  }
})

export { md, getHighlighter }
