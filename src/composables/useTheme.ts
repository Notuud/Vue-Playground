import { ref, watch } from 'vue'

const darkMode = ref(false)

/**
 * Apply the theme by toggling the `dark` class on the root `<html>` element
 * and persisting the choice in `localStorage` under the `darkMode` key.
 *
 * @param isDark - When `true` applies the `dark` class, otherwise removes it.
 */
function applyTheme(isDark: boolean) {
    const html = document.documentElement
    html.classList.toggle('dark', isDark)
    localStorage.setItem('darkMode', String(isDark))
}

/**
 * Initialize `darkMode` from persisted user preference or system preference.
 * Priority: persisted `localStorage.darkMode` > system `prefers-color-scheme`.
 * After setting `darkMode.value` this function calls `applyTheme` to ensure
 * the DOM and storage are consistent.
 */
function initTheme() {
    // Prefer saved theme, else system preference
    const saved = localStorage.getItem('darkMode')
    darkMode.value = saved ? saved === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches
    applyTheme(darkMode.value)
}

/**
 * Composable to read and toggle the application's theme (dark mode).
 *
 * Behavior:
 * - Initializes theme once from persisted preference or system preference.
 * - Watches `darkMode` and keeps the `<html>` class and `localStorage` in sync.
 * - Provides a `toggleTheme` helper to invert the current theme.
 *
 * @returns An object with:
 * - `darkMode`: a `Ref<boolean>` reactive boolean indicating current theme.
 * - `toggleTheme()`: a function to flip the theme.
 *
 * @example
 * const { darkMode, toggleTheme } = useTheme()
 */
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
