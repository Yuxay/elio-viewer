<template>
  <div class="home">
    <DocList
      :documents="docs"
      @open="openDoc"
      @delete="handleDelete"
    />

    <div class="empty" v-if="docs.length === 0 && !loading">
      <p>{{ $t.home.emptyTitle }}</p>
      <p class="hint">{{ $t.home.emptyHint }}</p>
    </div>

    <div class="fab-group">
      <button class="fab" @click="showDialog = true" :title="$t.home.newDoc">+</button>
      <button class="fab fab-secondary" @click="handleImport" :title="$t.home.importDoc">📥</button>
    </div>

    <FileTypeDialog
      v-if="showDialog"
      @cancel="showDialog = false"
      @confirm="handleNew"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { listDocuments, createDocument, deleteDocument, saveDocument } from '@/db'
import { importMdFile } from '@/utils/file'
import type { Document } from '@/types'
import DocList from '@/components/DocList.vue'
import FileTypeDialog from '@/components/FileTypeDialog.vue'
import { useI18n } from '@/i18n'

const { $t } = useI18n()
const router = useRouter()
const docs = ref<Document[]>([])
const loading = ref(true)
const showDialog = ref(false)

onMounted(async () => {
  docs.value = await listDocuments()
  loading.value = false
})

function openDoc(id: string) {
  router.push(`/editor/${id}`)
}

async function handleNew(fileType: string) {
  showDialog.value = false
  const doc = await createDocument(undefined, fileType)
  router.push(`/editor/${doc.id}`)
}

async function handleDelete(id: string) {
  await deleteDocument(id)
  docs.value = docs.value.filter(d => d.id !== id)
}

async function handleImport() {
  try {
    const { name, content, ext } = await importMdFile()
    const doc = await createDocument(name, ext)
    doc.content = content
    await saveDocument(doc)
    router.push(`/editor/${doc.id}`)
  } catch {
    // User cancelled
  }
}
</script>

<style scoped>
.home {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 8px 0;
  position: relative;
}

.empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  gap: 8px;
}

.hint {
  font-size: 14px;
}

.fab-group {
  position: fixed;
  bottom: 24px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 20;
}

.fab {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--accent);
  color: white;
  font-size: 28px;
  font-weight: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(91, 106, 240, 0.4);
  transition: transform 0.15s, box-shadow 0.15s;
  -webkit-tap-highlight-color: transparent;
}

.fab:active {
  transform: scale(0.94);
  box-shadow: 0 2px 6px rgba(91, 106, 240, 0.3);
}

.fab-secondary {
  width: 44px;
  height: 44px;
  font-size: 20px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  box-shadow: var(--shadow);
}
</style>
