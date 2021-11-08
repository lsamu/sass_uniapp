<template>
  <div class="box-editor-dict">
    <el-container>
      <el-aside width="220px" style="padding:10px">
        <box-tree :option="optionTree" ref="refTree"></box-tree>
      </el-aside>
      <el-main style="height:800px">
        <el-scrollbar>
          <box-datagrid
            :option="optionDatagrid"
            ref="refDatagrid"
          ></box-datagrid>
        </el-scrollbar>
      </el-main>
    </el-container>
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
  setup() {
    const root = getCurrentInstance();
    const that: any = root.proxy;

    const visible = ref(false);
    const toggleVisible = function() {
      visible.value = !visible.value;
    };

    const optionDatagrid = {
      addText: "新增字典",
    };

    const optionTree = {
      edit: {
        visible: true,
      },
    };

    return {
      toggleVisible,
      visible,
      optionDatagrid,
      optionTree,
    };
  },
});
</script>
