import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@views/Home.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Home",
            component: HomeView,
            meta: {
                title: "Home",
            },
        }
    ],
});

export default router;