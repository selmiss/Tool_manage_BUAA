"use strict";
const common_vendor = require("../../common/vendor.js");
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
          title: "两次新密码不一致!",
          icon: "none"
        });
        this.new_pwd1 = "";
        this.new_pwd2 = "";
      }
      common_vendor.index.request({
        header: { "Authorization": getApp().globalData.token },
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
              title: "原密码不正确",
              icon: "none"
            });
          } else if (res.data.error_code === 0) {
            common_vendor.index.showToast({
              title: "修改成功",
              icon: "none"
            });
            common_vendor.index.reLaunch({
              url: "/pages/index/index"
            });
          } else {
            common_vendor.index.showToast({
              title: "请注意密码格式",
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
      title: "修改密码"
    }),
    b: common_vendor.o(($event) => $data.old_pwd = $event),
    c: common_vendor.p({
      type: "password",
      placeholder: "",
      modelValue: $data.old_pwd
    }),
    d: common_vendor.p({
      labelWidth: "150rpx",
      label: "原密码",
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
      label: "新密码",
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
      label: "确认密码",
      name: "name"
    }),
    k: common_vendor.p({
      modelValue: _ctx.form,
      ["label-position"]: "left"
    }),
    l: common_vendor.o((...args) => $options.change_pwd && $options.change_pwd(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Desktop/git_clong/Tool_manage_BUAA/TTools/TTools/pages/newPassword/newPassword.vue"]]);
wx.createPage(MiniProgramPage);
