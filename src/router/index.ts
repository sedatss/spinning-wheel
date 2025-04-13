import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import WheelForm from "@/components/WheelForm.vue";
import NamesWheel from "@/components/SpinningWheel.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'WheelFormPage',
    component: WheelForm
  },
  {
    path: '/wheel',
    name: 'wheelPage',
    component: NamesWheel,
    props: (route) => ({ names: JSON.parse(route.query.data as string) })
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
