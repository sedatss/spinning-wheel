import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import WheelForm from "@/components/WheelForm.vue";


createApp(App).use(router).component('WheelForm', WheelForm ).mount('#app')


