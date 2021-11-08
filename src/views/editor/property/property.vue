<template>
  <div class="box-editor-property">
    <div
      class="public-config"
      v-if="project.thatData.currentElementIndex == -1"
    >
      <box-form
        :option="optionPage"
        v-model="
          project.thatData.chartData.pages[project.thatData.currentPageIndex]
        "
      ></box-form>
    </div>
    <div v-else>
      <el-tabs type="border-card">
        <el-tab-pane label="属性">
          <box-form
            :option="optionComponentBase"
            v-model="
              project.thatData.chartData.pages[
                project.thatData.currentPageIndex
              ].elements[project.thatData.currentElementIndex]
            "
          ></box-form>
          <component
            :is="
              getComponent(
                project.thatData.chartData.pages[
                  project.thatData.currentPageIndex
                ].elements[project.thatData.currentElementIndex].type
              )
            "
            :option="
              project.thatData.chartData.pages[
                project.thatData.currentPageIndex
              ].elements[project.thatData.currentElementIndex]
            "
            :data="
              project.thatData.chartData.pages[
                project.thatData.currentPageIndex
              ].elements[project.thatData.currentElementIndex].data
            "
            v-model="
              project.thatData.chartData.pages[
                project.thatData.currentPageIndex
              ].elements[project.thatData.currentElementIndex]
            "
          ></component>
        </el-tab-pane>
        <!-- <el-tab-pane label="动画">
          <BoxEditorAnimate></BoxEditorAnimate>
        </el-tab-pane> -->
      </el-tabs>
    </div>
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
  toRef,
  toRefs,
  watch,
} from "@vue/composition-api";

import BoxEditorAnimate from "./animate.vue";

import { useInjector, useProvider } from "../../utils/hook";
import { useProjectState } from "../hooks/useProjectState";

export default defineComponent({
  components: {
    BoxEditorAnimate,
  },
  setup() {
    const root = getCurrentInstance();
    const that: any = root.proxy;

    const project = useInjector(useProjectState);

    const optionPage = reactive({
      items: [
        {
          type: "group",
          items: [
            {
              caption: "页面设置",
              labelWidth: 50,
              items: [
                {
                  type: "input",
                  label: "名称",
                  prop: "title",
                },
                // {
                //   type: "select",
                //   label: "布局",
                //   prop: "layout_type",
                //   data:[
                //     {
                //       label:"固定布局",
                //       value:1
                //     },
                //     {
                //       label:"自适应布局",
                //       value:2
                //     },
                //     {
                //       label:"拖拽布局",
                //       value:3
                //     }
                //   ]
                // },
                {
                  type: "input-number",
                  label: "宽",
                  prop: "width",
                  controlsPosition: "right",
                },
                {
                  type: "input-number",
                  label: "高",
                  prop: "height",
                  controlsPosition: "right",
                },
                // {
                //   type: "input-number",
                //   prop: "roate",
                //   label: "旋转",
                //   min: 0,
                //   max: 360,
                //   controlsPosition: "right",
                //   data: [],
                // },
                {
                  type: "input-color",
                  label: "颜色",
                  prop: "bgcolor",
                },
                {
                  type: "button-dialog",
                  label: "背景",
                  prop: "bgImage",
                  text: "选择背景",
                  dialog: {
                    title: "选择背景",
                  },
                },
              ],
            },
            // {
            //   caption: "底部导航",
            //   labelWidth: 50,
            //   items: [
            //     {
            //       type: "table-form",
            //       prop: "tabs",
            //       count: 5,
            //       columns: [
            //         {
            //           type: "input",
            //           prop: "label",
            //           label: "名称",
            //         },
            //         {
            //           type: "radio",
            //           prop: "label",
            //           label: "选中",
            //         },
            //         {
            //           type: "button-dialog",
            //           prop: "value",
            //           label: "默认",
            //         },
            //         {
            //           type: "button-dialog",
            //           prop: "value",
            //           label: "选中",
            //         },
            //          {
            //           type: "select",
            //           prop: "value",
            //           label: "链接",
            //         },
            //       ],
            //     },
            //   ],
            // },
          ],
        },
      ],
    });

    const optionComponentBase = reactive({
      items: [
        {
          type: "group",
          items: [
            {
              caption: "基本属性",
              labelWidth: 80,
              items: [
                {
                  label: "名称",
                  prop: "name",
                },
                {
                  type: "input-number",
                  label: "x",
                  prop: "x",
                  controlsPosition: "right",
                },
                {
                  type: "input-number",
                  label: "y",
                  prop: "y",
                  controlsPosition: "right",
                },
                {
                  type: "input-number",
                  label: "w",
                  prop: "w",
                  controlsPosition: "right",
                },
                {
                  type: "input-number",
                  label: "h",
                  prop: "h",
                  controlsPosition: "right",
                },
                {
                  type: "input-color",
                  label: "背景颜色",
                  prop: "bgColor",
                },
                {
                  type: "button-dialog",
                  label: "背景图片",
                  prop: "bgImage",
                  text: "选择图片",
                },
              ],
            },
          ],
        },
      ],
    });

    const getComponent = function(type: any) {
      return "box-uni-option-" + type;
    };

    return {
      optionPage,
      optionComponentBase,
      getComponent,
      project,
    };
  },
});
</script>

<style lang="scss" scoped>
.box-editor-property {
  height: 100%;
  contain: layout;
  // position: absolute;
  // top: 0;
  // bottom: 0;
  // left: 0;
  // right: 0;
  // display: flex;
  // flex-direction: column;
  background: #ffffffe9;
  color: #515151;
  box-shadow: -4px 0 4px #00000005;
  padding: 0;
  overflow: hidden;

  .public-config,
  .component-config .panel {
    flex: 1;
    // overflow-y: scroll;
  }

  .panel-selector {
    z-index: 100;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.06);
    .radio-group {
      text-align: center;
      .radio-btn {
        display: inline-block;
        padding: 10px 20px;
        margin: 0 10px;
        color: #999999;
        &.active {
          color: #212121;
          border-bottom: 2px solid #212121;
        }
      }
    }
  }

  .config-box {
    border-top: 1px solid rgba(0, 0, 0, 0.06);
    margin: 0;
    padding: 14px 20px;
    .title {
      font-weight: bold;
      font-size: 0.86rem;
      margin-bottom: 12px;
    }
    .btn {
      display: inline-block;
      width: 32px;
      height: 32px;
      line-height: 32px;
      margin: 5px 5px 5px 0;
      text-align: center;
      border-radius: 8px;
      transition: all 0.3s ease;
      color: #999;
      &:hover {
        cursor: pointer;
        background-color: rgba(64, 160, 255, 0.1);
        color: #666666;
      }
      &.active {
        background-color: rgba(64, 160, 255, 0.1);
        color: #409eff;
      }
      .iconfont {
        font-size: 22px;
      }
    }
  }

  .component-config >>> .jsoneditor-menu {
    display: none;
  }

  .num-input {
    .el-input-group__prepend {
      background-color: #ffffff !important;
    }
  }

  .code-box {
    width: 260px;
    max-height: 200px;
    border: 1px solid #eeeeee;
    border-radius: 4px;
    padding: 6px;
    overflow: scroll;
    box-sizing: border-box;
  }

  // image upload
  .bg-uploader >>> .el-upload {
    border: 1px dashed #d9d9d9;
    width: 260px;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .bg-uploader >>> .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100%;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .bg-preview-wrapper {
    width: 100%;
    height: 150px;
    .bg-preview {
      max-width: 100%;
      height: 100%;
      margin: 0 auto;
    }
  }
}
</style>
