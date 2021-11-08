<template>
  <div class="box-editor-page-form">
    <el-form label-width="80px" style="width: 100%; height: 100%">
      <draggable
        :list="project.thatData.currentPage.elements"
        group="widgets"
        :animation="300"
        style="width: 100%; height: 100%"
        @change="handleChange"
      >
        <el-col
          v-for="(element, index) in project.thatData.currentPage.elements"
          :key="index"
          style="cursor: move"
        >
          <el-form-item
            :label="element.title + ':'"
            @click.native="handleWidgetSelect(index)"
          >
            <component :is="handleComponent(element.type)"></component>
            <el-button
              @click.stop="handleWidgetDelete(index)"
              title="删除"
              class="widget-action-delete"
              circle
              plain
              size="small"
              type="danger"
              v-if="project.thatData.currentElementIndex == index"
            >
              <i class="el-icon-delete"></i>
            </el-button>
            <el-button
              @click.stop="handleWidgetClone(index)"
              title="复制"
              class="widget-action-clone"
              circle
              plain
              size="small"
              type="primary"
              v-if="project.thatData.currentElementIndex == index"
            >
              <i class="el-icon-document-copy"></i>
            </el-button>
          </el-form-item>
        </el-col>
      </draggable>
    </el-form>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  getCurrentInstance,
  reactive,
  toRefs,
} from "@vue/composition-api";
import Enumerable from "linq";
import draggable from "vuedraggable";
import { useInjector } from "../state/hook";
import { useProjectState } from "../state/useProjectState";

export default defineComponent({
  name: "PageForm",
  components: {
    draggable,
  },
  props: ["option"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;
    const thatData = reactive({});

    const project = useInjector(useProjectState);

    const handleComponent = function (type) {
      if (
        type == null ||
        type == "" ||
        type == "password" ||
        type == "textarea"
      ) {
        type = "input";
      }
      return "box-" + type;
    };

    const handleChange = function (evt) {
      //currentWidget.value = evt.moved.element;
    };

    const handleWidgetDelete = function (index) {
      project.thatData.currentPage.elements.splice(index, 1);
    };

    const handleWidgetClone = function (index) {
      let cloneData = project.thatData.currentPage.elements[index];
      project.thatData.currentPage.elements.splice(index, 0, cloneData);
    };

    const handleWidgetSelect = function (index) {
      project.thatData.currentElementIndex = index;
    };

    const handleWidgetCreate = function (item) {
      project.addComponent(item || { type: "input" });
    };

    return {
      ...toRefs(thatData),
      project,
      handleChange,
      handleComponent,
      handleWidgetSelect,
      handleWidgetClone,
      handleWidgetDelete,
      handleWidgetCreate,
    };
  },
});
</script>
<style lang="scss">
.box-editor-page-form {
  width: 100%;
  height: 100%;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  .widget-action-delete {
    position: absolute;
    right: 10px;
    bottom: -32px;
    z-index: 1002;
  }

  .widget-action-clone {
    position: absolute;
    right: 50px;
    bottom: -32px;
    z-index: 1002;
  }
}
</style>
