import { ref, watchEffect } from 'vue'
import type { ThemeMode } from '@/types'

const THEME_KEY = 'elio-theme'
const stored = localStorage.getItem(THEME_KEY) as ThemeMode | null
const theme = ref<ThemeMode>(stored ?? 'system')

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement
  const isDark =
    mode === 'dark' ||
    (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

  root.classList.toggle('dark', isDark)
  root.classList.toggle('light', !isDark)
}

watchEffect(() => applyTheme(theme.value))

// Listen to system changes when in system mode
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (theme.value === 'system') applyTheme('system')
})

export function useTheme() {
  function setTheme(mode: ThemeMode) {
    theme.value = mode
    localStorage.setItem(THEME_KEY, mode)
  }

  return { theme, setTheme }
}
