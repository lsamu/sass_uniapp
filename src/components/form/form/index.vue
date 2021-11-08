<template>
  <form @submit="formSubmit" @reset="formReset">
    <view class="uni-form-item uni-column">
      <view class="title">switch</view>
      <view>
        <switch name="switch" />
      </view>
    </view>
    <view class="uni-form-item uni-column">
      <view class="title">radio</view>
      <radio-group name="radio">
        <label> <radio value="radio1" /><text>选项一</text> </label>
        <label> <radio value="radio2" /><text>选项二</text> </label>
      </radio-group>
    </view>
    <view class="uni-form-item uni-column">
      <view class="title">checkbox</view>
      <checkbox-group name="checkbox">
        <label> <checkbox value="checkbox1" /><text>选项一</text> </label>
        <label> <checkbox value="checkbox2" /><text>选项二</text> </label>
      </checkbox-group>
    </view>
    <view class="uni-form-item uni-column">
      <view class="title">slider</view>
      <slider value="50" name="slider" show-value></slider>
    </view>
    <view class="uni-form-item uni-column">
      <view class="title">input</view>
      <input class="uni-input" name="input" placeholder="这是一个输入框" />
    </view>
    <view class="uni-btn-v">
      <button form-type="submit">Submit</button>
      <button type="default" form-type="reset">Reset</button>
    </view>
  </form>
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
  name: "Form",
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({});

    const currentOption = computed(() => {
      const defaultOption = {};

      let oo = merge(defaultOption, props.option || {});
      return oo;
    });

    const formSubmit = function(e) {
      console.log(
        "form发生了submit事件，携带数据为：" + JSON.stringify(e.detail.value)
      );
      var formdata = e.detail.value;
      uni.showModal({
        content: "表单数据内容：" + JSON.stringify(formdata),
        showCancel: false,
      });
    };
    const formReset = function(e) {
      console.log("清空数据");
    };

    return {
      ...toRefs(thatData),
      currentOption,
      formSubmit,
      formReset,
    };
  },
});
</script>
