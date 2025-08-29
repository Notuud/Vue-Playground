import { useToast } from 'primevue/usetoast'

type ToastSeverity = 'success' | 'error' | 'warn' | 'info'

export function useToastNotifications() {
    const toast = useToast()

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
