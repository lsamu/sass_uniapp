<template>
  <div class="box-editor-toolbox">
    <el-collapse accordion v-model="activeName">
      <el-collapse-item
        :title="item.title"
        :name="'act_' + index.toString()"
        v-for="(item, index) in currentWidgets"
        :key="index"
      >
        <draggable
          :list="item.items"
          :group="{ name: 'widgets', pull: 'clone', put: false }"
        >
          <li
            class="widget-label"
            v-for="(element, index2) in item.items"
            :key="index2"
            @click="handleAdd(element)"
          >
            <a>
              <v-icon
                :name="element.icon || 'bars'"
                class="farColor"
                style="padding: 5px 2px 0 0"
              />
              <span> {{ element.title }}</span>
            </a>
          </li>
        </draggable>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  reactive,
  ref,
  toRefs,
} from "@vue/composition-api";
import draggable from "vuedraggable";
import { useInjector } from "../state/hook";
import { useProjectState } from "../state/useProjectState";

export default defineComponent({
  name: "Toolbox",
  components: { draggable: draggable as any },
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;
    const thatData = reactive({
      activeName: "act_0",
    });

    const project = useInjector(useProjectState);

    const currentOption: any = computed(() => {
      let defaultOption = {
        items: [],
      };
      let oo = Object.assign(defaultOption, props.option || {});
      return oo;
    });

    const currentWidgets = computed(() => {
      let defaultOption = [];
      let oo = Object.assign(defaultOption, currentOption.value.items || []);
      return oo;
    });

    const handleAdd = (item) => {
      let aa = item || {};
      if (!aa["type"]) {
        aa["type"] = "input";
      }
      project.addComponent(item);
    };
    return {
      ...toRefs(thatData),
      project,
      handleAdd,
      currentOption,
      currentWidgets,
    };
  },
});
</script>
<style lang="scss">
$primary-color: #409eff;
.box-editor-toolbox {
  padding: 5px;
  &__components__item {
    color: #424242;
    text-align: center;
    background: #f4f4f4;
    width: 80px;
    float: left;
    padding: 6px 0;
    margin: 5px;
    border: 1px solid #dddddd;
    font-size: 12px;
    cursor: pointer;
    -webkit-transition: All 0.3s ease-in-out;
    transition: All 0.3s ease-in-out;
  }

  .widget-label {
    font-size: 12px;
    display: block;
    width: 48%;
    line-height: 26px;
    position: relative;
    float: left;
    left: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 1%;
    color: #333;
    border: 1px solid #f4f6fc;

    &:hover {
      color: $primary-color;
      border: 1px dashed $primary-color;
    }

    & > a {
      display: block;
      cursor: move;
      background: #f4f6fc;
      border: 1px solid #f4f6fc;

      .icon {
        margin-right: 6px;
        margin-left: 8px;
        font-size: 14px;
        display: inline-block;
        vertical-align: middle;
      }

      span {
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}
</style>
