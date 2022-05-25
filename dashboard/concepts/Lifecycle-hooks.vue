<template>
  <div>
    <h1>LifeCycle Hooks</h1>
  </div>
</template>
<script>
import { onMounted } from "@vue/runtime-core";
export default {
  setup() {
    onMounted(() => {
      console.log("Foi montado composition API");
    });
  },
};

// export default {
//   mounted() {
//     console.log("Foi montado option API");
//   },
// };
</script>
