import { createRouter, createWebHistory } from "vue-router";
import MonitoringDashboard from "@/views/MonitoringDashboard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/cockpit",
    },
    {
      path: "/cockpit",
      name: "monitoring",
      component: MonitoringDashboard,
    },
  ],
});

export default router;
