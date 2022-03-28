<template>
  <div class='menu-wrapper'>
    <template v-for="item in routes">
    <!--首页，或者children只有一个路由且noExpand=true-->
     <div class="link" v-if="!item.meta.hidden && item.meta.noExpand && item.children && item.children && item.children.length === 1"  @click="clickTo(item)" :key="item.path">
        <el-menu-item :index="item.path + item.children[0].path" class='submenu-title-noDropdown'>
            <icon-font v-if="hasMetaKey(item, 'icon')" :icon-class="item.meta.icon"></icon-font>
            <template #title><span class="text">{{ item.children[0].meta.title }}</span></template>
        </el-menu-item>
      </div>
      <!-- child递归多个 -->
      <el-sub-menu :index="item.name" v-if="!item.meta.hidden && !item.meta.noExpand && item.children && item.children.length > 0" :key="item.key">
        <template #title>
            <icon-font v-if='item.meta.icon' :icon-class="item.meta.icon"></icon-font>
            <span class="text">{{item.meta.title}}</span>
        </template>
        <template v-for="child in item.children">
          <sidebar-item class='nest-menu' v-if='!child.meta.hidden && child.children && child.children.length > 0' :routes='[child]' :key="child.key"></sidebar-item>
          <div class="link" v-else @click="clickTo(child)" :key="child.key">
            <el-menu-item :index="item.path+'/'+child.path">
                <icon-font :icon-class="child.meta.icon || 'circle'"></icon-font>
                 <template #title><span class="text">{{ child.meta.title }}</span></template>
            </el-menu-item>
          </div>
        </template>
      </el-sub-menu>
    </template>
  </div>
</template>

<script lang="ts">
import {useRouter} from 'vue-router'
export default {
    name: 'SidebarItem',
    props: {
        routes: {
        type: Array
        }
    },
    setup() {
        const router = useRouter()
        const clickTo = (items: any) => {
        }
        const hasMetaKey = (obj: any, key: string) => {
            return Reflect.has(obj, 'meta') && Reflect.has(obj.meta, key)
        }
        return {
            clickTo,
            hasMetaKey
        };
    }
};
</script>

<style lang="scss" scoped>
</style>
