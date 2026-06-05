<template>
  <div class="editor-view">
    <AppToolbar
      :mode="mode"
      :title="doc?.title ?? ''"
      :file-type="doc?.fileType ?? 'md'"
      :is-saving="isSaving"
      @toggle-mode="mode = mode === 'edit' ? 'preview' : 'edit'"
      @format="handleFormat"
      @export="handleExport"
      @delete="handleDelete"
    />

    <CodeEditor
      v-if="mode === 'edit' && doc && isCode"
      v-model:content="doc.content"
      :file-type="doc.fileType"
    />

    <MdEditor
      v-else-if="mode === 'edit' && doc && !isCode"
      v-model:content="doc.content"
      v-model:title="doc.title"
      :file-type="doc.fileType"
    />

    <MdPreview
      v-else-if="mode === 'preview' && doc"
      :content="doc.content"
      :file-type="doc.fileType"
    />

    <div class="loading" v-else-if="!doc">
      {{ $t.editor.loading }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getDocument, deleteDocument, saveDocument } from '@/db'
import { useAutoSave } from '@/composables/useAutoSave'
import { exportMdFile } from '@/utils/file'
import { isCodeFile } from '@/utils/fileTypes'
import { formatCode, canFormat } from '@/utils/format'
import { useI18n } from '@/i18n'
import type { Document } from '@/types'
import AppToolbar from '@/components/AppToolbar.vue'
import MdEditor from '@/components/MdEditor.vue'
import MdPreview from '@/components/MdPreview.vue'
import CodeEditor from '@/components/CodeEditor.vue'

const props = defineProps<{ id: string }>()
const router = useRouter()

const { $t } = useI18n()
const doc = ref<Document | null>(null)
const mode = ref<'edit' | 'preview'>('edit')
const { isSaving, start } = useAutoSave(doc)

const isCode = computed(() => doc.value ? isCodeFile(doc.value.fileType) : false)

onMounted(async () => {
  const loaded = await getDocument(props.id)
  if (!loaded) {
    router.replace('/')
    return
  }
  // 兼容旧文档没有 fileType 字段
  if (!loaded.fileType) {
    loaded.fileType = 'md'
  }
  doc.value = loaded
  start()
})

async function handleFormat() {
  if (!doc.value) return
  const lang = doc.value.fileType
  const { formatted, ok } = await formatCode(doc.value.content, lang)
  if (ok && formatted !== doc.value.content) {
    doc.value.content = formatted
    await saveDocument(doc.value)
  }
}

async function handleExport() {
  if (!doc.value) return
  exportMdFile(doc.value.title, doc.value.content, doc.value.fileType)
}

async function handleDelete() {
  if (!doc.value) return
  await deleteDocument(doc.value.id)
  router.replace('/')
}
</script>

<style scoped>
.editor-view {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.loading {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
}
</style>
