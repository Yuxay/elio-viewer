<template>
  <Teleport to="body">
    <Transition name="up-slide">
      <div class="update-toast" v-if="needRefresh">
        <span class="update-text">🆕 有新版本可用</span>
        <button class="update-btn update-btn-primary" @click="updateServiceWorker(true)">
          立即更新
        </button>
        <button class="update-btn" @click="dismiss">
          稍后
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'

const { needRefresh, updateServiceWorker } = useRegisterSW({
  onRegisteredSW(swUrl, registration) {
    if (registration) {
      // 每 30 分钟检查一次更新
      const timer = setInterval(() => {
        registration.update()
      }, 30 * 60 * 1000)
      // cleanup
      ;(registration as any).__updateTimer = timer
    }
  },
  onRegisterError(error) {
    console.warn('SW 注册失败:', error.message)
  }
})

const dismissed = ref(false)

function dismiss() {
  dismissed.value = true
}
</script>

<style scoped>
.update-toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 14px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  font-size: 14px;
  max-width: calc(100vw - 40px);
}

.update-text {
  white-space: nowrap;
  font-weight: 600;
  color: var(--text-primary);
}

.update-btn {
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  white-space: nowrap;
  cursor: pointer;
}

.update-btn:active {
  opacity: 0.7;
}

.update-btn-primary {
  background: var(--accent);
  color: white;
}

/* Transition */
.up-slide-enter-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.up-slide-leave-active {
  transition: all 0.2s ease-in;
}

.up-slide-enter-from,
.up-slide-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}
</style>
