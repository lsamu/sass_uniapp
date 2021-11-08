<template>
  <div class="sider-container">
    <div class="sider" :style="{width: sider.width + 'px', padding: isExpanded ? '12px' : '0'}">
      <div class="anchor" @click="handleAnchorClick">
        <svg 
          v-show="isExpanded"
          style="font-size: 14px"
          viewBox="64 64 896 896" 
          data-icon="left" 
          width="1em" 
          height="1em" 
          fill="currentColor" 
          aria-hidden="true" 
          focusable="false" 
        >
          <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
        </svg>
        <svg 
          v-show="!isExpanded"
          style="font-size: 14px"
          viewBox="64 64 896 896" 
          data-icon="right" 
          width="1em" 
          height="1em" 
          fill="currentColor" 
          aria-hidden="true" 
          focusable="false" 
        >
          <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path>
        </svg>
      </div>
      <div v-show="isExpanded" :style="{width: sider.width - 24 + 'px'}"><!-- 控制内容随sider隐藏和显示 -->
        <slot name="sider"></slot>
      </div>
    </div>
    <div class="content" :style="{width: `calc(100% - ${sider.width + 'px'})`, overflow: 'auto'}">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
  import gsap from 'gsap'
  export default {
    name: 'SiderContainer',
    props: {
      siderWidth: {
        type: Number,
        default: 200
      }
    },
    data() {
      return {
        sider: {
          width: this.$props.siderWidth
        },
      }
    },
    computed: {
      isExpanded: function () {
        return Boolean(this.sider.width > 0)
      }
    },
    methods: {
      handleAnchorClick: function () {
        gsap.to(this.$data.sider, { duration: 0.3, width: this.$props.siderWidth - this.sider.width })
      }
    }
  }
</script>

<style scoped lang="scss">
.sider-container {
  height: 100%;
  padding: 0;
  display: flex;
  .sider {
    position: relative;
    height: 100%;
    margin-right: 20px;
    background-color: #fff;
    .anchor {
      width: 16px;
      height: 60px;
      position: absolute;
      right: -16px;
      top: 50%;
      transform: translateY(-50%);
      background-color: #fff;
      color: #BEBEBE;
      font-size: 20px;
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      cursor: pointer;
      transition: all .3s ease-in-out;
      padding-top: 15px;
      text-align: center;
      &:hover {
        width: 20px;
        right: -20px;
      }
    }
  }
  .content {
    height: 100%;
    padding: 12px;
    background-color: #fff;
  }
}
</style>