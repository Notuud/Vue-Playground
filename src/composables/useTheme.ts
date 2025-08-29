import { ref, watch } from 'vue'

const darkMode = ref(false)

function applyTheme(isDark: boolean) {
  const html = document.documentElement
  html.classList.toggle('dark', isDark)
  localStorage.setItem('darkMode', String(isDark))
}

function initTheme() {
  // Prefer saved theme, else system preference
  const saved = localStorage.getItem('darkMode')
  darkMode.value = (saved ? saved === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches)
  applyTheme(darkMode.value)
}

export function useTheme() {
  // Initialize once
  initTheme()

  // Sync when darkMode changes
  watch(darkMode, (val) => applyTheme(val))

  function toggleTheme() {
    darkMode.value = !darkMode.value
  }

  return { darkMode, toggleTheme }
}