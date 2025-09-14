import { useToast } from 'primevue/usetoast'

type ToastSeverity = 'success' | 'error' | 'warn' | 'info'

export function useToastNotifications() {
    const toast = useToast()

    /**
     * Show a toast notification using PrimeVue's `useToast` API.
     *
     * @param severity - One of `'success' | 'error' | 'warn' | 'info'`.
     * @param summary - Short summary/title of the toast.
     * @param detail - Optional longer detail message.
     * @param duration - Life time in milliseconds. Defaults to `3000`.
     */
    function showToast(severity: ToastSeverity, summary: string, detail?: string, duration = 3000) {
        toast.add({
            severity,
            summary,
            detail,
            life: duration,
        })
    }

    return {
        showSuccess: (summary: string, detail?: string, duration?: number) =>
            showToast('success', summary, detail, duration),
        showError: (summary: string, detail?: string, duration?: number) =>
            showToast('error', summary, detail, duration),
        showWarning: (summary: string, detail?: string, duration?: number) =>
            showToast('warn', summary, detail, duration),
        showInfo: (summary: string, detail?: string, duration?: number) => showToast('info', summary, detail, duration),
        showToast,
    }
}
