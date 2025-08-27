import { createApp } from 'vue'
import App from './App.vue'

// PrimeVue
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'

// Tailwind
import './style.css'

// Pinia
import { createPinia } from 'pinia'

// Vue Router
import router from './router'

// Vue i18n
import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import cs from '@/locales/cs.json'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

const app = createApp(App)

const i18n = createI18n({
    legacy: false,
    locale: 'cs', // default
    fallbackLocale: 'en',
    messages: {
        en,
        cs,
    },
})

app.use(i18n)

app.use(createPinia())

app.use(router)

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p', // optional, default CSS variable prefix
            darkModeSelector: '.dark', // im gonna use same class for PrimeVue as Tailwind so it switches both at once
            cssLayer: false,
        },
    },
})

app.use(ToastService)

app.component('font-awesome-icon', FontAwesomeIcon)

app.directive('tooltip', Tooltip)

app.mount('#app')
