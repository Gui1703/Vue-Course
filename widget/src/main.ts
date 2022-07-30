import { createApp } from 'vue'
import App from './App.vue'
import Playground from './views/Playground/indexView.vue'
import '@/assets/css/tailwind.css'
import '@/assets/css/fonts.css'
import 'animate.css'
import { setup } from './utils/bootstrap'

setup({
  onProduction () { createApp(App).mount('#app') },
  onDevelopment () { createApp(Playground).mount('#app') }
})
