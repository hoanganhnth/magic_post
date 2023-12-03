import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAxios from 'vue-axios'
import axios from 'axios'
import { createPinia } from 'pinia';
import '@fortawesome/fontawesome-free/css/all.min.css';
const pinia = createPinia();

const app = createApp(App).use(store).use(router).use(pinia)
app.use(VueAxios,{$request: axios})

app.mount('#app')

