import type { App } from "vue";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import ToastService from "primevue/toastservice";
import Tooltip from "primevue/tooltip";

export function installPrimeVue(app: App) {
  app.use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        prefix: "p", // optional, default CSS variable prefix
        darkModeSelector: ".dark", // sync with Tailwind's dark mode
        cssLayer: false,
      },
    },
  });

  app.use(ToastService);
  app.directive("tooltip", Tooltip);
}