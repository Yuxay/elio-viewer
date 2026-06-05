<template>
  <div class="toolbar">
    <div class="toolbar-left">
      <button class="tb-btn" @click="$emit('toggleMode')">
        {{ mode === 'edit' ? $t.toolbar.preview : $t.toolbar.edit }}
      </button>
    </div>
    <div class="toolbar-title">
      <span class="file-badge" v-if="fileType">.{{ fileType }}</span>
      {{ title || $t.editor.untitled }}
    </div>
    <div class="toolbar-right">
      <span class="save-indicator" v-if="isSaving">{{ $t.toolbar.saving }}</span>
      <button class="tb-btn" v-if="canFormatType" @click="$emit('format')" :title="$t.toolbar.format">🔧</button>
      <button class="tb-btn" @click="$emit('export')" :title="$t.toolbar.export">📤</button>
      <button class="tb-btn tb-danger" @click="$emit('delete')" :title="$t.toolbar.delete">🗑</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '@/i18n'
import { canFormat } from '@/utils/format'

const { $t } = useI18n()

const props = defineProps<{
  mode: 'edit' | 'preview'
  title: string
  fileType: string
  isSaving: boolean
}>()

defineEmits<{
  toggleMode: []
  format: []
  export: []
  delete: []
}>()

const canFormatType = computed(() => canFormat(props.fileType))
</script>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 44px;
  z-index: 9;
}

.toolbar-left {
  display: flex;
  gap: 4px;
}

.toolbar-title {
  flex: 1;
  text-align: center;
  font-size: 13px;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.file-badge {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 4px;
  background: var(--accent);
  color: white;
  flex-shrink: 0;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 4px;
}

.tb-btn {
  font-size: 13px;
  padding: 6px 10px;
  border-radius: 6px;
  background: var(--bg-tertiary);
  white-space: nowrap;
}

.tb-btn:active {
  opacity: 0.7;
}

.tb-danger:active {
  background: var(--danger);
  color: white;
}

.save-indicator {
  font-size: 11px;
  color: var(--text-muted);
  margin-right: 4px;
}
</style>
