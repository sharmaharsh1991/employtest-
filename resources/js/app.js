import "./bootstrap";
import "../css/app.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import router from "./router";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";

import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);
app.use(router).use(VueAxios, axios);
app.use(createPinia());

app.use(Toast, {
    position: POSITION.TOP_RIGHT,
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    draggable: true,
    draggablePercent: 0.7,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false,
});

app.mount("#app");

app.config.globalProperties.$axios = axios;
