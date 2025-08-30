import type { App } from 'vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'
import { MyPreset } from '@/plugins/primevuePreset'

export function installPrimeVue(app: App) {
    app.use(PrimeVue, {
        theme: {
            preset: MyPreset,
            options: {
                prefix: 'p', // optional, default CSS variable prefix
                darkModeSelector: '.dark', // sync with Tailwind's dark mode
                cssLayer: false,
            },
        },
    })

    app.use(ToastService)
    app.directive('tooltip', Tooltip)
}
