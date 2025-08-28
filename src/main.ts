import { createApp } from 'vue'
import App from './App.vue'

// Tailwind - Global styles
import './style.css'

// PrimeVue
import { installPrimeVue } from "@/plugins/primevue";
// Font Awesome
import { installFontAwesome } from "@/plugins/fontawesome";
// Pinia
import { pinia } from "@/plugins/pinia";
// Vue Router
import router from '@/router'
// Vue i18n
import { i18n } from "@/plugins/i18n";

const app = createApp(App)

installPrimeVue(app);
installFontAwesome(app);
app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')
