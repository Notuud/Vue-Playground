import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import cs from '@/locales/cs.json'

const locale = navigator.language.startsWith('cs') ? 'cs' : 'en'

export const i18n = createI18n({
    legacy: false,
    locale,
    fallbackLocale: 'en',
    messages: { en, cs },
})
