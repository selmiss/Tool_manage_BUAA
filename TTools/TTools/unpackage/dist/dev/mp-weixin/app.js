"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/Teacher/tea-main/tea-main.js";
  "./pages/self/self.js";
  "./pages/stu-Main/stu-Main.js";
  "./pages/ToolCats/ToolCats.js";
  "./pages/ToolList/ToolList.js";
  "./pages/newPassword/newPassword.js";
  "./pages/Teacher/tea-main/check-borrow.js";
  "./pages/Teacher/tea-main/delay-borrow.js";
  "./pages/Teacher/tea-main/return-borrow.js";
  "./pages/Teacher/tool-main/tool-list.js";
  "./pages/Teacher/tool-main/choose-tool.js";
  "./pages/Teacher/tool-main/tool-edit-list.js";
  "./pages/Teacher/tool-main/new-tool.js";
}
const _sfc_main = {
  globalData: {
    uid: -1,
    urlRoot: "http://127.0.0.1:8000",
    token: "wutoken"
  },
  onLaunch: function() {
    console.warn("\u5F53\u524D\u7EC4\u4EF6\u4EC5\u652F\u6301 uni_modules \u76EE\u5F55\u7ED3\u6784 \uFF0C\u8BF7\u5347\u7EA7 HBuilderX \u5230 3.1.0 \u7248\u672C\u4EE5\u4E0A\uFF01");
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Desktop/git_clong/Tool_manage_BUAA/TTools/TTools/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
