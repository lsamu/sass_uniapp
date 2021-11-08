<template>
  <div class="box-editor-page-grid">
    <panZoom :options="{ minZoom: 0.5, maxZoom: 1, initialZoom: 1 }">
      <grid-layout
        :layout.sync="items"
        :col-num="12"
        :row-height="30"
        :is-draggable="true"
        :is-resizable="true"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[5, 5]"
        :use-css-transforms="true"
      >
        <grid-item
          v-for="item in items"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :key="item.i"
        >
          <div
            style="
              background: #ccc;
              width: 100%;
              height: 100%;
              overflow: hidden;
            "
            @click="onActivated(item)"
          >
            {{ item }}
            <component
              :is="getComponent(item.type)"
              :ref="'ref-item-' + item.prop"
              :option="item"
              :data="item.data"
              style="width: 100%"
              @contextmenu.prevent.native="openMenu($event)"
            >
            </component>
            <span class="remove" @click="remove(item.i)">x</span>
          </div>
        </grid-item>
      </grid-layout>
    </panZoom>
    <el-popover
      placement="buttom"
      trigger="manual"
      width="150"
      v-model="client.show"
      id="contextMenu"
      ref="popover1"
      :style="`left:${client.x}px;top:${client.y}px;position:absolute;`"
    >
      <div>删除</div>
    </el-popover>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  toRefs,
  getCurrentInstance,
  reactive,
  computed,
} from "@vue/composition-api";
import uuid from "node-uuid";
import VueGridLayout from "vue-grid-layout";
import { useInjector } from "../state/hook";
import { useProjectState } from "../state/useProjectState";

export default defineComponent({
  name: "PageGrid",
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const project = useInjector(useProjectState);

    const currentOption = computed(() => {
      const defaultOption = {
        colNum: 12,
      };
      let oo = Object.assign(defaultOption, props.option || {});
      return oo;
    });

    const currentItems = computed(() => {
      let aa = [];
      for (const item of project.thatData.currentPage.elements) {
        const defaultOption = {
          type: "label",
          id: uuid.v4(),
          x: 100,
          y: 100,
          w: 0,
          h: 0,
        };
        let oo = Object.assign(defaultOption, item || {});
        aa.push(oo);
      }
      return project.thatData.currentPage.elements;
    });

    const thatData = reactive({
      items: project.thatData.currentPage.elements,
      currentItem: null,
      index: currentItems.value.length,
      client: {
        x: 0,
        y: 0,
        show: false,
      },
    });

    const onActivated = function (data) {
      thatData.currentItem = data;
    };

    const onDeactivated = function () {
      thatData.currentItem = {};
    };

    const onDrag = function (left, top) {
      thatData.currentItem.x = left;
      thatData.currentItem.y = top;
    };

    const onResize = function (left, top, width, height) {
      thatData.currentItem.x = left;
      thatData.currentItem.y = top;
      thatData.currentItem.width = width;
      thatData.currentItem.height = height;
    };

    const getComponent = function (type): string {
      if (type == null || type == "") {
        type = "label";
      }
      return "box-" + type;
    };

    const getTitle = function (item) {
      let aa = item.card.title || item.title;
      if (aa == null || aa == "") {
        return "";
      }
      return aa;
    };

    const getData = function () {
      return currentItems.value;
    };

    const setData = function () {};

    //预览
    const perview = function () {};

    //设置模式 手机 平板 电脑
    const setMode = function () {};

    //添加
    const add = function (item: any) {
      const defaultItem = {
        id: uuid.v4(),
        x: (currentItems.value.length * 2) % (currentOption.value.colNum || 12),
        y: currentItems.value.length + (currentOption.value.colNum || 12),
        w: 2,
        h: 2,
        i: thatData.index,
      };
      let oo = Object.assign(defaultItem, item || {});
      currentItems.value.push(oo);
      that.$forceUpdate();
      thatData.index++;
    };

    const remove = function (val) {
      const index = currentItems.value.map((item) => item.i).indexOf(val);
      currentItems.value.splice(index, 1);
    };

    const openMenu = function (e) {
      const menuMinWidth = 105;
      const offsetLeft = that.$el.getBoundingClientRect().left; 
      const offsetWidth = that.$el["offsetWidth"];
      const maxLeft = offsetWidth - menuMinWidth;
      const left = e.clientX - offsetLeft;
      if (left > maxLeft) {
        thatData.client.x = maxLeft;
      } else {
        thatData.client.x = left;
      }

      thatData.client.y = e.clientY - 60;
      thatData.client.show = !thatData.client.show;
    };

    return {
      ...toRefs(thatData),
      onActivated,
      getComponent,
      openMenu,
      remove,
    };
  },
});
</script>
<style lang="scss">
.box-editor-page-grid {
  border: 1px solid red;
  .vue-ruler-content {
    width: 100%;
    height: 100%;
  }
}
</style>
