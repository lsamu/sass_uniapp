<template>
  <div class="box-editor-screen">
    <div class="logo">VVV</div>
    <div class="desc">一站式H5小程序制作平台</div>
    <transition> </transition>
    <div class="btn-wrapper">
      <span class="btn" @click="handleClick">进入系统</span>
      <!-- <xxx></xxx> -->
      <!-- <box-plugin-demo></box-plugin-demo> -->
      <box-editor-page-html></box-editor-page-html>
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
  onUnmounted,
} from "@vue/composition-api";

import Vue from "vue";

// Vue.component("xxx", {
//   // render(h) {
//   //   return h("dive",`<swiper>ssss</swiper>`);
//   // },
//   template:`<swiper>1231</swiper>`
// });

// Vue.component("xxx", function(resolve) {
//   setTimeout(function() {
//     resolve({
//       template: `<div>i am async</div>`,
//     });
//   }, 1000);
// });

import("../../../lib/h5/myLib.umd.min.js")
  .then((a) => {
    console.log(a);
    Vue.use(a);
  })
  .catch((e) => {
    console.log(e);
  });

export default defineComponent({
  setup() {
    const root = getCurrentInstance();
    const that: any = root.proxy;

    const handleClick = function() {
      that.$router.push({ path: "console" });
    };

    // const mountEle = document.createElement("div");
    // mountEle.innerHTML="sdfsdfds";

    // mountEle.id = "dialog";
    // // 挂在到body 上
    // document.body.appendChild(mountEle);

    // onUnmounted(() => {
    //   // 当组件消亡的时候，我们就清空节点
    //   document.body.removeChild(mountEle);
    // });

    const loadAsyncComponent = function(name) {
      Vue.component(name, (resolve, reject) => {
        loadScript(`//localhost:8000/${name}.js`)
          .then(() => {
            resolve(window["modules"][this.name]);
          })
          .catch((e) => {
            reject(e);
          });
      });
    };

    const loadScript = (url) => {
      return new Promise((resolve: any, reject: any) => {
        let script: any = document.createElement("script");
        script.type = "text/javascript";
        if (script.readyState) {
          //IE
          script.onreadystatechange = function() {
            if (
              script.readyState == "loaded" ||
              script.readyState == "complete"
            ) {
              script.onreadystatechange = null;
              resolve();
            }
          };
        } else {
          //Others
          script.onload = function() {
            console.log("complete");
            resolve();
          };
          script.onerror = function(e) {
            reject(e);
          };
        }
        script.src = url;
        document.getElementsByTagName("body")[0].appendChild(script);
      });
    };

    return {
      handleClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.box-editor-screen {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: url("../../assets/img/bg.png");
  background-position: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  .logo {
    height: 72px;
    line-height: 72px;
    text-align: center;
    font-weight: bold;
    font-size: 36px;
    color: #515151;
    margin-top: 180px;

    &::after {
      content: ".";
      font-size: 42px;
      color: rgba(255, 0, 0, 0.6);
    }
  }
  .desc {
    text-align: center;
    font-size: 16px;
    font-weight: 300;
    font-family: "Noto Sans SC", sans-serif;
    letter-spacing: 4px;
    color: #808080;
    margin: 0 0 40px;
  }

  .login-box {
    background: #ffffff;
    width: 240px;
    margin: 20px auto 40px;
    padding: 0 40px 36px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.06);
    .radio-group {
      text-align: center;
      .radio-btn {
        display: inline-block;
        padding: 10px 20px;
        margin: 10px 10px;
        color: #999999;
        &.active {
          color: #212121;
          border-bottom: 2px solid #212121;
        }
      }
    }
  }

  .btn-wrapper {
    margin-top: 40px;
    text-align: center;
    a {
      text-decoration: none;
      color: #ffffff;
    }
    .btn {
      padding: 12px 32px;
      background: rgba(0, 0, 0, 0.5);
      color: #ffffff;
      transition: background 0.3s ease;
      font-size: 14px;
      border-radius: 50px;
      &:hover {
        background: #409eff;
        cursor: pointer;
      }
    }
  }

  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
}
</style>
