import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import MainLayout from "@/layouts/MainLayout.vue";
import quasarUserOptions from './quasar-user-options'
import { createWebHistory, createRouter } from "vue-router";

import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css'
import '@quasar/extras/material-symbols-rounded/material-symbols-rounded.css'
import '@quasar/extras/mdi-v7/mdi-v7.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/RPGator/', component: MainLayout }
    ]
});
const app = createApp(App)
app.use(router)
app.use(Quasar, quasarUserOptions)
app.mount('#app')






