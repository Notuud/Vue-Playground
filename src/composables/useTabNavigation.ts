import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/**
 * Provides reactive tab selection synced with URL hash
 * @param tabValues Array of valid tab values (string)
 */
export function useTabNavigation(tabValues: string[]) {
    const route = useRoute()
    const router = useRouter()

    const activeTab = ref(tabValues[0] || '0') // default to first tab

    // Initialize from URL hash
    onMounted(() => {
        const hash = route.hash.replace('#', '')
        if (hash && tabValues.includes(hash)) {
            activeTab.value = hash
        }
    })

    // Keep URL hash in sync with tab changes
    watch(activeTab, (newVal) => {
        router.replace({ hash: `#${newVal}` }).catch(() => {})
    })

    return {
        activeTab,
    }
}
