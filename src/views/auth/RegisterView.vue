<template>
    <AuthEmailForm
        header="login.registerHeader"
        submitLabel="login.signUp"
        successMessage="register.emailSent"
        :onSubmit="handleRegister"
    />
</template>

<script setup lang="ts">
import AuthEmailForm from '@/components/auth/AuthEmailForm.vue'

async function handleRegister(email: string) {
    // fake API call
    await new Promise((res) => setTimeout(res, 500))
    console.log('register', email)
    return true
}
</script>
