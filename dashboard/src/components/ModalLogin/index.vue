<template>
  <div class="flex justify-between" id="modal-login">
    <h1 class="text-4xl font-black text-gray-800">Entre na sua conta</h1>

    <button class="text-4xl text-gray-600 focus:outline-none" @click="close">
      &times;
    </button>
  </div>

  <div class="mt-16">
    <form @submit.prevent="handleSubmit">
      <label class="block">
        <span class="text-lg font-medium text-gray-800">E-mail</span>
        <input
          id="email-field"
          v-model="state.email.value"
          type="email"
          :class="{ 'border-brand-danger': !!state.email.errorMessage }"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded outline-none"
          placeholder="exemplo@gmail.com"
        />
        <span
          id="email-error"
          v-if="!!state.email.errorMessage"
          class="block font-medium text-brand-danger"
          >{{ state.email.errorMessage }}</span
        >
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">Senha</span>
        <input
          id="password-field"
          v-model="state.password.value"
          type="password"
          :class="{ 'border-brand-danger': !!state.password.errorMessage }"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded outline-none"
          placeholder="Exemplo123"
        />
        <span
          id="password-error"
          v-if="!!state.password.errorMessage"
          class="block font-medium text-brand-danger"
          >{{ state.password.errorMessage }}</span
        >
      </label>

      <button
        class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150"
        :class="{ 'opacity-50': state.isLoading }"
        :disabled="state.isLoading"
        type="submit"
        id="submit-button"
      >
        <Icon v-if="state.isLoading" name="loading" class="animate-spin" />
        <span v-else>Entrar</span>
      </button>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useField } from 'vee-validate'
import { useToast } from 'vue-toastification'
import useModal from '@/hooks/useModal.js'
import {
  validateEmptyAndEmail,
  validateEmptyAndLength3
} from '../../utils/validators.js'
import services from '@/services/index.js'
import { useRouter } from 'vue-router'
import Icon from '../Icon/index.vue'

export default {
  components: { Icon },
  setup () {
    const router = useRouter()
    const modal = useModal()
    const toast = useToast()

    const { value: emailValue, errorMessage: emailErrorMessage } = useField(
      'email',
      validateEmptyAndEmail
    )

    const { value: passwordValue, errorMessage: passwordErrorMessage } =
      useField('password', validateEmptyAndLength3)

    const state = reactive({
      hasErrors: false,
      isLoading: false,
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage
      }
    })

    async function handleSubmit () {
      try {
        toast.clear()
        state.isLoading = true
        const { data, errors } = await services.auth.login({
          email: state.email.value,
          password: state.password.value
        })

        if (!errors) {
          localStorage.setItem('token', data.token)
          state.isLoading = false
          router.push({ name: 'Feedbacks' })
          modal.close()
          return
        }

        if (errors.status === 404) {
          toast.error('E-mail não encontrado')
        }

        if (errors.status === 401) {
          toast.error('Verifique seus dados')
        }

        if (errors.status === 400) {
          toast.error('Ocorreu um erro ao fazer o login')
        }

        state.isLoading = false
      } catch (error) {
        state.isLoading = false
        state.hasErrors = !!error
        toast.error('E-mail não encontrado')
      }
    }

    return { state, close: modal.close, handleSubmit }
  }
}
</script>
