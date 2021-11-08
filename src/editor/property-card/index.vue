<template>
  <vue-draggable-resizable
    :drag-handle="'.mini-widget-handle'"
    :resizable="false"
    :w="'auto'"
    :h="'auto'"
    :x="currentOption.x"
    :y="currentOption.y"
    @activated="onActivated"
    @deactivated="onDeactivated"
    @dragging="onDrag"
    @resizing="onResize"
    v-if="currentOption.visable == true"
  >
    <div class="box-editor-card" :style="'width:' + currentOption.width + 'px'">
      <div class="mini-widget-handle">
        <div></div>
        <span class="mini-widget-close" @click="onVisable">×</span>
      </div>
      <div class="widget-body">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane
            :label="item.label"
            :name="'tabs' + index"
            v-for="(item, index) in currentOption.items"
            :key="index"
          >
            <component
              :is="item.type"
              :option="item.option"
              v-model="item.value"
            ></component>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </vue-draggable-resizable>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  computed,
  ref,
  watch,
  getCurrentInstance,
} from "@vue/composition-api";

import VueDraggableResizable from "vue-draggable-resizable-gorkys";
import "vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css";
import { useInjector } from "../state/hook";
import { useProjectState } from "../state/useProjectState";

export default defineComponent({
  name: "PropertyCard",
  components: {
    VueDraggableResizable,
  },
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;
    const thatData = reactive({});

    const project = useInjector(useProjectState);


    //#region 入口
    const { option, value, data } = reactive(props);
    let formData = ref(value || {});
    let activeName = "tabs0";
    const defaultOption = {
      visable: true,
      width: 400,
      title: "选项卡",
      items: [
        {
          label: "默认",
        },
      ],
    };
    let currentOption = ref(Object.assign(defaultOption, option || {}));
    watch(props, (n, o) => {
      formData = ref(n.value || {});
      currentOption = ref(Object.assign(defaultOption, n.option || {}));
    });

    watch(formData, (n, o) => {
      context.emit("input", n);
    });
    //#endregion

    const onActivated = () => {};

    const onDeactivated = () => {};

    const onDrag = (left, top) => {
      currentOption.value.x = left;
      currentOption.value.y = top;
    };

    const onResize = (left, top, width, height) => {
      currentOption.value.x = left;
      currentOption.value.y = top;
      currentOption.value.width = width;
      currentOption.value.height = height;
    };

    const onVisable = () => {
      currentOption.value.visable = !currentOption.value.visable;
    };

    return {
      activeName,
      currentOption,
      onVisable,
      onActivated,
      onDeactivated,
      onDrag,
      onResize,
    };
  },
});
</script>
<style lang="scss">
.box-editor-card {
  position: fixed;
  box-shadow: 1px 1px 5px rgb(0 0 0 / 50%);
  font-size: 12px;
  display: flex;
  flex-flow: column;
  z-index: 100;
  padding: 5px;
  border-radius: 3px;
  .mini-widget-handle {
    width: 100%;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: move;
    font-size: 16px;
    color: #999;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .mini-widget-close {
    margin-right: -2px;
    margin-top: -5px;
    cursor: pointer;
  }
  .widget-body {
    flex: 1;
  }
}
</style>
