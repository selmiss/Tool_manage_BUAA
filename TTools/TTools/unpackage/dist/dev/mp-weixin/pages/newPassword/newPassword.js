"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      old_pwd: "",
      new_pwd1: "",
      new_pwd2: ""
    };
  },
  onShow() {
    if (getApp().globalData.uid === -1) {
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    }
  },
  methods: {
    change_pwd() {
      if (this.new_pwd1 != this.new_pwd2) {
        common_vendor.index.showToast({
          title: "\u4E24\u6B21\u65B0\u5BC6\u7801\u4E0D\u4E00\u81F4!",
          icon: "none"
        });
        this.new_pwd1 = "";
        this.new_pwd2 = "";
      }
      common_vendor.index.request({
        url: getApp().globalData.urlRoot + "/user/reSetPwd",
        data: {
          old_pwd: this.old_pwd,
          new_pwd: this.new_pwd1,
          uid: getApp().globalData.uid
        },
        method: "POST",
        success: (res) => {
          if (res.data.error_code === 2) {
            common_vendor.index.showToast({
              title: "\u539F\u5BC6\u7801\u4E0D\u6B63\u786E",
              icon: "none"
            });
          } else if (res.data.error_code === 0) {
            common_vendor.index.showToast({
              title: "\u4FEE\u6539\u6210\u529F",
              icon: "none"
            });
            common_vendor.index.reLaunch({
              url: "/pages/index/index"
            });
          } else {
            common_vendor.index.showToast({
              title: "\u8BF7\u6CE8\u610F\u5BC6\u7801\u683C\u5F0F",
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
      title: "\u4FEE\u6539\u5BC6\u7801"
    }),
    b: common_vendor.o(($event) => $data.old_pwd = $event),
    c: common_vendor.p({
      type: "password",
      placeholder: "",
      modelValue: $data.old_pwd
    }),
    d: common_vendor.p({
      labelWidth: "150rpx",
      label: "\u539F\u5BC6\u7801",
      name: "name"
    }),
    e: common_vendor.o(($event) => $data.new_pwd1 = $event),
    f: common_vendor.p({
      type: "password",
      placeholder: "",
      modelValue: $data.new_pwd1
    }),
    g: common_vendor.p({
      labelWidth: "150rpx",
      label: "\u65B0\u5BC6\u7801",
      name: "name"
    }),
    h: common_vendor.o(($event) => $data.new_pwd2 = $event),
    i: common_vendor.p({
      type: "password",
      placeholder: "",
      modelValue: $data.new_pwd2
    }),
    j: common_vendor.p({
      labelWidth: "150rpx",
      label: "\u786E\u8BA4\u5BC6\u7801",
      name: "name"
    }),
    k: common_vendor.p({
      modelValue: _ctx.form,
      ["label-position"]: "left"
    }),
    l: common_vendor.o((...args) => $options.change_pwd && $options.change_pwd(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/fancy/uniapps/TTools/TTools/pages/newPassword/newPassword.vue"]]);
wx.createPage(MiniProgramPage);
