<template>
  <CustomHeader @create-account="handleAccountCreate" @login="handleLogin" />
  <Contact />

  <footer class="flex justify-center py-10 bg-brand-gray">
    <p class="font-medium text-center text-gray-800">Feedbacker &copy; 2022</p>
  </footer>
</template>

<script>
import CustomHeader from './CustomHeader.vue'
import Contact from './Contact.vue'
import { onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import useModal from '../../hooks/useModal.js'

export default {
  components: {
    CustomHeader,
    Contact
  },

  setup () {
    const router = useRouter()
    const modal = useModal()

    onMounted(() => {
      const token = localStorage.getItem('token')

      if (token) {
        router.push({ name: 'Feedbacks' })
      }
    })

    function handleLogin () {
      modal.open({ component: 'ModalLogin' })
    }

    function handleAccountCreate () {
      modal.open({ component: 'ModalAccountCreate' })
    }

    return {
      handleLogin,
      handleAccountCreate
    }
  }
}
</script>
