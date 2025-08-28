<template>
    <aside
        class="fixed top-0 left-0 h-dvh w-16 bg-gray-200 dark:bg-gray-950 flex flex-col items-center py-4 shadow-lg transform transition-transform duration-300 z-40"
        v-show="props.isOpen"
    >
        <RouterLink
            to="/home"
            class="mb-8"
        >
            <img
                src="@/assets/SN.svg"
                alt="Logo"
                class="w-12 h-12 rounded"
            />
        </RouterLink>

        <div class="flex flex-col flex-1">
            <RouterLink
                v-for="item in appRoutes"
                :key="item.name"
                :to="item.path"
                class="mb-4 p-2 rounded-xl hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors"
                active-class="bg-gray-300 dark:bg-gray-700"
                v-tooltip="{
                    value: $t(`routes.${item?.name?.toString().toLowerCase()}`),
                    showDelay: 100,
                    hideDelay: 100,
                }"
            >
                <FontAwesomeIcon
                    :icon="item?.meta?.icon ?? 'xmark'"
                    size="lg"
                />
            </RouterLink>
        </div>

        <Button
            unstyled
            @click="logout"
            class="mb-4 p-2 rounded-xl hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors"
            v-tooltip="{
                value: $t('login.logout'),
                showDelay: 100,
                hideDelay: 100,
            }"
        >
            <FontAwesomeIcon
                :icon="['fas', 'lock']"
                size="lg"
            />
        </Button>

        <ThemeSwitch class="hover:bg-gray-700 hover:dark:bg-gray-800" />
    </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import Button from 'primevue/button'
import ThemeSwitch from '@/components/ThemeSwitch.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { routes } from '@/router'
import { useNavigation } from '@/composables/useNavigation'

const { logout } = useNavigation()

const props = defineProps({
    isOpen: Boolean,
})

// Filter only app-layout routes with icons
const appRoutes = computed(() => routes.filter((r) => r.meta?.layout === 'app' && r.meta?.icon))
</script>
