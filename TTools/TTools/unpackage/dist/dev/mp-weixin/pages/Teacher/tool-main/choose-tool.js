"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      username: "JING",
      title: "\u501F\u7528\u5DE5\u5177",
      labelList: [],
      pattern: {
        color: "#488800",
        backgroundColor: "#fff",
        selectedColor: "#007AFF",
        buttonColor: "#00ff00",
        iconColor: "#fff"
      }
    };
  },
  methods: {
    toBorrow() {
      common_vendor.index.navigateTo({
        url: "/pages/ToolCats/ToolCats"
      });
    },
    onClick(id) {
      console.log(id);
      common_vendor.index.navigateTo({
        url: "/pages/Teacher/tool-main/tool-edit-list?labelId=" + id
      });
    },
    getLabelList() {
      common_vendor.index.request({
        header: { "Authorization": getApp().globalData.token },
        url: getApp().globalData.urlRoot + "/user/getFirstLabelList",
        data: {},
        method: "POST",
        success: (res) => {
          console.log(res.data);
          this.labelList = res.data.labelList;
        }
      });
    }
  },
  created() {
    if (getApp().globalData.uid === -1) {
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    }
    this.getLabelList();
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.labelList, (item, k0, i0) => {
      return {
        a: common_vendor.o(($event) => $options.onClick(item.lowerLabel[0].id)),
        b: "a552f410-1-" + i0 + ",a552f410-0",
        c: common_vendor.p({
          title: item.lowerLabel[0].name,
          thumbnail: item.lowerLabel[0].url
        })
      };
    }),
    b: common_vendor.p({
      title: "\u7F16\u8F91\u5DE5\u5177",
      subTitleFontSize: "16px",
      subTitle: "\u8BF7\u9009\u62E9\u5DE5\u5177\u5206\u7C7B",
      titleFontSize: "20px",
      type: "line"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/fancy/\u5DE5\u8BAD\u4E2D\u5FC3\u5DE5\u5177\u7BA1\u7406/Tool_manage_BUAA/TTools/TTools/pages/Teacher/tool-main/choose-tool.vue"]]);
wx.createPage(MiniProgramPage);
