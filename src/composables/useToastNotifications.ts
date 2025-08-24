import { useToast } from 'primevue/usetoast'

export function useToastNotifications() {
    const toast = useToast()

    function showSuccess(
        summary: string,
        detail?: string,
        duration = 3000 as number
    ) {
        toast.add({
            severity: 'success',
            summary,
            detail,
            life: duration,
        })
    }

    function showError(
        summary: string,
        detail?: string,
        duration = 3000 as number
    ) {
        toast.add({
            severity: 'error',
            summary,
            detail,
            life: duration,
        })
    }

    function showWarning(
        summary: string,
        detail?: string,
        duration = 3000 as number
    ) {
        toast.add({
            severity: 'warn',
            summary,
            detail,
            life: duration,
        })
    }

    function showInfo(
        summary: string,
        detail?: string,
        duration = 3000 as number
    ) {
        toast.add({
            severity: 'info',
            summary,
            detail,
            life: duration,
        })
    }

    return { showSuccess, showError, showWarning, showInfo }
}
