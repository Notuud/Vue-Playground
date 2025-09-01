<template>
    <header
        class="sticky top-0 z-40 w-full p-2 flex justify-between items-center bg-gray-200 dark:bg-gray-950 shadow-lg"
    >
        <a
            href="/"
            class="flex items-center gap-3 cursor-pointer"
            @click.prevent="navigateTo('/')"
        >
            <img
                src="@/assets/images/logo.png"
                alt="Logo"
                class="w-12 h-12"
            />
            <h1 class="text-4xl font-semibold">Stonker</h1>
        </a>

        <slot />

        <div class="flex items-center gap-4">
            <LanguageSelect />
            <ThemeSwitch class="hover:bg-gray-200 hover:dark:bg-gray-900" />
        </div>
    </header>
</template>

<script setup lang="ts">
import ThemeSwitch from '@/components/shared/ThemeSwitch.vue'
import LanguageSelect from '@/components/shared/LanguageSelect.vue'
import { useNavigation } from '@/composables/useNavigation'

const { navigateTo } = useNavigation()
</script>
