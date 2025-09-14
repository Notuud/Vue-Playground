<template>
    <Dialog
        v-model:visible="model"
        modal
        :header="$t('common.confirmAction')"
        position="top"
        class="w-100"
    >
        <div class="flex flex-col gap-5">
            <span>{{ $t('common.confirmActionInfo') }}</span>
            <InputPassword
                ref="passwordInput"
                name="password"
                :label="$t('account.currentPassword')"
                :icon="['fas', 'lock']"
                autofocus
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
import { InputPassword } from '@/components/ui'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const model = defineModel<boolean>()

const passwordInput = ref<{ focus: () => void } | null>(null)

function closeDialog() {
    model.value = false
}

function handleConfirm() {
    console.log('call BE to check password')
    closeDialog()
}
</script>
