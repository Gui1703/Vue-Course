<template>
  <div>
    <component :is="name" v-bind="$props" />
  </div>
</template>
<script>
import Loading from './Loading.vue'

export default {
  components: { Loading },
  props: {
    name: { type: String, required: true }
  }
}
</script>
