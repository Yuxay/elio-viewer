<template>
  <div class="doc-list">
    <div
      v-for="doc in documents"
      :key="doc.id"
      class="doc-item"
      @click="$emit('open', doc.id)"
    >
      <div class="doc-info">
        <span class="doc-title">
          <span class="doc-type-badge" v-if="doc.fileType && doc.fileType !== 'md'">.{{ doc.fileType }}</span>
          {{ doc.title || $t.docList.untitled }}
        </span>
        <span class="doc-date">{{ formatDate(doc.updatedAt) }}</span>
      </div>
      <button
        class="doc-delete"
        @click.stop="$emit('delete', doc.id)"
        :title="$t.docList.delete"
      >
        🗑
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Document } from '@/types'
import { useI18n } from '@/i18n'

const { $t } = useI18n()

defineProps<{ documents: Document[] }>()
defineEmits<{
  open: [id: string]
  delete: [id: string]
}>()

function formatDate(ts: number): string {
  const d = new Date(ts)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  const dl = $t.value.docList

  if (mins < 1) return dl.justNow
  if (mins < 60) return dl.minsAgo(mins)
  if (hours < 24) return dl.hoursAgo(hours)
  if (days < 7) return dl.daysAgo(days)
  return d.toLocaleDateString()
}
</script>

<style scoped>
.doc-list {
  display: flex;
  flex-direction: column;
  padding: 0 12px;
}

.doc-item {
  display: flex;
  align-items: center;
  padding: 14px 12px;
  background: var(--bg-secondary);
  border-radius: var(--radius);
  margin-bottom: 6px;
  cursor: pointer;
  transition: background 0.15s;
  box-shadow: var(--shadow);
}

.doc-item:active {
  background: var(--bg-tertiary);
}

.doc-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.doc-title {
  font-weight: 600;
  font-size: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 6px;
}

.doc-type-badge {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 4px;
  background: var(--accent);
  color: white;
  flex-shrink: 0;
}

.doc-date {
  font-size: 12px;
  color: var(--text-muted);
}

.doc-delete {
  font-size: 16px;
  padding: 6px 8px;
  opacity: 0.5;
  flex-shrink: 0;
}

.doc-delete:active {
  opacity: 1;
}
</style>
