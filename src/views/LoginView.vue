<template>
    <main class="flex flex-col items-center justify-center p-10 dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <Toast position="top-center" />
      <h2 class="text-2xl font-bold mb-6 text-center">El stonkeros</h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <!-- Email -->
        <div>
          <label for="email" class="block font-medium mb-1">Email</label>
          <InputText
            v-model.trim="email"
            id="email"
            type="email"
            placeholder="Enter your email"
            class="w-full"
          />
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block font-medium mb-1">Password</label>
          <Password
            v-model.trim="password"
            id="password"
            placeholder="Enter your password"
            class="w-full"
            toggleMask
            :feedback="false"
          />
        </div>

        <!-- Submit Button -->
        <Button type="submit" class="w-full mt-4 flex items-center justify-center gap-2">
          <FontAwesomeIcon :icon="['fas', 'lock-open']" />
          Login
        </Button>
      </form>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Toast from 'primevue/toast';

const router = useRouter()
const toast = useToast()

const email = ref('')
const password = ref('')

function handleLogin() {
  if (email.value && password.value) {
    // Save fake auth token
    localStorage.setItem('authToken', 'demo-token')
    router.push('/home')
  } else {
    toast.add({
      severity: 'error',
      summary: 'Missing Credentials',
      detail: 'Please provide both email and password.',
      life: 3000
    })
  }
}
</script>