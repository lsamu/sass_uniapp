import { computed, reactive, toRefs, toRef } from "@vue/composition-api";
import uuid from "node-uuid";
import merge from "deepmerge";

import { useInjector, useProvider } from "../../utils/hook";
import { useHistoryState } from "./useHistoryState";
import { MessageBox } from "element-ui";

export interface page {
  uuid?: string;
  title?: string;
  bgcolor?: string;
  bgimage?: string;
  bgimagesize?: string;
  width?: number;
  height?: number;
  elements?: any[];
  bgSize?: string;
  mode?: string;
  orderId?: number;
  parentId?: number;
  //tabs?: any[];
}

export function useProjectState() {
  //当前操作的页面
  const currentPage = computed(() => {
    let oo: page = {};
    if (thatData.currentPageIndex >= 0) {
      oo = thatData.chartData.pages[thatData.currentPageIndex];
    }
    return oo;
  });

  //当前操作的组件
  const currentElement = computed(() => {
    let oo: {} = {};
    if (thatData.currentElementIndex >= 0) {
      oo =
        thatData.chartData.pages[thatData.currentPageIndex].elements[
          thatData.currentElementIndex
        ];
    }
    return oo;
  });

  //上下文数据
  const thatData = reactive({
    scale: 1,
    preview: false,
    chartData: {
      uuid: uuid.v4(),
      title: "xxx项目",
      desc: "我用XX可视化编辑器做了一个超酷炫的H5",
      coverImage: "", //封面
      auther: "作者",
      prefix: "box-uni", //组件前缀
      password: "",
      pages: [
        {
          uuid: uuid.v4(),
          title: "页面1",
          bgcolor: "",
          bgimage: "",
          bgimagesize: "",
          width: 375,
          height: 667,
          mode: "design", //页面模式  drag design grid
          bgSize: "xs", //页面大小
          elements: [],
          //tabs: [],
        },
      ], //页面
      prefabs: [], //预制件   box-prefab
      plugins: [], //远程插件 umd地址
    },
    currentPageIndex: 0,
    currentElementIndex: -1,
    currentPage,
    currentElement,
  });

  /*
  xs: "490",
        sm: "576",
        md: "768",
        lg: "992",
        xl: "1200",
  */
  //添加组件
  const addComponent = function(data: any) {
    const defaultComponent = {
      uuid: uuid.v4(), //唯一标识
      name: "组件",
      x: 0,
      y: 0,
      w: 200, //高
      h: 100, //宽
      z: thatData.currentPage.elements.length, //z-Index 组件索引
      bgcolor: "rgba(0, 0, 0, 0)", //背景颜色
      bgImage: "#", //背景图片
      active: true, //是否激活
      data: {}, //数据
      count: 0, //允许创建的个数 0不限制
      fiexd: false, //是否固定 不能拖动 移动
      animation: {
        items: [],
      }, //动画列表
      component: {
        data: {}, //数据
      }, //组件属性
    };
    const dd = merge(defaultComponent, data);
    //判断组件允许添加的个数
    thatData.currentPage.elements.unshift(dd);
    //判断是否激活
    if (dd.active) {
      activeComponent(dd.z);
    }
  };
  //删除组件
  const deleteComponent = function(index: any) {
    thatData.currentPage.elements.splice(index, 1);
  };
  //清除组件
  const clearComponent = async function() {
    const aa = await MessageBox.confirm("是否清空所有组件？不可恢复。");
    if (aa == "confirm") {
      thatData.currentPage.elements = [];
    }
  };
  //激活组件
  const activeComponent = function(index: any) {
    for (let i = 0; i < thatData.currentPage.elements.length; i += 1) {
      const element: any = thatData.currentPage.elements[i];
      if (index === i) {
        element.active = true;
      } else {
        element.active = false;
      }
    }
    thatData.currentElementIndex = index;
  };
  //缩放
  const changeScale = function(scale: any) {
    thatData.scale = scale;
  };

  //添加页面
  const addPage = function() {
    let page = {
      uuid: uuid.v4(),
      title: "页面" + (thatData.chartData.pages.length + 1),
      bgcolor: "",
      bgimage: "",
      bgimagesize: "",
      width: 375,
      height: 667,
      mode: "design",
      elements: [],
      bgSize: "xs",
      //tabs:[]
    };
    thatData.chartData.pages.push(page);
    // thatData.chartData.pages.unshift(page);
  };

  //复制页面
  const clonePage = function(index: any) {
    for (let i = 0; i < thatData.chartData.pages.length; i += 1) {
      const page = merge({}, thatData.chartData.pages[i]);
      if (i == index) {
        page.uuid = uuid.v4();
        page.title = page.title + "-复制";
        thatData.chartData.pages.push(page);
        // thatData.chartData.pages.unshift(page);
      }
    }
  };

  //删除页面
  const delPage = function(index: any) {
    if (thatData.chartData.pages.length <= 1) {
      return;
    }
    thatData.chartData.pages.splice(index, 1);
    thatData.currentPageIndex = index - 1;
  };

  //选中页面
  const activePage = function(index: any) {
    for (let i = 0; i < thatData.chartData.pages.length; i += 1) {
      const page = thatData.chartData.pages[i];
      if (i == index) {
        thatData.currentPageIndex = index;
      }
    }
    thatData.currentElementIndex = -1;
  };

  //重做
  const redo = function() {
    //不加入历史记录
    //thatData.currentPage = history.getNext();
  };

  //撤销
  const undo = function() {
    //不加入历史记录
    //thatData.currentPage = history.getPrev();
  };

  //导出项目数据
  const exportProjectData = function() {
    return thatData.chartData;
  };

  //导入项目数据
  const importProjectData = function(data: any) {
    thatData.chartData = data;
  };

  return {
    thatData,
    addComponent,
    deleteComponent,
    clearComponent,
    changeScale,
    activeComponent,
    addPage,
    clonePage,
    delPage,
    activePage,
    exportProjectData,
    importProjectData,
    redo,
    undo,
  };
}
