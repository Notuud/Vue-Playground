<template>
    <SideNav :isOpen />

    <div :class="isOpen ? 'ml-16' : ''">
        <Message
            severity="warn"
            size="large"
            :life="10000"
            closable
        >
            <template #icon>
                <FontAwesomeIcon :icon="['fas', 'triangle-exclamation']" />
            </template>
            This could be used as closable system message.
        </Message>
        <slot />
    </div>

    <Button
        v-tooltip="{
            value: $t('common.toggleMenu', { state: isOpen ? $t('common.hide') : $t('common.show') }),
            showDelay: 500,
            hideDelay: 100,
        }"
        unstyled
        class="fixed bottom-4 left-4 z-50 p-2 rounded-lg bg-gray-200 dark:bg-gray-950 hover:bg-gray-700 dark:hover:bg-gray-800"
        :class="isOpen ? 'ml-16' : ''"
        @click="isOpen = !isOpen"
    >
        <FontAwesomeIcon
            :icon="isOpen ? ['fas', 'arrow-left'] : ['fas', 'arrow-right']"
            size="lg"
        />
    </Button>
</template>

<script setup lang="ts">
import { SideNav } from '@/components/layout'
import Button from 'primevue/button'
import Message from 'primevue/message'
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const isOpen = ref(true)
</script>
