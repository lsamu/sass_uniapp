<template>
  <div class="box-editor-page">
    <div class="title">
      <span>页面 ({{ project.thatData.chartData.pages.length }})</span>
    </div>
    <div class="layer-list">
      <div
        v-for="(item, index) in project.thatData.chartData.pages"
        :key="index"
      >
        <div class="picindex">
          <a class="picup" @click="handleUpPage(index)">></a>
          <p>{{ index + 1 }}</p>
          <a class="picdown" @click="handleDownPage(index)">></a>
        </div>
        <div
          class="picwrap"
          @click="handleActivePage(index)"
          :class="{ activePage: index === project.thatData.currentPageIndex }"
        >
          {{ item.title }}
        </div>
        <div class="editbtn">
          <el-tooltip
            class="item"
            effect="dark"
            content="复制页面"
            placement="top"
            @click.native="handleClonePage(index)"
          >
            <a class="addpage iconfont icon-fuzhi">复制</a>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="删除页面"
            placement="top"
            @click.native="handleDeletePage(index)"
          >
            <a class="preview iconfont icon-sanchu">删除</a>
          </el-tooltip>
        </div>
      </div>
      <div>
        <el-button class="addpagebtn" type="primary" @click="handleAddPage"
          >添加</el-button
        >
      </div>
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
  toRefs,
} from "@vue/composition-api";
import uuid from "node-uuid";

import cc from "../../utils/component";

import { useInjector, useProvider } from "../../utils/hook";
import { useProjectState } from "../hooks/useProjectState";

const thatData = reactive(cc);

export default defineComponent({
  props: ["panelKey"],
  setup() {
    const root = getCurrentInstance();
    const that: any = root.proxy;

    const project = useInjector(useProjectState);

    const handleAddPage = function() {
      project.addPage();
    };

    const handleClonePage = function(index: any) {
      project.clonePage(index);
    };

    const handleDeletePage = function(index: any) {
      project.delPage(index);
    };

    const handleActivePage = function(index: any) {
      project.activePage(index);
    };

    const handleUpPage = function(index: number) {
      if (index == 0) return;
      const tmpPage = project.thatData.chartData.pages;
      const o = tmpPage[index - 1];
      tmpPage[index - 1] = tmpPage[index];
      tmpPage[index] = o;
    };

    const handleDownPage = function(index: number) {
      if (index + 1 == project.thatData.chartData.pages.length) return;
      const tmpPage = project.thatData.chartData.pages;
      const o = tmpPage[index + 1];
      tmpPage[index + 1] = tmpPage[index];
      tmpPage[index] = o;
    };

    return {
      ...toRefs(thatData),
      handleAddPage,
      handleClonePage,
      handleDeletePage,
      handleActivePage: handleActivePage,
      project,
      handleUpPage,
      handleDownPage,
    };
  },
});
</script>

<style lang="scss" scoped>
.box-editor-page {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #ffffffe9;
  box-shadow: 4px 0 4px #00000005;

  .addpagebtn {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    width: 100%;
    font-size: 24px;
  }
  .title {
    color: #999999;
    padding: 10px 16px 16px;
  }
  .component-list {
    flex: 1;
    padding: 0 10px 0 16px;
    .list-item {
      display: inline-block;
      width: 90px;
      background: rgba(64, 160, 255, 0.06);
      border: 1px solid rgba(64, 160, 255, 0.1);
      margin-right: 10px;
      margin-bottom: 12px;
      opacity: 0.6;
      transition: opacity, background 0.3s ease;
      text-align: center;
      padding: 5px 0;

      &:hover {
        cursor: pointer;
        opacity: 0.8;
        background: rgba(64, 160, 255, 0.1);
        border: 1px solid #409eff;
        .name {
          color: #666666;
        }
      }

      .img-wrapper {
        display: flex;
        width: 100%;
        height: 80px;
        align-items: center;
        justify-content: center;
        img {
          height: 54px;
        }
      }

      .name {
        height: 20px;
        line-height: 20px;
        font-size: 13px;
        color: #777777;
      }
    }
  }

  .flip-list-move {
    transition: transform 0.5s;
  }

  .ghost {
    opacity: 0.3;
    background: #c8ebfb;
  }

  .layer-list {
    flex: 1;
    padding: 0;

    .list-item {
      display: flex;
      align-items: center;
      height: 48px;
      width: 100%;
      transition: background 0.3s ease;
      border-top: 1px solid rgba(0, 0, 0, 0.03);
      border-bottom: 1px solid rgba(0, 0, 0, 0.03);
      border-right: 6px solid transparent;
      margin-bottom: -1px;
      padding: 0 16px;
      box-sizing: border-box;

      &.active {
        background: rgba(64, 160, 255, 0.06);
        border-right: 6px solid #409eff7d;
      }

      &:hover {
        opacity: 1;
        background: rgba(64, 160, 255, 0.06);

        .icon {
          opacity: 1;
        }
      }

      .name {
        flex: 1;
        color: #777777;
      }

      .icon {
        float: right;
        color: #999999;
        font-size: 14px;
        opacity: 0;
        transition: opacity 0.3s ease;

        &:hover {
          color: #409eff;
          cursor: pointer;
        }
      }
    }
  }

  .picwrap {
    margin: 10px auto;
    position: relative;
    width: 200px;
    height: 224px;
    margin-left: 10px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
  }

  .activePage {
    border: 1px solid red;
  }

  .picindex {
    margin-top: 77px;
    margin-left: 10px;
    float: left;
  }
  .picindex a {
    display: block;
    font-size: 16px;
    color: #888e9b;
  }
  .picindex a:hover {
    color: #1bceb3;
  }
  .picindex p {
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }

  .editbtn {
    display: none;
    height: 24px;
    background: rgba(0, 0, 0, 0.6);
  }
  .editbtn {
    display: block;
    text-align: center;
  }
  .editbtn a {
    float: left;
    width: 67px;
    height: 24px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    font-size: 14px;
  }
  .editbtn a:hover {
    color: #1bceb3;
  }
}
</style>
