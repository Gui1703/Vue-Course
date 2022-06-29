<template>
  <modal-factory />
  <router-view />
</template>

<script>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import ModalFactory from './components/ModalFactory/index.vue'
import services from './services'
import { setCurrentUser } from './store/user'

export default {
  components: { ModalFactory },

  setup () {
    const route = useRoute()

    watch(() => route.path, async () => {
      if (route.meta.hasAuth) {
        const token = localStorage.getItem('token')

        if (!token) {
          route.push({ name: 'Home' })

          return
        }

        const { data } = await services.users.getMe()
        setCurrentUser(data)
      }
    })
  }
}
</script>
