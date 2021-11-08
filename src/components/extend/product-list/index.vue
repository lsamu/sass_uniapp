<template>
  <view class="box-uni-product-list">
    <u-waterfall v-model="flowList" ref="uWaterfall">
      <template v-slot:left="{ leftList }">
        <view class="warter" v-for="(item, index) in leftList" :key="index">
          <!-- 警告：微信小程序不支持嵌入lazyload组件，请自行如下使用image标签 -->
          <!-- #ifndef MP-WEIXIN -->
          <u-lazy-load
            threshold="-450"
            border-radius="10"
            :image="item.image"
            :index="index"
          ></u-lazy-load>
          <!-- #endif -->
          <!-- #ifdef MP-WEIXIN -->
          <view class="img-wrap">
            <image class="image" :src="item.image" mode="widthFix"></image>
          </view>
          <!-- #endif -->
          <view class="title">
            {{ item.title }}
          </view>
          <view class="price"> {{ item.price }}元 </view>
          <view class="tag">
            <view class="tag-owner">
              自营
            </view>
            <view class="tag-text">
              放心购
            </view>
          </view>
          <view class="shop">
            {{ item.shop }}
          </view>
        </view>
      </template>
      <template v-slot:right="{ rightList }">
        <view class="warter" v-for="(item, index) in rightList" :key="index">
          <!-- #ifndef MP-WEIXIN -->
          <u-lazy-load
            threshold="-450"
            border-radius="10"
            :image="item.image"
            :index="index"
          ></u-lazy-load>
          <!-- #endif -->
          <!-- #ifdef MP-WEIXIN -->
          <view class="img-wrap">
            <image class="image" :src="item.image" mode="widthFix"></image>
          </view>
          <!-- #endif -->
          <view class="title">
            {{ item.title }}
          </view>
          <view class="price"> {{ item.price }}元 </view>
          <view class="tag">
            <view class="tag-owner">
              自营
            </view>
            <view class="tag-text">
              放心购
            </view>
          </view>
          <view class="shop">
            {{ item.shop }}
          </view>
        </view>
      </template>
    </u-waterfall>
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
  name: "ProductList",
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that: any = root.proxy;

    const thatData = reactive({
      loadStatus: "loading",
      flowList: [
        {
          price: 35,
          title: "北国风光，千里冰封，万里雪飘",
          shop: "李白杜甫白居易旗舰店",
          image: require("@/static/index/swiper_1.jpg"),
        },
        {
          price: 75,
          title: "望长城内外，惟余莽莽",
          shop: "李白杜甫白居易旗舰店",
          image: require("@/static/index/swiper_1.jpg"),
        },
      ],
      leftList: [
        {
          price: 35,
          title: "北国风光，千里冰封，万里雪飘",
          shop: "李白杜甫白居易旗舰店",
          image: require("@/static/index/swiper_1.jpg"),
        },
        {
          price: 75,
          title: "望长城内外，惟余莽莽",
          shop: "李白杜甫白居易旗舰店",
          image: require("@/static/index/swiper_1.jpg"),
        },
      ],
      rightList: [
        {
          price: 35,
          title: "北国风光，千里冰封，万里雪飘",
          shop: "李白杜甫白居易旗舰店",
          image: require("@/static/index/swiper_1.jpg"),
        },
        {
          price: 75,
          title: "望长城内外，惟余莽莽",
          shop: "李白杜甫白居易旗舰店",
          image: require("@/static/index/swiper_1.jpg"),
        },
      ],
    });

    const currentOption = computed(() => {
      const defaultOption = {};

      let oo = merge(defaultOption, props.option || {});
      return oo;
    });

    return {
      ...toRefs(thatData),
      currentOption,
    };
  },
});
</script>
<style lang="scss">
.box-uni-product-list {
  .water {
    border-radius: 8px;
    margin: 5px;
    background-color: #ffffff;
    padding: 8px;
    position: relative;
  }
  .u-close {
    position: absolute;
    top: 32rpx;
    right: 32rpx;
  }

  .image {
    width: 100%;
    border-radius: 4px;
  }

  .title {
    font-size: 30rpx;
    margin-top: 5px;
    color: $u-main-color;
  }

  .tag {
    display: flex;
    margin-top: 5px;
  }

  .tag-owner {
    background-color: $u-type-error;
    color: #ffffff;
    display: flex;
    align-items: center;
    padding: 4rpx 14rpx;
    border-radius: 50rpx;
    font-size: 20rpx;
    line-height: 1;
  }

  .tag-text {
    border: 1px solid $u-type-primary;
    color: $u-type-primary;
    margin-left: 10px;
    border-radius: 50rpx;
    line-height: 1;
    padding: 4rpx 14rpx;
    display: flex;
    align-items: center;
    border-radius: 50rpx;
    font-size: 20rpx;
  }

  .price {
    font-size: 30rpx;
    color: $u-type-error;
    margin-top: 5px;
  }

  .shop {
    font-size: 22rpx;
    color: $u-tips-color;
    margin-top: 5px;
  }
}
</style>
