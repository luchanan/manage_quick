<template>
  <i :class="`iconfont ${!svg ? 'icon-' + iconClass : `svg svg-${iconClass}`}`">
    <svg v-if="svg" class="svg-icon" aria-hidden="true">
      <use :xlink:href="iconName" />
    </svg>
  </i>
</template>
<script lang="ts">
  import {computed} from 'vue'
  export default {
    name: 'IconFont',
    props: {
      svg: {
        type: Boolean,
        default: false,
      },
      iconClass: {
        type: String,
        required: true,
      },
    },
    setup (props) {
      const iconName = computed(() => `#icon-${props.iconClass}`)
      return {
        iconName
      }
    }
  }
</script>

<style lang="scss">
@import './iconfont.css';
.iconfont {
  &.svg {
    width: 70px;
    height: 70px;
    display: inline-block;
    font-size: 0;
    vertical-align: middle;
  }
  .svg-icon {
    width: 100%;
    height: 100%;
    fill: currentColor;
    vertical-align: top;
    overflow: hidden;
  }
}
</style>
