import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAxios from 'vue-axios'
import axios from 'axios'
import { createPinia } from 'pinia';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createVuetify } from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { VApp, VContainer, VCard, VBtn, VList, VListItemSubtitle, VDialog, VCardActions, VForm, VTextField, VRow, VCol, VCardText, VListItem, VListItemTitle, VCardTitle, VSelect, VDataTable } from 'vuetify/lib/components';

const vuetify = createVuetify({
  components: {
    VApp,
    VContainer,
    VCard,
    VBtn,
    VList,
    VListItemSubtitle,
    VDialog,
    VCardActions,
    VForm,
    VTextField,
    VRow,
    VCol,
    VCardText,
    VListItem,
    VListItemTitle,
    VCardTitle,
    VSelect,
    VDataTable,
    // thêm các component khác mà bạn muốn sử dụng
  },
});

const pinia = createPinia();

const app = createApp(App).use(store).use(router).use(pinia).use(vuetify)
app.use(VueAxios,{$request: axios})

app.mount('#app')
