"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      userInfo: {}
    };
  },
  onShow() {
    if (getApp().globalData.uid === -1) {
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    }
    common_vendor.index.request({
      header: { "Authorization": getApp().globalData.token },
      url: getApp().globalData.urlRoot + "/user/getInfo",
      data: { uid: getApp().globalData.uid },
      method: "POST",
      success: (res) => {
        console.log(res);
        if (res.data.error_code === 0) {
          this.isLogin = 1;
          this.userInfo = res.data;
        }
      }
    });
  },
  methods: {
    change() {
      console.log(this.userInfo);
      common_vendor.index.request({
        header: { "Authorization": getApp().globalData.token },
        url: getApp().globalData.urlRoot + "/user/putInfo",
        data: {
          uid: getApp().globalData.uid,
          college: this.userInfo.college,
          name: this.userInfo.name,
          studentId: this.userInfo.studentId
        },
        method: "POST",
        success: (res) => {
          if (res.data.error_code === 0) {
            common_vendor.index.showToast({
              title: "\u4FEE\u6539\u6210\u529F",
              icon: "none"
            });
            common_vendor.index.reLaunch({
              url: "/pages/index/index"
            });
          } else {
            common_vendor.index.showToast({
              title: "\u4FEE\u6539\u5931\u8D25\uFF0C\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458",
              icon: "none"
            });
          }
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_title2 = common_vendor.resolveComponent("uni-title");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_title2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_title = () => "../../uni_modules/uni-title/components/uni-title/uni-title.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_title + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "h1",
      align: "center",
      title: "\u4FEE\u6539\u4E2A\u4EBA\u4FE1\u606F"
    }),
    b: common_vendor.o(($event) => $data.userInfo.studentId = $event),
    c: common_vendor.p({
      type: "text",
      placeholder: "\u60A8\u7684\u5B66\u53F7",
      modelValue: $data.userInfo.studentId
    }),
    d: common_vendor.p({
      label: "\u5B66\u53F7",
      name: "name"
    }),
    e: common_vendor.o(($event) => $data.userInfo.name = $event),
    f: common_vendor.p({
      type: "text",
      placeholder: "\u60A8\u7684\u59D3\u540D",
      modelValue: $data.userInfo.name
    }),
    g: common_vendor.p({
      label: "\u59D3\u540D",
      name: "name"
    }),
    h: common_vendor.o(($event) => $data.userInfo.college = $event),
    i: common_vendor.p({
      type: "text",
      placeholder: "\u60A8\u7684\u5B66\u9662",
      modelValue: $data.userInfo.college
    }),
    j: common_vendor.p({
      label: "\u5B66\u9662",
      name: "name"
    }),
    k: common_vendor.p({
      modelValue: _ctx.form,
      ["label-position"]: "left"
    }),
    l: common_vendor.o((...args) => $options.change && $options.change(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Desktop/git_clong/Tool_manage_BUAA/TTools/TTools/pages/self/self.vue"]]);
wx.createPage(MiniProgramPage);
