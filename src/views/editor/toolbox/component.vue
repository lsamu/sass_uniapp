<template>
  <div class="box-editor-component">
    <div class="title">
      <span>
        {{ componentList[panelKey].name }} ({{
          componentList[panelKey].children.length
        }})
      </span>
    </div>
    <el-row>
      <el-col
        v-for="(item, index) in componentList[panelKey].children"
        :key="index"
        :span="12"
      >
        <div class="list-item"  @click="handleAddComponent(item)">
          <div class="img-wrapper">
            <img :src="item.img" alt="" />
          </div>
          <div class="name">{{ item.title }}</div>
        </div>
      </el-col>
    </el-row>
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

    const handleAddComponent = function(item: any) {
      const component = {
        uuid: uuid.v4(),
        name: item.title + (project.thatData.currentPage.elements.length + 1),
        x: 0,
        y: 0,
        w: 200,
        h: 100,
        z: project.thatData.currentPage.elements.length,
        bgcolor: "rgba(0, 0, 0, 0)",
        bgImage: "#",
        type: item.id,
        data: {},
        animation: {
          items: [],
        },
      };
      project.addComponent(component);
    };

    return {
      ...toRefs(thatData),
      handleAddComponent,
      project,
    };
  },
});
</script>

<style lang="scss" scoped>
.box-editor-component {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #ffffffe9;
  box-shadow: 4px 0 4px #00000005;
  .title {
    color: #999999;
    padding: 10px 16px 16px;
  }
  .list-item {
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
    overflow: scroll;

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
}
</style>
