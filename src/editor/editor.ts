const requireComponents = require.context("./", true, /^\.\/.*\/index\.vue$/);

const installComponent = function(Vue, opts = {}) {
  requireComponents.keys().forEach((fileName) => {
    const componentConfig = requireComponents(fileName);
    const component = componentConfig.default || componentConfig;
    const tmpFileName = fileName.replace("/index.vue", "");
    const componentName = tmpFileName.substring(
      tmpFileName.lastIndexOf("/") + 1
    );
    Vue.component("box-editor-" + componentName, component);
  });
};

const requireOptions = require.context("./", true, /^\.\/.*\/option\.vue$/);
const installOption = function(Vue, opts = {}) {
  requireOptions.keys().forEach((fileName) => {
    const componentConfig = requireOptions(fileName);
    const component = componentConfig.default || componentConfig;
    const tmpFileName = fileName.replace("/option.vue", "");
    const componentName = tmpFileName.substring(
      tmpFileName.lastIndexOf("/") + 1
    );
    Vue.component("box-editor-option-" + componentName, component);
  });
};

const install = function(Vue, opts = { option: false }) {
  installComponent(Vue, opts);
  if (opts.option) {
    installOption(Vue, opts);
  }
};

export default {
  install,
};
