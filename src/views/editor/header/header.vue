<template>
  <div class="box-editor-header">
    <!-- <div class="logo">
      <img src="#" alt="">
    </div> -->
    <div class="title">{{ project.thatData.chartData.title }}</div>

    <div class="icon-item" title="导入PSD">
      <v-icon name="search-minus" scale="1" @click="zoomOut" />
    </div>
    <div style="width:40px;color:white;text-align:center;" @click="zoomReset">
      {{ scale * 100 }}%
    </div>
    <div class="icon-item" title="导入PSD">
      <v-icon name="search-plus" scale="1" @click="zoomIn" />
    </div>

    <div class="icon-item" title="导入PSD">
      <v-icon name="file-import" scale="1" @click="handleImportPSD" />
    </div>
    <div class="icon-item" title="撤销">
      <v-icon name="undo" scale="1" @click="project.undo" />
    </div>
    <div class="icon-item" title="重做">
      <v-icon name="redo" scale="1" @click="project.undo" />
    </div>
    <div class="icon-item" title="清空组件">
      <v-icon name="calendar-times" scale="1" @click="project.clearComponent" />
    </div>
    <div class="icon-item" title="导出JSON">
      <v-icon name="code" scale="1" @click="handleJSON" />
    </div>
    <div class="icon-item" title="导出UniApp">
      <v-icon name="file-import" scale="1" @click="handleUniApp" />
    </div>
    <div class="icon-item" title="导出PDF">
      <v-icon name="file-pdf" scale="1" @click="handlePDF" />
    </div>
    <div class="icon-item" title="生成H5">
      <v-icon name="file-code" scale="1" @click="handleH5" />
    </div>
    <div class="icon-item" title="导出图片">
      <v-icon name="image" scale="1" @click="handleExport" />
    </div>
    <div class="icon-item" title="真机预览">
      <v-icon name="eye" scale="1" @click="handleSimulatorPreview" />
    </div>
    <div class="icon-item" title="预览">
      <v-icon name="eye" scale="1" @click="handlePreview" />
    </div>
    <div class="publish" @click="saveChartData">发布</div>
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
  watch,
  toRefs,
} from "@vue/composition-api";
import { useInjector, useProvider } from "../../utils/hook";
import { useProjectState } from "../hooks/useProjectState";
import {useModal}  from "../hooks/useModel";
import { saveAs } from "file-saver";

export default defineComponent({
  setup() {
    const root = getCurrentInstance();
    const that: any = root.proxy;

    const project = useInjector(useProjectState);

    let thatData = reactive({
      scale: 1,
    });

    watch(
      () => thatData.scale,
      (n, o) => {
        project.thatData.scale = n;
      }
    );

    const handleZoomOut = function() {
      if (thatData.scale > 0.1) {
        thatData.scale = parseFloat((thatData.scale - 0.1).toFixed(1));
      }
    };

    const handleZoomIn = function() {
      if (this.scale < 1) {
        thatData.scale = parseFloat((thatData.scale + 0.1).toFixed(1));
      }
    };

    const handleZoomReset = function() {
      thatData.scale = 1;
    };

    const handlePublish = function() {
      that.$parent.saveChartData();
    };

    const handlePreview = function() {
      project.thatData.preview = !project.thatData.preview;
    };

    const handleSimulatorPreview = function(){
      useModal({
        
      })
    }

    const handleExport = function() {
      that.$parent.exportChartSnap();
    };

    const handleH5 = function() {
      that.$parent.exportH5();
    };

    const handleUniApp = function() {};

    const handlePDF = function() {
      that.$parent.exportPDF();
    };

    const handleJSON = function() {
      const finalJsonCode = JSON.stringify(project.exportProjectData());
      const htmlBolb = new Blob([finalJsonCode], { type: "text/json" });
      saveAs(htmlBolb, "project.json");
    };

    const handleImportPSD = function() {};

    return {
      ...toRefs(thatData),
      saveChartData: handlePublish,
      handlePreview,
      handleSimulatorPreview,
      handleExport,
      handleH5,
      project,
      handleUniApp,
      handlePDF,
      handleJSON,
      handleImportPSD,
      zoomOut: handleZoomOut,
      zoomIn: handleZoomIn,
      zoomReset: handleZoomReset,
    };
  },
});
</script>

<style lang="scss" scoped>
.box-editor-header {
  height: 100%;
  display: flex;
  align-items: center;
  background: #333333ee;
  padding: 0 20px;
  .logo {
    float: left;
    width: 100px;
  }

  .title {
    flex: 1;
    // text-align: center;
    font-size: 16px;
    color: #ffffff;
  }

  .publish {
    height: 36px;
    line-height: 36px;
    color: #ffffff;
    background: #353535;
    border-radius: 18px;
    padding: 0 18px;
    transition: all 0.3s ease;

    &:hover {
      cursor: pointer;
      background: #666666;
    }
  }

  .icon-item {
    display: block;
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    margin: auto;
    position: relative;
    border-radius: 50%;
    cursor: pointer;
    user-select: none;
    transition: all 0.3s;
    color: #aaa;
  }

  .icon-item:hover {
    background-color: rgba(255, 255, 255, 0.12);
    color: #aaa;
  }
}
</style>
