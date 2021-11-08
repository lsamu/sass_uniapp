<template>
  <div class="sidebar">
    <div class="logo">
      <router-link to="/">H5小程序可视化</router-link>
    </div>
    <router-link
      class="sidebar-item"
      v-for="(item, index) in menuList"
      :key="index"
      :class="{ active: routePath == item.path }"
      :to="item.path"
      ><i class="item.icon"></i><span>{{ item.name }}</span></router-link
    >
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  getCurrentInstance,
  computed,
  reactive,
  ref,
  toRefs,
} from "@vue/composition-api";

export default defineComponent({
  setup(props, context) {
    const root = getCurrentInstance();
    const that: any = root.proxy;

    const thatData = reactive({
      menuList: [
        {
          name: "我的可视化",
          icon: "el-icon-document",
          path: "/console/chart",
        },
        {
          name: "分类管理",
          icon: "el-icon-menu",
          path: "/console/category",
        },
        {
          name: "数据源管理",
          icon: "el-icon-menu",
          path: "/console/data",
        },
        {
          name: "字典管理",
          icon: "el-icon-menu",
          path: "/console/dict",
        },
        {
          name: "案例市场",
          icon: "el-icon-menu",
          path: "/console/market",
        },
      ],
    });

    const routePath = computed(() => {
      return that.$route.path;
    });

    return {
      ...toRefs(thatData),
      routePath,
    };
  },
});
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 240px;
  background: #f7f9fa;
  z-index: 20;

  .logo {
    height: 120px;
    line-height: 120px;
    text-align: center;
    font-weight: bold;
    font-size: 22px;

    // &::after {
    //   content: ".";
    //   font-size: 28px;
    //   color: rgba(255, 0, 0, 0.6);
    // }

    a {
      color: #515151;
      text-decoration: none;
    }
  }

  .sidebar-item {
    display: flex;
    align-items: center;
    height: 36px;
    margin: 8px 48px 8px 24px;
    padding: 0 16px;
    font-size: 14px;
    color: #808080;
    border-radius: 8px;
    text-decoration: none;

    &.active {
      color: #222222;
      background: rgba(0, 0, 0, 0.06);
    }

    i {
      font-size: 16px;
      margin-right: 8px;
    }

    &:hover {
      color: #333;
    }
  }
}
</style>
