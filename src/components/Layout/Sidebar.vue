<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#ffffff" active-text-color="#20a0ff" unique-opened router>
            <sidebar-item :routes='routers'></sidebar-item>
        </el-menu>
    </div>
</template>

<script lang="ts">
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import SidebarItem from './SidebarItem.vue'
export default {
    components: {
        SidebarItem
    },
    setup() {
        const route = useRoute();
        const onRoutes = computed(() => {
            return route.path;
        });
        const store = useStore();
        const collapse = computed(() => store.state.app.collapse);
        const routers = computed(() => store.getters[`permission/routers`])
        return {
            onRoutes,
            collapse,
            routers,
        };
    },
};
</script>

<style lang="scss" scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
.el-menu--collapse :deep(.el-sub-menu__icon-arrow),  .el-menu--collapse :deep(.text){
    display: none;
}
.el-menu--collapse :deep(.el-sub-menu){
    &.is-active:not(.is-opened) i {
      color: var(--el-menu-active-color);
    }
}
</style>
