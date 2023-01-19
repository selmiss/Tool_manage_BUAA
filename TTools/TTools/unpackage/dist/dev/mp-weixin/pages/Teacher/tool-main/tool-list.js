"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      tool_list: [],
      tool_list1: [],
      tool_list2: [],
      tool_list3: []
    };
  },
  created() {
    if (getApp().globalData.uid === -1) {
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    }
    this.getList();
  },
  methods: {
    getList() {
      common_vendor.index.request({
        header: { "Authorization": getApp().globalData.token },
        url: getApp().globalData.urlRoot + "/user/getLabelToolList",
        data: {
          labelId: 4
        },
        method: "POST",
        success: (res) => {
          if (res.data.error_code === 0) {
            this.tool_list3 = res.data.toolList;
            for (var i = 0; i < this.tool_list3.length; i++) {
              this.tool_list3[i]["cat"] = "\u673A\u68B0\u7535\u5B50\u8BBE\u5907";
            }
            this.tool_list = this.tool_list.concat(this.tool_list3);
          }
        }
      });
      common_vendor.index.request({
        header: { "Authorization": getApp().globalData.token },
        url: getApp().globalData.urlRoot + "/user/getLabelToolList",
        data: {
          labelId: 5
        },
        method: "POST",
        success: (res) => {
          if (res.data.error_code === 0) {
            this.tool_list1 = res.data.toolList;
            for (var i = 0; i < this.tool_list1.length; i++) {
              this.tool_list1[i]["cat"] = "\u7535\u63A7\u5DE5\u5177";
            }
            this.tool_list = this.tool_list.concat(this.tool_list1);
          }
        }
      });
      common_vendor.index.request({
        header: { "Authorization": getApp().globalData.token },
        url: getApp().globalData.urlRoot + "/user/getLabelToolList",
        data: {
          labelId: 6
        },
        method: "POST",
        success: (res) => {
          if (res.data.error_code === 0) {
            this.tool_list2 = res.data.toolList;
            for (var i = 0; i < this.tool_list2.length; i++) {
              this.tool_list2[i]["cat"] = "\u673A\u68B0\u5DE5\u5177";
            }
            this.tool_list = this.tool_list.concat(this.tool_list2);
          }
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_row2 + _easycom_uni_card2 + _easycom_uni_section2)();
}
const _easycom_uni_row = () => "../../../uni_modules/uni-row/components/uni-row/uni-row.js";
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_row + _easycom_uni_card + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.tool_list, (item, index, i0) => {
      return {
        a: common_vendor.t(item.limit_days),
        b: "106bd41d-2-" + i0 + "," + ("106bd41d-1-" + i0),
        c: "106bd41d-1-" + i0 + ",106bd41d-0",
        d: common_vendor.p({
          title: index + 1 + "." + item.name,
          ["sub-title"]: "\u7C7B\u522B : " + item.cat,
          extra: "\u5269\u4F59\u6570\u91CF:" + item.leftCount + "/" + item.totalCount,
          thumbnail: _ctx.avatar
        })
      };
    }),
    b: common_vendor.p({
      width: _ctx.nvueWidth
    }),
    c: common_vendor.p({
      title: "\u5DE5\u5177\u5217\u8868",
      subTitleFontSize: "16px",
      subTitle: "\u6240\u6709\u5DE5\u5177",
      titleFontSize: "20px",
      type: "line"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/fancy/\u5DE5\u8BAD\u4E2D\u5FC3\u5DE5\u5177\u7BA1\u7406/Tool_manage_BUAA/TTools/TTools/pages/Teacher/tool-main/tool-list.vue"]]);
wx.createPage(MiniProgramPage);
