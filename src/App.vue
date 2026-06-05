<template>
  <div class="app-shell">
    <header class="app-header">
      <router-link to="/" class="app-logo" v-if="route.name !== 'home'">
        {{ $t.app.back }}
      </router-link>
      <span class="app-logo" v-else>{{ $t.app.title }}</span>
      <div class="header-actions">
        <button class="header-btn" @click="toggleLocale" title="Language">
          {{ locale === 'zh' ? 'EN' : '中' }}
        </button>
        <button class="theme-btn" @click="cycleTheme" :title="themeLabel">
          {{ themeIcon }}
        </button>
      </div>
    </header>
    <main class="app-main">
      <router-view />
    </main>
    <UpdatePrompt />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import { useI18n } from '@/i18n'
import UpdatePrompt from '@/components/UpdatePrompt.vue'

const route = useRoute()
const { theme, setTheme } = useTheme()
const { locale, $t, toggleLocale } = useI18n()

const modes: Array<{ mode: 'light' | 'dark' | 'system'; icon: string }> = [
  { mode: 'system', icon: '💻' },
  { mode: 'light', icon: '☀️' },
  { mode: 'dark', icon: '🌙' }
]

const currentIdx = computed(() => modes.findIndex(m => m.mode === theme.value))
const themeIcon = computed(() => modes[currentIdx.value]?.icon ?? '💻')
const themeLabel = computed(() => modes[currentIdx.value]?.mode ?? 'system')

function cycleTheme() {
  const next = (currentIdx.value + 1) % modes.length
  setTheme(modes[next].mode)
}
</script>

<style scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 10;
}

.app-logo {
  font-weight: 700;
  font-size: 18px;
  color: var(--text-primary);
}

a.app-logo {
  color: var(--accent);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.header-btn {
  font-size: 12px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: var(--radius);
  background: var(--bg-tertiary);
  color: var(--text-secondary);
}

.theme-btn {
  font-size: 20px;
  padding: 4px 8px;
  border-radius: var(--radius);
  background: var(--bg-tertiary);
}

.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
