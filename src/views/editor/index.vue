<template>
  <div class="box-editor-container">
    <el-container style="height: calc(100vh)">
      <el-header height="45px" style="padding:0"> <Header></Header></el-header>
      <el-container style="height: calc(100vh)">
        <el-main style="padding:0">
          <splitpanes class="default-theme">
            <pane :size="20" :minSize="10" :maxSize="50">
              <Toolbox></Toolbox>
            </pane>
            <pane>
              <Canvas :scale="project.thatData.scale" ref="refScreen"></Canvas>
            </pane>
            <pane :size="20" :minSize="10" :maxSize="50">
              <Property></Property>
            </pane>
          </splitpanes>
        </el-main>
      </el-container>
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
  toRef,
  toRefs,
} from "@vue/composition-api";

import Header from "./header/header.vue";
import Toolbox from "./toolbox/toolbox.vue";
import Property from "./property/property.vue";
import Canvas from "./canvas/canvas.vue";
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';
import { saveAs } from "file-saver";
import { useInjector, useProvider, useProviders } from "../utils/hook";
import { useProjectState } from "./hooks/useProjectState";
import { useHistoryState } from "./hooks/useHistoryState";
import { Notification } from "element-ui";
import Splitpanes from "./splitpanes/splitpanes.vue";
import Pane from "./splitpanes/pane.vue";
import "splitpanes/dist/splitpanes.css";

import SiderContainer from "./side/index.vue";

export default defineComponent({
  components: {
    Canvas,
    Header,
    Toolbox,
    Property,
    Splitpanes,
    Pane,
    SiderContainer,
  },
  setup() {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({});

    useProviders(useProjectState, useHistoryState);
    const project = useInjector(useProjectState);

    const refScreen = function() {
      return (that.$refs["refScreen"] as any).$refs["screen"] as any;
    };

    const saveChartData = async function() {
      const dataURL = await generateScreenShot();
      console.log(dataURL);
      console.log("保存成功");
    };

    const generateScreenShot = async function() {
      const canvas = await html2canvas(refScreen(), {
        backgroundColor: "#142E48",
      });
      let dataURL = canvas.toDataURL("image/png");
      return dataURL;
    };

    //导出图片
    const exportChartSnap = async function() {
      var img = await generateScreenShot();
      var alink = document.createElement("a");
      alink.href = img;
      alink.download = project.thatData.chartData.title + "screen.png";
      alink.click();
    };

    const htmlTemplate = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Document</title><style>*{ padding:0;margin:0;}#container{overflow:hidden;width:100%;height:0;position:absolute;padding-top:#{containerPaddingTop}#}</style></head>
<body><div id="container">#{containerInnerHtml}#</div></body></html>`;

    const exportH5 = function() {
      const finalHtmlCode = htmlTemplate.replace("#{containerInnerHtml}", "");
      const htmlBolb = new Blob([finalHtmlCode], { type: "text/html" });
      saveAs(htmlBolb, "index.html");
    };

    const exportPDF = function() {
      //https://blog.csdn.net/andy_5826_liu/article/details/105044032
      //Notification.info("未实现");
      var doc = new jsPDF();
      doc.text("Hello world!", 10, 30, {
        baseline: "bottom",
        angle: 90,
      });
      doc.save("two-by-four.pdf");
    };

    return {
      saveChartData,
      thatData,
      generateScreenShot,
      exportChartSnap,
      exportH5,
      exportPDF,
      project,
    };
  },
});
</script>
<style lang="scss" scoped>
.box-editor-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .topbar-view {
    position: absolute;
    height: 60px;
    width: 100vw;
    z-index: 1000;
  }
  .toolbar-view {
    position: absolute;
    top: 60px;
    width: 300px;
    bottom: 0;
    z-index: 1000;
  }
  .config-view {
    position: absolute;
    right: 0;
    top: 60px;
    width: 300px;
    bottom: 0;
    z-index: 1000;
  }
  .scale-view {
    position: absolute;
    right: 316px;
    bottom: 16px;
    z-index: 1000;
    &.preview {
      right: 40px;
    }
  }
  .main-view {
    background: #eeeeee;
    padding: 60px 300px 0 300px;
    overflow: hidden;
    height: calc(100vh);
  }
}
</style>
