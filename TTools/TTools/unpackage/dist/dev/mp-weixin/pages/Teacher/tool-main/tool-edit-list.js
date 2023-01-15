"use strict";
const common_vendor = require("../../../common/vendor.js");
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
  onLoad: function(option) {
    console.log(option.labelId);
    this.labelId = option.labelId;
    this.getList();
  },
  onShow() {
    if (getApp().globalData.uid === -1) {
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    }
  },
  methods: {
    submitEdit() {
      common_vendor.index.request({
        header: { "Authorization": getApp().globalData.token },
        url: getApp().globalData.urlRoot + "/manager/editTool",
        data: this.toolInfo,
        method: "POST",
        success: (res) => {
          if (res.data.error_code === 0) {
            this.$refs.popup.close();
            common_vendor.index.reLaunch({
              url: "/pages/Teacher/tea-main/tea-main"
            });
          }
        }
      });
    },
    getList() {
      common_vendor.index.request({
        header: { "Authorization": getApp().globalData.token },
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
  const _component_uni_button = common_vendor.resolveComponent("uni-button");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_number_box2 = common_vendor.resolveComponent("uni-number-box");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_card2 + _easycom_uni_grid_item2 + _easycom_uni_grid2 + _easycom_uni_section2 + _component_uni_button + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_number_box2 + _easycom_uni_forms2 + _easycom_uni_popup2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_grid_item = () => "../../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_number_box = () => "../../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_grid_item + _easycom_uni_grid + _easycom_uni_section + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_number_box + _easycom_uni_forms + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.toolList, (item, index, i0) => {
      return {
        a: item.url,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.limit_days),
        d: common_vendor.t(item.leftCount),
        e: common_vendor.t(item.totalCount),
        f: common_vendor.o(($event) => $options.showInfo(index), index),
        g: common_vendor.o(($event) => $options.toggle("center", index), index),
        h: common_vendor.o($options.onClick, index),
        i: "07efba1a-3-" + i0 + "," + ("07efba1a-2-" + i0),
        j: index,
        k: "07efba1a-2-" + i0 + ",07efba1a-1",
        l: common_vendor.p({
          index
        })
      };
    }),
    b: common_vendor.p({
      column: 2,
      highlight: true,
      square: false
    }),
    c: common_vendor.p({
      title: "\u5DE5\u5177\u501F\u7528",
      subTitle: "",
      titleFontSize: "20px",
      subTitleFontSize: "18px",
      type: "line"
    }),
    d: $data.toolInfo.url,
    e: common_vendor.p({
      type: "button",
      onclick: "upfile.click()"
    }),
    f: $data.toolInfo.url,
    g: common_vendor.o(($event) => $data.toolInfo.name = $event),
    h: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0",
      modelValue: $data.toolInfo.name
    }),
    i: common_vendor.p({
      label: "\u5DE5\u5177\u540D\u79F0",
      required: true
    }),
    j: common_vendor.o(($event) => $data.toolInfo.totalCount = $event),
    k: common_vendor.p({
      min: 1,
      modelValue: $data.toolInfo.totalCount
    }),
    l: common_vendor.p({
      label: "\u5DE5\u5177\u6570\u91CF",
      required: true
    }),
    m: common_vendor.o(($event) => $data.toolInfo.limit_days = $event),
    n: common_vendor.p({
      min: 1,
      modelValue: $data.toolInfo.limit_days
    }),
    o: common_vendor.t($data.toolInfo.leftCount),
    p: $data.toolInfo.shortReturnTime
  }, $data.toolInfo.shortReturnTime ? {
    q: common_vendor.t($data.toolInfo.shortReturnTime)
  } : {}, {
    r: common_vendor.p({
      label: "\u9650\u501F\u5929\u6570",
      required: true,
      prop: "limit_days"
    }),
    s: common_vendor.o(($event) => $data.toolInfo.intro = $event),
    t: common_vendor.p({
      type: "textarea",
      modelValue: $data.toolInfo.intro
    }),
    v: common_vendor.p({
      label: "\u5DE5\u5177\u7B80\u4ECB"
    }),
    w: common_vendor.sr("baseForm", "07efba1a-8,07efba1a-7"),
    x: common_vendor.p({
      labelWidth: "150rpx",
      ["label-position"]: "left"
    }),
    y: common_vendor.p({
      title: "\u7F16\u8F91\u5DE5\u5177\u4FE1\u606F",
      type: "line"
    }),
    z: common_vendor.o(($event) => $options.actionsClick("\u53D6\u6D88")),
    A: common_vendor.o(($event) => $options.submitEdit()),
    B: common_vendor.o($options.onClick),
    C: _ctx.type === "left" || _ctx.type === "right" ? 1 : "",
    D: common_vendor.sr("popup", "07efba1a-4"),
    E: common_vendor.p({
      ["background-color"]: "#fff"
    }),
    F: $data.toolInfo.url,
    G: common_vendor.t($data.toolInfo.name),
    H: common_vendor.t($data.toolInfo.limit_days),
    I: common_vendor.t($data.toolInfo.leftCount),
    J: common_vendor.t($data.toolInfo.totalCount),
    K: $data.toolInfo.shortReturnTime
  }, $data.toolInfo.shortReturnTime ? {
    L: common_vendor.t($data.toolInfo.shortReturnTime)
  } : {}, {
    M: $data.toolInfo.intro
  }, $data.toolInfo.intro ? {
    N: common_vendor.t($data.toolInfo.intro)
  } : {}, {
    O: common_vendor.o(($event) => $options.actionsClick("\u53D6\u6D88")),
    P: common_vendor.o($options.onClick),
    Q: _ctx.type === "left" || _ctx.type === "right" ? 1 : "",
    R: common_vendor.sr("popupinfo", "07efba1a-17"),
    S: common_vendor.p({
      ["background-color"]: "#fff"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Desktop/git_clong/Tool_manage_BUAA/TTools/TTools/pages/Teacher/tool-main/tool-edit-list.vue"]]);
wx.createPage(MiniProgramPage);
