import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import LoadingIcon from './components/LoadingIcon.vue'

const app = createApp(App)
app.component('LoadingIcon', LoadingIcon)
app.mount('#app')
