<template>
    <Button
        v-tooltip.left="
            !props.showLabel
                ? {
                      value: $t('common.toggleTheme', {
                          theme: darkMode ? $t('common.light') : $t('common.dark'),
                      }),
                      showDelay: 100,
                      hideDelay: 100,
                  }
                : null
        "
        unstyled
        class="p-2 cursor-pointer"
        :class="!props.showLabel ? 'rounded-lg' : ''"
        @click="toggleTheme"
    >
        <FontAwesomeIcon
            :icon="darkMode ? ['fas', 'sun'] : ['fas', 'moon']"
            size="lg"
        />
        <span
            v-if="props.showLabel"
            class="ml-1"
        >
            {{ $t('common.toggleTheme', { theme: darkMode ? $t('common.light') : $t('common.dark') }) }}
        </span>
    </Button>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useTheme } from '@/composables/useTheme'

const { darkMode, toggleTheme } = useTheme()

const props = defineProps<{
    showLabel: boolean
}>()
</script>
