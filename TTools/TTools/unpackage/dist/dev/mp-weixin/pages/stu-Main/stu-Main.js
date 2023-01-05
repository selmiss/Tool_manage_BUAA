"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      range: "",
      purpose: "",
      name: "",
      toolId: -1,
      username: "JING",
      title: "\u5DE5\u5177\u501F\u7528\u5217\u8868",
      toolList: [
        {
          toolName: "\u70ED\u7194\u80F6\u68D2",
          borrowCount: 1,
          startTime: "2022-10-17",
          returnTime: "2022-10-19",
          status: "F",
          label: 6,
          requestId: 42
        },
        {
          toolName: "\u70ED\u7194\u80F6\u68D2",
          borrowCount: 1,
          startTime: "2022-10-17",
          returnTime: "2022-10-19",
          status: "F",
          label: 6,
          requestId: 42
        }
      ],
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
    submitBorrow() {
      common_vendor.index.request({
        url: getApp().globalData.urlRoot + "/user/applyPostpone",
        data: {
          uid: getApp().globalData.uid,
          requestId: this.toolId,
          postponeTime: this.range,
          purpose: this.purpose
        },
        method: "POST",
        success: (res) => {
          if (res.data.error_code === 0) {
            common_vendor.index.showToast({
              title: "\u7EED\u501F\u6210\u529F\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5F85\u5BA1\u6838\uFF01",
              icon: "none"
            });
            this.$refs.popup.close();
            this.getToolList();
          }
        }
      });
    },
    showMore(index) {
      this.name = this.toolList[index].toolName;
      this.toolId = this.toolList[index].requestId;
      this.$refs.popup.open("center");
    },
    toBorrow() {
      common_vendor.index.navigateTo({
        url: "/pages/ToolCats/ToolCats"
      });
    },
    getToolList() {
      common_vendor.index.request({
        url: getApp().globalData.urlRoot + "/user/allBorrowList",
        data: { uid: getApp().globalData.uid },
        method: "POST",
        success: (res) => {
          console.log(res.data);
          this.toolList = res.data.requestList;
        }
      });
    },
    actionsClick(text) {
      this.$refs.popup.close();
      this.$refs.popupinfo.close();
    }
  },
  created() {
    if (getApp().globalData.uid === -1) {
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    }
    this.getToolList();
  }
};
if (!Array) {
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  const _easycom_uni_col2 = common_vendor.resolveComponent("uni-col");
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_fab2 + _easycom_uni_col2 + _easycom_uni_row2 + _easycom_uni_card2 + _easycom_uni_section2 + _easycom_uni_datetime_picker2 + _easycom_uni_easyinput2 + _easycom_uni_popup2)();
}
const _easycom_uni_fab = () => "../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
const _easycom_uni_col = () => "../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_row = () => "../../uni_modules/uni-row/components/uni-row/uni-row.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_fab + _easycom_uni_col + _easycom_uni_row + _easycom_uni_card + _easycom_uni_section + _easycom_uni_datetime_picker + _easycom_uni_easyinput + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.sr("fab", "e2246c6e-0"),
    b: common_vendor.o($options.toBorrow),
    c: common_vendor.p({
      pattern: $data.pattern,
      horizontal: "right",
      vertical: "top"
    }),
    d: common_vendor.f($data.toolList, (item, index, i0) => {
      return common_vendor.e({
        a: "e2246c6e-4-" + i0 + "," + ("e2246c6e-3-" + i0),
        b: item.status === "F"
      }, item.status === "F" ? {} : {}, {
        c: item.status === "A"
      }, item.status === "A" ? {} : {}, {
        d: item.status === "R"
      }, item.status === "R" ? {} : {}, {
        e: item.status === "W"
      }, item.status === "W" ? {} : {}, {
        f: "e2246c6e-5-" + i0 + "," + ("e2246c6e-3-" + i0),
        g: "e2246c6e-6-" + i0 + "," + ("e2246c6e-3-" + i0),
        h: item.status === "A"
      }, item.status === "A" ? {
        i: common_vendor.o(($event) => $options.showMore(index))
      } : {}, {
        j: "e2246c6e-7-" + i0 + "," + ("e2246c6e-3-" + i0),
        k: "e2246c6e-3-" + i0 + "," + ("e2246c6e-2-" + i0),
        l: "e2246c6e-2-" + i0 + ",e2246c6e-1",
        m: common_vendor.p({
          title: item.toolName,
          ["sub-title"]: item.startTime + " \u5230 " + item.returnTime,
          extra: "\u6570\u91CF:" + item.borrowCount,
          thumbnail: _ctx.avatar
        })
      });
    }),
    e: common_vendor.p({
      span: 4
    }),
    f: common_vendor.p({
      span: 6
    }),
    g: common_vendor.p({
      span: 6
    }),
    h: common_vendor.p({
      span: 8
    }),
    i: common_vendor.p({
      width: _ctx.nvueWidth
    }),
    j: common_vendor.o(_ctx.onClick),
    k: common_vendor.p({
      title: $data.title,
      subTitleFontSize: "16px",
      subTitle: $data.username,
      titleFontSize: "20px",
      type: "line"
    }),
    l: common_vendor.t($data.name),
    m: common_vendor.o(($event) => $data.range = $event),
    n: common_vendor.p({
      type: "date",
      modelValue: $data.range
    }),
    o: common_vendor.p({
      title: "*\u501F\u7528\u65F6\u95F4",
      type: "line",
      padding: true
    }),
    p: common_vendor.o(($event) => $data.purpose = $event),
    q: common_vendor.p({
      type: "textarea",
      placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9",
      modelValue: $data.purpose
    }),
    r: common_vendor.p({
      title: "*\u7EED\u501F\u7406\u7531",
      type: "line",
      padding: true
    }),
    s: common_vendor.o(($event) => $options.actionsClick("\u53D6\u6D88")),
    t: common_vendor.o(($event) => $options.submitBorrow()),
    v: common_vendor.o(_ctx.onClick),
    w: _ctx.type === "left" || _ctx.type === "right" ? 1 : "",
    x: common_vendor.sr("popup", "e2246c6e-8"),
    y: common_vendor.p({
      ["background-color"]: "#fff"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/fancy/uniapps/TTools/TTools/pages/stu-Main/stu-Main.vue"]]);
wx.createPage(MiniProgramPage);
