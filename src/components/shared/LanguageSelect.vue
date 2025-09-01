<template>
    <Select
        v-model="selectedLocale"
        :options="languages"
        optionLabel="label"
        optionValue="code"
        class="w-20 md:w-48"
        :pt="{
            root: { class: '!bg-gray-200 dark:!bg-gray-950' },
        }"
        @change="onLocaleChange"
    >
        <template #value="slotProps">
            <div
                v-if="slotProps.value"
                class="flex"
            >
                <img
                    class="w-6"
                    :src="getFlagSrc(getFlag(slotProps.value))"
                    :alt="getFlag(slotProps.value)"
                />
                <span class="ml-2 hidden md:block">{{ getLabel(slotProps.value) }}</span>
            </div>
        </template>
        <template #option="slotProps">
            <div class="flex items-center">
                <img
                    class="w-6"
                    :src="getFlagSrc(getFlag(slotProps.option.code))"
                    :alt="getFlag(slotProps.option.code)"
                />
                <span class="ml-2 hidden md:block">{{ slotProps.option.label }}</span>
            </div>
        </template>
    </Select>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Select from 'primevue/select'

const { locale } = useI18n()

const languages = [
    { code: 'cs', label: 'Čeština', flag: 'cz' },
    { code: 'en', label: 'English', flag: 'gb' },
]

const selectedLocale = ref(locale.value)

onMounted(() => {
    const savedLocale = localStorage.getItem('locale')
    if (savedLocale && languages.some((l) => l.code === savedLocale)) {
        locale.value = savedLocale
        selectedLocale.value = savedLocale
    }
})

function onLocaleChange(e: any) {
    locale.value = e.value
    localStorage.setItem('locale', e.value)
}

function getFlagSrc(code: string | undefined) {
    return new URL(`../../assets/images/flags/${code ?? 'xx'}.svg`, import.meta.url).href
}

function getFlag(code: string) {
    return languages.find((l) => l.code === code)?.flag
}

function getLabel(code: string) {
    return languages.find((l) => l.code === code)?.label
}
</script>
