"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      target: "",
      isManager: false,
      isLogin: 0,
      userInfo: {},
      pattern: {
        color: "#7A7E83",
        backgroundColor: "#fff",
        selectedColor: "#007AFF",
        buttonColor: "#007AFF",
        iconColor: "#fff"
      },
      content: [
        {
          iconPath: "https://img2.baidu.com/it/u=546153345,3989268214&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          selectedIconPath: "https://img2.baidu.com/it/u=546153345,3989268214&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          text: "\u5B66\u751F",
          active: true
        },
        {
          iconPath: "https://img1.baidu.com/it/u=3315202342,1207980959&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          selectedIconPath: "https://img1.baidu.com/it/u=3315202342,1207980959&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          text: "\u6559\u5E08",
          active: false
        }
      ],
      href: "https://uniapp.dcloud.io/component/README?id=uniui",
      form: {
        email: "",
        password: ""
      }
    };
  },
  onShow() {
    console.log(getApp().globalData.uid);
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
        } else {
          this.isLogin = 0;
        }
      }
    });
  },
  methods: {
    logout() {
      this.isLogin = 0;
      getApp().globalData.uid = -1;
      common_vendor.index.request({
        header: { "Authorization": getApp().globalData.token },
        url: getApp().globalData.urlRoot + "/user/unLogin",
        data: { uid: getApp().globalData.uid },
        method: "POST",
        success: (res) => {
          console.log(res);
          if (res.data.error_code === 0) {
            this.isLogin = 1;
            this.userInfo = res.data;
            getApp().globalData.token = "wutoken";
          }
        }
      });
    },
    toweb() {
      this.$refs.toWeb.open();
    },
    goTools() {
      common_vendor.index.navigateTo({
        url: "/pages/stu-Main/stu-Main"
      });
    },
    editInfo() {
      common_vendor.index.navigateTo({
        url: "/pages/self/self"
      });
    },
    changePassword() {
      common_vendor.index.navigateTo({
        url: "/pages/newPassword/newPassword"
      });
    },
    submitLogin() {
      getApp().globalData.token = "wutoken";
      console.log(this.form);
      this.target = "/user/login";
      if (this.isManager) {
        this.target = "/manager/Login";
      }
      console.log(this.target);
      console.log(getApp().globalData.token);
      common_vendor.index.request({
        header: { "Authorization": getApp().globalData.token },
        url: getApp().globalData.urlRoot + this.target,
        data: { "acc": this.form.email, "pwd": this.form.password },
        header: { "Authorization": getApp().globalData.token },
        method: "POST",
        success: (res) => {
          console.log(res.data);
          if (res.data.error_code == 0) {
            getApp().globalData.uid = res.data.uid;
            getApp().globalData.token = res.data.hash_code;
            common_vendor.index.showToast({
              title: "\u767B\u5F55\u6210\u529F\uFF01",
              icon: "none"
            });
            if (this.isManager) {
              common_vendor.index.navigateTo({
                url: "/pages/Teacher/tea-main/tea-main"
              });
            } else {
              common_vendor.index.request({
                header: { "Authorization": getApp().globalData.token },
                url: getApp().globalData.urlRoot + "/user/getInfo",
                data: { uid: getApp().globalData.uid },
                method: "POST",
                success: (res2) => {
                  if (res2.data.error_code === 0) {
                    this.isLogin = 1;
                    this.userInfo = res2.data;
                  }
                }
              });
            }
          } else if (res.data.error_code == 2 || res.data.error_code == 4) {
            common_vendor.index.showToast({
              title: String("\u7528\u6237\u540D\u6216\u5BC6\u7801\u4E0D\u6B63\u786E\uFF01"),
              icon: "none"
            });
          }
        }
      });
    },
    fabClick() {
      common_vendor.index.showToast({
        title: "\u5207\u6362\u767B\u5F55\u65B9\u5F0F",
        icon: "none"
      });
    },
    trigger(e) {
      console.log(e);
      if (e.index === 1) {
        this.content[e.index].active = !e.item.active;
        this.content[0].active = !e.item.active;
        this.isManager = true;
      } else {
        this.content[e.index].active = !e.item.active;
        this.content[1].active = !e.item.active;
        this.isManager = false;
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_title2 = common_vendor.resolveComponent("uni-title");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_link2 = common_vendor.resolveComponent("uni-link");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_title2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_fab2 + _easycom_uni_forms2 + _easycom_uni_card2 + _easycom_uni_icons2 + _easycom_uni_grid_item2 + _easycom_uni_grid2 + _easycom_uni_section2 + _easycom_uni_link2 + _easycom_uni_popup2)();
}
const _easycom_uni_title = () => "../../uni_modules/uni-title/components/uni-title/uni-title.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_fab = () => "../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_grid_item = () => "../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_link = () => "../../uni_modules/uni-link/components/uni-link/uni-link.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_title + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_fab + _easycom_uni_forms + _easycom_uni_card + _easycom_uni_icons + _easycom_uni_grid_item + _easycom_uni_grid + _easycom_uni_section + _easycom_uni_link + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.isLogin === 0
  }, $data.isLogin === 0 ? common_vendor.e({
    b: !$data.isManager
  }, !$data.isManager ? {
    c: common_vendor.p({
      type: "h1",
      title: "\u5B66\u751F\u767B\u5F55"
    })
  } : {}, {
    d: $data.isManager
  }, $data.isManager ? {
    e: common_vendor.p({
      type: "h1",
      color: "orange",
      title: "\u6559\u5E08\u767B\u5F55"
    })
  } : {}, {
    f: common_vendor.o(($event) => $data.form.email = $event),
    g: common_vendor.p({
      type: "text",
      placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1",
      modelValue: $data.form.email
    }),
    h: common_vendor.p({
      label: "\u90AE\u7BB1",
      name: "name"
    }),
    i: common_vendor.o(($event) => $data.form.password = $event),
    j: common_vendor.p({
      type: "password",
      placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
      modelValue: $data.form.password
    }),
    k: common_vendor.o((...args) => $options.toweb && $options.toweb(...args)),
    l: common_vendor.o((...args) => $options.toweb && $options.toweb(...args)),
    m: common_vendor.sr("fab", "c7f3f8e6-7,c7f3f8e6-5"),
    n: common_vendor.o($options.trigger),
    o: common_vendor.o($options.fabClick),
    p: common_vendor.p({
      pattern: $data.pattern,
      content: $data.content,
      horizontal: "right",
      vertical: "bottom",
      direction: _ctx.direction
    }),
    q: common_vendor.p({
      label: "\u5BC6\u7801",
      name: "name"
    }),
    r: common_vendor.p({
      modelValue: $data.form,
      ["label-position"]: "top"
    }),
    s: common_vendor.o((...args) => $options.submitLogin && $options.submitLogin(...args))
  }) : {}, {
    t: $data.isLogin === 1
  }, $data.isLogin === 1 ? {
    v: common_vendor.t($data.userInfo.college),
    w: common_vendor.t($data.userInfo.acc),
    x: common_vendor.t($data.userInfo.phoneNumber),
    y: common_vendor.o((...args) => $options.logout && $options.logout(...args)),
    z: common_vendor.p({
      title: $data.userInfo.name,
      extra: "\u5B66\u5DE5\u53F7:" + $data.userInfo.studentId
    }),
    A: common_vendor.p({
      type: "eye-filled",
      size: "30"
    }),
    B: common_vendor.o((...args) => $options.changePassword && $options.changePassword(...args)),
    C: common_vendor.p({
      type: "person",
      size: "30"
    }),
    D: common_vendor.o((...args) => $options.editInfo && $options.editInfo(...args)),
    E: common_vendor.p({
      type: "settings-filled",
      size: "30"
    }),
    F: common_vendor.o((...args) => $options.goTools && $options.goTools(...args)),
    G: common_vendor.p({
      column: 3,
      highlight: true,
      square: true,
      ["show-border"]: false
    }),
    H: common_vendor.p({
      titleFontSize: "18px",
      title: "\u5DF2\u767B\u5F55",
      type: "line"
    })
  } : {}, {
    I: common_vendor.p({
      href: "http://121.4.160.157:8080/",
      text: "http://121.4.160.157:8080/"
    }),
    J: common_vendor.sr("toWeb", "c7f3f8e6-17"),
    K: common_vendor.p({
      type: "top",
      ["background-color"]: "#fff"
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/fancy/\u5DE5\u8BAD\u4E2D\u5FC3\u5DE5\u5177\u7BA1\u7406/Tool_manage_BUAA/TTools/TTools/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
