<template>
    <main>
        <div class="w-full md:w-1/2 lg:w-1/3">
            <Transition
                enterActiveClass="transition duration-500 ease-out"
                enterFromClass="opacity-0 -translate-y-2"
                enterToClass="opacity-100 translate-y-0"
                leaveActiveClass="transition duration-200 ease-in"
                leaveFromClass="opacity-100 translate-y-0"
                leaveToClass="opacity-0 translate-y-2"
                mode="out-in"
            >
                <Button
                    v-if="isTwofactorHidden"
                    fluid
                    @click="isTwofactorHidden = !isTwofactorHidden"
                >
                    <FontAwesomeIcon :icon="['fas', 'check-double']" /> {{ $t('account.enable2FA') }}
                </Button>
                <div
                    v-else
                    class="flex flex-col gap-5 items-center"
                >
                    <span class="font-medium">{{ $t('account.scanQR2FA') }}</span>
                    <img
                        src="/src/assets/images/placeholder.png"
                        alt="Placeholder"
                        class="w-70"
                    />
                    <div>
                        <span class="font-medium">{{ $t('account.secretKey2FA') }}</span>
                        <pre class="mt-2 font-semibold text-lg">{{ secretKey }}</pre>
                    </div>
                    <Form
                        v-slot="$secretKeyForm"
                        :initialValues="initialValues"
                        :resolver="resolver"
                        class="space-y-5 w-full"
                        validateOnBlur
                        @submit="handleSubmit($event)"
                    >
                        <div>
                            <InputText
                                :icon="['fas', 'key']"
                                name="secretKey"
                                :label="$t('account.enterCode2FA')"
                                fluid
                            />
                            <ValidationMessage
                                v-if="$secretKeyForm.secretKey?.invalid"
                                :label="
                                    $t($secretKeyForm.secretKey.error.message, {
                                        min: inputLength.min,
                                        max: inputLength.max,
                                    })
                                "
                            />
                        </div>
                        <Button
                            type="submit"
                            fluid
                        >
                            <FontAwesomeIcon :icon="['fas', 'check-double']" /> {{ $t('account.activate2FA') }}
                        </Button>
                    </Form>
                </div>
            </Transition>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputText from '@/components/ui/InputText.vue'
import ValidationMessage from '@/components/ui/ValidationMessage.vue'
import Button from 'primevue/button'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { Form } from '@primevue/forms'
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'

const inputLength = {
    min: 6,
    max: 6,
}

const isTwofactorHidden = ref(true)
const secretKey = ref('UDYJOZ6YODCB63MZ')

const initialValues = {
    secretKey: '',
}

const resolver = zodResolver(
    z.object({
        secretKey: z
            .string()
            .nonempty('validation.required')
            .min(inputLength.min, 'validation.minLength')
            .max(inputLength.max, 'validation.maxLength'),
    })
)

function handleSubmit(event: any) {
    const { valid, values } = event
    if (!valid) {
        return
    }
    console.log(values)
}
// TODO: add actual QR code
</script>
