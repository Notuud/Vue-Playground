<template>
    <Dialog
        v-model:visible="model"
        modal
        :header="$t('common.confirmAction')"
        position="top"
        class="w-100"
        @show="focusPassword"
    >
        <div class="flex flex-col gap-5">
            <span>{{ $t('common.confirmActionInfo') }}</span>
            <InputPassword
                ref="passwordInput"
                name="password"
                :label="$t('account.currentPassword')"
                :icon="['fas', 'lock']"
            />
            <div class="flex justify-end gap-2">
                <Button
                    severity="secondary"
                    variant="outlined"
                    @click="closeDialog"
                >
                    <FontAwesomeIcon :icon="['fas', 'xmark']" /> {{ $t('common.cancel') }}
                </Button>
                <Button @click="handleConfirm">
                    <FontAwesomeIcon :icon="['fas', 'check']" /> {{ $t('common.confirm') }}
                </Button>
            </div>
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputPassword from '@/components/ui/InputPassword.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const model = defineModel<boolean>()

const passwordInput = ref<{ focus: () => void } | null>(null)

function focusPassword() {
    // setTimeout because PrimeVue Dialog steals focus after being fully loaded even when using nextTick
    setTimeout(() => {
        passwordInput.value?.focus()
    }, 500)
}

function closeDialog() {
    model.value = false
}

function handleConfirm() {
    console.log('call BE to check password')
    closeDialog()
}
</script>
