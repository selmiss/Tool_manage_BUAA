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
      position: "工程训练中心南208",
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
        header: { "Authorization": getApp().globalData.token },
        url: getApp().globalData.urlRoot + "/manager/returnTool",
        data: {
          requestId: this.agree_id
        },
        method: "POST",
        success: (res) => {
          if (res.data.error_code === 0) {
            this.$refs.agree.close();
            common_vendor.index.showToast({
              title: "确认归还成功",
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
      console.log("maskClick事件:", e);
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
        header: { "Authorization": getApp().globalData.token },
        url: getApp().globalData.urlRoot + "/manager/approveBorrowRequest",
        data: {
          address: "",
          changeTime: null,
          getDate: "",
          endTime: "",
          isChangeTime: "false",
          refuseReason: this.refuse_reason,
          requestId: this.refuse_id,
          startTime: "",
          status: "Refuse"
        },
        method: "POST",
        success: (res) => {
          if (res.data.error_code === 0) {
            common_vendor.index.showToast({
              title: "拒绝成功",
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
        header: { "Authorization": getApp().globalData.token },
        url: getApp().globalData.urlRoot + "/manager/getAllNeedReturnList",
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
        c: "933dd2c4-2-" + i0 + "," + ("933dd2c4-1-" + i0),
        d: "933dd2c4-4-" + i0 + "," + ("933dd2c4-3-" + i0),
        e: common_vendor.o(($event) => $options.seeMessage(index)),
        f: "933dd2c4-5-" + i0 + "," + ("933dd2c4-3-" + i0),
        g: common_vendor.o(($event) => $options.approve(item.requestId, 1)),
        h: "933dd2c4-6-" + i0 + "," + ("933dd2c4-3-" + i0),
        i: "933dd2c4-3-" + i0 + "," + ("933dd2c4-1-" + i0),
        j: "933dd2c4-1-" + i0 + ",933dd2c4-0",
        k: common_vendor.p({
          title: item.toolName,
          ["sub-title"]: item.startTime + " 到 " + item.returnTime,
          extra: "数量:" + item.borrowCount,
          thumbnail: _ctx.avatar
        })
      };
    }),
    b: common_vendor.p({
      width: _ctx.nvueWidth
    }),
    c: common_vendor.p({
      span: 8
    }),
    d: common_vendor.p({
      span: 8
    }),
    e: common_vendor.p({
      span: 8
    }),
    f: common_vendor.p({
      width: _ctx.nvueWidth
    }),
    g: common_vendor.o(_ctx.onClick),
    h: common_vendor.p({
      title: "归还审批",
      subTitleFontSize: "16px",
      subTitle: "未审批数量:" + $data.borrow_list.length,
      titleFontSize: "20px",
      type: "line"
    }),
    i: common_vendor.t($data.nowInfo.stuEmail),
    j: common_vendor.t($data.nowInfo.phoneNumber),
    k: common_vendor.p({
      title: $data.nowInfo.requestUserName,
      ["sub-title"]: $data.nowInfo.stuCollege,
      type: "line"
    }),
    l: common_vendor.sr("seeInfo", "933dd2c4-7"),
    m: common_vendor.p({
      type: "dialog"
    }),
    n: common_vendor.sr("inputClose", "933dd2c4-10,933dd2c4-9"),
    o: common_vendor.o($options.refuse),
    p: common_vendor.p({
      mode: "input",
      title: "拒绝",
      value: "",
      placeholder: "请输入拒绝理由"
    }),
    q: common_vendor.sr("refuseDialog", "933dd2c4-9"),
    r: common_vendor.p({
      type: "dialog"
    }),
    s: common_vendor.t($data.date),
    t: $data.date,
    v: $options.startDate,
    w: $options.endDate,
    x: common_vendor.o((...args) => $options.bindDateChange && $options.bindDateChange(...args)),
    y: common_vendor.t($data.startTime),
    z: $data.startTime,
    A: common_vendor.o((...args) => $options.bindTimeChange && $options.bindTimeChange(...args)),
    B: common_vendor.t($data.endTime),
    C: $data.endTime,
    D: common_vendor.o((...args) => $options.bindTimeChange2 && $options.bindTimeChange2(...args)),
    E: $data.position,
    F: common_vendor.o(($event) => $data.position = $event.detail.value),
    G: common_vendor.o((...args) => $options.cancel && $options.cancel(...args)),
    H: common_vendor.o((...args) => $options.lend && $options.lend(...args)),
    I: common_vendor.p({
      title: "领取信息",
      titleFontSize: "20px",
      type: "line"
    }),
    J: common_vendor.sr("agree", "933dd2c4-11"),
    K: common_vendor.p({
      type: "dialog"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/fancy/\u5DE5\u8BAD\u4E2D\u5FC3\u5DE5\u5177\u7BA1\u7406/Tool_manage_BUAA/TTools/TTools/pages/Teacher/tea-main/return-borrow.vue"]]);
wx.createPage(MiniProgramPage);
