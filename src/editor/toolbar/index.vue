<template>
  <div class="data-editor-toolbar">
    <div style="padding-left: 10px">
      <h2>{{ currentOption.title }}</h2>
    </div>
    <div style="display: flex; align-items: center; padding-right: 10px">
      <el-button
        type="text"
        size="medium"
        icon="el-icon-refresh-left"
        @click="onItemClick('revoc')"
        >撤销</el-button
      >
      <el-button
        type="text"
        size="medium"
        icon="el-icon-refresh-right"
        @click="onItemClick('redo')"
        >重做</el-button
      >
      <el-button
        type="text"
        size="medium"
        icon="el-icon-upload2"
        @click="onItemClick('export_image')"
        >导出图片</el-button
      >
      <el-button
        type="text"
        size="medium"
        icon="el-icon-download"
        @click="onItemClick('preview')"
        >预览</el-button
      >
      <el-button
        type="text"
        size="medium"
        icon="el-icon-download"
        @click="onItemClick('save')"
        >保存</el-button
      >
      <el-button
        type="text"
        size="medium"
        icon="el-icon-view"
        @click="onItemClick('create')"
        >生成</el-button
      >
      <el-button
        class="danger"
        type="text"
        size="medium"
        icon="el-icon-delete"
        @click="onItemClick('clear')"
        >清空</el-button
      >
      <el-button
        class="danger"
        type="text"
        size="medium"
        icon="el-icon-user"
        @click="onItemClick('user')"
        >用户</el-button
      >

      <!-- <el-button type="text" size="medium" icon="el-icon-refresh-left"
        >撤销</el-button
      >
      <el-button type="text" size="medium" icon="el-icon-refresh-right"
        >重做</el-button
      >
      <el-button type="text" size="medium" icon="el-icon-upload2"
        >复制页面</el-button
      >
      <el-button type="text" size="medium" icon="el-icon-upload2"
        >导出图片</el-button
      >
      <el-button type="text" size="medium" icon="el-icon-download"
        >导入PSD</el-button
      >
      <el-button type="text" size="medium" icon="el-icon-download"
        >预览</el-button
      >
      <el-button type="text" size="medium" icon="el-icon-download"
        >保存</el-button
      >
      <el-button type="text" size="medium" icon="el-icon-view">生成</el-button>
      <el-button class="danger" type="text" size="medium" icon="el-icon-delete"
        >清空</el-button
      >
      <el-button class="danger" type="text" size="medium" icon="el-icon-delete"
        >用户</el-button
      > -->
    </div>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  reactive,
} from "@vue/composition-api";
import { useInjector } from "../state/hook";
import { useProjectState } from "../state/useProjectState";

export default defineComponent({
  name: "Toolbar",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;
    const thatData = reactive({});

    const project = useInjector(useProjectState);

    const { option, value, data } = reactive(props);
    const currentOption: any = computed(() => {
      const defaultOption = {
        title: "我是可视化标题",
        data: [],
      };
      let oo = Object.assign(defaultOption, option || {});
      return oo;
    });

    const currentData = computed(() => {
      let aa = [];
      for (const item of currentOption.value["data"]) {
        const defaultOption = {
          icon: "plus",
          cmd: "cmd",
          size: "small",
        };
        let oo = Object.assign(defaultOption, item || {});
        aa.push(oo);
      }
      return aa;
    });

    const onItemClick = (data: any) => {
      if (currentOption.value.onItemClick) {
        currentOption.value.onItemClick(data);
      }
      context.emit("onItemClick", data);
    };
    return { currentOption, currentData, onItemClick };
  },
});
</script>
<style lang="scss">
.data-editor-toolbar {
  height: 45px !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 2px #e4e7ed;
}
</style>
