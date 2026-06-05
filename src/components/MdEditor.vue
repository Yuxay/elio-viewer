<template>
  <div class="md-editor">
    <div class="editor-header">
      <input
        class="title-input"
        :value="title"
        @input="onTitleChange"
        :placeholder="$t.editor.titlePlaceholder"
        type="text"
      />
      <span class="type-badge" v-if="fileType && fileType !== 'md'">.{{ fileType }}</span>
    </div>
    <textarea
      class="content-area"
      :value="content"
      @input="onContentChange"
      :placeholder="$t.editor.contentPlaceholder"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '@/i18n'

const { $t } = useI18n()

const props = defineProps<{
  content: string
  title: string
  fileType?: string
}>()

const emit = defineEmits<{
  'update:content': [value: string]
  'update:title': [value: string]
}>()

function onContentChange(e: Event) {
  const target = e.target as HTMLTextAreaElement
  emit('update:content', target.value)
}

function onTitleChange(e: Event) {
  const target = e.target as HTMLInputElement
  emit('update:title', target.value)
}
</script>

<style scoped>
.md-editor {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 12px;
}

.editor-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.type-badge {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  background: var(--accent);
  color: white;
  white-space: nowrap;
  flex-shrink: 0;
}

.title-input {
  flex: 1;
  font-size: 20px;
  font-weight: 700;
  padding: 8px 0;
  border: none;
  border-bottom: 2px solid var(--border);
  background: transparent;
  color: var(--text-primary);
  outline: none;
  margin-bottom: 12px;
}

.title-input::placeholder {
  color: var(--text-muted);
}

.content-area {
  flex: 1;
  font-size: 15px;
  line-height: 1.7;
  padding: 8px 0;
  border: none;
  background: transparent;
  color: var(--text-primary);
  resize: none;
  outline: none;
  font-family: var(--font-mono);
}

.content-area::placeholder {
  color: var(--text-muted);
}
</style>
