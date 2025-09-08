<template>
    <main class="py-2 flex gap-5">
        <div class="flex flex-col gap-5 w-1/3">
            <FloatLabel variant="on">
                <IconField>
                    <InputIcon>
                        <FontAwesomeIcon :icon="['fas', 'user']" />
                    </InputIcon>
                    <InputText
                        v-model="userData.username"
                        name="username"
                        fluid
                        disabled
                    />
                </IconField>
                <label for="username">{{ $t('common.username') }}</label>
            </FloatLabel>
            <FloatLabel variant="on">
                <IconField>
                    <InputIcon>
                        <FontAwesomeIcon :icon="['fas', 'envelope']" />
                    </InputIcon>
                    <InputText
                        v-model="userData.email"
                        name="email"
                        fluid
                        disabled
                    />
                </IconField>
                <label for="email">{{ $t('common.email') }}</label>
            </FloatLabel>
            <FloatLabel variant="on">
                <IconField>
                    <InputIcon>
                        <FontAwesomeIcon :icon="['fas', 'lock']" />
                    </InputIcon>
                    <Password
                        name="passwordConfirm"
                        toggleMask
                        :feedback="false"
                        fluid
                    />
                </IconField>
                <label for="passwordConfirm">Zadejte aktuální heslo</label>
            </FloatLabel>
        </div>
        <div class="flex flex-col gap-5 w-1/3">
            <FloatLabel variant="on">
                <IconField>
                    <InputIcon>
                        <FontAwesomeIcon :icon="['fas', 'envelope']" />
                    </InputIcon>
                    <InputText
                        name="email"
                        fluid
                    />
                </IconField>
                <label for="email">Aktuální e-mail</label>
            </FloatLabel>
            <FloatLabel variant="on">
                <IconField>
                    <InputIcon>
                        <FontAwesomeIcon :icon="['fas', 'envelope']" />
                    </InputIcon>
                    <InputText
                        name="email"
                        fluid
                    />
                </IconField>
                <label for="email">Nový e-mail</label>
            </FloatLabel>
            <Button>
                <FontAwesomeIcon :icon="['fas', 'rotate']" /> Změnit e-mail
            </Button>
        </div>
        <div class="flex flex-col gap-5 w-1/3">
            <FloatLabel variant="on">
                <IconField>
                    <InputIcon>
                        <FontAwesomeIcon :icon="['fas', 'lock']" />
                    </InputIcon>
                    <Password
                        id="password"
                        name="password"
                        toggleMask
                        fluid
                        :promptLabel="$t('validation.passwordPrompt')"
                        :weakLabel="$t('validation.passwordWeakLabel')"
                        :mediumLabel="$t('validation.passwordMediumLabel')"
                        :strongLabel="$t('validation.passwordStrongLabel')"
                    >
                        <template #footer>
                            <Divider />
                            <ul class="pl-2 my-0 leading-normal text-sm">
                                <li>{{ $t('validation.passwordReqCharLowercase') }}</li>
                                <li>{{ $t('validation.passwordReqCharUppercase') }}</li>
                                <li>{{ $t('validation.passwordReqNumeric') }}</li>
                                <li>{{ $t('validation.passwordReqMinLength') }}</li>
                            </ul>
                        </template>
                    </Password>
                </IconField>
                <label for="password">Nové heslo</label>
            </FloatLabel>
            <FloatLabel variant="on">
                <IconField>
                    <InputIcon>
                        <FontAwesomeIcon :icon="['fas', 'lock']" />
                    </InputIcon>
                    <Password
                        name="passwordConfirm"
                        toggleMask
                        :feedback="false"
                        fluid
                    />
                </IconField>
                <label for="passwordConfirm">Potvrďte nové heslo</label>
            </FloatLabel>
            <Button>
                <FontAwesomeIcon :icon="['fas', 'rotate']" /> Změnit heslo
            </Button>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FloatLabel from 'primevue/floatlabel';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
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
