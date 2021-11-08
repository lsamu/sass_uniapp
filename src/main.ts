import Vue from "vue";
import App from "./App.vue";
import store from "@/store";

import VueCompositionAPI from "@vue/composition-api";
Vue.use(VueCompositionAPI);

import { router, RouterMount } from "./router"; //路径换成自己的
Vue.use(router);

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI, { size: "mini" });

import "vue-awesome/icons";
import Icon from "vue-awesome/components/Icon";
Vue.component("v-icon", Icon);

import BoxEditor from './editor/editor'
Vue.use(BoxEditor)

import BoxUI from "@lauxinyi/box-ui";
import "@lauxinyi/box-ui/dist/style.css";
Vue.use(BoxUI);

import BoxUni from "./components/main";
Vue.use(BoxUni, { option: true });

// 引入全局uView
import uView from './uview-ui'
Vue.use(uView);

Vue.config.productionTip = false;

import VueDraggableResizable from "vue-draggable-resizable-gorkys";
import "vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css";

Vue.component("vue-draggable-resizable", VueDraggableResizable);

import animate from "animate.css";
Vue.use(animate);

const app = new App({
  store,
});

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, router, "#app");
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif

document.title = "一站式H5小程序可视化"