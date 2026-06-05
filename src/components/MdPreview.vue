<template>
  <div class="md-preview" ref="container"></div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
import { md, getHighlighter, escapeHtml } from '@/utils/markdown'
import { formatCode, canFormat } from '@/utils/format'
import { EXT_TO_SHIKI_LANG } from '@/utils/fileTypes'
import { useI18n } from '@/i18n'

const { $t } = useI18n()

const props = defineProps<{ content: string; fileType?: string }>()
const container = ref<HTMLElement>()

// ---------------------------------------------------------------------------
// 辅助：为一段代码生成高亮 HTML + 行号（复用 shiki 实例）
// ---------------------------------------------------------------------------
async function buildCodeHtml(code: string, lang: string): Promise<{
  innerHtml: string
  lineNums: string
  preStyle: string
}> {
  const hl = await getHighlighter()
  const isDark = document.documentElement.classList.contains('dark')
  const theme = isDark ? 'github-dark' : 'github-light'

  const result = hl.codeToHtml(code, { lang: lang || 'text', theme })
  const tmp = document.createElement('div')
  tmp.innerHTML = result

  const shikiCode = tmp.querySelector('code')
  const innerHtml = shikiCode ? shikiCode.innerHTML : result

  const shikiPre = tmp.querySelector('pre')
  const preStyle = shikiPre ? shikiPre.getAttribute('style') || '' : ''

  const lines = code.endsWith('\n') ? code.slice(0, -1).split('\n') : code.split('\n')
  const lineNums = Array.from({ length: lines.length }, (_, i) =>
    `<span class="line-number">${i + 1}</span>`
  ).join('\n')

  return { innerHtml, lineNums, preStyle }
}

function getShikiLang(ext: string): string {
  return EXT_TO_SHIKI_LANG[ext] || 'text'
}

// ---------------------------------------------------------------------------
// 主渲染
// ---------------------------------------------------------------------------
async function render() {
  if (!container.value) return

  const raw = props.content || ''
  const ft = props.fileType || 'md'

  // 非 markdown 文件：直接作为代码块展示
  if (ft !== 'md' && ft !== 'txt') {
    await renderCodeView(raw, ft)
    return
  }

  // Markdown 渲染
  const html = md.render(raw)
  container.value.innerHTML = html

  const placeholders = container.value.querySelectorAll<HTMLElement>('.shiki-placeholder')
  if (placeholders.length === 0) return

  for (const pre of placeholders) {
    const code = decodeURIComponent(pre.dataset.code ?? '')
    const lang = pre.dataset.lang ?? 'text'

    try {
      const { innerHtml, lineNums, preStyle } = await buildCodeHtml(code, lang)
      const safeLang = escapeHtml(lang || 'text')
      const showFormat = canFormat(lang)
      const formatBtn = showFormat
        ? `<button class="format-btn">${$t.value.preview.format}</button>`
        : ''

      const wrapper = document.createElement('div')
      wrapper.className = 'code-block-wrapper'
      wrapper.innerHTML = `
        <div class="code-header">
          <span class="code-lang">${safeLang}</span>
          <div class="code-header-actions">
            ${formatBtn}
            <button class="copy-btn" data-code="${encodeURIComponent(code)}">${$t.value.preview.copy}</button>
          </div>
        </div>
        <div class="code-body">
          <div class="line-numbers">${lineNums}</div>
          <pre class="code-content" style="${preStyle}"><code>${innerHtml}</code></pre>
        </div>
      `
      pre.replaceWith(wrapper)
    } catch {
      pre.classList.remove('shiki-placeholder')
      pre.classList.add('code-fallback')
    }
  }

  attachButtons()
}

// 纯代码视图（非 markdown 文件）
async function renderCodeView(code: string, lang: string) {
  if (!container.value) return
  const shikiLang = getShikiLang(lang)

  try {
    const { innerHtml, lineNums, preStyle } = await buildCodeHtml(code || '', shikiLang)
    const showFormat = canFormat(lang)
    container.value.innerHTML = `
      <div class="code-view-wrapper">
        <div class="code-view-header">
          <span class="code-view-lang">.${escapeHtml(lang)} — ${escapeHtml(shikiLang)}</span>
          <div class="code-view-actions">
            ${showFormat ? `<button class="format-btn">${$t.value.preview.format}</button>` : ''}
            <button class="copy-btn" data-code="${encodeURIComponent(code || '')}">${$t.value.preview.copy}</button>
          </div>
        </div>
        <div class="code-body">
          <div class="line-numbers">${lineNums}</div>
          <pre class="code-content" style="${preStyle}"><code>${innerHtml}</code></pre>
        </div>
      </div>
    `
  } catch {
    container.value.innerHTML = `
      <div class="code-view-wrapper">
        <div class="code-view-header">
          <span class="code-view-lang">.${escapeHtml(lang)}</span>
        </div>
        <div class="code-body">
          <div class="line-numbers">${buildPlainLineNums(code || '')}</div>
          <pre class="code-content"><code>${escapeHtml(code || '')}</code></pre>
        </div>
      </div>
    `
  }

  attachButtons()
}

function buildPlainLineNums(code: string): string {
  const lines = code.endsWith('\n') ? code.slice(0, -1).split('\n') : code.split('\n')
  return Array.from({ length: lines.length }, (_, i) =>
    `<span class="line-number">${i + 1}</span>`
  ).join('\n')
}

