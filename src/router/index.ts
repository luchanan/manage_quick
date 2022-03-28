import { createRouter, createWebHashHistory } from "vue-router"
import {syncRouters} from './syncRouters'
import {asyncRouters} from './asyncRouters'
const router = createRouter({
    history: createWebHashHistory(),
    routes: syncRouters
});
export const syncRouter = syncRouters
export const asyncRouter = asyncRouters
export default router