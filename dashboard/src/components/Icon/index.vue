<template>
  <div>
    <component :is="name" v-bind="$props" />
  </div>
</template>
<script>
import Loading from './Loading.vue'
import Copy from './Copy.vue'

export default {
  components: { Loading, Copy },
  props: {
    name: { type: String, required: true }
  }
}
</script>
