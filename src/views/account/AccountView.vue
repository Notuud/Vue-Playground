<template>
    <main class="py-2 flex flex-col md:flex-row gap-5">
        <PasswordConfirmDialog v-model="visible" />
        <div class="flex flex-col gap-5 w-full md:w-1/3 lg:w-1/4">
            <InputText
                v-model="userData.username"
                :icon="['fas', 'user']"
                :label="$t('common.username')"
                name="username"
                disabled
                fluid
            />
            <InputText
                v-model="userData.email"
                :icon="['fas', 'envelope']"
                :label="$t('common.email')"
                name="email"
                disabled
                fluid
            />
        </div>
        <div class="flex flex-col gap-5 w-full md:w-1/3 lg:w-1/4">
            <Form
                v-slot="$emailForm"
                :initialValues="emailInitialValues"
                :resolver="emailResolver"
                class="space-y-5"
                @submit="handleChangeEmail($event)"
            >
                <div>
                    <InputText
                        :icon="['fas', 'envelope']"
                        :label="$t('account.currentEmail')"
                        name="currentEmail"
                        fluid
                    />
                    <ValidationMessage
                        v-if="$emailForm.currentEmail?.invalid"
                        :label="$t($emailForm.currentEmail.error.message)"
                    />
                </div>
                <div>
                    <InputText
                        :icon="['fas', 'envelope']"
                        :label="$t('account.newEmail')"
                        name="newEmail"
                        fluid
                    />
                    <ValidationMessage
                        v-if="$emailForm.newEmail?.invalid"
                        :label="$t($emailForm.newEmail.error.message)"
                    />
                </div>
                <Button
                    type="submit"
                    fluid
                >
                    <FontAwesomeIcon :icon="['fas', 'rotate']" /> {{ $t('account.changeEmail') }}
                </Button>
            </Form>
        </div>
        <div class="flex flex-col gap-5 w-full md:w-1/3 lg:w-1/4">
            <Form
                v-slot="$passwordForm"
                :initialValues="passwordInitialValues"
                :resolver="passwordResolver"
                class="space-y-5"
                @submit="handleChangePassword($event)"
            >
                <div>
                    <InputPassword
                        :icon="['fas', 'lock']"
                        :label="$t('account.newPassword')"
                        name="newPassword"
                        feedback
                    />
                    <ValidationMessage
                        v-if="$passwordForm.newPassword?.invalid"
                        :label="$t($passwordForm.newPassword.error.message)"
                    />
                </div>
                <div>
                    <InputPassword
                        :icon="['fas', 'lock']"
                        :label="$t('account.confirmNewPassword')"
                        name="newPasswordConfirm"
                    />
                    <ValidationMessage
                        v-if="$passwordForm.newPasswordConfirm?.invalid"
                        :label="$t($passwordForm.newPasswordConfirm.error.message)"
                    />
                </div>
                <Button
                    type="submit"
                    fluid
                >
                    <FontAwesomeIcon :icon="['fas', 'rotate']" /> {{ $t('account.changePassword') }}
                </Button>
            </Form>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { InputText, InputPassword, ValidationMessage } from '@/components/ui'
import { PasswordConfirmDialog } from '@/components/shared'
import Button from 'primevue/button'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { Form } from '@primevue/forms'
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useToastNotifications } from '@/composables/useToastNotifications'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { showError } = useToastNotifications()

const visible = ref(false)

const userData = ref({
    username: 'Safiron8',
    email: 'd*****1@seznam.cz',
})

function showDialog() {
    visible.value = true
}

// TODO: přidat validace

const emailInitialValues = {
    currentEmail: '',
    newEmail: '',
}

const emailResolver = zodResolver(
    z.object({
        currentEmail: z.email('validation.invalidEmail'),
        newEmail: z.email('validation.invalidEmail'),
    })
)

function handleChangeEmail(event: any) {
    const { valid, values } = event
    if (!valid) {
        showError(t('login.invalidCredentials'), t('login.enterValidCredentials'))
        return
    }
    console.log(values)
    showDialog()
}

const passwordInitialValues = {
    newPassword: '',
    newPasswordConfirm: '',
}

const passwordResolver = zodResolver(
    z
        .object({
            newPassword: z
                .string()
                .nonempty('validation.required')
                .min(8, 'validation.passwordMinLength')
                .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'validation.passwordReqComplexity'),
            newPasswordConfirm: z.string().nonempty('validation.required'),
        })
        .refine((data) => data.newPassword === data.newPasswordConfirm, {
            message: 'validation.passwordsMustMatch',
            path: ['newPasswordConfirm'],
        })
)

function handleChangePassword(event: any) {
    const { valid, values } = event
    if (!valid) {
        showError(t('login.invalidCredentials'), t('login.enterValidCredentials'))
        return
    }
    console.log(values)
    showDialog()
}
</script>
