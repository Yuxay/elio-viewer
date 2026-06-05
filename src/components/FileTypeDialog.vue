<template>
  <Teleport to="body">
    <div class="ft-overlay" @click.self="$emit('cancel')">
      <div class="ft-dialog">
        <div class="ft-header">
          <h2>{{ $t.fileType.title }}</h2>
          <button class="ft-close" @click="$emit('cancel')">✕</button>
        </div>

        <div class="ft-body">
          <template v-for="group in grouped" :key="group.label">
            <div class="ft-group-label">{{ group.label }}</div>
            <div class="ft-grid">
              <button
                v-for="ft in group.types"
                :key="ft.ext"
                class="ft-item"
                :class="{ selected: selected === ft.ext }"
                @click="selected = ft.ext"
              >
                <span class="ft-ext">.{{ ft.ext }}</span>
                <span class="ft-label">{{ ft.label }}</span>
              </button>
            </div>
          </template>
        </div>

        <div class="ft-footer">
          <button class="ft-btn ft-btn-cancel" @click="$emit('cancel')">
            {{ $t.fileType.cancel }}
          </button>
          <button class="ft-btn ft-btn-confirm" :disabled="!selected" @click="confirm">
            + {{ selected ? '.' + selected : '' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from '@/i18n'
import { FILE_TYPES } from '@/utils/fileTypes'
import type { FileTypeInfo } from '@/types'

const { $t } = useI18n()

const emit = defineEmits<{
  cancel: []
  confirm: [ext: string]
}>()

const selected = ref<string>('md')

const grouped = computed(() => {
  const cats: Record<string, { label: string; types: FileTypeInfo[] }> = {
    web: { label: '🌐 Web / Frontend', types: [] },
    general: { label: '💻 General Languages', types: [] },
    config: { label: '⚙️ Config & Data', types: [] },
    other: { label: '📄 Other', types: [] }
  }
  for (const ft of FILE_TYPES) {
    cats[ft.category]?.types.push(ft)
  }
  return Object.values(cats).filter(g => g.types.length > 0)
})

function confirm() {
  if (selected.value) {
    emit('confirm', selected.value)
  }
}
</script>

<style scoped>
.ft-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 16px;
}

.ft-dialog {
  width: 100%;
  max-width: 480px;
  max-height: 80vh;
  background: var(--bg-secondary);
  border-radius: 16px 16px 0 0;
  display: flex;
  flex-direction: column;
  box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.2s ease-out;
}

@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.ft-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px 12px;
  border-bottom: 1px solid var(--border);
}

.ft-header h2 {
  font-size: 17px;
  font-weight: 700;
}

.ft-close {
  font-size: 20px;
  padding: 4px 8px;
  border-radius: 50%;
  opacity: 0.5;
}

.ft-close:active {
  opacity: 1;
  background: var(--bg-tertiary);
}

.ft-body {
  flex: 1;
  overflow-y: auto;
  padding: 12px 20px 20px;
}

.ft-group-label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--text-muted);
  margin: 14px 0 8px;
  letter-spacing: 0.5px;
}

.ft-group-label:first-child {
  margin-top: 0;
}

.ft-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.ft-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 12px 6px;
  border-radius: 10px;
  background: var(--bg-tertiary);
  border: 2px solid transparent;
  transition: border-color 0.15s, background 0.15s;
}

.ft-item.selected {
  border-color: var(--accent);
  background: var(--bg-primary);
}

.ft-item:active {
  opacity: 0.8;
}

.ft-ext {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 15px;
  color: var(--accent);
}

.ft-label {
  font-size: 11px;
  color: var(--text-muted);
}

.ft-footer {
  display: flex;
  gap: 10px;
  padding: 12px 20px 16px;
  border-top: 1px solid var(--border);
}

.ft-btn {
  flex: 1;
  padding: 12px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  transition: opacity 0.15s;
}

.ft-btn:active {
  opacity: 0.8;
}

.ft-btn-cancel {
  background: var(--bg-tertiary);
  color: var(--text-secondary);
}

.ft-btn-confirm {
  background: var(--accent);
  color: white;
}

.ft-btn-confirm:disabled {
  opacity: 0.4;
}
</style>
