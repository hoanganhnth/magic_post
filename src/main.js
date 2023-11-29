import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAxios from 'vue-axios'
import axios from 'axios'

import '@fortawesome/fontawesome-free/css/all.min.css';

const app = createApp(App).use(store).use(router)
app.use(VueAxios,{$request: axios})
app.mount('#app')

