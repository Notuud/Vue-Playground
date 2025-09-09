<template>
    <FloatLabel variant="on">
        <Select
            v-model="selectedLocale"
            name="languageSelect"
            :options="languages"
            optionLabel="label"
            class="w-20 md:w-48"
            fluid
            @change="onLocaleChange"
        >
            <template #value="slotProps">
                <div
                    v-if="slotProps.value"
                    class="flex"
                >
                    <img
                        class="w-6"
                        :src="getFlag(slotProps.value.flag)"
                        :alt="slotProps.value.code"
                    />
                    <span class="ml-2 hidden md:block">{{ slotProps.value.label }}</span>
                </div>
            </template>
            <template #option="slotProps">
                <div class="flex items-center">
                    <img
                        class="w-6"
                        :src="getFlag(slotProps.option.flag)"
                        :alt="slotProps.option.code"
                    />
                    <span class="ml-2 hidden md:block">{{ slotProps.option.label }}</span>
                </div>
            </template>
        </Select>
        <label for="languageSelect">{{ $t('common.language') }}</label>
    </FloatLabel>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import Select from 'primevue/select'
import FloatLabel from 'primevue/floatlabel'

const { locale } = useI18n()

interface Language {
    code: string
    label: string
    flag: string
}

const languages: Language[] = [
    { code: 'cs-CZ', label: 'Čeština', flag: 'cz' },
    { code: 'en-GB', label: 'English', flag: 'gb' },
]

const selectedLocale = defineModel<Language>()

if (!selectedLocale.value) {
    selectedLocale.value = languages.find((l) => l.code === locale.value)
}

onMounted(() => {
    const savedLocale = localStorage.getItem('locale')
    if (savedLocale && languages.some((l) => l.code === savedLocale)) {
        locale.value = savedLocale
        selectedLocale.value = languages.find((l) => l.code === savedLocale)
    } else {
        // Detect browser/OS language
        const browserLang = navigator.language
        const matchedLang = languages.find((l) => browserLang.startsWith(l.code))

        if (matchedLang) {
            locale.value = matchedLang.code
            selectedLocale.value = languages.find((l) => l.code === matchedLang.code)
        } else {
            // Fallback if nothing matches
            locale.value = languages[0].code
            selectedLocale.value = languages[0]
        }
    }
})

function onLocaleChange(e: any) {
    locale.value = e.value.code
    localStorage.setItem('locale', e.value.code)
}

function getFlag(flagCode?: string) {
    return new URL(`../../assets/images/flags/${flagCode ?? 'xx'}.svg`, import.meta.url).href
}
</script>
