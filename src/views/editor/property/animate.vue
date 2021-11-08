<template>
  <div class="box-editor-animate">
    <div class="animate-edit-btn-wrapper">
      <box-button-dialog
        :option="{
          icon: 'el-icon-plus',
          style: 'primary',
          text: '添加动画',
          size: 'small',
          dialog: { title: '动画列表' },
        }"
      ></box-button-dialog>
    </div>
    <el-collapse accordion>
      <el-collapse-item>
        <template slot="title">动画名称</template>
        <div class="el-animate-item">
          <box-form :option="optionAnimation"></box-form>
        </div>
      </el-collapse-item>
    </el-collapse>

    <box-dialog>
      <box-tabs></box-tabs>
    </box-dialog>

    <!-- <div v-for="(item, index) in thatData.animateCssClassName" :key="index">
      {{ item.label }}
      <ul>
        <li v-for="(item2, index2) in item.children" :key="index2">
          {{ item2.label }}::{{ item2.label }}
        </li>
      </ul>
    </div>-->
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  getCurrentInstance,
} from "@vue/composition-api";
import animateCssClassName from "../../utils/animate";

export default defineComponent({
  setup() {
    const root = getCurrentInstance();
    const that: any = root.proxy;

    const thatData = reactive({
      animateCssClassName,
    });
    const optionAnimation = reactive({
      items: [
        {
          label: "动画类型",
          type: "button-dialog"
        },
        {
          label: "动画时长",
          type: "input-number"
        },
        {
          label: "动画延迟",
          type: "input-number"
        },
        {
          label: "循环次数",
          type: "input-number"
        },
        {
          label: "循环播放",
          type: "checkbox"
        },
      ],
    });
    return {
      thatData,
      optionAnimation,
    };
  },
});
</script>
<style lang="scss">
.box-editor-animate {
}
</style>
