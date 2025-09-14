import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/**
 * Provide a reactive `activeTab` ref that's two-way synchronized with the
 * route `tab` param when available.
 *
 * Behavior:
 * - On mount, reads `route.params.tab` and sets `activeTab` if the value is
 *   present and included in `tabValues`. If the param exists but is invalid,
 *   navigates to the `NotFound` named route.
 * - When `activeTab` changes it updates the route `tab` param. If the new
 *   value is falsy or equals the first `tabValues[0]`, the `tab` param is
 *   removed (set to `undefined`) to keep the URL clean.
 * - Watches `route.params.tab` so browser navigation (back/forward) or direct
 *   URL entry will update `activeTab` accordingly.
 *
 * Use this composable in tabbed views where you want the selected tab to be
 * addressable by URL and react to navigation.
 *
 * @param tabValues - Array of allowed tab identifiers (strings). The first
 *                    element is treated as the default (no `tab` param).
 * @returns An object containing the reactive `activeTab` ref.
 *
 * @example
 * const { activeTab } = useTabNavigation(['main','history','settings'])
 */
export function useTabNavigation(tabValues: string[]) {
    const route = useRoute()
    const router = useRouter()

    const activeTab = ref(tabValues[0] || '0') // default to first tab

    // Initialize from route param `tab` (preferred)
    onMounted(() => {
        const tabParam = (route.params.tab as string) || ''

        // null, undefined and empty string are valid root paths otherwise show NotFound
        if (tabParam) {
            if (tabValues.includes(tabParam)) {
                activeTab.value = tabParam
            } else {
                router.push({ name: 'NotFound' })
            }
        }
        return
    })

    // Keep route param `tab` in sync with tab changes when the current route supports it
    watch(activeTab, (newVal) => {
        const currentTab = (route.params.tab as string) || ''
        if (currentTab !== newVal) {
            if (!newVal || newVal === tabValues[0]) {
                router.push({ name: route.name as string, params: { ...route.params, tab: undefined } })
            } else {
                router.push({ name: route.name as string, params: { ...route.params, tab: newVal } })
            }
        }
    })

    // Keep activeTab in sync when route changes (e.g., back/forward buttons or direct navigation)
    watch(
        () => route.params.tab,
        (tabParam) => {
            const tab = (tabParam as string) || ''

            if (tab && tabValues.includes(tab) && activeTab.value !== tab) {
                activeTab.value = tab
            }
        }
    )

    return {
        activeTab,
    }
}
