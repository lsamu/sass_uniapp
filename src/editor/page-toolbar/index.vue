<template>
  <div class="box-editor-page-toolbar">
    <div class="left">
      <div
        class="icon-button"
        :title="item.title"
        v-for="(item, index) in currentLeftItems"
        :key="index"
        @click="handleConsole(currentOption, item, item.cmd)"
      >
        <v-icon :name="item.icon" class="farColor" />
      </div>
      <!-- <div class="icon-button big" title="XL">
        <v-icon name="tv" scale="1.2" class="farColor" />
      </div>
      <div class="icon-button" title="LG">
        <v-icon name="desktop" class="farColor" />
      </div>
      <div class="icon-button" title="MD">
        <v-icon name="laptop" class="farColor" />
      </div>
      <div class="icon-button" title="SM">
        <v-icon name="tablet-alt" class="farColor" />
      </div>
      <div class="icon-button" title="XS">
        <v-icon name="mobile-alt" class="farColor" />
      </div> -->
    </div>
    <div class="center">{{ currentOption.title }}</div>
    <div class="right">
      <div
        class="icon-button"
        :title="item.title"
        v-for="(item, index) in currentRightItems"
        :key="index"
        @click="handleConsole(currentOption, item, item.cmd)"
      >
        <v-icon :name="item.icon" class="farColor" />
      </div>
      <!-- <div class="icon-button" title="工具箱">
        <v-icon name="tools" class="farColor" />
      </div>
      <div class="icon-button" title="属性">
        <v-icon name="paint-brush" class="farColor" />
      </div>
      <div class="icon-button" title="边框">
        <v-icon name="square" class="farColor" />
      </div>
      <div class="icon-button" title="水平边距">
        <v-icon name="arrows-alt-h" class="farColor" />
      </div>
      <div class="icon-button" title="垂直边距">
        <v-icon name="arrows-alt-v" class="farColor" />
      </div>
      <div class="icon-button" title="预览">
        <v-icon name="eye" class="farColor" />
      </div>
      <div class="icon-button" title="复制">
        <v-icon name="clone" class="farColor" />
      </div>
      <div class="icon-button" title="二维码">
        <v-icon name="qrcode" class="farColor" />
      </div>
      <div class="icon-button" title="代码">
        <v-icon name="code" class="farColor" />
      </div>
      <div class="icon-button" title="撤销">
        <v-icon name="undo" class="farColor" />
      </div>
      <div class="icon-button" title="重做">
        <v-icon name="redo" class="farColor" />
      </div>
      <div class="icon-button" title="清空画布">
        <v-icon name="trash-alt" class="farColor" />
      </div>
      <div class="icon-button" title="全屏">
        <v-icon name="arrows-alt" class="farColor" />
      </div>
      <div class="icon-button" title="模板">
        <v-icon name="layer-group" class="farColor" />
      </div>
      <div class="icon-button" title="关于">
        <v-icon name="question-circle" class="farColor" />
      </div> -->
      <!-- 导出H5 导出UNIAPP 导出微擎 导出小程序 -->
    </div>
  </div>
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
import { useInjector } from "../state/hook";
import { useProjectState } from "../state/useProjectState";

export default defineComponent({
  name: "PageToolbar",
  components: {},
  props: ["option", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;
    const thatData = reactive({});

    const project = useInjector(useProjectState);

    const { option, value } = reactive(props);

    const defaultOption = {
      title: "低代码可视化平台",
      items: [],
    };

    const currentOption: any = computed(() => {
      let oo = Object.assign(defaultOption, option || {});
      return oo;
    });

    const currentLeftItems = computed(() => {
      let aa = [];
      for (const item of currentOption.value.items) {
        if (item.location == null || item.location == "before") {
          let leftItem = Object.assign({}, item || {});
          aa.push(leftItem);
        }
      }
      return aa;
    });

    const currentRightItems = computed(() => {
      let aa = [];
      for (const item of currentOption.value.items) {
        if (item.location == "after") {
          let rightItem = Object.assign({}, item || {});
          aa.push(rightItem);
        }
      }
      return aa;
    });

    const handleConsole = function (currentOption, item, cmd) {
      context.emit("onClick", item, cmd);
      if (item.onClick != null) {
        item.onClick(currentOption, item, cmd);
        return;
      }

      if (currentOption.onClick != null) {
        currentOption.onClick(currentOption, item, cmd);
        return;
      }
    };

    return {
      currentOption,
      currentLeftItems,
      currentRightItems,
      handleConsole,
    };
  },
});
</script>
<style lang="scss">
.box-editor-page-toolbar {
  height: 35px;
  background: #494c45;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;

  .farColor {
    color: white;
  }

  .left {
    margin-left: 10px;
    display: flex;
    flex-flow: row;
  }
  .center {
    color: white;
    font-size: 20px;
  }
  .right {
    margin-right: 10px;
    display: flex;
    flex-flow: row;
  }

  .icon-button {
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1px;
    border-radius: 2px;
  }
  .icon-button:hover {
    background: rgba(0, 0, 0, 0.3);
  }
  .icon-button.active {
    background: rgba(0, 0, 0, 0.5);
  }
  .icon-button.big i {
    font-size: 14px;
  }
  .icon-button.disabled {
    pointer-events: none;
    position: relative;
  }
  .icon-button.disabled::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(73, 76, 69, 0.7);
    z-index: 1;
  }
}
</style>
