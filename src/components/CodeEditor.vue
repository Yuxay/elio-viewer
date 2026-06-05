<template>
  <div class="code-editor">
    <div class="code-header">
      <span class="code-type-badge">.{{ fileType }}</span>
    </div>
    <div ref="editorRef" class="cm-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { EditorView, keymap, placeholder as cmPlaceholder } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands'
import { syntaxHighlighting, defaultHighlightStyle, bracketMatching } from '@codemirror/language'
import { closeBrackets, autocompletion, snippetCompletion, type CompletionSource } from '@codemirror/autocomplete'
import { highlightSelectionMatches } from '@codemirror/search'
import { lintKeymap } from '@codemirror/lint'
import { oneDark } from '@codemirror/theme-one-dark'
import { EXT_TO_CM_LANG, getPlaceholder } from '@/utils/fileTypes'
import { getSnippets } from '@/utils/snippets'
import { useI18n } from '@/i18n'

const { $t } = useI18n()

const props = defineProps<{
  content: string
  fileType: string
}>()

const emit = defineEmits<{
  'update:content': [value: string]
}>()

const editorRef = ref<HTMLElement>()
let view: EditorView | null = null

async function getLanguageExtension(langKey: string) {
  const m = EXT_TO_CM_LANG[langKey] || 'text'
  switch (m) {
    case 'javascript': {
      const { javascript } = await import('@codemirror/lang-javascript')
      return javascript()
    }
    case 'typescript': {
      const { javascript } = await import('@codemirror/lang-javascript')
      return javascript({ typescript: true })
    }
    case 'jsx': {
      const { javascript } = await import('@codemirror/lang-javascript')
      return javascript({ jsx: true })
    }
    case 'tsx': {
      const { javascript } = await import('@codemirror/lang-javascript')
      return javascript({ jsx: true, typescript: true })
    }
    case 'html': {
      const { html } = await import('@codemirror/lang-html')
      return html()
    }
    case 'css': {
      const { css } = await import('@codemirror/lang-css')
      return css()
    }
    case 'json': {
      const { json } = await import('@codemirror/lang-json')
      return json()
    }
    case 'markdown': {
      const { markdown } = await import('@codemirror/lang-markdown')
      return markdown()
    }
    case 'python': {
      const { python } = await import('@codemirror/lang-python')
      return python()
    }
    case 'java': {
      const { java } = await import('@codemirror/lang-java')
      return java()
    }
    case 'cpp': {
      const { cpp } = await import('@codemirror/lang-cpp')
      return cpp()
    }
    case 'sql': {
      const { sql } = await import('@codemirror/lang-sql')
      return sql()
    }
    case 'xml': {
      const { xml } = await import('@codemirror/lang-xml')
      return xml()
    }
    case 'yaml': {
      const { yaml } = await import('@codemirror/lang-yaml')
      return yaml()
    }
    default:
      return []
  }
}

async function createEditor() {
  if (!editorRef.value) return

  const langKey = props.fileType || 'md'
  const langExt = await getLanguageExtension(langKey)
  const isDark = document.documentElement.classList.contains('dark')
  const hint = getPlaceholder(langKey, $t.value.editor.contentPlaceholder)
  const snippets = getSnippets(langKey)

  // 构建 snippet 补全源
  const snippetSource: CompletionSource = (context) => {
    const word = context.matchBefore(/\w+/)
    if (!word || word.text.length < 2) return null
    const lower = word.text.toLowerCase()
    const match = snippets.find(s => s.keyword === lower)
    if (!match) return null
    return {
      from: word.from,
      options: [
        snippetCompletion(match.template, {
          label: match.detail,
          detail: '📋 ' + match.keyword,
          type: 'keyword'
        })
      ]
    }
  }

  const state = EditorState.create({
    doc: props.content,
    extensions: [
      langExt,
      bracketMatching(),
      closeBrackets(),
      highlightSelectionMatches(),
      history(),
      keymap.of([...defaultKeymap, ...historyKeymap, ...lintKeymap, indentWithTab]),
      // 启用自动补全并注入 snippet 源
      autocompletion({ override: [snippetSource] }),
      cmPlaceholder(hint),
      syntaxHighlighting(defaultHighlightStyle, { fallback: false }),
      ...(isDark ? [oneDark] : []),
      EditorView.updateListener.of(update => {
        if (update.docChanged) {
          emit('update:content', update.state.doc.toString())
        }
      }),
      EditorView.theme({
        '&': {
          height: '100%',
          fontSize: '14px'
        },
        '.cm-scroller': {
          fontFamily: 'var(--font-mono)',
          lineHeight: '1.7'
        },
        '.cm-content': {
          padding: '12px'
        },
        '.cm-gutters': {
          display: 'none'
        },
        '.cm-tooltip-autocomplete': {
          borderRadius: '8px',
          border: '1px solid var(--border)',
          background: 'var(--bg-secondary)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          fontSize: '13px'
        },
        '.cm-tooltip-autocomplete ul li[aria-selected]': {
          background: 'var(--accent)',
          color: 'white'
        },
        '.cm-completionIcon': {
          opacity: '0.7',
          width: '1em',
          marginRight: '6px'
        },
        '.cm-completionDetail': {
          color: 'var(--text-muted)',
          fontStyle: 'italic',
          marginLeft: '8px'
        }
      })
    ]
  })

  if (view) {
    view.destroy()
  }

  view = new EditorView({
    state,
    parent: editorRef.value
  })
}

// Watch for content changes from outside (e.g. format)
watch(() => props.content, (newVal) => {
  if (view && newVal !== view.state.doc.toString()) {
    view.dispatch({
      changes: {
        from: 0,
        to: view.state.doc.length,
        insert: newVal
      }
    })
  }
})

// Watch for fileType changes (re-create editor)
watch(() => props.fileType, () => {
  createEditor()
})

// Watch for theme changes
const darkObserver = new MutationObserver(() => {
  createEditor()
})
darkObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['class']
})

onMounted(createEditor)
onUnmounted(() => {
  view?.destroy()
  darkObserver.disconnect()
})
</script>

<style scoped>
.code-editor {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.code-header {
  display: flex;
  align-items: center;
  padding: 6px 16px;
  background: var(--bg-tertiary);
  border-bottom: 1px solid var(--border);
}

.code-type-badge {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 6px;
  background: var(--accent);
  color: white;
}

.cm-container {
  flex: 1;
  overflow: hidden;
}
</style>
