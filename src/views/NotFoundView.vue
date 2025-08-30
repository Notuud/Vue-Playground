<template>
    <main class="p-5 flex flex-col items-center justify-center text-center">
        <img
            :src="NotFoundImage"
            alt="404 Not Found"
            class="w-full md:w-2/3 lg:w-1/2 float-fadein"
        />

        <h1 class="text-4xl font-bold mb-4">404 - {{ $t('common.errors.notFound') }}</h1>
        <p class="text-xl">{{ $t('common.errors.pageDoesNotExist') }}</p>

        <Button
            @click="navigateToDashboard"
            size="large"
            severity="secondary"
            variant="outlined"
            class="mt-10"
        >
            <FontAwesomeIcon :icon="['fas', 'house']" />{{ $t('common.backToHome') }}
        </Button>
    </main>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import NotFoundImage from '@/assets/404.png'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useNavigation } from '@/composables/useNavigation'

const { navigateToDashboard } = useNavigation()
</script>

<style scoped>
/* Only opacity here to avoid transform conflicts */
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

/* Floating loop controls transform */
@keyframes float {
    0%,
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}

.float-fadein {
    /* fade in once, then start floating after it finishes */
    animation:
        fadeIn 0.5s ease-out forwards,
        float 3s ease-in-out 0.5s infinite;
}
</style>
