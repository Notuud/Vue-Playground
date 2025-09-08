<template>
    <aside
        v-show="props.isOpen"
        class="fixed top-0 left-0 h-dvh w-16 bg-gray-200 dark:bg-gray-950 flex flex-col items-center p-2 shadow-lg transform transition-transform duration-300 z-40 overflow-auto"
    >
        <RouterLink
            :to="{ name: 'Home' }"
            class="mb-8"
        >
            <img
                src="@/assets/images/logo.png"
                alt="Logo"
                class="w-12 h-12 rounded"
            >
        </RouterLink>

        <div class="flex flex-col flex-1">
            <RouterLink
                v-for="item in appRoutes"
                :key="item.name"
                v-tooltip="{
                    value: $t(`routes.${item?.meta?.title}`),
                    showDelay: 100,
                    hideDelay: 100,
                }"
                :to="{ name: item.name }"
                class="mb-4 p-2 rounded-xl hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors"
                activeClass="bg-gray-300 dark:bg-gray-700"
            >
                <FontAwesomeIcon
                    :icon="item?.meta?.icon ?? 'xmark'"
                    size="lg"
                />
            </RouterLink>
        </div>

        <Divider />

        <Avatar 
            label="AS" 
            class="!bg-green-500 my-2 cursor-pointer select-none"
            size="large"
            shape="circle" 
            @click="toggleMenu"
        />
        <Menu 
            id="overlay_menu" 
            ref="menu" 
            class="ml-2"
            :model="items" 
            :popup="true" 
        >
            <template #start>
                <div class="flex align-center align-middle gap-2 m-3">
                    <img
                        src="@/assets/images/logo.png"
                        alt="Logo"
                        class="w-7 h-7"
                    >
                    <h1 class="text-xl font-semibold">
                        Stonker
                    </h1>
                </div>
            </template>
            <template #item="{ item }">
                <div 
                    class="p-2 cursor-pointer" 
                    @click="item.callback"
                >
                    <FontAwesomeIcon :icon="item.icon ?? 'question'" /> <span class="ml-1">{{ $t(item.label as string) }}</span>
                </div>
            </template>
            <template #end>
                <ThemeSwitch 
                    showLabel 
                    class="hover:bg-gray-200 dark:hover:bg-gray-950 rounded-sm m-1" 
                />
            </template>
        </Menu>
    </aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import ThemeSwitch from '@/components/shared/ThemeSwitch.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { routes } from '@/router'
import { useNavigation } from '@/composables/useNavigation'
import Avatar from 'primevue/avatar';
import Divider from 'primevue/divider'
import Menu from 'primevue/menu'

const { logout, navigateToViaName } = useNavigation()

const props = defineProps({
    isOpen: Boolean,
})

// Filter only app-layout routes with icons
const appRoutes = computed(() => routes.filter((r) => r.meta?.layout === 'app' && r.meta?.icon && r.meta?.showInMenu))

const menu = ref();
const items = ref([
    {
        separator: true
    },
    {
        // label: 'Profil',
        items: [
            {
                label: 'common.settings',
                icon: 'cog',
                callback: () => navigateToViaName('Account')
            },
            {
                label: 'login.logout',
                icon: 'lock',
                callback: () => logout()
            }
        ]
    },
    {
        separator: true
    },
]);

const toggleMenu = (event: Event) => {
    menu.value.toggle(event);
};
</script>
