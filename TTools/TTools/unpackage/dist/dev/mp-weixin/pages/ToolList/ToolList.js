"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      labelId: 0,
      cover: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/094a9dc0-50c0-11eb-b680-7980c8a877b8.jpg",
      extraIcon: {
        color: "#4cd964",
        size: "22",
        type: "gear-filled"
      },
      toolList: [],
      toolInfo: {},
      range: {},
      borrowCount: 1,
      purpose: "",
      startTime: "",
      returnTime: "",
      uid: -1
    };
  },
  onShow() {
    if (getApp().globalData.uid === -1) {
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    }
  },
  onLoad: function(option) {
    console.log(option.labelId);
    this.labelId = option.labelId;
    this.getList();
  },
  methods: {
    submitBorrow() {
      this.uid = getApp().globalData.uid;
      this.startTime = this.range[0];
      this.returnTime = this.range[1];
      common_vendor.index.request({
        url: getApp().globalData.urlRoot + "/user/borrowRequest",
        data: {
          borrowCount: this.borrowCount,
          purpose: this.purpose,
          startTime: this.startTime,
          returnTime: this.returnTime,
          toolId: this.toolInfo.id,
          uid: this.uid
        },
        method: "POST",
        success: (res) => {
          if (res.data.error_code === 0) {
            common_vendor.index.showToast({
              title: "\u501F\u7528\u6210\u529F\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5F85\u5BA1\u6838\uFF01",
              icon: "none"
            });
          }
        }
      });
      this.$refs.popup.close();
      common_vendor.index.reLaunch({
        url: "/pages/stu-Main/stu-Main"
      });
    },
    getList() {
      common_vendor.index.request({
        url: getApp().globalData.urlRoot + "/user/getLabelToolList",
        data: { labelId: this.labelId },
        method: "POST",
        success: (res) => {
          if (res.data.error_code === 0) {
            console.log(res.data.toolList);
            this.toolList = res.data.toolList;
          }
        }
      });
    },
    showInfo(index) {
      this.toolInfo = this.toolList[index];
      this.$refs.popupinfo.open("center");
    },
    toggle(type, index) {
      this.type = type;
      this.toolInfo = this.toolList[index];
      this.$refs.popup.open(type);
    },
    onClick(e) {
      console.log(e);
    },
    actionsClick(text) {
      this.$refs.popup.close();
      this.$refs.popupinfo.close();
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_card2 + _easycom_uni_grid_item2 + _easycom_uni_grid2 + _easycom_uni_section2 + _easycom_uni_datetime_picker2 + _easycom_uni_easyinput2 + _easycom_uni_popup2)();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_grid_item = () => "../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_grid_item + _easycom_uni_grid + _easycom_uni_section + _easycom_uni_datetime_picker + _easycom_uni_easyinput + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.toolList, (item, index, i0) => {
      return {
        a: item.url,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.limit_days),
        d: common_vendor.t(item.leftCount),
        e: common_vendor.t(item.totalCount),
        f: common_vendor.o(($event) => $options.showInfo(index)),
        g: common_vendor.o(($event) => $options.toggle("center", index)),
        h: "0d4ca327-3-" + i0 + "," + ("0d4ca327-2-" + i0),
        i: index,
        j: "0d4ca327-2-" + i0 + ",0d4ca327-1",
        k: common_vendor.p({
          index
        })
      };
    }),
    b: common_vendor.o($options.onClick),
    c: common_vendor.p({
      column: 2,
      highlight: true,
      square: false
    }),
    d: common_vendor.p({
      title: "\u5DE5\u5177\u501F\u7528",
      subTitle: "",
      titleFontSize: "20px",
      subTitleFontSize: "18px",
      type: "line"
    }),
    e: $data.toolInfo.url,
    f: common_vendor.t($data.toolInfo.name),
    g: common_vendor.t($data.toolInfo.limit_days),
    h: common_vendor.t($data.toolInfo.leftCount),
    i: common_vendor.t($data.toolInfo.totalCount),
    j: common_vendor.o(($event) => $data.range = $event),
    k: common_vendor.p({
      type: "daterange",
      modelValue: $data.range
    }),
    l: common_vendor.p({
      title: "*\u501F\u7528\u65F6\u95F4",
      type: "line",
      padding: true
    }),
    m: common_vendor.o(($event) => $data.purpose = $event),
    n: common_vendor.p({
      type: "textarea",
      placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9",
      modelValue: $data.purpose
    }),
    o: common_vendor.p({
      title: "*\u501F\u7528\u7406\u7531",
      type: "line",
      padding: true
    }),
    p: common_vendor.o(($event) => $options.actionsClick("\u53D6\u6D88")),
    q: common_vendor.o(($event) => $options.submitBorrow()),
    r: common_vendor.o($options.onClick),
    s: _ctx.type === "left" || _ctx.type === "right" ? 1 : "",
    t: common_vendor.sr("popup", "0d4ca327-4"),
    v: common_vendor.p({
      ["background-color"]: "#fff"
    }),
    w: $data.toolInfo.url,
    x: common_vendor.t($data.toolInfo.name),
    y: common_vendor.t($data.toolInfo.limit_days),
    z: common_vendor.t($data.toolInfo.leftCount),
    A: common_vendor.t($data.toolInfo.totalCount),
    B: common_vendor.o(($event) => $options.actionsClick("\u53D6\u6D88")),
    C: common_vendor.o($options.onClick),
    D: _ctx.type === "left" || _ctx.type === "right" ? 1 : "",
    E: common_vendor.sr("popupinfo", "0d4ca327-10"),
    F: common_vendor.p({
      ["background-color"]: "#fff"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/fancy/\u5DE5\u8BAD\u4E2D\u5FC3\u5DE5\u5177\u7BA1\u7406/Tool_manage_BUAA/TTools/TTools/pages/ToolList/ToolList.vue"]]);
wx.createPage(MiniProgramPage);
