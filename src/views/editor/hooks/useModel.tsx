import { defineComponent, getCurrentInstance, reactive,createApp, ComponentInternalInstance } from "@vue/composition-api";
import { Button } from "element-ui";
interface ModalOption {
  title?: string;
  content?: ComponentInternalInstance | (() => any)
  onConfirm?: () => void;
  onCancel?: () => void;
  props?: {
    [propName: string]: any
  }
}

const Modal = defineComponent({
  props: ["option"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({
      options: props.option,
      visible: true,
    });

    const methods = {
      service: (options: ModalOption) => {
        thatData.options = options;
      },
    };

    Object.assign(root.proxy, methods)
    return () => <content></content>;
  },
});

export const useModal = (() => {
  let instance: any;
  return (option: ModalOption) => {
    if (instance) {
      instance.service(option);
      return instance;
    }
    const div = document.createElement("div");
    document.body.appendChild(div);
    const app = createApp(Modal, { option: option });
    instance = app.mount(div);
    return instance;
  };
})();