function attachButtons() {
  if (!container.value) return

  // --- 复制按钮 ---
  container.value.querySelectorAll<HTMLButtonElement>('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const raw = btn.dataset.code ?? ''
      const decoded = decodeURIComponent(raw)
      try {
        await navigator.clipboard.writeText(decoded)
        btn.textContent = $t.value.preview.copied
        setTimeout(() => { btn.textContent = $t.value.preview.copy }, 2000)
      } catch {
        const ta = document.createElement('textarea')
        ta.value = decoded
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
        btn.textContent = $t.value.preview.copied
        setTimeout(() => { btn.textContent = $t.value.preview.copy }, 2000)
      }
    })
  })

  // --- 格式化按钮 ---
  container.value.querySelectorAll<HTMLButtonElement>('.format-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const wrapper = btn.closest('.code-block-wrapper') || btn.closest('.code-view-wrapper') as HTMLElement
      if (!wrapper) return

      const copyBtn = wrapper.querySelector('.copy-btn') as HTMLButtonElement
      const lineNumsDiv = wrapper.querySelector('.line-numbers') as HTMLElement
      const codePre = wrapper.querySelector('.code-content') as HTMLElement
      const codeEl = codePre?.querySelector('code')
      const langEl = wrapper.querySelector('.code-lang') || wrapper.querySelector('.code-view-lang')

      const oldCode = decodeURIComponent(copyBtn?.dataset.code ?? '')
      let lang = langEl?.textContent?.toLowerCase() ?? ''
      // Strip .ext prefix for the code view header
      if (lang.startsWith('.')) {
        lang = lang.split(' — ')[0]?.replace('.', '') || lang
      }

      btn.textContent = '...'
      btn.disabled = true

      const { formatted, ok } = await formatCode(oldCode, lang)

      if (ok && formatted !== oldCode) {
        try {
          const rebuilt = await buildCodeHtml(formatted, lang)
          lineNumsDiv.innerHTML = rebuilt.lineNums
          codeEl!.innerHTML = rebuilt.innerHtml
          codePre.setAttribute('style', rebuilt.preStyle)
          copyBtn.dataset.code = encodeURIComponent(formatted)
        } catch { /* keep old */ }
      }

      btn.textContent = $t.value.preview.format
      btn.disabled = false
    })
  })
}

onMounted(render)
watch(() => props.content, async () => {
  await nextTick()
  render()
})
</script>

<style>
/* Not scoped — these styles apply to rendered markdown HTML */

.md-preview {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  line-height: 1.75;
  font-size: 15px;
  word-wrap: break-word;
}

.md-preview h1 { font-size: 1.6em; margin: 0.8em 0 0.4em; }
.md-preview h2 { font-size: 1.35em; margin: 0.7em 0 0.35em; }
.md-preview h3 { font-size: 1.15em; margin: 0.6em 0 0.3em; }
.md-preview h4, .md-preview h5, .md-preview h6 {
  font-size: 1em; margin: 0.5em 0 0.25em;
}

.md-preview p { margin: 0.5em 0; }

.md-preview ul, .md-preview ol {
  padding-left: 1.5em;
  margin: 0.4em 0;
}

.md-preview li { margin: 0.2em 0; }

.md-preview blockquote {
  border-left: 3px solid var(--accent);
  padding: 4px 12px;
  margin: 0.5em 0;
  color: var(--text-secondary);
  background: var(--bg-tertiary);
  border-radius: 0 6px 6px 0;
}

.md-preview table {
  width: 100%;
  border-collapse: collapse;
  margin: 0.5em 0;
  font-size: 14px;
}

.md-preview th, .md-preview td {
  border: 1px solid var(--border);
  padding: 6px 10px;
  text-align: left;
}

.md-preview th {
  background: var(--bg-tertiary);
  font-weight: 600;
}

.md-preview img {
  max-width: 100%;
  border-radius: 6px;
}

.md-preview a {
  color: var(--accent);
}

.md-preview hr {
  border: none;
  border-top: 1px solid var(--border);
  margin: 1em 0;
}

/* Code block wrapper */
.code-block-wrapper {
  margin: 0.8em 0;
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--border);
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 12px;
  background: var(--bg-tertiary);
  font-size: 12px;
}

.code-lang {
  color: var(--text-muted);
  font-weight: 600;
  text-transform: uppercase;
}

.code-header-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.copy-btn,
.format-btn {
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 4px;
  background: var(--bg-secondary);
  color: var(--text-secondary);
  cursor: pointer;
}

.copy-btn:active,
.format-btn:active {
  background: var(--accent);
  color: white;
}

.code-body {
  display: flex;
  overflow-x: auto;
}

.line-numbers {
  padding: 12px 8px 12px 12px;
  background: var(--code-bg);
  color: var(--text-muted);
  text-align: right;
  user-select: none;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.6;
  white-space: pre;
  border-right: 1px solid var(--border);
}

.code-content {
  flex: 1;
  overflow-x: auto;
  margin: 0;
  padding: 12px;
  background: var(--code-bg);
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.6;
  border-radius: 0;
}

.code-content code {
  font-family: inherit;
}

/* Inline code */
.md-preview code:not(pre code) {
  background: var(--code-bg);
  padding: 2px 5px;
  border-radius: 4px;
  font-family: var(--font-mono);
  font-size: 0.9em;
}

/* Fallback code */
.code-fallback {
  background: var(--code-bg);
  padding: 12px;
  border-radius: var(--radius);
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.6;
  margin: 0.8em 0;
}

/* Code view wrapper (non-markdown files) */
.code-view-wrapper {
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--border);
}

.code-view-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 12px;
  background: var(--bg-tertiary);
  font-size: 12px;
}

.code-view-lang {
  color: var(--text-muted);
  font-weight: 600;
  font-family: var(--font-mono);
  font-size: 11px;
}

.code-view-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}
</style>
