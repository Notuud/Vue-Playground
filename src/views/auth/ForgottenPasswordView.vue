<template>
    <AuthEmailForm
        header="login.forgotPasswordHeader"
        submitLabel="common.sendLink"
        successMessage="forgotPassword.emailSent"
        :onSubmit="handleForgottenPassword"
    />
</template>

<script setup lang="ts">
import { AuthEmailForm } from '@/components/auth'

async function handleForgottenPassword(email: string) {
    // fake API call
    await new Promise((res) => setTimeout(res, 500))
    console.log('forgot password', email)
    return true
}
</script>
