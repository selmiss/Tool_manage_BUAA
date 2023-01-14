"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    const currentDate = this.getDate({
      format: true
    });
    return {
      borrow_list: [{
        toolName: "",
        toolId: 0,
        requestUserName: "",
        userId: "",
        borrowCount: 0,
        phoneNumber: "",
        purpose: "",
        requestId: 0,
        returnTime: "",
        startTime: "",
        stuCollege: "",
        stuEmail: ""
      }],
      nowInfo: {
        toolName: "",
        toolId: 0,
        requestUserName: "",
        userId: "",
        borrowCount: 0,
        phoneNumber: "",
        purpose: "",
        requestId: 0,
        returnTime: "",
        startTime: "",
        stuCollege: "",
        stuEmail: ""
      },
      refuse_reason: "",
      refuse_id: 0,
      date: currentDate,
      startTime: "08:30",
      endTime: "18:30",
      position: "\u5DE5\u7A0B\u8BAD\u7EC3\u4E2D\u5FC3\u5357208",
      agree_id: 0
    };
  },
  computed: {
    startDate() {
      return this.getDate("start");
    },
    endDate() {
      return this.getDate("end");
    }
  },
  onShow() {
    if (getApp().globalData.uid === -1) {
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    }
    this.getBorrowList();
  },
  methods: {
    cancel() {
      this.$refs.agree.close();
    },
    lend() {
      common_vendor.index.request({
        url: getApp().globalData.urlRoot + "/manager/approvePostponeRequest",
        data: {
          refuseReason: "",
          requestId: this.agree_id,
          status: "Accept"
        },
        method: "POST",
        success: (res) => {
          if (res.data.error_code === 0) {
            this.$refs.agree.close();
            common_vendor.index.showToast({
              title: "\u6210\u529F\u501F\u51FA",
              icon: "none"
            });
            this.getBorrowList();
          }
        }
      });
    },
    bindDateChange: function(e) {
      this.date = e.detail.value;
    },
    bindTimeChange: function(e) {
      this.startTime = e.detail.value;
    },
    bindTimeChange2: function(e) {
      this.endTime = e.detail.value;
    },
    getDate(type) {
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (type === "start") {
        year = year - 60;
      } else if (type === "end") {
        year = year + 2;
      }
      month = month > 9 ? month : "0" + month;
      day = day > 9 ? day : "0" + day;
      return `${year}-${month}-${day}`;
    },
    maskClick(e) {
      console.log("maskClick\u4E8B\u4EF6:", e);
    },
    before_refuse() {
      this.$refs.refuseDialog.open();
    },
    approve(id, op) {
      if (op === 0) {
        this.before_refuse();
        this.refuse_id = id;
      } else if (op === 1) {
        this.agree_id = id;
        this.lend();
      }
    },
    refuse(val) {
      this.refuse_reason = val;
      this.$refs.inputClose.val = "";
      this.$refs.inputClose.close();
      console.log(this.refuse_id, this.refuse_reason);
      common_vendor.index.request({
        url: getApp().globalData.urlRoot + "/manager/approvePostponeRequest",
        data: {
          refuseReason: this.refuse_reason,
          requestId: this.refuse_id,
          status: "Refuse"
        },
        method: "POST",
        success: (res) => {
          if (res.data.error_code === 0) {
            common_vendor.index.showToast({
              title: "\u62D2\u7EDD\u6210\u529F",
              icon: "none"
            });
            this.getBorrowList();
          }
        }
      });
    },
    seeMessage(index) {
      this.nowInfo = this.borrow_list[index];
      this.$refs.seeInfo.open();
    },
    getBorrowList() {
      common_vendor.index.request({
        url: getApp().globalData.urlRoot + "/manager/getPostponeRequestList",
        data: {},
        method: "POST",
        success: (res) => {
          this.borrow_list = res.data.data_list;
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  const _easycom_uni_col2 = common_vendor.resolveComponent("uni-col");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  (_easycom_uni_row2 + _easycom_uni_col2 + _easycom_uni_card2 + _easycom_uni_section2 + _easycom_uni_popup2 + _easycom_uni_popup_dialog2)();
}
const _easycom_uni_row = () => "../../../uni_modules/uni-row/components/uni-row/uni-row.js";
const _easycom_uni_col = () => "../../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
if (!Math) {
  (_easycom_uni_row + _easycom_uni_col + _easycom_uni_card + _easycom_uni_section + _easycom_uni_popup + _easycom_uni_popup_dialog)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.borrow_list, (item, index, i0) => {
      return {
        a: common_vendor.t(item.requestUserName),
        b: common_vendor.t(item.purpose),
        c: "069f9643-2-" + i0 + "," + ("069f9643-1-" + i0),
        d: "069f9643-4-" + i0 + "," + ("069f9643-3-" + i0),
        e: common_vendor.o(($event) => $options.seeMessage(index)),
        f: "069f9643-5-" + i0 + "," + ("069f9643-3-" + i0),
        g: common_vendor.o(($event) => $options.approve(item.requestId, 0)),
        h: "069f9643-6-" + i0 + "," + ("069f9643-3-" + i0),
        i: common_vendor.o(($event) => $options.approve(item.requestId, 1)),
        j: "069f9643-7-" + i0 + "," + ("069f9643-3-" + i0),
        k: "069f9643-3-" + i0 + "," + ("069f9643-1-" + i0),
        l: "069f9643-1-" + i0 + ",069f9643-0",
        m: common_vendor.p({
          title: item.toolName,
          ["sub-title"]: item.startTime + " \u5230 " + item.returnTime + " \u5EF6\u671F\u81F3" + item.postPoneTime,
          extra: "\u6570\u91CF:" + item.borrowCount,
          thumbnail: _ctx.avatar
        })
      };
    }),
    b: common_vendor.p({
      width: _ctx.nvueWidth
    }),
    c: common_vendor.p({
      span: 3
    }),
    d: common_vendor.p({
      span: 8
    }),
    e: common_vendor.p({
      span: 6
    }),
    f: common_vendor.p({
      span: 5
    }),
    g: common_vendor.p({
      width: _ctx.nvueWidth
    }),
    h: common_vendor.o(_ctx.onClick),
    i: common_vendor.p({
      title: "\u5F85\u5BA1\u6279\u5EF6\u671F\u501F\u7528\u7533\u8BF7",
      subTitleFontSize: "16px",
      subTitle: "\u672A\u5BA1\u6279\u6570\u91CF:" + $data.borrow_list.length,
      titleFontSize: "20px",
      type: "line"
    }),
    j: common_vendor.t($data.nowInfo.stuEmail),
    k: common_vendor.t($data.nowInfo.phoneNumber),
    l: common_vendor.p({
      title: $data.nowInfo.requestUserName,
      ["sub-title"]: $data.nowInfo.stuCollege,
      type: "line"
    }),
    m: common_vendor.sr("seeInfo", "069f9643-8"),
    n: common_vendor.p({
      type: "dialog"
    }),
    o: common_vendor.sr("inputClose", "069f9643-11,069f9643-10"),
    p: common_vendor.o($options.refuse),
    q: common_vendor.p({
      mode: "input",
      title: "\u62D2\u7EDD",
      value: "",
      placeholder: "\u8BF7\u8F93\u5165\u62D2\u7EDD\u7406\u7531"
    }),
    r: common_vendor.sr("refuseDialog", "069f9643-10"),
    s: common_vendor.p({
      type: "dialog"
    }),
    t: common_vendor.t($data.date),
    v: $data.date,
    w: $options.startDate,
    x: $options.endDate,
    y: common_vendor.o((...args) => $options.bindDateChange && $options.bindDateChange(...args)),
    z: common_vendor.t($data.startTime),
    A: $data.startTime,
    B: common_vendor.o((...args) => $options.bindTimeChange && $options.bindTimeChange(...args)),
    C: common_vendor.t($data.endTime),
    D: $data.endTime,
    E: common_vendor.o((...args) => $options.bindTimeChange2 && $options.bindTimeChange2(...args)),
    F: $data.position,
    G: common_vendor.o(($event) => $data.position = $event.detail.value),
    H: common_vendor.o((...args) => $options.cancel && $options.cancel(...args)),
    I: common_vendor.o((...args) => $options.lend && $options.lend(...args)),
    J: common_vendor.p({
      title: "\u9886\u53D6\u4FE1\u606F",
      titleFontSize: "20px",
      type: "line"
    }),
    K: common_vendor.sr("agree", "069f9643-12"),
    L: common_vendor.p({
      type: "dialog"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/fancy/\u5DE5\u8BAD\u4E2D\u5FC3\u5DE5\u5177\u7BA1\u7406/Tool_manage_BUAA/TTools/TTools/pages/Teacher/tea-main/delay-borrow.vue"]]);
wx.createPage(MiniProgramPage);
