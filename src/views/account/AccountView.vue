<template>
    <main class="py-2 flex gap-5">
        <div class="flex flex-col gap-5 w-1/3">
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
            <InputPassword 
                :icon="['fas', 'lock']"
                label="Zadejte aktuální heslo"
                name="password"
            />
        </div>
        <div class="flex flex-col gap-5 w-1/3">
            <InputText
                :icon="['fas', 'envelope']"
                label="Aktuální e-mail"
                name="currentEmail"
                fluid
            />
            <InputText
                :icon="['fas', 'envelope']"
                label="Nový e-mail"
                name="newEmail"
                fluid
            />
            <Button>
                <FontAwesomeIcon :icon="['fas', 'rotate']" /> Změnit e-mail
            </Button>
        </div>
        <div class="flex flex-col gap-5 w-1/3">
            <InputPassword 
                :icon="['fas', 'lock']"
                label="Nové heslo"
                name="newPassword"
                feedback
            />
            <InputPassword 
                :icon="['fas', 'lock']"
                label="Potvrďte nové heslo"
                name="newPasswordConfirm"
            />
            <Button>
                <FontAwesomeIcon :icon="['fas', 'rotate']" /> Změnit heslo
            </Button>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import InputText from '@/components/ui/InputText.vue';
import InputPassword from '@/components/ui/InputPassword.vue';
import Button from 'primevue/button';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// TODO: doresit UX/UI

const userData = ref(
    { 
        username: "Safiron8",
        email: "d*****1@seznam.cz",
    }
)
</script>
