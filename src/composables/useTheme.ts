import { ref, watch } from 'vue'

const darkMode = ref(localStorage.getItem('darkMode') === 'true')

const triggerMode = (isDark: Boolean) => {
    const html = document.documentElement
    if (isDark) html.classList.add('dark')
    else html.classList.remove('dark')

    localStorage.setItem('darkMode', String(isDark))
}

watch(darkMode, (val) => triggerMode(val))

export function useTheme() {
    triggerMode(darkMode.value)
    return { darkMode }
}
