<template>
  <div class="header">
    <div class="page-title">
      <span>{{ title }}</span>
    </div>
    <div class="icon-row"></div>
    <el-dropdown>
      <div class="avatar-image"></div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
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
} from "@vue/composition-api";

export default defineComponent({
  setup(props, context) {
    const root = getCurrentInstance();
    const that:any = root.proxy;

    const title = computed(() => {
      return that.$route.meta.title;
    });

    const handleLogout = function () {
      that.$router.push({ path: "/" });
    };

    return {
      title,
      handleLogout,
    };
  },
});
</script>

<style lang="scss" scoped>
.header {
  padding: 40px 40px 0;
  display: flex;
  align-items: center;

  .page-title {
    flex: 1;
    font-size: 20px;
    font-weight: normal;
  }

  .icon {
    display: inline-block;
    font-size: 20px;
    margin-right: 14px;

    &:last-of-type {
      margin-right: 28px;
    }
  }

  .avatar-image {
    width: 32px;
    height: 32px;
    background: #ccc;
    border-radius: 50%;
    background-image: url("../../assets/img/profile.jpg");
    background-size: 32px;
  }
}
</style>
