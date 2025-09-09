import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/**
 * Provides reactive tab selection synced with URL
 * @param tabValues Array of valid tab values (string)
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
