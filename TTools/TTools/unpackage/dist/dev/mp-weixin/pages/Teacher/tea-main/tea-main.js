"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  onShow() {
    if (getApp().globalData.uid === -1) {
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    }
  },
  methods: {
    borrow1() {
      common_vendor.index.navigateTo({
        url: "/pages/Teacher/tea-main/check-borrow"
      });
    },
    borrow2() {
      common_vendor.index.navigateTo({
        url: "/pages/Teacher/tea-main/delay-borrow"
      });
    },
    borrow3() {
      common_vendor.index.navigateTo({
        url: "/pages/Teacher/tea-main/return-borrow"
      });
    },
    tool1() {
      common_vendor.index.navigateTo({
        url: "/pages/Teacher/tool-main/tool-list"
      });
    },
    tool2() {
      common_vendor.index.navigateTo({
        url: "/pages/Teacher/tool-main/choose-tool"
      });
    },
    tool3() {
      common_vendor.index.navigateTo({
        url: "/pages/Teacher/tool-main/new-tool"
      });
    },
    logout() {
      getApp().globalData.uid = -1;
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_icons2 + _easycom_uni_grid_item2 + _easycom_uni_grid2 + _easycom_uni_card2)();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_grid_item = () => "../../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_grid_item + _easycom_uni_grid + _easycom_uni_card)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.logout && $options.logout(...args)),
    b: common_vendor.p({
      type: "settings",
      size: "20"
    }),
    c: common_vendor.o((...args) => $options.borrow1 && $options.borrow1(...args)),
    d: common_vendor.p({
      type: "calendar-filled",
      size: "20"
    }),
    e: common_vendor.o((...args) => $options.borrow2 && $options.borrow2(...args)),
    f: common_vendor.p({
      type: "undo-filled",
      size: "20"
    }),
    g: common_vendor.o((...args) => $options.borrow3 && $options.borrow3(...args)),
    h: common_vendor.p({
      column: 3,
      highlight: true,
      square: true,
      ["show-border"]: false
    }),
    i: common_vendor.p({
      title: "审批管理",
      extra: ""
    }),
    j: common_vendor.p({
      type: "list",
      size: "20"
    }),
    k: common_vendor.o((...args) => $options.tool1 && $options.tool1(...args)),
    l: common_vendor.p({
      type: "compose",
      size: "20"
    }),
    m: common_vendor.o((...args) => $options.tool2 && $options.tool2(...args)),
    n: common_vendor.p({
      type: "plus",
      size: "20"
    }),
    o: common_vendor.o((...args) => $options.tool3 && $options.tool3(...args)),
    p: common_vendor.p({
      column: 3,
      highlight: true,
      square: true,
      ["show-border"]: false
    }),
    q: common_vendor.p({
      title: "工具管理",
      extra: ""
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/fancy/\u5DE5\u8BAD\u4E2D\u5FC3\u5DE5\u5177\u7BA1\u7406/Tool_manage_BUAA/TTools/TTools/pages/Teacher/tea-main/tea-main.vue"]]);
wx.createPage(MiniProgramPage);
