"use strict";
const common_vendor = require("../../common/vendor.js");
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
        header: { "Authorization": getApp().globalData.token },
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
          console.log(res.data.error_code);
          if (res.data.error_code === 0) {
            common_vendor.index.showToast({
              title: "\u501F\u7528\u6210\u529F\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5F85\u5BA1\u6838\uFF01",
              icon: "none"
            });
          } else if (res.data.error_code === 5) {
            common_vendor.index.showToast({
              title: "\u4F60\u5DF2\u7ECF\u501F\u7528\u8FC7\u8FD9\u4E2A\u5DE5\u5177\u4E86",
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
        f: common_vendor.o(($event) => $options.showInfo(index), index),
        g: common_vendor.o(($event) => $options.toggle("center", index), index),
        h: common_vendor.o($options.onClick, index),
        i: "087ca766-3-" + i0 + "," + ("087ca766-2-" + i0),
        j: index,
        k: "087ca766-2-" + i0 + ",087ca766-1",
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
    e: common_vendor.t($data.toolInfo.name),
    f: common_vendor.t($data.toolInfo.limit_days),
    g: common_vendor.t($data.toolInfo.leftCount),
    h: common_vendor.t($data.toolInfo.totalCount),
    i: common_vendor.o(($event) => $data.range = $event),
    j: common_vendor.p({
      type: "daterange",
      modelValue: $data.range
    }),
    k: common_vendor.p({
      title: "*\u501F\u7528\u65F6\u95F4",
      type: "line",
      padding: true
    }),
    l: common_vendor.o(($event) => $data.purpose = $event),
    m: common_vendor.p({
      type: "textarea",
      placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9",
      modelValue: $data.purpose
    }),
    n: common_vendor.p({
      title: "*\u501F\u7528\u7406\u7531",
      type: "line",
      padding: true
    }),
    o: common_vendor.o(($event) => $options.actionsClick("\u53D6\u6D88")),
    p: common_vendor.o(($event) => $options.submitBorrow()),
    q: common_vendor.o($options.onClick),
    r: _ctx.type === "left" || _ctx.type === "right" ? 1 : "",
    s: common_vendor.sr("popup", "087ca766-4"),
    t: common_vendor.p({
      ["background-color"]: "#fff"
    }),
    v: $data.toolInfo.url,
    w: common_vendor.t($data.toolInfo.name),
    x: common_vendor.t($data.toolInfo.limit_days),
    y: common_vendor.t($data.toolInfo.leftCount),
    z: common_vendor.t($data.toolInfo.totalCount),
    A: common_vendor.o(($event) => $options.actionsClick("\u53D6\u6D88")),
    B: common_vendor.o($options.onClick),
    C: _ctx.type === "left" || _ctx.type === "right" ? 1 : "",
    D: common_vendor.sr("popupinfo", "087ca766-10"),
    E: common_vendor.p({
      ["background-color"]: "#fff"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Desktop/git_clong/Tool_manage_BUAA/TTools/TTools/pages/ToolList/ToolList.vue"]]);
wx.createPage(MiniProgramPage);
