import { ref, watch, type Ref, onUnmounted } from 'vue'
import { saveDocument } from '@/db'
import type { Document } from '@/types'

export function useAutoSave(doc: Ref<Document | null>, delayMs = 1000) {
  const isSaving = ref(false)
  const lastSaved = ref<number | null>(null)
  let timer: ReturnType<typeof setTimeout> | null = null
  let stopWatch: (() => void) | null = null

  function start() {
    if (stopWatch) return
    stopWatch = watch(
      () => {
        const d = doc.value
        return d ? d.content + '\x00' + d.title : undefined
      },
      () => {
        if (!doc.value) return
        if (timer) clearTimeout(timer)
        timer = setTimeout(async () => {
          if (!doc.value) return
          isSaving.value = true
          try {
            await saveDocument(doc.value)
            lastSaved.value = Date.now()
          } finally {
            isSaving.value = false
          }
        }, delayMs)
      }
    )
  }

  function stop() {
    if (timer) clearTimeout(timer)
    if (stopWatch) {
      stopWatch()
      stopWatch = null
    }
  }

  onUnmounted(stop)

  return { isSaving, lastSaved, start, stop }
}
