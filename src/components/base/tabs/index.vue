<template>
  <view class="box-uni-tabs">
    <view class="title">
      <block v-for="(item, index) in currentOption.items" :key="index">
        <view :class="['inv-h',currentTabIndex== index?'inv-h-se':'']" @tap="handleTabClick(item, index)">{{
          item.title
        }}</view>
      </block>
    </view>

    <view class="content">
      <component
        :is="getComponent(currentOption.items[currentTabIndex].component)"
      ></component>
    </view>
  </view>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
  toRefs,
  getCurrentInstance,
} from "@vue/composition-api";
import merge from "deepmerge";

export default defineComponent({
  name: "Tabs",
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({
      currentTabIndex: 0,
    });

    const currentOption = computed(() => {
      const defaultOption = {
        items: [
          {
            title: "选项卡1",
            component: {
              type: "text",
            },
          },
          {
            title: "选项卡2",
            component: {
              type: "image",
            },
          },
        ],
      };

      let oo = merge(defaultOption, props.option || {});
      return oo;
    });

    const handleTabClick = function(sender, index) {
      thatData.currentTabIndex = index;
    };

    const getComponent = function(component) {
      return "box-uni-" + component.type;
    };

    return {
      ...toRefs(thatData),
      currentOption,
      handleTabClick,
      getComponent,
    };
  },
});
</script>
<style lang="scss">
.box-uni-tabs {
  .title {
    background-color: #ffffff;
    height: 100upx;
    display: flex;
    .inv-h {
      font-size: 32upx;
      flex: 1;
      text-align: center;
      color: #666666;
      height: 100upx;
      line-height: 100upx;
      position: relative;
    }
    .inv-h-se {
      font-size: 36rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #4db046;
    }
    .inv-h-se:after {
      content: "";
      position: absolute;
      bottom: -2rpx;
      top: auto;
      left: 42%;
      height: 6rpx;
      width: 44rpx;
      background-color: #4db046;
    }
  }
  .content {
  }
}
</style>
