<template>
  <view class="uni-product-list">
    <view
      class="uni-product"
      v-for="(product, index) in productList"
      :key="index"
    >
      <view class="image-view">
        <image
          v-if="renderImage"
          class="uni-product-image"
          :src="product.image"
        ></image>
      </view>
      <view class="uni-product-title">{{ product.title }}</view>
      <view class="uni-product-price">
        <text class="uni-product-price-favour"
          >￥{{ product.originalPrice }}</text
        >
        <text class="uni-product-price-original"
          >￥{{ product.favourPrice }}</text
        >
        <text class="uni-product-tip">{{ product.tip }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "ProductView",
  data() {
    return {
      title: "product-list",
      productList: [],
      renderImage: false,
    };
  },
  methods: {
    loadData(action = "add") {
      const data = [
        {
          image:
            "https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product1.jpg",
          title: "Apple iPhone X 256GB 深空灰色 移动联通电信4G手机",
          originalPrice: 9999,
          favourPrice: 8888,
          tip: "自营",
        },
        {
          image:
            "https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product2.jpg",
          title: "Apple iPad 平板电脑 2018年新款9.7英寸",
          originalPrice: 3499,
          favourPrice: 3399,
          tip: "优惠",
        },
        {
          image:
            "https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product3.jpg",
          title:
            "Apple MacBook Pro 13.3英寸笔记本电脑（2017款Core i5处理器/8GB内存/256GB硬盘 MupxT2CH/A）",
          originalPrice: 12999,
          favourPrice: 10688,
          tip: "秒杀",
        },
        {
          image:
            "https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product4.jpg",
          title: "Kindle Paperwhite电纸书阅读器 电子书墨水屏 6英寸wifi 黑色",
          originalPrice: 999,
          favourPrice: 958,
          tip: "秒杀",
        },
        {
          image:
            "https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product5.jpg",
          title:
            "微软（Microsoft）新Surface Pro 二合一平板电脑笔记本 12.3英寸（i5 8G内存 256G存储）",
          originalPrice: 8888,
          favourPrice: 8288,
          tip: "优惠",
        },
        {
          image:
            "https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product6.jpg",
          title:
            "Apple Watch Series 3智能手表（GPS款 42毫米 深空灰色铝金属表壳 黑色运动型表带 MQL12CH/A）",
          originalPrice: 2899,
          favourPrice: 2799,
          tip: "自营",
        },
      ];

      if (action === "refresh") {
        this.productList = [];
      }

      data.forEach((item) => {
        this.productList.push(item);
      });
    },
  },
  mounted() {
    this.loadData();
    setTimeout(() => {
      this.renderImage = true;
    }, 300);
  },
};
</script>

<style>
/* product */
page {
  background: #f8f8f8;
}

view {
  font-size: 28upx;
}

.uni-product-list {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
}

.uni-product {
  padding: 20upx;
  display: flex;
  flex-direction: column;
}

.image-view {
  height: 330upx;
  width: 330upx;
  margin: 12upx 0;
}

.uni-product-image {
  height: 330upx;
  width: 330upx;
}

.uni-product-title {
  width: 300upx;
  word-break: break-all;
  display: -webkit-box;
  overflow: hidden;
  line-height: 1.5;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.uni-product-price {
  margin-top: 10upx;
  font-size: 28upx;
  line-height: 1.5;
  position: relative;
}

.uni-product-price-original {
  color: #e80080;
}

.uni-product-price-favour {
  color: #888888;
  text-decoration: line-through;
  margin-left: 10upx;
}

.uni-product-tip {
  position: absolute;
  right: 10upx;
  background-color: #ff3333;
  color: #ffffff;
  padding: 0 10upx;
  border-radius: 5upx;
}
</style>
