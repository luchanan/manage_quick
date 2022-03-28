<template>
    <div class="main">
        <v-header />
        <v-sidebar />
        <div class="content-box" :class="{ 'content-collapse': collapse }">
            <v-tags></v-tags>
            <div class="content">
                <router-view v-slot="{ Component }">
                    <transition name="move" mode="out-in">
                        <keep-alive :include="tagsList">
                            <component :is="Component" />
                        </keep-alive>
                    </transition>
                </router-view>
                <!-- <el-backtop target=".content"></el-backtop> -->
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import vHeader from "@/components/Layout/Header.vue";
import vSidebar from "@/components/Layout/Sidebar.vue";
import vTags from "@/components/Layout/Tags.vue";
export default {
    components: {
        vHeader,
        vSidebar,
        vTags,
    },
    setup() {
        const store = useStore();
        const tagsList = computed(() =>
            store.state.app.tagsList.map((item: any) => item.name)
        );
        const collapse = computed(() => store.state.app.collapse);
        return {
            tagsList,
            collapse,
        };
    },
};
</script>
